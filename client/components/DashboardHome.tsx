import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CalendarDays, Clock, BookOpen, TrendingUp, Play, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

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
    label: "Đã hoàn thành",
    color: "hsl(var(--primary))",
  },
  total: {
    label: "Tổng số bài",
    color: "hsl(var(--muted))",
  },
};

// Mock upcoming schedule data
const upcomingLessons = [
  {
    id: 1,
    title: "JavaScript ES6 Features",
    course: "JavaScript Nâng cao",
    time: "09:00",
    date: "Hôm nay",
    duration: "90 phút",
    type: "live"
  },
  {
    id: 2,
    title: "React State Management",
    course: "React.js Complete",
    time: "14:30",
    date: "Hôm nay",
    duration: "120 phút",
    type: "recorded"
  },
  {
    id: 3,
    title: "Database Design Principles",
    course: "Backend Development",
    time: "10:00",
    date: "Mai",
    duration: "75 phút",
    type: "live"
  },
  {
    id: 4,
    title: "API Testing with Postman",
    course: "Backend Development",
    time: "16:00",
    date: "Thứ 4",
    duration: "60 phút",
    type: "recorded"
  },
];

// Mock courses data
const currentCourses = [
  {
    id: 1,
    title: "JavaScript Nâng cao",
    instructor: "Trần Văn A",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    thumbnail: "/placeholder.svg",
    category: "Frontend",
    level: "Trung cấp"
  },
  {
    id: 2,
    title: "React.js Complete",
    instructor: "Nguyễn Thị B",
    progress: 60,
    totalLessons: 32,
    completedLessons: 19,
    thumbnail: "/placeholder.svg",
    category: "Frontend",
    level: "Nâng cao"
  },
  {
    id: 3,
    title: "Backend Development",
    instructor: "Lê Minh C",
    progress: 40,
    totalLessons: 28,
    completedLessons: 11,
    thumbnail: "/placeholder.svg",
    category: "Backend",
    level: "Trung cấp"
  },
  {
    id: 4,
    title: "Database Management",
    instructor: "Phạm Văn D",
    progress: 85,
    totalLessons: 20,
    completedLessons: 17,
    thumbnail: "/placeholder.svg",
    category: "Database",
    level: "Cơ bản"
  },
  {
    id: 5,
    title: "UI/UX Design Basics",
    instructor: "Hoàng Thị E",
    progress: 30,
    totalLessons: 16,
    completedLessons: 5,
    thumbnail: "/placeholder.svg",
    category: "Design",
    level: "Cơ bản"
  },
  {
    id: 6,
    title: "Mobile App Development",
    instructor: "Đỗ Văn F",
    progress: 20,
    totalLessons: 35,
    completedLessons: 7,
    thumbnail: "/placeholder.svg",
    category: "Mobile",
    level: "Nâng cao"
  },
];

export function DashboardHome() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khóa học đang theo</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bài học hoàn thành</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77</div>
            <p className="text-xs text-muted-foreground">+12 tuần này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian học</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45h</div>
            <p className="text-xs text-muted-foreground">Tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch học hôm nay</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Buổi học</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tiến độ học tập</CardTitle>
            <CardDescription>Số bài học hoàn thành theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                <Bar dataKey="total" fill="var(--color-total)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Lịch học sắp tới
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex flex-col items-center min-w-0">
                  <div className="text-xs font-medium text-muted-foreground">{lesson.date}</div>
                  <div className="text-sm font-semibold">{lesson.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{lesson.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{lesson.course}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={lesson.type === "live" ? "default" : "secondary"} className="text-xs">
                      {lesson.type === "live" ? "Live" : "Recorded"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Courses Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Khóa học đang theo</CardTitle>
          <CardDescription>Tiếp tục học tập từ nơi bạn đã dừng lại</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm leading-tight">{course.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Giảng viên: {course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      <Play className="h-3 w-3 mr-1" />
                      Tiếp tục học
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
