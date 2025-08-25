import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CalendarDays,
  Clock,
  BookOpen,
  TrendingUp,
  Play,
  Calendar,
  Star,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Mock data for the progress chart
const progressData = [
  { month: "T1", completed: 8, total: 12 },
  { month: "T2", completed: 15, total: 18 },
  { month: "T3", completed: 22, total: 25 },
  { month: "T4", completed: 18, total: 20 },
  { month: "T5", completed: 25, total: 30 },
  { month: "T6", completed: 28, total: 32 },
];

const chartConfig = {
  completed: {
    label: "Bài đã hoàn thành",
    color: "hsl(var(--primary))",
  },
  total: {
    label: "Tổng số bài",
    color: "hsl(var(--muted))",
  },
};

// Mock upcoming schedule data - focus on Math, Literature, English for grades 1-9
const upcomingLessons = [
  {
    id: 1,
    title: "🔢 Phép nhân trong phạm vi 100",
    course: "Toán học lớp 3",
    time: "09:00",
    date: "Hôm nay",
    duration: "45 phút",
    type: "live",
    emoji: "🔢",
  },
  {
    id: 2,
    title: "📚 Đọc hiểu: Tóm tắt bài đọc",
    course: "Ngữ văn lớp 4",
    time: "14:30",
    date: "Hôm nay",
    duration: "60 phút",
    type: "recorded",
    emoji: "📚",
  },
  {
    id: 3,
    title: "🌍 Học từ vựng: Family",
    course: "Tiếng Anh lớp 5",
    time: "10:00",
    date: "Mai",
    duration: "30 phút",
    type: "live",
    emoji: "🌍",
  },
  {
    id: 4,
    title: "✍️ Viết văn miêu tả",
    course: "Ngữ văn lớp 5",
    time: "16:00",
    date: "Thứ 4",
    duration: "50 phút",
    type: "recorded",
    emoji: "✍️",
  },
];

// Mock courses data - focus on Math, Literature, English for grades 1-9
const currentCourses = [
  {
    id: 1,
    title: "🔢 Toán học lớp 3",
    instructor: "Thầy Minh vui vẻ",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    thumbnail: "/placeholder.svg",
    category: "Toán",
    level: "Dễ",
    emoji: "🔢",
  },
  {
    id: 2,
    title: "📚 Ngữ văn lớp 4",
    instructor: "Cô Lan xinh đẹp",
    progress: 60,
    totalLessons: 25,
    completedLessons: 15,
    thumbnail: "/placeholder.svg",
    category: "Ngữ văn",
    level: "Dễ",
    emoji: "📚",
  },
  {
    id: 3,
    title: "🌍 Tiếng Anh lớp 5",
    instructor: "Miss Sarah",
    progress: 45,
    totalLessons: 30,
    completedLessons: 14,
    thumbnail: "/placeholder.svg",
    category: "Tiếng Anh",
    level: "Trung bình",
    emoji: "🌍",
  },
  {
    id: 4,
    title: "🧮 Toán nâng cao lớp 6",
    instructor: "Thầy Hùng thông minh",
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    thumbnail: "/placeholder.svg",
    category: "Toán",
    level: "Khó",
    emoji: "🧮",
  },
  {
    id: 5,
    title: "✍️ Viết văn sáng tạo",
    instructor: "Cô Hương hiền lành",
    progress: 85,
    totalLessons: 12,
    completedLessons: 10,
    thumbnail: "/placeholder.svg",
    category: "Ngữ văn",
    level: "Trung bình",
    emoji: "✍️",
  },
  {
    id: 6,
    title: "🗣️ Tiếng Anh giao tiếp",
    instructor: "Mr. John thân thiện",
    progress: 20,
    totalLessons: 20,
    completedLessons: 4,
    thumbnail: "/placeholder.svg",
    category: "Tiếng Anh",
    level: "Trung bình",
    emoji: "🗣️",
  },
];

export function DashboardHome() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="text-6xl animate-bounce">👋</div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Chào bé Minh Đức! ✨
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Hôm nay bé học gì vui nhỉ? 🎉
            </p>
          </div>
        </div>
      </div>

      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              📚 Khóa học đang học
            </CardTitle>
            <div className="text-2xl">🎓</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">6</div>
            <p className="text-xs text-muted-foreground">🆕 +2 khóa học mới!</p>
          </CardContent>
        </Card>
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ⭐ Bài học hoàn thành
            </CardTitle>
            <div className="text-2xl">🏆</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">77</div>
            <p className="text-xs text-muted-foreground">
              🎉 +12 bài tuần này!
            </p>
          </CardContent>
        </Card>
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ⏰ Thời gian học
            </CardTitle>
            <div className="text-2xl">📖</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">45h</div>
            <p className="text-xs text-muted-foreground">📅 Tháng này</p>
          </CardContent>
        </Card>
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              🗓️ Lịch học hôm nay
            </CardTitle>
            <div className="text-2xl">📝</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground">🚀 Buổi học thú vị!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Chart */}
        <Card className="lg:col-span-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Tiến độ học tập của bé
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </CardTitle>
            <CardDescription>
              Xem bé đã học được bao nhiêu bài rồi nhé! 🌟
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="completed"
                  fill="var(--color-completed)"
                  radius={8}
                />
                <Bar dataKey="total" fill="var(--color-total)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🗓️ Lịch học sắp tới
              <Calendar className="h-5 w-5 text-accent animate-bounce" />
            </CardTitle>
            <CardDescription>
              Những buổi học thú vị đang chờ bé! 🎉
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5 hover:scale-105 transition-transform duration-200"
              >
                <div className="flex flex-col items-center min-w-0">
                  <div className="text-2xl">{lesson.emoji}</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {lesson.date}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {lesson.time}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {lesson.course}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={lesson.type === "live" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {lesson.type === "live" ? "🔴 Trực tiếp" : "📹 Video"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ⏱️ {lesson.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Courses Grid */}
      <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 Các khóa học đang theo
            <Zap className="h-5 w-5 text-secondary animate-pulse" />
          </CardTitle>
          <CardDescription>
            Tiếp tục hành trình học tập thú vị của bé! 🚀
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentCourses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary/10 bg-gradient-to-br from-white to-primary/5"
              >
                <CardContent className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-primary/20">
                    <div className="text-4xl">{course.emoji}</div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="text-xs bg-white/80">
                        {course.level}
                      </Badge>
                    </div>

                    {/* Hover sparkles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-2 left-2 text-yellow-400 animate-ping">
                        ✨
                      </div>
                      <div
                        className="absolute bottom-2 right-2 text-yellow-400 animate-ping"
                        style={{ animationDelay: "0.2s" }}
                      >
                        ⭐
                      </div>
                      <div
                        className="absolute top-1/2 left-1/2 text-yellow-400 animate-ping"
                        style={{ animationDelay: "0.4s" }}
                      >
                        💫
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        👨‍🏫 {course.instructor}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          📚 {course.completedLessons}/{course.totalLessons} bài
                          học
                        </span>
                        <span className="font-medium text-primary">
                          {course.progress}%
                        </span>
                      </div>
                      <Progress
                        value={course.progress}
                        className="h-3 bg-primary/10"
                      />
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105">
                      <Play className="h-4 w-4 mr-2" />
                      {course.progress === 0
                        ? "🚀 Bắt đầu học!"
                        : course.progress === 100
                          ? "🔄 Ôn tập lại!"
                          : "📖 Tiếp tục học!"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
