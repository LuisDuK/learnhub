import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Target,
  Edit,
  CheckCircle,
  Circle,
  PlayCircle,
  Calculator,
  BookOpen,
  Globe,
  Sparkles,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Mock study plan data focusing on Math, Literature, English
const studyGoals = [
  { id: "midterm", label: "🎯 Ôn tập thi giữa kỳ", duration: "2 tuần" },
  { id: "grammar", label: "📚 Ôn tập ngữ pháp", duration: "3 tuần" },
  { id: "exam", label: "📝 Luyện thi cuối kỳ", duration: "4 tuần" },
  { id: "vocabulary", label: "📖 Mở rộng từ vựng", duration: "6 tuần" },
];

const weeklyPlan = [
  {
    week: "Tuần 1",
    startDate: "20/01 - 26/01",
    lessons: [
      {
        id: 1,
        subject: "math",
        title: "🔢 Phân số và số thập phân",
        duration: "45 phút",
        status: "completed",
        day: "Thứ 2",
        time: "14:00",
      },
      {
        id: 2,
        subject: "literature",
        title: "📜 Bài thơ Quê hương",
        duration: "60 phút",
        status: "completed",
        day: "Thứ 3",
        time: "15:00",
      },
      {
        id: 3,
        subject: "english",
        title: "🌍 Present Simple Tense",
        duration: "45 phút",
        status: "in-progress",
        day: "Thứ 4",
        time: "16:00",
        videoUrl: "https://www.youtube.com/embed/5MgBikgcWnY",
        pdfUrl: "https://cdn.builder.io/o/assets%2F3178c0bbf5d64e32906afe2d8af514ea%2F4d4c87b7bec5493eac83c432e8a64018?alt=media&token=d3b1f7c1-2128-4c68-9b5e-ac04d1cfbf77&apiKey=3178c0bbf5d64e32906afe2d8af514ea",
      },
      {
        id: 4,
        subject: "math",
        title: "➕ Phép tính với phân số",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "14:00",
        videoUrl: "https://www.youtube.com/embed/5MgBikgcWnY",
      },
    ],
  },
  {
    week: "Tuần 2",
    startDate: "27/01 - 02/02",
    lessons: [
      {
        id: 5,
        subject: "literature",
        title: "✍️ Viết văn tả người",
        duration: "90 phút",
        status: "not-started",
        day: "Thứ 2",
        time: "15:00",
      },
      {
        id: 6,
        subject: "english",
        title: "📝 Writing - My Family",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 4",
        time: "16:00",
        pdfUrl: "https://cdn.builder.io/o/assets%2F3178c0bbf5d64e32906afe2d8af514ea%2F4d4c87b7bec5493eac83c432e8a64018?alt=media&token=d3b1f7c1-2128-4c68-9b5e-ac04d1cfbf77&apiKey=3178c0bbf5d64e32906afe2d8af514ea",
      },
      {
        id: 7,
        subject: "math",
        title: "📊 Biểu đồ và thống kê",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "14:00",
      },
    ],
  },
  {
    week: "Tuần 3",
    startDate: "03/02 - 09/02",
    lessons: [
      {
        id: 8,
        subject: "english",
        title: "🗣️ Speaking Practice",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 2",
        time: "16:00",
      },
      {
        id: 9,
        subject: "math",
        title: "🔺 Hình học cơ bản",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 4",
        time: "14:00",
      },
      {
        id: 10,
        subject: "literature",
        title: "📖 Đọc hiểu văn bản",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "15:00",
      },
    ],
  },
];

