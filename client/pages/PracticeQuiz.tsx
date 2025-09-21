import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, CheckCircle, X, Award, RotateCcw, TrendingUp, BookOpen } from "lucide-react";

type PracticeQuestion = {
  id: number;
  text: string;
  difficulty: string;
  type: "multiple_choice" | "essay";
  options?: string[];
};

type PracticeData = {
  subject: string;
  topic?: string;
  difficulty: string;
  questions: PracticeQuestion[];
  createdAt?: string;
};

export default function PracticeQuiz() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const fromState: PracticeData | undefined = location.state?.practice;

  const [practice, setPractice] = useState<PracticeData | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const persistedRaw = localStorage.getItem("currentPractice");
    const persisted: PracticeData | null = persistedRaw ? JSON.parse(persistedRaw) : null;
    const data = fromState || persisted;
    setPractice(data || null);
  }, [fromState]);

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const t = setTimeout(() => setTimeRemaining((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const questions = useMemo(() => practice?.questions || [], [practice]);
  const progress = questions.length ? (Object.keys(answers).length / questions.length) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (qid: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const calculateScore = () => {
    if (!questions.length) return 0;
    let total = 0;
    let max = questions.length * 10;
    questions.forEach((q) => {
      if (q.type === "multiple_choice") {
        const ans = answers[q.id];
        const correct = q.options?.[0];
        if (ans && correct && ans === correct) total += 10;
      } else {
        const text = (answers[q.id] || "").trim();
        if (text.length > 10) total += 8; // partial credit
      }
    });
    return Math.round((total / max) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setScore(calculateScore());
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setTimeRemaining(20 * 60);
    setIsSubmitted(false);
    setScore(0);
  };

  if (!practice) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy bài ôn</h2>
            <Button onClick={() => navigate("/study-plan")}>Quay lại Lộ trình</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isPassed = score >= 70;

  if (isSubmitted) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
          <Card className={`border-2 ${isPassed ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"} shadow-lg`}>
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4">{isPassed ? "🎉" : "😊"}</div>
              <h1 className={`text-3xl font-bold mb-2 ${isPassed ? "text-green-700" : "text-yellow-700"}`}>
                {isPassed ? "Chúc mừng! Bé làm rất tốt!" : "Bé đã cố gắng rất tốt!"}
              </h1>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${isPassed ? "text-green-600" : "text-yellow-600"}`}>{score}%</div>
                  <p className="text-sm text-muted-foreground">Tỷ lệ đúng ước tính</p>
                </div>
                <div className="text-center">
                  <Badge variant={isPassed ? "default" : "secondary"} className="text-lg px-4 py-2">
                    {isPassed ? "🌟 Tốt" : "📚 Cần ôn thêm"}
                  </Badge>
                </div>
              </div>
              {!isPassed && (
                <div className="mt-6 border-blue-200 bg-blue-50 rounded p-4 inline-flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600 mt-1" />
                  <div className="text-blue-800 text-left">
                    💡 Gợi ý: Ôn lại các câu sai rồi thử lại bài ôn nhé!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📋 Xem lại đáp án</CardTitle>
              <CardDescription>
                Câu hỏi dạng trắc nghiệm được chấm tự động; tự luận tính điểm ước lượng theo độ dài trả lời
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const correct = q.type === "multiple_choice" ? q.options?.[0] : undefined;
                const isCorrect = q.type === "multiple_choice" ? ans === correct : (ans || "").trim().length > 10;
                return (
                  <div key={q.id} className={`rounded-lg border-2 p-4 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                    <div className="flex items-start gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                        {isCorrect ? <CheckCircle className="h-5 w-5" /> : <X className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">Câu {idx + 1}</h4>
                          <Badge variant="outline" className="text-xs">{q.type === "multiple_choice" ? "📋 Trắc nghiệm" : "✍️ Tự luận"}</Badge>
                        </div>
                        <p className="text-sm">{q.text}</p>
                        <div className="text-sm"><strong>Câu trả lời:</strong>
                          <div className="mt-1 p-2 bg-white rounded border">{ans ? ans : <span className="text-gray-400 italic">Chưa trả lời</span>}</div>
                        </div>
                        {q.type === "multiple_choice" && (
                          <div className="text-sm"><strong>Đáp án đúng:</strong>
                            <div className="mt-1 p-2 bg-green-50 rounded border border-green-200">{correct}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="outline" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
              <RotateCcw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
            <Button onClick={() => navigate("/study-plan")} className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80">
              Quay lại Lộ trình
            </Button>
            <Button onClick={() => navigate("/progress")} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Xem tiến độ
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const q = questions[currentIndex];

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/study-plan")} className="border-primary/20 hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Lộ trình
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bài ôn: {(practice.subject || "").toUpperCase()} {practice.topic ? `— ${practice.topic}` : ""}
              </h1>
              <p className="text-muted-foreground mt-1">Độ khó: {practice.difficulty}</p>
            </div>
          </div>

          <Card className={`border-2 ${timeRemaining < 300 ? "border-red-200 bg-red-50" : "border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10"}`}>
            <CardContent className="p-4">
              <div className={`flex items-center gap-2 ${timeRemaining < 300 ? "text-red-600" : "text-accent"}`}>
                <Clock className="h-5 w-5" />
                <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {timeRemaining < 300 ? "⚠️ Sắp hết giờ!" : "Thời gian còn lại"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến độ làm bài</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Đã trả lời {Object.keys(answers).length}/{questions.length} câu hỏi
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📝 Danh sách câu hỏi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {questions.map((item, index) => (
                <Button
                  key={item.id}
                  variant={currentIndex === index ? "default" : "outline"}
                  className={`w-full justify-start text-left ${answers[item.id] ? "border-green-500 bg-green-50 hover:bg-green-100" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">
                        {item.type === "multiple_choice" ? "📋 Trắc nghiệm" : "✍️ Tự luận"}
                      </div>
                      <div className="text-xs capitalize">{item.difficulty}</div>
                    </div>
                    {answers[item.id] && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            {q && (
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      Câu {currentIndex + 1}
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize">{q.difficulty}</Badge>
                    </CardTitle>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                      {q.type === "multiple_choice" ? "📋 Trắc nghiệm" : "✍️ Tự luận"}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{q.text}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {q.type === "multiple_choice" && (
                    <RadioGroup value={answers[q.id] || ""} onValueChange={(v) => handleAnswer(q.id, v)} className="space-y-3">
                      {(q.options || []).map((opt, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                          <RadioGroupItem value={opt} id={`pq_${q.id}_${idx}`} />
                          <Label htmlFor={`pq_${q.id}_${idx}`} className="flex-1 cursor-pointer">
                            {String.fromCharCode(65 + idx)}. {opt}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {q.type === "essay" && (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Viết câu trả lời chi tiết ở đây..."
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        className="min-h-[150px] border-primary/20 focus:border-primary resize-none"
                      />
                      <p className="text-xs text-muted-foreground">💡 Hãy trình bày rõ ràng và có ví dụ minh hoạ.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="border-secondary/20 text-secondary hover:bg-secondary hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Câu trước
              </Button>

              <div className="flex gap-4">
                <Button variant="outline" onClick={handleReset} className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Làm lại
                </Button>
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold px-8">
                  <Award className="h-4 w-4 mr-2" />
                  Nộp bài
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex >= questions.length - 1}
                className="border-accent/20 text-accent hover:bg-accent hover:text-white"
              >
                Câu tiếp
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
