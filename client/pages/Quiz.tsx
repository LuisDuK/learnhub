import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  X,
  Award,
  Star,
  RotateCcw,
  AlertTriangle,
  Target,
  BookOpen,
  TrendingUp,
} from "lucide-react";

// Mock quiz data
const mockQuizzes = {
  1: {
    id: 1,
    lessonId: 1,
    title: "🧪 Kiểm tra: Phép cộng và trừ trong phạm vi 100",
    description:
      "Bài kiểm tra này gồm 10 câu hỏi về phép cộng và phép trừ. Thời gian làm bài: 20 phút",
    timeLimit: 20, // minutes
    totalPoints: 100,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Kết quả của phép tính 25 + 37 là:",
        options: ["60", "62", "58", "64"],
        correctAnswer: "62",
        points: 10,
        explanation: "25 + 37 = 62. Ta có thể tính: 25 + 30 + 7 = 55 + 7 = 62",
      },
      {
        id: 2,
        type: "multiple_choice",
        question: "Kết quả của phép tính 84 - 29 là:",
        options: ["55", "57", "53", "59"],
        correctAnswer: "55",
        points: 10,
        explanation: "84 - 29 = 55. Ta vay 1 từ hàng chục: 84 - 29 = 55",
      },
      {
        id: 3,
        type: "true_false",
        question: "Phép tính 45 + 28 = 73 là đúng.",
        correctAnswer: "true",
        points: 10,
        explanation: "Đúng! 45 + 28 = 73",
      },
      {
        id: 4,
        type: "multiple_select",
        question: "Những phép tính nào sau đây có kết quả bằng 50?",
        options: ["30 + 20", "60 - 10", "25 + 25", "70 - 30"],
        correctAnswers: ["30 + 20", "25 + 25"],
        points: 15,
        explanation:
          "30 + 20 = 50 và 25 + 25 = 50 là đúng. 60 - 10 = 50 và 70 - 30 = 40",
      },
      {
        id: 5,
        type: "essay",
        question:
          "Giải bài toán: Mẹ mua 48 quả cam, gia đình ăn hết 19 quả. Hỏi còn lại bao nhiêu quả cam? Trình bày cách giải.",
        points: 25,
        sampleAnswer: "Phép tính: 48 - 19 = 29. Vậy còn lại 29 quả cam.",
        explanation:
          "Đây là bài toán phép trừ. Ta lấy số cam ban đầu trừ đi số cam đã ăn.",
      },
      {
        id: 6,
        type: "multiple_choice",
        question: "Tìm số còn thiếu: 36 + ? = 58",
        options: ["20", "22", "24", "26"],
        correctAnswer: "22",
        points: 10,
        explanation: "58 - 36 = 22, vậy số còn thiếu là 22",
      },
      {
        id: 7,
        type: "essay",
        question:
          "Sắp xếp các số sau theo thứ tự từ bé đến lớn: 67, 34, 89, 12, 45. Giải thích cách sắp xếp.",
        points: 20,
        sampleAnswer:
          "Thứ tự: 12, 34, 45, 67, 89. So sánh từng cặp số từ trái qua phải.",
        explanation:
          "So sánh hàng chục trước, nếu bằng nhau thì so sánh hàng đơn vị.",
      },
    ],
  },
};

interface Answer {
  questionId: number;
  type: string;
  answer: string | string[];
}

