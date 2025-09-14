import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ZoomIn, ZoomOut, Clock, Heart } from "lucide-react";
import type { GetLessonResponse } from "@shared/api";

interface LearnState {
  type: "video" | "document";
  title: string;
  description?: string;
  src: string;
  estimatedDurationSec?: number; // for documents
  lessonId?: string; // optional, to fetch/access-check and sync progress
  conceptTags?: string[]; // e.g., ['addition','subtraction','fraction']
  promptTimesSec?: number[]; // e.g., [60,120,180]
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Learn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useLocation();
  const learn = (state || {}) as LearnState;

  const [videoPos, setVideoPos] = useState(0);
  const [videoDur, setVideoDur] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [breakShown, setBreakShown] = useState(false);
  const [milestonesShown, setMilestonesShown] = useState<
    Record<number, boolean>
  >({});
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const markerTimes = useMemo(
    () => (Array.isArray(learn.promptTimesSec) ? learn.promptTimesSec : []),
    [learn.promptTimesSec],
  );

  const [accessError, setAccessError] = useState<string | null>(null);
  const [serverVideo, setServerVideo] = useState<string | null>(null);
  const [allowServerSync, setAllowServerSync] = useState(false);

  const [showReflection, setShowReflection] = useState(false);
  const [reflectionNote, setReflectionNote] = useState("");
  const [reflectionPrompted, setReflectionPrompted] = useState(false);
  const reflectFlag = useMemo(
    () => `reflection:prompted:${learn.title}`,
    [learn.title],
  );

  const [quickAnswers, setQuickAnswers] = useState<
    Record<number, number | null>
  >({ 0: null, 1: null });
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [understoodOk, setUnderstoodOk] = useState<boolean | null>(null);

  const estimated = learn.estimatedDurationSec || 600; // default 10min for documents

  // Optional access-check + hydrate from server (only block on 403)
  useEffect(() => {
    let cancelled = false;
    if (!learn.lessonId) return;
    fetch(`/api/lessons/${learn.lessonId}`)
      .then(async (r) => {
        if (r.status === 403) throw new Error("Bài học chưa sẵn sàng");
        if (!r.ok) return null; // tolerate 404/others for UI demo
        return (await r.json()) as GetLessonResponse;
      })
      .then((res) => {
        if (cancelled) return;
        if (res && learn.type === "video") setServerVideo(res.lesson.videoUrl);
        setAccessError(null);
        setAllowServerSync(Boolean(res));
      })
      .catch((e: any) => {
        if (cancelled) return;
        if (String(e?.message || "").includes("sẵn sàng"))
          setAccessError("Bài học chưa sẵn sàng");
        else setAccessError(null);
        setAllowServerSync(false);
      });
    return () => {
      cancelled = true;
    };
  }, [learn.lessonId, learn.type]);

  // Document ticking
  useEffect(() => {
    if (learn.type !== "document") return;
    const iv = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(iv);
  }, [learn.type]);

  const hasConcepts = false;

  // Motivational toasts (5, 15, 25 minutes)
  useEffect(() => {
    const total = learn.type === "video" ? Math.floor(videoPos) : elapsed;
    const marks = [300, 900, 1500];
    marks.forEach((t) => {
      if (total >= t && !milestonesShown[t]) {
        setMilestonesShown((s) => ({ ...s, [t]: true }));
        toast({
          title: "Cố lên!",
          description:
            t === 1500
              ? "Bạn sắp chạm mốc 25 phút, chuẩn bị nghỉ ngơi nhé!"
              : "Bạn đang làm rất tốt!",
        });
      }
    });
    if (total >= 1500 && !breakShown) setBreakShown(true);
  }, [learn.type, videoPos, elapsed, milestonesShown, breakShown, toast]);

