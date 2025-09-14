import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  PenTool,
  Award,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import type { GetLessonResponse, Lesson, LessonQuizCue } from "@shared/api";
import { QuizDialog } from "@/components/lesson/QuizDialog";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [activeCue, setActiveCue] = useState<LessonQuizCue | null>(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [answered, setAnswered] = useState<Set<string>>(new Set());

  const storageKey = useMemo(() => `lesson:${id}:position`, [id]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/lessons/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          if (r.status === 403) throw new Error("Bài học chưa sẵn sàng");
          if (r.status === 401) throw new Error("Không có quyền");
          throw new Error("Không tải được bài học");
        }
        return (await r.json()) as GetLessonResponse;
      })
      .then((res) => {
        if (cancelled) return;
        setLesson(res.lesson);
        const saved = Number(localStorage.getItem(storageKey) || 0);
        setPosition(
          isFinite(saved) ? Math.min(saved, res.lesson.durationSec - 0.5) : 0,
        );
      })
      .catch((e: any) => {
        if (cancelled) return;
        setError(e.message || "Lỗi tải bài học");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, storageKey]);

  // Save progress throttled
  useEffect(() => {
    if (!lesson) return;
    const iv = setInterval(() => {
      fetch(`/api/lessons/${lesson.id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positionSec: position, completed }),
      }).catch(() => {});
    }, 5000);
    return () => clearInterval(iv);
  }, [lesson, position, completed]);

  const progressPercent = useMemo(() => {
    if (!lesson || lesson.durationSec === 0) return 0;
    return Math.max(0, Math.min(100, (position / lesson.durationSec) * 100));
  }, [lesson, position]);

  useEffect(() => {
    if (!lesson || !videoRef.current) return;
    const v = videoRef.current;
    const saved = Number(localStorage.getItem(storageKey) || 0);
    if (isFinite(saved) && saved > 0) {
      v.currentTime = Math.min(saved, lesson.durationSec - 0.5);
    }
  }, [lesson, storageKey]);

  const nextUnansweredCue = useMemo(() => {
    if (!lesson) return null;
    const cues = [...lesson.quizCues].sort((a, b) => a.timeSec - b.timeSec);
    return cues.find((c) => !answered.has(c.question.id)) || null;
  }, [lesson, answered]);

  const maybeTriggerCue = (t: number) => {
    if (!lesson || !nextUnansweredCue) return;
    if (t + 0.01 >= nextUnansweredCue.timeSec && !activeCue) {
      videoRef.current?.pause();
      setActiveCue(nextUnansweredCue);
    }
  };

  const clampSeek = (t: number) => {
    if (!lesson || !nextUnansweredCue) return t;
    const maxAllowed = nextUnansweredCue.timeSec - 0.2;
    return Math.min(t, Math.max(0, maxAllowed));
  };

  const onTimeUpdate = () => {
    if (!videoRef.current || !lesson) return;
    const t = videoRef.current.currentTime;
    const clamped = clampSeek(t);
    if (clamped < t - 0.001) {
      videoRef.current.currentTime = clamped;
      videoRef.current.pause();
    }
    localStorage.setItem(storageKey, String(clamped));
    setPosition(clamped);
    maybeTriggerCue(clamped);
  };

  const onSeeked = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    const clamped = clampSeek(t);
    if (clamped !== t) {
      videoRef.current.currentTime = clamped;
      videoRef.current.pause();
    }
  };

  const onEnded = () => {
    setCompleted(true);
    if (lesson) {
      fetch(`/api/lessons/${lesson.id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionSec: lesson.durationSec,
          completed: true,
        }),
      }).catch(() => {});
    }
  };

  const submitQuiz = async (answer: number | string) => {
    if (!lesson || !activeCue) return;
    setSubmittingQuiz(true);
    try {
      const r = await fetch(
        `/api/lessons/${lesson.id}/quiz/${activeCue.question.id}/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer }),
        },
      );
      if (!r.ok) throw new Error("Không nộp được câu trả lời");
      const data = (await r.json()) as { correct: boolean };
      if (data.correct) {
        setAnswered((prev) => new Set(prev).add(activeCue.question.id));
        setActiveCue(null);
        videoRef.current?.play();
        toast({ title: "Đúng rồi!", description: "Tiếp tục bài học nhé." });
      } else {
        const rewindTo = Math.max(0, activeCue.timeSec - 10);
        if (videoRef.current) {
          videoRef.current.currentTime = rewindTo;
          videoRef.current.pause();
        }
        toast({
          title: "Chưa đúng",
          description: "Hãy xem lại đoạn video liên quan rồi trả lời lại.",
          variant: "destructive",
        });
      }
    } catch (e) {
      setActiveCue(null);
      videoRef.current?.play();
      toast({
        title: "Không tải được câu hỏi",
        description: "Tiếp tục phát video.",
        variant: "destructive",
      });
    } finally {
      setSubmittingQuiz(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          Đang tải bài học...
        </div>
      </DashboardLayout>
    );
  }

  if (error || !lesson) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">
              {error || "Không tìm thấy bài học"}
            </h2>
            <Button onClick={() => navigate("/subjects")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại môn học
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/subjects")}
              className="border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {lesson.title}
              </h1>
            </div>
          </div>
          {completed && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <span className="font-bold">Đã hoàn thành! 🎉</span>
            </div>
          )}
        </div>

        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến độ bài học</span>
              <span className="text-sm font-bold text-primary">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="relative">
              <Progress value={progressPercent} className="h-3" />
              {lesson.quizCues.map((c) => (
                <div
                  key={c.question.id}
                  className={`absolute top-[-4px] h-4 w-[2px] ${answered.has(c.question.id) ? "bg-green-500" : "bg-accent"}`}
                  style={{ left: `${(c.timeSec / lesson.durationSec) * 100}%` }}
                  title={`Mốc quiz: ${formatDuration(c.timeSec)}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/20 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-black relative">
                  <video
                    ref={videoRef}
                    src={lesson.videoUrl}
                    controls
                    className="w-full h-full"
                    onTimeUpdate={onTimeUpdate}
                    onSeeked={onSeeked}
                    onEnded={onEnded}
                    onError={() =>
                      toast({
                        title: "Lỗi phát media",
                        description: "Tệp media hỏng hoặc không tìm thấy",
                        variant: "destructive",
                      })
                    }
                  />
                </div>
                <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(lesson.durationSec)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Giáo viên phụ trách
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  📚 Nội dung bài học
                </CardTitle>
                <CardDescription>
                  Video có chèn câu hỏi bắt buộc tại các mốc thời gian nhằm củng
                  cố kiến thức.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setCompleted(true);
                  if (videoRef.current)
                    videoRef.current.currentTime = lesson.durationSec - 0.1;
                }}
                disabled={completed}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold py-3 rounded-xl shadow-lg"
              >
                {completed ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Đã hoàn thành! 🎉
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Đánh dấu hoàn thành
                  </>
                )}
              </Button>

              <Button
                onClick={() => navigate(`/lesson/${id}/exercise/1`)}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 font-bold py-3 px-6 rounded-xl"
              >
                <PenTool className="h-5 w-5 mr-2" />
                Làm bài tập
              </Button>

              <Button
                onClick={() => navigate(`/lesson/${id}/quiz/1`)}
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 font-bold py-3 px-6 rounded-xl"
              >
                <Award className="h-5 w-5 mr-2" />
                Kiểm tra
              </Button>
            </div>
          </div>
        </div>

        <QuizDialog
          open={Boolean(activeCue)}
          cue={activeCue}
          submitting={submittingQuiz}
          onCancel={() => {
            if (activeCue?.question.required) return;
            setActiveCue(null);
            videoRef.current?.play();
          }}
          onSubmit={submitQuiz}
        />
      </div>
    </DashboardLayout>
  );
}
