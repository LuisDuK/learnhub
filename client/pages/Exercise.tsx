import { useState, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Upload,
  Camera,
  Type,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  FileImage,
  Trash2,
  RotateCcw,
  Star,
} from "lucide-react";

// Mock exercise data
const mockExercises = {
  1: {
    id: 1,
    lessonId: 1,
    title: "🔢 Bài tập phép cộng và trừ",
    description: "Hoàn thành các bài tập sau để củng cố kiến thức về phép cộng và phép trừ trong phạm vi 100.",
    timeLimit: 30, // minutes
    totalPoints: 100,
    questions: [
      {
        id: 1,
        question: "Tính kết quả của phép tính: 45 + 23 = ?",
        type: "text",
        points: 20,
        hint: "Có thể tính từng hàng đơn vị và hàng chục một",
      },
      {
        id: 2,
        question: "Tính kết quả của phép tính: 78 - 29 = ?",
        type: "text", 
        points: 20,
        hint: "Nhớ vay khi trừ hàng đơn vị",
      },
      {
        id: 3,
        question: "Giải bài toán: Lan có 56 viên kẹo, Lan cho bạn 18 viên. Hỏi Lan còn lại bao nhiêu viên kẹo?",
        type: "text",
        points: 30,
        hint: "Đây là bài toán phép trừ",
      },
      {
        id: 4,
        question: "Vẽ hình minh họa cho bài toán trên (có thể chụp ảnh hoặc vẽ trên máy)",
        type: "image",
        points: 30,
        hint: "Có thể vẽ các hình tròn nhỏ để biểu diễn viên kẹo",
      },
    ]
  }
};

interface Answer {
  questionId: number;
  type: "text" | "image";
  content: string;
  imageFile?: File;
}

