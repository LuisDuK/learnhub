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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Upload,
  Camera,
  CheckCircle,
  Clock,
  AlertCircle,
  FileImage,
  Trash2,
  Send,
  ChevronRight,
  Edit3,
} from "lucide-react";

// Mock exercise data with Vietnamese requirements
const mockExercise = {
  id: 1,
  lessonId: 1,
  title: "🔢 Bài tập phép cộng và trừ",
  description:
    "Hoàn thành các bài tập sau để củng cố kiến thức về phép cộng và phép trừ trong phạm vi 100.",
  timeLimit: 30, // minutes
  totalPoints: 100,
  questions: [
    // Multiple choice questions (4-5 questions)
    {
      id: 1,
      type: "multiple_choice" as const,
      question: "25 + 34 = ?",
      options: ["59", "69", "58", "61"],
      correctAnswer: 0, // Index of correct answer
      points: 10,
    },
    {
      id: 2,
      type: "multiple_choice" as const,
      question: "78 - 29 = ?",
      options: ["49", "51", "48", "50"],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 3,
      type: "multiple_choice" as const,
      question: "42 + 18 = ?",
      options: ["58", "60", "62", "59"],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 4,
      type: "multiple_choice" as const,
      question: "95 - 37 = ?",
      options: ["58", "59", "57", "56"],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 5,
      type: "multiple_choice" as const,
      question:
        "Lan có 56 viên kẹo, cho bạn 18 viên. Hỏi Lan còn lại bao nhiêu viên?",
      options: ["38 viên", "36 viên", "40 viên", "42 viên"],
      correctAnswer: 0,
      points: 15,
    },
    // Essay questions (2-3 questions)
    {
      id: 6,
      type: "essay" as const,
      question: "Giải thích cách tính 45 + 23 theo từng bước",
      points: 20,
      hint: "Hãy viết từng bước một cách chi tiết",
    },
    {
      id: 7,
      type: "essay" as const,
      question:
        "Tính 67 - 39 và giải thích tại sao phải mượn khi thực hiện phép trừ này",
      points: 15,
      hint: "Chú ý đến việc mượn từ hàng chục",
    },
    {
      id: 8,
      type: "essay" as const,
      question: "Hãy tạo ra một bài toán có lời về phép cộng với kết quả là 75",
      points: 10,
      hint: "Có thể sử dụng ví dụ về đồ chơi, kẹo, sách,...",
    },
  ],
};

interface Answer {
  questionId: number;
  type: "multiple_choice" | "essay";
  content: string;
  imageFile?: File;
  selectedOption?: number;
}