  // Save progress (server optional)
  useEffect(() => {
    if (!learn.lessonId || !allowServerSync) return;
    const iv = setInterval(() => {
      const positionSec = learn.type === "video" ? videoPos : elapsed;
      const completed =
        learn.type === "video"
          ? videoDur > 0 && videoPos >= videoDur - 0.5
          : elapsed >= estimated - 1;
      fetch(`/api/lessons/${learn.lessonId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positionSec, completed }),
      }).catch(() => {});
    }, 5000);
    return () => clearInterval(iv);
  }, [learn.lessonId, allowServerSync, learn.type, videoPos, videoDur, elapsed, estimated]);

  // Init reflection prompted flag from storage
  useEffect(() => {
    setReflectionPrompted(Boolean(localStorage.getItem(reflectFlag)));
  }, [reflectFlag]);

  // Reflection trigger at 50%
  useEffect(() => {
    const ratio =
      learn.type === "video"
        ? videoDur > 0
          ? videoPos / videoDur
          : 0
        : elapsed / Math.max(1, estimated);
    if (!showReflection && !reflectionPrompted && ratio >= 0.5) {
      const stored = localStorage.getItem(`reflection:${learn.title}`) || "";
      setReflectionNote(stored);
      setShowReflection(true);
      setReflectionPrompted(true);
      localStorage.setItem(reflectFlag, "1");
    }
  }, [
    learn.type,
    videoPos,
    videoDur,
    elapsed,
    estimated,
    showReflection,
    learn.title,
    reflectionPrompted,
    reflectFlag,
  ]);

  const progress = useMemo(() => {
    if (learn.type === "video") {
      if (videoDur <= 0) return 0;
      return Math.max(0, Math.min(100, (videoPos / videoDur) * 100));
    }
    return Math.max(0, Math.min(100, (elapsed / Math.max(1, estimated)) * 100));
  }, [learn.type, videoPos, videoDur, elapsed, estimated]);

  const computedSrc = useMemo(() => {
    if (learn.type === "video") return serverVideo || learn.src;
    return learn.src;
  }, [learn.type, serverVideo, learn.src]);

  // Concept hints derived from title/description/tags
  const hintsArr = useMemo(() => {
    const text =
      `${learn.title || ""} ${learn.description || ""}`.toLowerCase();
    const tags = new Set<string>();
    (learn.conceptTags || []).forEach((t) => tags.add(t.toLowerCase()));
    if (/cộng|add|addition/.test(text)) tags.add("addition");
    if (/trừ|subtract|subtraction/.test(text)) tags.add("subtraction");
    if (/phân số|fraction/.test(text)) tags.add("fraction");

    const hints: { title: string; story: string; emoji: string }[] = [];
    if (tags.has("addition")) {
      hints.push({
        title: "Ghép mảnh để cộng",
        story:
          "Hãy tưởng tượng 10 khối lego màu xanh và 5 khối lego màu đỏ. Ghép lại, bạn sẽ có 15 khối rực rỡ!",
        emoji: "🧩",
      });
    }
    if (tags.has("subtraction")) {
      hints.push({
        title: "Ăn bánh còn bao nhiêu?",
        story:
          "Có 9 chiếc bánh, bạn ăn 3 chiếc. Còn lại mấy chiếc để chia cho bạn bè?",
        emoji: "🧁",
      });
    }
    if (tags.has("fraction")) {
      hints.push({
        title: "Cắt bánh chia phần",
        story:
          "Một chiếc pizza chia 8 miếng. 3/8 nghĩa là 3 miếng pizza ngon tuyệt!",
        emoji: "🍕",
      });
    }
    return hints;
  }, [learn.title, learn.description, learn.conceptTags]);

  if (!learn || !learn.src || !learn.type) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
              <div className="text-5xl">🤔</div>
              <div>Thiếu thông tin bài học.</div>
              <Button onClick={() => navigate("/study-plan")}>
                Quay lại lộ trình
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (accessError === "Bài học chưa sẵn sàng") {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="border-red-200">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-2">🔒</div>
              <div className="font-bold text-red-600 mb-2">{accessError}</div>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Quay lại
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {learn.title}
              </h1>
              {learn.description && (
                <div className="text-sm text-muted-foreground mt-1">
                  {learn.description}
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {learn.type === "video" ? "📹 Video" : "📄 Tài liệu"}
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Study progress */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 sticky top-16 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tiến độ</span>
                  <span className="text-sm font-bold text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={progress} className="h-3" />
                  {markerTimes.map((t, i) => {
                    const total =
                      learn.type === "video"
                        ? Math.max(1, videoDur)
                        : Math.max(1, estimated);
                    const pct = Math.max(0, Math.min(100, (t / total) * 100));
                    return (
                      <div
                        key={i}
                        className="absolute top-[-4px] h-4 w-[2px] bg-accent"
                        style={{ left: `${pct}%` }}
                        title={`Mốc: ${formatTime(t)}`}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Break reminder */}
            {breakShown && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Heart className="h-5 w-5" />
                    <span>
                      Đã 25 phút rồi! Nghỉ 5 phút cho mắt và não nhé 💆‍♀️
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setBreakShown(false)}
                  >
                    Đã hiểu
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Main content */}
            {learn.type === "video" ? (
              <Card className="border-primary/20 overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black">
                    <video
                      ref={videoRef}
                      src={computedSrc}
                      controls
                      className="w-full h-full"
                      onLoadedMetadata={() =>
                        setVideoDur(videoRef.current?.duration || 0)
                      }
                      onTimeUpdate={() =>
                        setVideoPos(videoRef.current?.currentTime || 0)
                      }
                    />
                  </div>
                  <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTime(videoPos)} / {formatTime(videoDur)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-accent/30 overflow-hidden shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <CardTitle className="text-base">Tài liệu</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                    >
                      <ZoomOut className="h-4 w-4" /> Thu nhỏ
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                    >
                      <ZoomIn className="h-4 w-4" /> Phóng to
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full h-[75vh] overflow-auto bg-white">
                    <div
                      className="w-full h-full"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "top left",
                      }}
                    >
                      <iframe src={computedSrc} className="w-[100%] h-[75vh]" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTime(elapsed)} / {formatTime(estimated)} (ước tính)
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick check (simple 2-question quiz) */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">
                  Kiểm tra nhanh mức độ hiểu bài
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[0, 1].map((idx) => (
                  <div key={idx} className="p-3 rounded-lg border">
                    <div className="font-medium">Câu {idx + 1}</div>
                    <div className="mt-2 space-y-2">
                      {[0, 1, 2].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            checked={quickAnswers[idx] === opt}
                            onChange={() =>
                              setQuickAnswers((s) => ({ ...s, [idx]: opt }))
                            }
                          />
                          <span>Lựa chọn {opt + 1}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      setQuickSubmitted(true);
                      const correct =
                        Number(quickAnswers[0] === 0) +
                          Number(quickAnswers[1] === 1) >=
                        2;
                      setUnderstoodOk(correct);
                      toast({
                        title: correct ? "Tuyệt vời!" : "Cần ôn thêm",
                        description: correct
                          ? "Bạn đã hiểu tốt. Tiếp tục bài tiếp theo nhé!"
                          : "Hãy xem lại nội dung hoặc làm thêm bài tập.",
                        variant: correct ? "default" : "destructive",
                      });
                    }}
                  >
                    Nộp bài
                  </Button>
                  {quickSubmitted && understoodOk === false && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (learn.lessonId)
                          navigate(`/lesson/${learn.lessonId}/exercise/1`);
                        else navigate("/study-plan");
                      }}
                    >
                      Làm thêm bài tập
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Next actions */}
            <div className="flex items-center gap-3">
              <Button
                disabled={understoodOk !== true}
                onClick={() => navigate("/study-plan")}
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                Tiếp tục bài tiếp theo
              </Button>
              <Button variant="outline" onClick={() => navigate("/study-plan")}>
                Quay lại lộ trình
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection dialog */}
      <Dialog
        open={showReflection}
        onOpenChange={(o) => {
          setShowReflection(o);
          if (!o) {
            setReflectionPrompted(true);
            localStorage.setItem(reflectFlag, "1");
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tự phản ánh</DialogTitle>
            <DialogDescription>
              Hãy dành một phút để nghĩ về điều bạn đã hiểu rõ và điều còn mơ
              hồ. Ghi lại vài dòng nhé!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Textarea
              rows={5}
              value={reflectionNote}
              onChange={(e) => setReflectionNote(e.target.value)}
              placeholder="Điều mình đã hiểu... Điều còn mơ hồ..."
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReflection(false);
                  setReflectionPrompted(true);
                  localStorage.setItem(reflectFlag, "1");
                }}
              >
                Để sau
              </Button>
              <Button
                onClick={() => {
                  localStorage.setItem(
                    `reflection:${learn.title}`,
                    reflectionNote,
                  );
                  setReflectionPrompted(true);
                  localStorage.setItem(reflectFlag, "1");
                  setShowReflection(false);
                }}
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                Lưu ghi chú
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
