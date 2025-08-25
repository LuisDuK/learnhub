import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  PenTool,
  Award,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Mock lesson data
const mockLessons = {
  1: {
    id: 1,
    title: "🔢 Phép cộng v�� phép trừ trong phạm vi 100",
    subject: "Toán học",
    grade: "Lớp 2",
    duration: "25 phút",
    difficulty: "Dễ",
    instructor: "Thầy Minh vui vẻ",
    description:
      "Bài học này sẽ giúp các em làm quen với phép cộng và phép trừ trong phạm vi 100 thông qua các ví dụ thú vị và dễ hiểu.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // placeholder
    objectives: [
      "Hiểu được khái niệm phép cộng và phép trừ",
      "Thực hiện được phép tính trong phạm vi 100",
      "Áp dụng vào bài toán thực tế",
    ],
    content: [
      {
        type: "video",
        title: "Video bài giảng chính",
        duration: "15 phút",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        type: "example",
        title: "Ví dụ minh họa",
        content:
          "45 + 23 = ? \nTa có thể tính như sau: 45 + 20 + 3 = 65 + 3 = 68",
      },
      {
        type: "practice",
        title: "Luyện tập cùng thầy",
        duration: "5 phút",
        exercises: ["25 + 34 = ?", "67 - 28 = ?", "56 + 29 = ?"],
      },
    ],
    hasExercise: true,
    hasQuiz: true,
  },
};

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(45);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = mockLessons[parseInt(id || "1") as keyof typeof mockLessons];

  if (!lesson) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy bài học</h2>
            <Button onClick={() => navigate("/courses")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại khóa học
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleCompleteLesson = () => {
    setIsCompleted(true);
    setCurrentProgress(100);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/courses")}
              className="border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {lesson.subject}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-accent/10 text-accent border-accent/20"
                >
                  {lesson.grade}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-secondary/20"
                >
                  {lesson.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <span className="font-bold">Đã hoàn thành! 🎉</span>
            </div>
          )}
        </div>

        {/* Progress */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến độ bài học</span>
              <span className="text-sm font-bold text-primary">
                {currentProgress}%
              </span>
            </div>
            <Progress value={currentProgress} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="border-primary/20 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-black relative group">
                  {/* Placeholder video player */}
                  <iframe
                    src={lesson.content[0].url}
                    title={lesson.content[0].title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>

                  {/* Custom controls overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4 text-white">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <SkipBack className="h-4 w-4 cursor-pointer hover:text-primary" />
                      <SkipForward className="h-4 w-4 cursor-pointer hover:text-primary" />
                      <Volume2 className="h-4 w-4 cursor-pointer hover:text-primary" />
                      <div className="flex-1"></div>
                      <Maximize className="h-4 w-4 cursor-pointer hover:text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {lesson.content[0].title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.content[0].duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {lesson.instructor}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Card className="border-accent/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  📚 Nội dung bài học
                </CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Learning Objectives */}
                <div>
                  <h4 className="font-bold mb-3 text-primary">
                    🎯 Mục tiêu học tập:
                  </h4>
                  <ul className="space-y-2">
                    {lesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Examples */}
                {lesson.content.find((c) => c.type === "example") && (
                  <div>
                    <h4 className="font-bold mb-3 text-accent">
                      💡 Ví dụ minh họa:
                    </h4>
                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {
                          lesson.content.find((c) => c.type === "example")
                            ?.content
                        }
                      </pre>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Practice Exercises */}
                {lesson.content.find((c) => c.type === "practice") && (
                  <div>
                    <h4 className="font-bold mb-3 text-secondary">
                      🏃‍♂️ Luyện tập:
                    </h4>
                    <div className="grid gap-3">
                      {lesson.content
                        .find((c) => c.type === "practice")
                        ?.exercises?.map((exercise, index) => (
                          <div
                            key={index}
                            className="bg-secondary/10 rounded-lg p-3 border border-secondary/20"
                          >
                            <span className="font-medium text-secondary">
                              Bài {index + 1}:{" "}
                            </span>
                            <span>{exercise}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleCompleteLesson}
                disabled={isCompleted}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold py-3 rounded-xl shadow-lg"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Đã hoàn thành! 🎉
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Hoàn thành bài học
                  </>
                )}
              </Button>

              {lesson.hasExercise && (
                <Button
                  onClick={() => navigate(`/lesson/${id}/exercise`)}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 font-bold py-3 px-6 rounded-xl"
                >
                  <PenTool className="h-5 w-5 mr-2" />
                  Làm bài tập
                </Button>
              )}

              {lesson.hasQuiz && (
                <Button
                  onClick={() => navigate(`/lesson/${id}/quiz`)}
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 font-bold py-3 px-6 rounded-xl"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Kiểm tra
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">📋 Thông tin bài học</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Thời lượng:
                  </span>
                  <Badge variant="outline">{lesson.duration}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Độ khó:</span>
                  <Badge variant="outline">{lesson.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Giảng viên:
                  </span>
                  <span className="text-sm font-medium">
                    {lesson.instructor}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-accent" />
                  🚀 Bước tiếp theo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Sau khi hoàn thành bài học, bé có thể:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-accent" />
                    Làm bài tập thực hành
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-secondary" />
                    Kiểm tra kiến thức
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Chuyển sang bài học tiếp theo
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Encouragement */}
            <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="font-bold text-primary mb-2">Bé học rất tốt!</h3>
                <p className="text-sm text-muted-foreground">
                  Hãy tiếp tục cố gắng để hoàn thành tất cả bài học nhé! 💪
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