export default function Exercise() {
  const { lessonId, id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<{[key: number]: boolean}>({});

  const exercise = mockExercises[parseInt(id || "1") as keyof typeof mockExercises];

  if (!exercise) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy bài tập</h2>
            <Button onClick={() => navigate(`/lesson/${lessonId}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại bài học
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Timer effect would go here
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnswer = (questionId: number): Answer | undefined => {
    return answers.find(a => a.questionId === questionId);
  };

  const updateAnswer = (questionId: number, content: string, type: "text" | "image", imageFile?: File) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      const newAnswer: Answer = { questionId, type, content, imageFile };
      
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      } else {
        return [...prev, newAnswer];
      }
    });
  };

  const handleFileUpload = async (questionId: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chỉ chọn file ảnh!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Kích thước file quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.');
      return;
    }

    setUploadingImages(prev => ({ ...prev, [questionId]: true }));

    // Simulate upload delay
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      updateAnswer(questionId, imageUrl, "image", file);
      setUploadingImages(prev => ({ ...prev, [questionId]: false }));
    }, 1000);
  };

  const removeImage = (questionId: number) => {
    const answer = getAnswer(questionId);
    if (answer?.content) {
      URL.revokeObjectURL(answer.content);
    }
    setAnswers(prev => prev.filter(a => a.questionId !== questionId));
  };

  const handleSubmit = () => {
    if (answers.length === 0) {
      alert('Vui lòng trả lời ít nhất một câu hỏi!');
      return;
    }

    setIsSubmitted(true);
    // Here you would submit to backend
    console.log('Submitting answers:', answers);
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentQuestion(1);
    setIsSubmitted(false);
  };

  const progress = (answers.length / exercise.questions.length) * 100;

  if (isSubmitted) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-primary/5">
          <Card className="w-full max-w-2xl text-center border-primary/20 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-8xl mb-6">🎉</div>
              <h1 className="text-3xl font-bold text-primary mb-4">
                Chúc mừng bé!
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Bé đã hoàn thành bài tập thành công! Thầy cô sẽ chấm bài và gửi kết quả sớm nhất có thể.
              </p>
              <div className="flex flex-col gap-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-4 text-primary">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-bold">Đã nộp {answers.length}/{exercise.questions.length} câu</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate(`/lesson/${lessonId}`)}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                  >
                    Quay lại bài học
                  </Button>
                  <Button 
                    onClick={() => navigate(`/lesson/${lessonId}/quiz`)}
                    variant="outline"
                    className="flex-1 border-accent text-accent hover:bg-accent hover:text-white"
                  >
                    Làm bài kiểm tra
                  </Button>
                </div>
              </div>
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
              Quay lại bài học
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {exercise.title}
              </h1>
              <p className="text-muted-foreground mt-1">{exercise.description}</p>
            </div>
          </div>

          {/* Timer */}
          <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-accent">
                <Clock className="h-5 w-5" />
                <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Thời gian còn lại</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến độ làm bài</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Đã trả lời {answers.length}/{exercise.questions.length} câu hỏi
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Question List */}
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📝 Danh sách câu hỏi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {exercise.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={currentQuestion === q.id ? "default" : "outline"}
                  className={`w-full justify-start text-left ${
                    getAnswer(q.id) ? "border-green-500 bg-green-50 hover:bg-green-100" : ""
                  }`}
                  onClick={() => setCurrentQuestion(q.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {q.type === "image" ? <FileImage className="h-4 w-4" /> : <Type className="h-4 w-4" />}
                        <span className="text-xs">{q.points} điểm</span>
                      </div>
                    </div>
                    {getAnswer(q.id) && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {exercise.questions
              .filter(q => q.id === currentQuestion)
              .map(question => (
                <Card key={question.id} className="border-primary/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        Câu {exercise.questions.findIndex(q => q.id === question.id) + 1}
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {question.points} điểm
                        </Badge>
                      </CardTitle>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        {question.type === "image" ? "📷 Ảnh" : "✏️ Văn bản"}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {question.question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {question.hint && (
                      <Alert className="border-yellow-200 bg-yellow-50">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          💡 <strong>Gợi ý:</strong> {question.hint}
                        </AlertDescription>
                      </Alert>
                    )}

                    {question.type === "text" ? (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Nhập câu trả lời của bé ở đây..."
                          value={getAnswer(question.id)?.content || ""}
                          onChange={(e) => updateAnswer(question.id, e.target.value, "text")}
                          className="min-h-[120px] border-primary/20 focus:border-primary resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          💡 Bé có thể viết chi tiết cách giải và kết quả
                        </p>
                      </div>
                    ) : (
                      <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="upload" className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Tải ảnh lên
                          </TabsTrigger>
                          <TabsTrigger value="camera" className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            Chụp ảnh
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upload" className="space-y-4">
                          <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(question.id, file);
                              }}
                              className="hidden"
                            />
                            
                            {uploadingImages[question.id] ? (
                              <div className="space-y-2">
                                <div className="text-4xl">⏳</div>
                                <p className="text-sm text-muted-foreground">Đang tải ảnh lên...</p>
                              </div>
                            ) : getAnswer(question.id) ? (
                              <div className="space-y-3">
                                <img
                                  src={getAnswer(question.id)?.content}
                                  alt="Uploaded answer"
                                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                                />
                                <div className="flex gap-2 justify-center">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-primary/20 text-primary hover:bg-primary hover:text-white"
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Đổi ảnh khác
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeImage(question.id)}
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
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <div className="text-4xl">📁</div>
                                <p className="text-sm font-medium">Nhấp để chọn ảnh</p>
                                <p className="text-xs text-muted-foreground">
                                  Hỗ trợ JPG, PNG, GIF (tối đa 5MB)
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="camera" className="space-y-4">
                          <div className="border-2 border-dashed border-accent/20 rounded-lg p-8 text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <p className="text-sm font-medium mb-2">Chụp ảnh trực tiếp</p>
                            <p className="text-xs text-muted-foreground mb-4">
                              Tính năng này sẽ được cập nhật trong phiên bản tiếp theo
                            </p>
                            <Button variant="outline" disabled className="border-accent/20">
                              <Camera className="h-4 w-4 mr-2" />
                              Mở camera
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </CardContent>
                </Card>
              ))}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = exercise.questions.findIndex(q => q.id === currentQuestion);
                  if (currentIndex > 0) {
                    setCurrentQuestion(exercise.questions[currentIndex - 1].id);
                  }
                }}
                disabled={exercise.questions.findIndex(q => q.id === currentQuestion) === 0}
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
                  <Send className="h-4 w-4 mr-2" />
                  Nộp bài
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = exercise.questions.findIndex(q => q.id === currentQuestion);
                  if (currentIndex < exercise.questions.length - 1) {
                    setCurrentQuestion(exercise.questions[currentIndex + 1].id);
                  }
                }}
                disabled={exercise.questions.findIndex(q => q.id === currentQuestion) === exercise.questions.length - 1}
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