const subjectConfig = {
  math: {
    name: "Toán",
    icon: Calculator,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  literature: {
    name: "Văn",
    icon: BookOpen,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  english: {
    name: "Anh",
    icon: Globe,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
};

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
    label: "Ho��n thành",
  },
  "in-progress": {
    icon: PlayCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    label: "Đang học",
  },
  "not-started": {
    icon: Circle,
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    label: "Chưa bắt đầu",
  },
};

export default function StudyPlan() {
  const [selectedGoal, setSelectedGoal] = useState("midterm");
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPracticeDialog, setShowPracticeDialog] = useState(false);
  const [goalData, setGoalData] = useState({
    name: "",
    duration: "",
    startDate: "",
    priority: "medium",
  });
  const [lessonList, setLessonList] = useState(
    weeklyPlan.flatMap((week) =>
      week.lessons.map((lesson) => ({ ...lesson, week: week.week })),
    ),
  );

  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfSrc, setPdfSrc] = useState("");

  const [practiceForm, setPracticeForm] = useState({
    subject: "math",
    topic: "",
    numQuestions: 5,
    difficulty: "medium",
    goalId: "midterm",
  });
  const [practiceQuestions, setPracticeQuestions] = useState<
    { id: number; text: string; difficulty: string }[]
  >([]);

  const openVideo = (url?: string) => {
    if (!url) return;
    setVideoSrc(url);
    setShowVideoDialog(true);
  };

  const openPdf = (url?: string) => {
    if (!url) return;
    setPdfSrc(url);
    setShowPdfDialog(true);
  };

  const generateStudyPlan = (goalId: string) => {
    // Simple generation rules based on goal
    const map: Record<string, string[]> = {
      midterm: ["math", "literature", "english"],
      grammar: ["literature", "english"],
      exam: ["math", "literature", "english"],
      vocabulary: ["english"],
    };
    const subjects = map[goalId] || ["math", "literature", "english"];
    const items = weeklyPlan
      .flatMap((week) => week.lessons.map((l) => ({ ...l, week: week.week })))
      .filter((l) => subjects.includes(l.subject))
      .map((l) => ({ ...l, status: l.status === "completed" ? "completed" : "not-started" }));
    setLessonList(items);
  };

  // Practice test generation (mock)
  const generatePractice = () => {
    const { subject, topic, numQuestions, difficulty } = practiceForm;
    const questions = Array.from({ length: Number(numQuestions) }).map((_, i) => ({
      id: Date.now() + i,
      text: `${subjectConfig[subject as keyof typeof subjectConfig].name} - ${topic || "Bài ôn"} - Câu hỏi ${i + 1}`,
      difficulty,
    }));
    setPracticeQuestions(questions);
  };

  const addQuestion = () => {
    setPracticeQuestions([
      ...practiceQuestions,
      { id: Date.now(), text: "Câu hỏi mới", difficulty: "medium" },
    ]);
  };

  const updateQuestion = (id: number, data: Partial<{ text: string; difficulty: string }>) => {
    setPracticeQuestions(
      practiceQuestions.map((q) => (q.id === id ? { ...q, ...data } : q)),
    );
  };

  const deleteQuestion = (id: number) => {
    setPracticeQuestions(practiceQuestions.filter((q) => q.id !== id));
  };

  const moveQuestion = (index: number, direction: "up" | "down") => {
    const newList = [...practiceQuestions];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newList.length) return;
    [newList[index], newList[swapIndex]] = [newList[swapIndex], newList[index]];
    setPracticeQuestions(newList);
  };

  // Check if first time visiting
  useEffect(() => {
    const hasSetGoal = localStorage.getItem("studyGoalSet");
    if (!hasSetGoal) {
      setShowGoalDialog(true);
    }
  }, []);

  const handleSaveGoal = () => {
    localStorage.setItem("studyGoalSet", "true");
    localStorage.setItem("studyGoal", JSON.stringify(goalData));
    setShowGoalDialog(false);
  };

  const handleEditRoadmap = () => {
    setShowEditDialog(true);
  };

  const handleSaveRoadmap = () => {
    setShowEditDialog(false);
    // local state already updated
  };

  const addNewLesson = () => {
    const newLesson = {
      id: Date.now(),
      subject: "math",
      title: "Bài học mới",
      duration: "45 phút",
      status: "not-started",
      day: "Thứ 2",
      time: "14:00",
      week: "Tuần 1",
    };
    setLessonList([...lessonList, newLesson]);
  };

  const deleteLesson = (id: number) => {
    setLessonList(lessonList.filter((lesson) => lesson.id !== id));
  };

  const updateLessonStatus = (id: number, status: string) => {
    setLessonList(
      lessonList.map((lesson) =>
        lesson.id === id ? { ...lesson, status } : lesson,
      ),
    );
  };

  const updateLessonField = (id: number, field: string, value: any) => {
    setLessonList(
      lessonList.map((lesson) => (lesson.id === id ? { ...lesson, [field]: value } : lesson)),
    );
  };

  // Calculate progress from lessonList state
  const totalLessons = lessonList.length;
  const completedLessons = lessonList.filter((l) => l.status === "completed").length;
  const progressPercentage = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
              Lộ trình học tập
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </h1>
            <p className="text-gray-600 text-lg mt-1">Kế hoạch học tập được cá nhân hóa cho bé</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                localStorage.removeItem("studyGoalSet");
                localStorage.removeItem("studyGoal");
                setShowGoalDialog(true);
              }}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50 font-bold rounded-xl"
            >
              🔄 Reset lộ trình học
            </Button>
            <Button
              onClick={handleEditRoadmap}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold rounded-xl shadow-lg"
            >
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa lộ trình
            </Button>
            <Button
              onClick={() => setShowPracticeDialog(true)}
              className="bg-gradient-to-r from-secondary to-accent/70 hover:from-secondary/80 hover:to-accent/80 text-white font-bold rounded-xl shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài ôn cá nhân hóa
            </Button>
          </div>
        </div>

        {/* Goal Selection & Progress */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Mục tiêu học tập
              </CardTitle>
              <CardDescription>Chọn mục tiêu để xem lộ trình phù hợp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <Select value={selectedGoal} onValueChange={(v) => { setSelectedGoal(v); generateStudyPlan(v); }}>
                  <SelectTrigger className="w-full border-primary/20 rounded-xl">
                    <SelectValue placeholder="Chọn mục tiêu học tập" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyGoals.map((goal) => (
                      <SelectItem key={goal.id} value={goal.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{goal.label}</span>
                          <Badge variant="outline" className="ml-2">
                            {goal.duration}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => generateStudyPlan(selectedGoal)} size="sm" className="ml-2">Tạo lộ trình tự động</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                📊 Tiến độ tổng thể
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
                <p className="text-sm text-muted-foreground">Hoàn thành</p>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-sm text-muted-foreground text-center">
                {completedLessons}/{totalLessons} bài học đã hoàn thành
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              📝 Lịch trình học tập
            </CardTitle>
            <CardDescription>Timeline chi tiết các bài học theo tuần</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {[...new Set(lessonList.map((l) => l.week))].map((w, weekIndex) => {
              const weekObj = { week: w, lessons: lessonList.filter((l) => l.week === w) };
              const wp = weeklyPlan.find((x) => x.week === w);
              return (
                <div key={weekObj.week} className="relative">
                  {/* Week Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg">
                      {weekIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{weekObj.week}</h3>
                      <p className="text-sm text-muted-foreground">{wp?.startDate || ""}</p>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="ml-6 border-l-2 border-primary/20 pl-6 space-y-4">
                    {weekObj.lessons.map((lesson, lessonIndex) => {
                      const subject =
                        subjectConfig[
                          lesson.subject as keyof typeof subjectConfig
                        ];
                      const status =
                        statusConfig[lesson.status as keyof typeof statusConfig];
                      const SubjectIcon = subject.icon;
                      const StatusIcon = status.icon;

                      return (
                        <div
                          key={lesson.id}
                          className="relative flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-9 top-6 flex h-4 w-4 items-center justify-center">
                            <div
                              className={`h-3 w-3 rounded-full ${subject.color}`}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg ${subject.bgColor}`}
                                >
                                  <SubjectIcon
                                    className={`h-5 w-5 ${subject.textColor}`}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">{lesson.title}</h4>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <span>📚 {subject.name}</span>
                                    <span>📅 {lesson.day}</span>
                                    <span>⏰ {lesson.time}</span>
                                    <span>⏱️ {lesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`${status.bgColor} border-0`}
                                >
                                  <StatusIcon
                                    className={`h-3 w-3 mr-1 ${status.color}`}
                                  />
                                  {status.label}
                                </Badge>
                              </div>
                            </div>

                            {lesson.status === "in-progress" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-primary to-accent text-white rounded-lg"
                                onClick={() => openVideo(lesson.videoUrl)}
                              >
                                <PlayCircle className="h-4 w-4 mr-1" />
                                Tiếp tục học
                              </Button>
                            )}

                            {lesson.status === "not-started" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary text-primary hover:bg-primary hover:text-white rounded-lg"
                                onClick={() => openVideo(lesson.videoUrl)}
                              >
                                <Circle className="h-4 w-4 mr-1" />
                                Bắt đầu học
                              </Button>
                            )}

                            {/* PDF assignment button */}
                            {lesson.pdfUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 underline text-sm"
                                onClick={() => openPdf(lesson.pdfUrl)}
                              >
                                📄 Làm bài tập (PDF)
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-2xl max-w-full">
          <div className="aspect-video w-full">
            {videoSrc ? (
              <iframe
                src={videoSrc}
                title="Video bài học"
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <div className="p-8 text-center">Video không khả dụng</div>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowVideoDialog(false)} variant="outline">Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Dialog */}
      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="sm:max-w-4xl max-w-full">
          <div className="w-full h-[80vh]">
            {pdfSrc ? (
              <iframe src={pdfSrc} className="w-full h-full" />
            ) : (
              <div className="p-8 text-center">PDF không khả dụng</div>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowPdfDialog(false)} variant="outline">Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup nhập mục tiêu học tập */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">🎯 Thêm mục tiêu học tập</DialogTitle>
            <DialogDescription>Nhập thông tin mục tiêu học tập để tạo lộ trình phù hợp</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Tên mục tiêu</Label>
              <Input
                id="goalName"
                placeholder="Ví dụ: Ôn tập thi giữa kỳ"
                value={goalData.name}
                onChange={(e) =>
                  setGoalData({ ...goalData, name: e.target.value })
                }
                className="border-primary/20 focus:border-primary rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Khoảng thời gian</Label>
              <Select
                value={goalData.duration}
                onValueChange={(value) =>
                  setGoalData({ ...goalData, duration: value })
                }
              >
                <SelectTrigger className="border-primary/20 focus:border-primary rounded-xl">
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-week">1 tuần</SelectItem>
                  <SelectItem value="2-weeks">2 tuần</SelectItem>
                  <SelectItem value="3-weeks">3 tuần</SelectItem>
                  <SelectItem value="1-month">1 tháng</SelectItem>
                  <SelectItem value="2-months">2 tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Ngày bắt đầu</Label>
              <Input
                id="startDate"
                type="date"
                value={goalData.startDate}
                onChange={(e) =>
                  setGoalData({ ...goalData, startDate: e.target.value })
                }
                className="border-primary/20 focus:border-primary rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Độ ưu tiên</Label>
              <Select
                value={goalData.priority}
                onValueChange={(value) =>
                  setGoalData({ ...goalData, priority: value })
                }
              >
                <SelectTrigger className="border-primary/20 focus:border-primary rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 Cao</SelectItem>
                  <SelectItem value="medium">🟠 Trung bình</SelectItem>
                  <SelectItem value="low">🟢 Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowGoalDialog(false)}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSaveGoal}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl"
            >
              <Save className="h-4 w-4 mr-2" />
              Lưu mục tiêu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup chỉnh sửa lộ trình */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">✏️ Chỉnh sửa lộ trình</DialogTitle>
            <DialogDescription>Quản lý danh sách bài học trong lộ trình của bạn</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Danh sách bài học</h3>
              <Button
                onClick={addNewLesson}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm bài học
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lessonList.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">{lesson.week}</span>
                      <Input
                        value={lesson.title}
                        onChange={(e) => updateLessonField(lesson.id, "title", e.target.value)}
                        className="bg-transparent border-0 p-0 text-base font-semibold"
                      />
                      <span className="text-sm text-gray-500">({lesson.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value={lesson.day}
                        onChange={(e) => updateLessonField(lesson.id, "day", e.target.value)}
                        className="w-28 text-sm"
                      />
                      <Input
                        value={lesson.time}
                        onChange={(e) => updateLessonField(lesson.id, "time", e.target.value)}
                        className="w-20 text-sm"
                        type="time"
                      />
                      <Select
                        value={lesson.subject}
                        onValueChange={(v) => updateLessonField(lesson.id, "subject", v)}
                        className="w-32"
                      >
                        <SelectTrigger className="w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(subjectConfig).map((k) => (
                            <SelectItem key={k} value={k}>{(subjectConfig as any)[k].name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={lesson.status}
                      onValueChange={(value) => updateLessonStatus(lesson.id, value)}
                    >
                      <SelectTrigger className="w-40 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Chưa học</SelectItem>
                        <SelectItem value="in-progress">Đang học</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button onClick={() => deleteLesson(lesson.id)} size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setShowEditDialog(false)} variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl">
              Đóng
            </Button>
            <Button onClick={handleSaveRoadmap} className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl">
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup tạo bài ôn cá nhân hóa */}
      <Dialog open={showPracticeDialog} onOpenChange={setShowPracticeDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">📝 Tạo bài ôn cá nhân hóa</DialogTitle>
            <DialogDescription>Tạo nhanh một bài ôn theo yêu cầu của học sinh</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Chọn môn</Label>
                <Select value={practiceForm.subject} onValueChange={(v) => setPracticeForm({ ...practiceForm, subject: v })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(subjectConfig).map((k) => (
                      <SelectItem key={k} value={k}>{(subjectConfig as any)[k].name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Chủ đề / Kỹ năng</Label>
                <Input value={practiceForm.topic} onChange={(e) => setPracticeForm({ ...practiceForm, topic: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Số câu hỏi</Label>
                <Input type="number" value={String(practiceForm.numQuestions)} onChange={(e) => setPracticeForm({ ...practiceForm, numQuestions: Number(e.target.value) })} />
              </div>

              <div className="space-y-2">
                <Label>Độ khó</Label>
                <Select value={practiceForm.difficulty} onValueChange={(v) => setPracticeForm({ ...practiceForm, difficulty: v })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Dễ</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="hard">Khó</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Liên kết với mục tiêu</Label>
                <Select value={practiceForm.goalId} onValueChange={(v) => setPracticeForm({ ...practiceForm, goalId: v })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {studyGoals.map((g) => (
                      <SelectItem key={g.id} value={g.id}>{g.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generatePractice} className="bg-gradient-to-r from-primary to-accent text-white">Tạo bài ôn</Button>
              <Button variant="outline" onClick={() => { setPracticeQuestions([]); }}>Xóa kết quả</Button>
            </div>

            {/* Questions preview and edit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Danh sách câu hỏi</h4>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={addQuestion} className="bg-green-600 text-white">Thêm câu hỏi</Button>
                </div>
              </div>

              <div className="space-y-2">
                {practiceQuestions.length === 0 && <div className="text-sm text-muted-foreground">Chưa có câu hỏi. Nhấn "Tạo bài ôn" để sinh câu hỏi mẫu.</div>}

                {practiceQuestions.map((q, i) => (
                  <div key={q.id} className="p-3 border border-gray-200 rounded-lg bg-white flex items-start gap-3">
                    <div className="flex-1">
                      <Input value={q.text} onChange={(e) => updateQuestion(q.id, { text: e.target.value })} />
                      <div className="flex items-center gap-2 mt-2">
                        <Select value={q.difficulty} onValueChange={(v) => updateQuestion(q.id, { difficulty: v })}>
                          <SelectTrigger className="w-36 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Dễ</SelectItem>
                            <SelectItem value="medium">Trung bình</SelectItem>
                            <SelectItem value="hard">Khó</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => moveQuestion(i, "up") }><ArrowUp className="h-4 w-4"/></Button>
                      <Button size="icon" variant="ghost" onClick={() => moveQuestion(i, "down") }><ArrowDown className="h-4 w-4"/></Button>
                      <Button size="sm" variant="outline" onClick={() => deleteQuestion(q.id)} className="text-red-600">Xóa</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setShowPracticeDialog(false)} variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl">Hủy</Button>
            <Button onClick={() => { /* mock save */ setShowPracticeDialog(false); }} className="flex-1 bg-gradient-to-r from-primary to-accent text-white rounded-xl">Lưu bài ôn</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
