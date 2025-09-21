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
    category: "Văn",
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
    category: "Anh",
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
    category: "Văn",
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
    category: "Anh",
    level: "Trung bình",
    emoji: "🗣���",
  },
];

import { useNavigate } from "react-router-dom";

// Helpers to compute schedule status (late/ongoing) for upcoming lessons
type UpcomingLesson = (typeof upcomingLessons)[number];

const VI_DAY_TO_INDEX: Record<string, number> = {
  "Chủ nhật": 0,
  "Thứ 2": 1,
  "Thứ 3": 2,
  "Thứ 4": 3,
  "Thứ 5": 4,
  "Thứ 6": 5,
  "Thứ 7": 6,
};

function parseTimeToDate(base: Date, time: string): Date {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  const d = new Date(base);
  d.setHours(isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, 0, 0);
  return d;
}

function parseVietnameseDate(label: string, time: string): Date {
  const now = new Date();
  if (label === "Hôm nay") {
    return parseTimeToDate(now, time);
  }
  if (label === "Mai") {
    const tmr = new Date(now);
    tmr.setDate(now.getDate() + 1);
    return parseTimeToDate(tmr, time);
  }
  // Match labels like "Thứ 2".."Thứ 7" or "Chủ nhật"
  const dayIdx = VI_DAY_TO_INDEX[label as keyof typeof VI_DAY_TO_INDEX];
  if (typeof dayIdx === "number") {
    const todayIdx = now.getDay();
    let diff = (dayIdx - todayIdx + 7) % 7;
    let candidate = new Date(now);
    candidate.setDate(now.getDate() + diff);
    candidate = parseTimeToDate(candidate, time);
    // If same day but time already passed, schedule for next week
    if (diff === 0 && candidate.getTime() <= now.getTime()) {
      candidate.setDate(candidate.getDate() + 7);
    }
    return candidate;
  }
  // Fallback: treat as today
  return parseTimeToDate(now, time);
}

function parseDurationMinutes(duration: string): number {
  const num = parseInt(duration.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

function getScheduleStatus(lesson: UpcomingLesson) {
  const start = parseVietnameseDate(lesson.date, lesson.time);
  const minutes = parseDurationMinutes(lesson.duration);
  const end = new Date(start.getTime() + minutes * 60 * 1000);
  const now = new Date();
  const ongoing = now >= start && now <= end;
  const late = now > end;
  return { start, end, ongoing, late };
}

export function DashboardHome() {
  const navigate = useNavigate();
  const lateCount = upcomingLessons.reduce(
    (acc, l) => (getScheduleStatus(l).late ? acc + 1 : acc),
    0,
  );
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              📚 Môn học đang học
            </CardTitle>
            <div className="text-2xl">🎓</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">6</div>
            <p className="text-xs text-muted-foreground">🆕 +2 môn học mới!</p>
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
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-secondary/40 to-secondary/20 border-secondary/50">
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
        <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">⛔ Trễ lịch</CardTitle>
            <div className="text-2xl">⚠️</div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {lateCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {lateCount > 0 ? "Cần xem lại ngay!" : "Không có buổi tr��"}
            </p>
          </CardContent>
        </Card>
      </div>

     
      {/* Current Courses Grid */}
      <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 Các môn học đang theo
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
                    <Button
                      onClick={() => navigate("/study-plan")}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105"
                    >
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