export default function Exercise() {
  const { lessonId, id } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [uploadingImage, setUploadingImage] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const currentQuestion = mockExercise.questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

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
    content: string,
    type: "multiple_choice" | "essay",
    selectedOption?: number,
    imageFile?: File,
  ) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === questionId);
      const newAnswer: Answer = {
        questionId,
        type,
        content,
        selectedOption,
        imageFile,
      };

      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      } else {
        return [...prev, newAnswer];
      }
    });
  };

  const handleMultipleChoiceAnswer = (
    questionId: number,
    optionIndex: number,
  ) => {
    const question = mockExercise.questions.find((q) => q.id === questionId);
    if (question && question.type === "multiple_choice") {
      updateAnswer(
        questionId,
        question.options[optionIndex],
        "multiple_choice",
        optionIndex,
      );
    }
  };

  const handleEssayAnswer = (questionId: number, content: string) => {
    updateAnswer(questionId, content, "essay");
  };

  const handleFileUpload = async (questionId: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chỉ chọn file ảnh!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.");
      return;
    }

    setUploadingImage(true);

    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      const currentAnswer = getAnswer(questionId);
      updateAnswer(
        questionId,
        currentAnswer?.content || "",
        "essay",
        undefined,
        file,
      );
      setUploadingImage(false);
    }, 1000);
  };

  const removeImage = (questionId: number) => {
    const answer = getAnswer(questionId);
    if (answer?.imageFile) {
      URL.revokeObjectURL(URL.createObjectURL(answer.imageFile));
    }
    const updatedAnswer = { ...answer };
    delete updatedAnswer.imageFile;
    updateAnswer(questionId, updatedAnswer.content || "", "essay");
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    // save on question change
    saveProgress();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < mockExercise.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      saveProgress();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
      saveProgress();
    }
  };

  const normalizeAnswers = () =>
    answers.map((a) => ({
      questionId: a.questionId,
      type: a.type,
      content: a.type === "essay" ? a.content : undefined,
      selectedOption: a.type === "multiple_choice" ? a.selectedOption : undefined,
      hasImage: Boolean(a.imageFile),
    }));

  const saveProgress = async () => {
    try {
      const r = await fetch(`/api/exercises/${id || "1"}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: normalizeAnswers(),
          timeRemainingSec: timeRemaining,
          currentQuestionIndex,
        }),
      });
      if (r.ok) {
        const data = (await r.json()) as { ok: boolean; lastSavedIso: string };
        setLastSaved(data.lastSavedIso);
      }
    } catch {}
  };

  useEffect(() => {
    const iv = setInterval(() => {
      saveProgress();
    }, 5000);
    return () => clearInterval(iv);
  }, [answers, timeRemaining, currentQuestionIndex]);

  const handleSubmitAll = async () => {
    if (answers.length === 0) {
      alert("Vui lòng trả lời ít nhất một câu hỏi!");
      return;
    }
    try {
      await saveProgress();
      await fetch(`/api/exercises/${id || "1"}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: normalizeAnswers(), timeSpentSec: mockExercise.timeLimit * 60 - timeRemaining }),
      });
    } catch {}

    navigate(`/lesson/${lessonId}/exercise/${id || "1"}/results`, {
      state: { answers, exercise: mockExercise },
    });
  };

  const getQuestionStatus = (questionId: number) => {
    const answer = getAnswer(questionId);
    return answer ? "completed" : "pending";
  };

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
              Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {mockExercise.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                {mockExercise.description}
              </p>
            </div>
          </div>

          {/* Timer */}
          <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-accent">
                <Clock className="h-5 w-5" />
                <span className="font-bold text-lg">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Thời gian còn lại
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Question Navigator */}
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📝 Danh sách câu hỏi
              </CardTitle>
              <CardDescription>Nhấp vào số câu để chuyển nhanh</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockExercise.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={
                    currentQuestionIndex === index ? "default" : "outline"
                  }
                  className={`w-full justify-between text-left ${
                    getQuestionStatus(q.id) === "completed"
                      ? "border-green-500 bg-green-50 hover:bg-green-100"
                      : ""
                  }`}
                  onClick={() => goToQuestion(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">
                        {q.type === "multiple_choice"
                          ? "Trắc nghiệm"
                          : "Tự luận"}
                      </div>
                      <div className="text-xs">{q.points} điểm</div>
                    </div>
                  </div>
                  {getQuestionStatus(q.id) === "completed" && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </Button>
              ))}

              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-1">Tiến độ</div>
                <div className="text-sm font-medium">
                  {answers.length}/{mockExercise.questions.length} câu đã làm
                </div>
                {lastSaved && (
                  <div className="text-xs text-muted-foreground mt-1">Lưu lúc {new Date(lastSaved).toLocaleTimeString()}</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Câu {currentQuestionIndex + 1}
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {currentQuestion.points} điểm
                    </Badge>
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-accent/10 text-accent border-accent/20"
                  >
                    {currentQuestion.type === "multiple_choice"
                      ? "🔘 Trắc nghiệm"
                      : "✏️ Tự luận"}
                  </Badge>
                </div>
                <CardDescription className="text-base font-medium">
                  {currentQuestion.question}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion.type === "multiple_choice" ? (
                  <div className="space-y-4">
                    <RadioGroup
                      value={
                        getAnswer(
                          currentQuestion.id,
                        )?.selectedOption?.toString() || ""
                      }
                      onValueChange={(value) =>
                        handleMultipleChoiceAnswer(
                          currentQuestion.id,
                          parseInt(value),
                        )
                      }
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors"
                        >
                          <RadioGroupItem
                            value={index.toString()}
                            id={`option-${index}`}
                          />
                          <Label
                            htmlFor={`option-${index}`}
                            className="text-base cursor-pointer flex-1"
                          >
                            {String.fromCharCode(65 + index)}. {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {getAnswer(currentQuestion.id) && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          ✅ Đã chọn đáp án:{" "}
                          <strong>
                            {getAnswer(currentQuestion.id)?.content}
                          </strong>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentQuestion.hint && (
                      <Alert className="border-yellow-200 bg-yellow-50">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          💡 <strong>Gợi ý:</strong> {currentQuestion.hint}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Tabs defaultValue="text" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="text"
                          className="flex items-center gap-2"
                        >
                          <Edit3 className="h-4 w-4" />
                          Nhập văn bản
                        </TabsTrigger>
                        <TabsTrigger
                          value="image"
                          className="flex items-center gap-2"
                        >
                          <FileImage className="h-4 w-4" />
                          Gửi ảnh viết tay
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="text" className="space-y-3">
                        <Textarea
                          placeholder="Nhập lời giải chi tiết của bạn..."
                          value={getAnswer(currentQuestion.id)?.content || ""}
                          onChange={(e) =>
                            handleEssayAnswer(
                              currentQuestion.id,
                              e.target.value,
                            )
                          }
                          className="min-h-[150px] border-primary/20 focus:border-primary resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          📝 Hãy viết chi tiết cách giải và giải thích từng bước
                        </p>
                      </TabsContent>

                      <TabsContent value="image" className="space-y-4">
                        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                          {uploadingImage ? (
                            <div className="space-y-2">
                              <div className="text-4xl">⏳</div>
                              <p className="text-sm text-muted-foreground">
                                Đang tải ảnh lên...
                              </p>
                            </div>
                          ) : getAnswer(currentQuestion.id)?.imageFile ? (
                            <div className="space-y-3">
                              <img
                                src={URL.createObjectURL(
                                  getAnswer(currentQuestion.id)!.imageFile!,
                                )}
                                alt="Uploaded answer"
                                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                              />
                              <div className="flex gap-2 justify-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const input =
                                      document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*";
                                    input.onchange = (e) => {
                                      const file = (
                                        e.target as HTMLInputElement
                                      ).files?.[0];
                                      if (file)
                                        handleFileUpload(
                                          currentQuestion.id,
                                          file,
                                        );
                                    };
                                    input.click();
                                  }}
                                  className="border-primary/20 text-primary hover:bg-primary hover:text-white"
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Đổi ảnh khác
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeImage(currentQuestion.id)
                                  }
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa ảnh
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="space-y-2 cursor-pointer"
                              onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "image/*";
                                input.onchange = (e) => {
                                  const file = (e.target as HTMLInputElement)
                                    .files?.[0];
                                  if (file)
                                    handleFileUpload(currentQuestion.id, file);
                                };
                                input.click();
                              }}
                            >
                              <div className="text-4xl">📁</div>
                              <p className="text-sm font-medium">
                                Nhấp để chọn ảnh viết tay
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Hỗ trợ JPG, PNG (tối đa 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="border-secondary/20 text-secondary hover:bg-secondary hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Câu trước
              </Button>

              <div className="flex gap-4">
                {currentQuestion.type === "multiple_choice" &&
                  getAnswer(currentQuestion.id) && (
                    <Button
                      onClick={nextQuestion}
                      disabled={
                        currentQuestionIndex ===
                        mockExercise.questions.length - 1
                      }
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white"
                    >
                      Câu tiếp theo
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}

                {currentQuestion.type === "essay" && (
                  <Button
                    onClick={() => {
                      if (
                        currentQuestion.type === "essay" &&
                        !getAnswer(currentQuestion.id)?.content &&
                        !getAnswer(currentQuestion.id)?.imageFile
                      ) {
                        alert("Vui lòng nhập câu trả lời hoặc tải ảnh lên!");
                        return;
                      }
                      nextQuestion();
                    }}
                    disabled={
                      currentQuestionIndex === mockExercise.questions.length - 1
                    }
                    className="bg-gradient-to-r from-accent to-primary hover:from-accent/80 hover:to-primary/80 text-white"
                  >
                    Nộp tự luận
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>

              <Button
                onClick={nextQuestion}
                disabled={
                  currentQuestionIndex === mockExercise.questions.length - 1
                }
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent hover:text-white"
              >
                Câu tiếp theo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Submit All Button */}
            <div className="flex justify-center gap-4 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => navigate(`/lesson/${lessonId}`)}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3"
              >
                Quay lại
              </Button>
              <Button
                onClick={handleSubmitAll}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-12 py-3 text-lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Nộp toàn bộ bài
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