export default function Quiz() {
  const { lessonId, id } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = mockQuizzes[parseInt(id || "1") as keyof typeof mockQuizzes];

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  if (!quiz) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">
              Không tìm thấy bài kiểm tra
            </h2>
            <Button onClick={() => navigate(`/lesson/${lessonId}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại bài học
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getAnswer = (questionId: number): Answer | undefined => {
    return answers.find((a) => a.questionId === questionId);
  };

  const updateAnswer = (
    questionId: number,
    answer: string | string[],
    type: string,
  ) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === questionId);
      const newAnswer: Answer = { questionId, type, answer };

      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      } else {
        return [...prev, newAnswer];
      }
    });
  };

  const calculateScore = () => {
    let totalScore = 0;

    quiz.questions.forEach((question) => {
      const answer = getAnswer(question.id);
      if (!answer) return;

      switch (question.type) {
        case "multiple_choice":
        case "true_false":
          if (answer.answer === question.correctAnswer) {
            totalScore += question.points;
          }
          break;
        case "multiple_select":
          const userAnswers = Array.isArray(answer.answer) ? answer.answer : [];
          const correctAnswers = question.correctAnswers || [];
          if (
            JSON.stringify(userAnswers.sort()) ===
            JSON.stringify(correctAnswers.sort())
          ) {
            totalScore += question.points;
          }
          break;
        case "essay":
          // For essays, give partial credit (this would be manual grading in real app)
          if (
            typeof answer.answer === "string" &&
            answer.answer.trim().length > 10
          ) {
            totalScore += Math.floor(question.points * 0.8); // 80% credit for attempt
          }
          break;
      }
    });

    return totalScore;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentQuestion(1);
    setTimeRemaining(20 * 60);
    setIsSubmitted(false);
    setShowResults(false);
    setScore(0);
  };

  const isPassed = score >= quiz.passingScore;
  const progress = (answers.length / quiz.questions.length) * 100;

  // Results view
  if (showResults) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
          {/* Results Header */}
          <Card
            className={`border-2 ${isPassed ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"} shadow-lg`}
          >
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4">{isPassed ? "🎉" : "😊"}</div>
              <h1
                className={`text-3xl font-bold mb-2 ${isPassed ? "text-green-700" : "text-yellow-700"}`}
              >
                {isPassed
                  ? "Chúc mừng! Bé đã qua bài kiểm tra!"
                  : "Bé đã cố gắng rất tốt!"}
              </h1>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold ${isPassed ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {score}/{quiz.totalPoints}
                  </div>
                  <p className="text-sm text-muted-foreground">Điểm số</p>
                </div>
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold ${isPassed ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {Math.round((score / quiz.totalPoints) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Tỷ lệ đúng</p>
                </div>
                <div className="text-center">
                  <Badge
                    variant={isPassed ? "default" : "secondary"}
                    className="text-lg px-4 py-2"
                  >
                    {isPassed ? "🌟 Đạt" : "📚 Cần ôn tập"}
                  </Badge>
                </div>
              </div>
              {!isPassed && (
                <Alert className="mt-6 border-blue-200 bg-blue-50">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    💡 <strong>Gợi ý:</strong> Bé hãy ôn lại bài học và thử làm
                    lại bài kiểm tra nhé! Điểm qua môn là {quiz.passingScore}{" "}
                    điểm.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Answer Review */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                📋 Xem lại đáp án
              </CardTitle>
              <CardDescription>
                Cùng xem lại các câu hỏi và đáp án đúng để học thêm kiến thức
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = getAnswer(question.id);
                let isCorrect = false;

                switch (question.type) {
                  case "multiple_choice":
                  case "true_false":
                    isCorrect = userAnswer?.answer === question.correctAnswer;
                    break;
                  case "multiple_select":
                    const userAnswers = Array.isArray(userAnswer?.answer)
                      ? userAnswer.answer
                      : [];
                    const correctAnswers = question.correctAnswers || [];
                    isCorrect =
                      JSON.stringify(userAnswers.sort()) ===
                      JSON.stringify(correctAnswers.sort());
                    break;
                  case "essay":
                    isCorrect =
                      userAnswer?.answer &&
                      (userAnswer.answer as string).trim().length > 10;
                    break;
                }

                return (
                  <div
                    key={question.id}
                    className={`rounded-lg border-2 p-4 ${
                      isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          isCorrect
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <X className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">Câu {index + 1}</h4>
                          <Badge variant="outline" className="text-xs">
                            {question.points} điểm
                          </Badge>
                          <Badge
                            variant={isCorrect ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {isCorrect ? "Đúng" : "Sai"}
                          </Badge>
                        </div>
                        <p className="text-sm">{question.question}</p>

                        {/* User's answer */}
                        <div className="text-sm">
                          <strong>Câu trả lời của bé:</strong>
                          <div className="mt-1 p-2 bg-white rounded border">
                            {userAnswer ? (
                              Array.isArray(userAnswer.answer) ? (
                                userAnswer.answer.join(", ")
                              ) : (
                                userAnswer.answer
                              )
                            ) : (
                              <span className="text-gray-400 italic">
                                Chưa trả lời
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Correct answer */}
                        <div className="text-sm">
                          <strong>Đáp án đúng:</strong>
                          <div className="mt-1 p-2 bg-green-50 rounded border border-green-200">
                            {question.type === "multiple_select"
                              ? (question.correctAnswers || []).join(", ")
                              : question.type === "essay"
                                ? question.sampleAnswer
                                : question.correctAnswer}
                          </div>
                        </div>

                        {/* Explanation */}
                        {question.explanation && (
                          <div className="text-sm bg-blue-50 p-3 rounded border border-blue-200">
                            <strong className="text-blue-800">
                              💡 Giải thích:
                            </strong>
                            <p className="text-blue-700 mt-1">
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
            <Button
              onClick={() => navigate(`/lesson/${lessonId}`)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
            >
              Quay lại bài học
            </Button>
            <Button
              onClick={() => navigate("/progress")}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Xem tiến độ
            </Button>
          </div>
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
              Quay lại bài học
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {quiz.title}
              </h1>
              <p className="text-muted-foreground mt-1">{quiz.description}</p>
            </div>
          </div>

          {/* Timer */}
          <Card
            className={`border-2 ${timeRemaining < 300 ? "border-red-200 bg-red-50" : "border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10"}`}
          >
            <CardContent className="p-4">
              <div
                className={`flex items-center gap-2 ${timeRemaining < 300 ? "text-red-600" : "text-accent"}`}
              >
                <Clock className="h-5 w-5" />
                <span className="font-bold text-lg">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {timeRemaining < 300 ? "⚠️ Sắp hết giờ!" : "Thời gian còn lại"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến độ làm bài</span>
              <span className="text-sm font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Đã trả l��i {answers.length}/{quiz.questions.length} câu hỏi
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Question Navigation */}
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📝 Danh sách câu hỏi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quiz.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={currentQuestion === q.id ? "default" : "outline"}
                  className={`w-full justify-start text-left ${
                    getAnswer(q.id)
                      ? "border-green-500 bg-green-50 hover:bg-green-100"
                      : ""
                  }`}
                  onClick={() => setCurrentQuestion(q.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">
                        {q.type === "multiple_choice"
                          ? "📋 Trắc nghiệm"
                          : q.type === "true_false"
                            ? "✅ Đúng/Sai"
                            : q.type === "multiple_select"
                              ? "☑️ Nhiều lựa chọn"
                              : "✍️ Tự luận"}
                      </div>
                      <div className="text-xs">{q.points} điểm</div>
                    </div>
                    {getAnswer(q.id) && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {quiz.questions
              .filter((q) => q.id === currentQuestion)
              .map((question) => {
                const currentAnswer = getAnswer(question.id);

                return (
                  <Card
                    key={question.id}
                    className="border-primary/20 shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          Câu{" "}
                          {quiz.questions.findIndex(
                            (q) => q.id === question.id,
                          ) + 1}
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {question.points} điểm
                          </Badge>
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-accent/10 text-accent border-accent/20"
                        >
                          {question.type === "multiple_choice"
                            ? "📋 Trắc nghiệm"
                            : question.type === "true_false"
                              ? "✅ Đúng/Sai"
                              : question.type === "multiple_select"
                                ? "☑️ Nhiều lựa chọn"
                                : "✍️ Tự luận"}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {question.question}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Multiple Choice */}
                      {question.type === "multiple_choice" && (
                        <RadioGroup
                          value={(currentAnswer?.answer as string) || ""}
                          onValueChange={(value) =>
                            updateAnswer(question.id, value, question.type)
                          }
                          className="space-y-3"
                        >
                          {question.options?.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                            >
                              <RadioGroupItem
                                value={option}
                                id={`q${question.id}_${index}`}
                              />
                              <Label
                                htmlFor={`q${question.id}_${index}`}
                                className="flex-1 cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {/* True/False */}
                      {question.type === "true_false" && (
                        <RadioGroup
                          value={(currentAnswer?.answer as string) || ""}
                          onValueChange={(value) =>
                            updateAnswer(question.id, value, question.type)
                          }
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-3 rounded-lg border border-green-200 hover:bg-green-50">
                            <RadioGroupItem
                              value="true"
                              id={`q${question.id}_true`}
                            />
                            <Label
                              htmlFor={`q${question.id}_true`}
                              className="flex-1 cursor-pointer"
                            >
                              ✅ Đúng
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 rounded-lg border border-red-200 hover:bg-red-50">
                            <RadioGroupItem
                              value="false"
                              id={`q${question.id}_false`}
                            />
                            <Label
                              htmlFor={`q${question.id}_false`}
                              className="flex-1 cursor-pointer"
                            >
                              ❌ Sai
                            </Label>
                          </div>
                        </RadioGroup>
                      )}

                      {/* Multiple Select */}
                      {question.type === "multiple_select" && (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Chọn tất cả đáp án đúng:
                          </p>
                          {question.options?.map((option, index) => {
                            const selectedAnswers =
                              (currentAnswer?.answer as string[]) || [];
                            const isSelected = selectedAnswers.includes(option);

                            return (
                              <div
                                key={index}
                                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                              >
                                <Checkbox
                                  id={`q${question.id}_${index}`}
                                  checked={isSelected}
                                  onCheckedChange={(checked) => {
                                    const currentAnswers =
                                      (currentAnswer?.answer as string[]) || [];
                                    const newAnswers = checked
                                      ? [...currentAnswers, option]
                                      : currentAnswers.filter(
                                          (a) => a !== option,
                                        );
                                    updateAnswer(
                                      question.id,
                                      newAnswers,
                                      question.type,
                                    );
                                  }}
                                />
                                <Label
                                  htmlFor={`q${question.id}_${index}`}
                                  className="flex-1 cursor-pointer"
                                >
                                  {option}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Essay */}
                      {question.type === "essay" && (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Viết câu trả lời chi tiết ở đây..."
                            value={(currentAnswer?.answer as string) || ""}
                            onChange={(e) =>
                              updateAnswer(
                                question.id,
                                e.target.value,
                                question.type,
                              )
                            }
                            className="min-h-[150px] border-primary/20 focus:border-primary resize-none"
                          />
                          <p className="text-xs text-muted-foreground">
                            💡 Hãy trình bày chi tiết cách giải và kết quả
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = quiz.questions.findIndex(
                    (q) => q.id === currentQuestion,
                  );
                  if (currentIndex > 0) {
                    setCurrentQuestion(quiz.questions[currentIndex - 1].id);
                  }
                }}
                disabled={
                  quiz.questions.findIndex((q) => q.id === currentQuestion) ===
                  0
                }
                className="border-secondary/20 text-secondary hover:bg-secondary hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Câu trước
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Làm lại
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold px-8"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Nộp bài
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = quiz.questions.findIndex(
                    (q) => q.id === currentQuestion,
                  );
                  if (currentIndex < quiz.questions.length - 1) {
                    setCurrentQuestion(quiz.questions[currentIndex + 1].id);
                  }
                }}
                disabled={
                  quiz.questions.findIndex((q) => q.id === currentQuestion) ===
                  quiz.questions.length - 1
                }
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
