import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Star,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Answer {
  questionId: number;
  type: "multiple_choice" | "essay";
  content: string;
  imageFile?: File;
  selectedOption?: number;
}

interface Question {
  id: number;
  type: "multiple_choice" | "essay";
  question: string;
  options?: string[];
  correctAnswer?: number;
  points: number;
  hint?: string;
}

interface Exercise {
  id: number;
  lessonId: number;
  title: string;
  description: string;
  timeLimit: number;
  totalPoints: number;
  questions: Question[];
}

interface GradingResult {
  questionId: number;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  feedback: string;
  suggestion?: string;
}

export default function ExerciseResults() {
  const { lessonId, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { answers, exercise } = location.state as {
    answers: Answer[];
    exercise: Exercise;
  };
  const [gradingResults, setGradingResults] = useState<GradingResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate AI grading
  useEffect(() => {
    const gradeExercise = async () => {
      setIsLoading(true);

      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const results: GradingResult[] = [];
      let totalEarned = 0;
      let totalMax = 0;

      exercise.questions.forEach((question) => {
        const answer = answers.find((a) => a.questionId === question.id);
        totalMax += question.points;

        if (!answer) {
          results.push({
            questionId: question.id,
            isCorrect: false,
            earnedPoints: 0,
            maxPoints: question.points,
            feedback: "Chưa trả lời câu hỏi này.",
            suggestion: "Hãy đọc kỹ đề bài và thử lại.",
          });
          return;
        }

        if (question.type === "multiple_choice") {
          const isCorrect = answer.selectedOption === question.correctAnswer;
          const earnedPoints = isCorrect ? question.points : 0;
          totalEarned += earnedPoints;

          results.push({
            questionId: question.id,
            isCorrect,
            earnedPoints,
            maxPoints: question.points,
            feedback: isCorrect
              ? "🎉 Chính xác! Bé đã chọn đúng đáp án."
              : `❌ Chưa đúng. Đáp án đúng là: ${question.options![question.correctAnswer!]}`,
            suggestion: !isCorrect
              ? "Hãy luyện tập thêm các bài toán tương tự để nắm vững kiến thức."
              : "Tuyệt vời! Tiếp tục giữ vững phương pháp này.",
          });
        } else {
          // Essay question - simulate AI evaluation
          const hasContent =
            answer.content.trim().length > 0 || answer.imageFile;
          const contentLength = answer.content.trim().length;

          let earnedPoints = 0;
          let feedback = "";
          let suggestion = "";

          if (!hasContent) {
            feedback = "Chưa có nội dung trả lời.";
            suggestion = "Hãy viết đầy đủ cách giải hoặc tải ảnh bài làm lên.";
          } else if (contentLength < 20) {
            earnedPoints = Math.floor(question.points * 0.3);
            feedback = "Câu trả lời còn quá ngắn và chưa đầy đủ.";
            suggestion = "Hãy giải thích chi tiết hơn từng bước thực hiện.";
          } else if (contentLength < 50) {
            earnedPoints = Math.floor(question.points * 0.6);
            feedback = "Câu trả lời đã có nội dung nhưng cần bổ sung thêm.";
            suggestion =
              "Bé có thể thêm ví dụ hoặc giải thích rõ hơn các bước tính toán.";
          } else {
            earnedPoints = Math.floor(question.points * 0.9);
            feedback =
              "Câu trả lời rất tốt! Bé đã trình bày chi tiết và logic.";
            suggestion = "Tuyệt vời! Hãy tiếp tục phát huy cách làm bài này.";
          }

          totalEarned += earnedPoints;
          results.push({
            questionId: question.id,
            isCorrect: earnedPoints > question.points * 0.5,
            earnedPoints,
            maxPoints: question.points,
            feedback,
            suggestion,
          });
        }
      });

      setGradingResults(results);
      setTotalScore(totalEarned);
      setMaxScore(totalMax);
      setIsLoading(false);
    };

    if (answers && exercise) {
      gradeExercise();
    }
  }, [answers, exercise]);

  const correctAnswers = gradingResults.filter((r) => r.isCorrect).length;
  const totalQuestions = exercise.questions.length;
  const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🎉";
    if (percentage >= 70) return "😊";
    if (percentage >= 60) return "😐";
    return "😔";
  };

  if (!answers || !exercise) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy kết quả</h2>
            <Button onClick={() => navigate(`/lesson/${lessonId}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại bài học
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    if (!isLoading && maxScore > 0) {
      // Persist results server-side and update lesson progress if passed
      const persist = async () => {
        try {
          await fetch(`/api/exercises/${id || "1"}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answers: answers.map((a) => ({
                questionId: a.questionId,
                type: a.type,
                content: a.type === "essay" ? a.content : undefined,
                selectedOption: a.type === "multiple_choice" ? a.selectedOption : undefined,
                hasImage: Boolean(a.imageFile),
              })),
              timeSpentSec: exercise.timeLimit * 60,
            }),
          });
          const passed = ((totalScore / maxScore) * 100) >= 70;
          if (passed && lessonId) {
            await fetch(`/api/lessons/${lessonId}/progress`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ positionSec: 0, completed: true }),
            });
          }
        } catch {}
      };
      persist();
    }
  }, [isLoading, totalScore, maxScore, id, answers, exercise, lessonId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-primary/5">
          <Card className="w-full max-w-2xl text-center border-primary/20 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-8xl mb-6 animate-bounce">🤖</div>
              <h1 className="text-3xl font-bold text-primary mb-4">Đang chấm bài...</h1>
              <p className="text-lg text-muted-foreground mb-6">AI đang phân tích và đánh giá bài làm của bé. Vui lòng chờ trong giây lát!</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-gradient-to-r from-primary to-accent h-4 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground">Đang xử lý kết quả...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/lesson/${lessonId}`)}
              className="border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại kế hoạch học tập
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🎯 Kết quả bài tập
              </h1>
              <p className="text-muted-foreground mt-1">{exercise.title}</p>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <Card className="border-primary/20 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-8xl mb-4">
                {getScoreEmoji(scorePercentage)}
              </div>
              <h2 className="text-4xl font-bold mb-2">
                <span className={getScoreColor(scorePercentage)}>
                  {totalScore}/{maxScore}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Điểm số của bé ({Math.round(scorePercentage)}%)
              </p>

              <div className="max-w-md mx-auto mb-6">
                <Progress value={scorePercentage} className="h-4" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {correctAnswers}
                  </div>
                  <div className="text-sm text-muted-foreground">Câu đúng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {totalQuestions - correctAnswers}
                  </div>
                  <div className="text-sm text-muted-foreground">Câu sai</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {totalQuestions}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tổng số câu
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Feedback */}
        <Card className="border-accent/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-accent" />
              Đánh giá tổng quan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert
              className={`border-2 ${scorePercentage >= 80 ? "border-green-200 bg-green-50" : scorePercentage >= 60 ? "border-yellow-200 bg-yellow-50" : "border-red-200 bg-red-50"}`}
            >
              <TrendingUp
                className={`h-5 w-5 ${scorePercentage >= 80 ? "text-green-600" : scorePercentage >= 60 ? "text-yellow-600" : "text-red-600"}`}
              />
              <AlertDescription className="text-base">
                {scorePercentage >= 90 && (
                  <span className="text-green-800">
                    🌟 <strong>Xuất sắc!</strong> Bé đã làm bài rất tốt và hiểu
                    rõ kiến thức. Hãy tiếp tục phát huy!
                  </span>
                )}
                {scorePercentage >= 80 && scorePercentage < 90 && (
                  <span className="text-green-800">
                    🎉 <strong>Tốt lắm!</strong> Bé đã nắm vững hầu hết kiến
                    thức. Chỉ cần luyện tập thêm một chút nữa.
                  </span>
                )}
                {scorePercentage >= 60 && scorePercentage < 80 && (
                  <span className="text-yellow-800">
                    😊 <strong>Khá tốt!</strong> Bé đã hiểu được cơ bản. Hãy ôn
                    lại những phần chưa vững và luyện tập thêm.
                  </span>
                )}
                {scorePercentage < 60 && (
                  <span className="text-red-800">
                    📚 <strong>Cần cố gắng thêm!</strong> Bé nên ôn lại bài học
                    và làm thêm bài tập để nắm vững kiến thức hơn.
                  </span>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="border-secondary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-secondary" />
              Chi tiết từng câu hỏi
            </CardTitle>
            <CardDescription>Feedback và gợi ý cải thiện từ AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercise.questions.map((question, index) => {
              const result = gradingResults.find(
                (r) => r.questionId === question.id,
              );
              const answer = answers.find((a) => a.questionId === question.id);

              return (
                <Card
                  key={question.id}
                  className={`border ${result?.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-white">
                            Câu {index + 1}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${question.type === "multiple_choice" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                          >
                            {question.type === "multiple_choice"
                              ? "Trắc nghiệm"
                              : "Tự luận"}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-100">
                            {question.points} điểm
                          </Badge>
                        </div>
                        <p className="font-medium">{question.question}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {result?.isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600" />
                        )}
                        <div className="text-right">
                          <div className="font-bold">
                            {result?.earnedPoints || 0}/{result?.maxPoints || 0}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            điểm
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {question.type === "multiple_choice" && answer && (
                      <div className="space-y-2">
                        <p>
                          <strong>Đáp án của bé:</strong> {answer.content}
                        </p>
                        {!result?.isCorrect &&
                          question.options &&
                          question.correctAnswer !== undefined && (
                            <p>
                              <strong>Đáp án đúng:</strong>{" "}
                              {question.options[question.correctAnswer]}
                            </p>
                          )}
                      </div>
                    )}

                    {question.type === "essay" && answer && (
                      <div className="space-y-2">
                        {answer.content && (
                          <div>
                            <strong>Câu trả lời:</strong>
                            <div className="mt-1 p-3 bg-white rounded border text-sm">
                              {answer.content}
                            </div>
                          </div>
                        )}
                        {answer.imageFile && (
                          <div>
                            <strong>Ảnh bài làm:</strong>
                            <img
                              src={URL.createObjectURL(answer.imageFile)}
                              alt="Student answer"
                              className="mt-1 max-w-xs rounded border"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <Alert className="border-blue-200 bg-blue-50">
                      <Star className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>AI đánh giá:</strong> {result?.feedback}
                      </AlertDescription>
                    </Alert>

                    {result?.suggestion && (
                      <Alert className="border-purple-200 bg-purple-50">
                        <Lightbulb className="h-4 w-4 text-purple-600" />
                        <AlertDescription className="text-purple-800">
                          <strong>Gợi ý:</strong> {result.suggestion}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pb-6">
          <Button
            onClick={() => navigate(`/lesson/${lessonId}/exercise/${id}`)}
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary hover:text-white px-8 py-3"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Làm lại bài
          </Button>
          {((totalScore / maxScore) * 100) >= 70 && (
            <Button
              onClick={() => navigate(`/study-plan`)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Tiếp tục bài học tiếp theo
            </Button>
          )}
          <Button
            onClick={() => navigate(`/lesson/${lessonId}`)}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white px-8 py-3"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Quay lại kế hoạch học tập
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
