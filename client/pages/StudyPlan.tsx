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
      },
      {
        id: 4,
        subject: "math",
        title: "➕ Ph��p tính với phân số",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "14:00",
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
    label: "Hoàn thành",
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

  // Calculate progress
  const totalLessons = weeklyPlan.reduce(
    (acc, week) => acc + week.lessons.length,
    0,
  );
  const completedLessons = weeklyPlan.reduce(
    (acc, week) =>
      acc +
      week.lessons.filter((lesson) => lesson.status === "completed").length,
    0,
  );
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100,
  );

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
              📅 Lộ trình học tập
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              Kế hoạch học tập được cá nhân hóa cho bé
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold rounded-xl shadow-lg">
            <Edit className="h-4 w-4 mr-2" />
            ✏️ Chỉnh sửa lộ trình
          </Button>
        </div>

        {/* Goal Selection & Progress */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                🎯 Mục tiêu học tập
              </CardTitle>
              <CardDescription>
                Chọn mục tiêu để xem lộ trình phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
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
                <div className="text-3xl font-bold text-primary">
                  {progressPercentage}%
                </div>
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
            <CardDescription>
              Timeline chi tiết các bài học theo tuần
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {weeklyPlan.map((week, weekIndex) => (
              <div key={week.week} className="relative">
                {/* Week Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg">
                    {weekIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {week.week}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {week.startDate}
                    </p>
                  </div>
                </div>

                {/* Lessons */}
                <div className="ml-6 border-l-2 border-primary/20 pl-6 space-y-4">
                  {week.lessons.map((lesson, lessonIndex) => {
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
                                <h4 className="font-semibold text-lg">
                                  {lesson.title}
                                </h4>
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
                            >
                              <Circle className="h-4 w-4 mr-1" />
                              Bắt đầu học
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
