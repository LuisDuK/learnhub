import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  TrendingUp, 
  Calculator, 
  BookOpen, 
  Globe, 
  AlertTriangle,
  Trophy,
  Target,
  Clock,
  Sparkles
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for the three subjects
const subjectProgress = [
  { subject: "Toán", completed: 85, total: 100, emoji: "🔢" },
  { subject: "Văn", completed: 72, total: 100, emoji: "📚" },
  { subject: "Anh", completed: 65, total: 100, emoji: "🌍" }
];

const timeDistribution = [
  { subject: "Toán", hours: 45, emoji: "🔢", color: "#3B82F6" },
  { subject: "Văn", hours: 35, emoji: "📚", color: "#10B981" },
  { subject: "Anh", hours: 25, emoji: "🌍", color: "#8B5CF6" }
];

const detailedProgress = [
  {
    subject: "Toán",
    emoji: "🔢",
    completedSessions: 34,
    totalSessions: 40,
    averageScore: 8.5,
    status: "Tốt",
    statusColor: "bg-green-100 text-green-700",
    lastStudy: "Hôm qua"
  },
  {
    subject: "Văn", 
    emoji: "📚",
    completedSessions: 29,
    totalSessions: 40,
    averageScore: 7.2,
    status: "Khá",
    statusColor: "bg-blue-100 text-blue-700",
    lastStudy: "2 ngày trước"
  },
  {
    subject: "Anh",
    emoji: "🌍", 
    completedSessions: 26,
    totalSessions: 40,
    averageScore: 6.5,
    status: "Cần cải thiện",
    statusColor: "bg-yellow-100 text-yellow-700",
    lastStudy: "3 ngày trước"
  }
];

const chartConfig = {
  completed: {
    label: "Hoàn thành (%)",
    color: "hsl(var(--primary))",
  }
};

const pieChartConfig = {
  hours: {
    label: "Giờ học",
  }
};

export default function Progress() {
  // Calculate overall progress
  const totalCompleted = subjectProgress.reduce((acc, subject) => acc + subject.completed, 0);
  const totalPossible = subjectProgress.reduce((acc, subject) => acc + subject.total, 0);
  const overallProgress = Math.round((totalCompleted / totalPossible) * 100);

  // Find weak subjects (below 70%)
  const weakSubjects = detailedProgress.filter(subject => subject.averageScore < 7.0);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
            📊 Báo cáo tiến độ học tập
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            Theo dõi tiến độ học tập của bé qua các môn học
          </p>
        </div>

        {/* Overall Progress & Warnings */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                🎯 Tổng quan tiến độ
              </CardTitle>
              <CardDescription>Tiến độ học tập tổng thể của bé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{overallProgress}%</div>
                <p className="text-muted-foreground">Tiến độ tổng thể</p>
              </div>
              <Progress value={overallProgress} className="h-4" />
              <div className="grid grid-cols-3 gap-4 text-center">
                {subjectProgress.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="text-2xl">{subject.emoji}</div>
                    <div className="font-semibold">{subject.subject}</div>
                    <div className="text-lg font-bold text-primary">{subject.completed}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {/* Warning for weak subjects */}
            {weakSubjects.length > 0 && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">⚠️ Cần chú ý!</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  {weakSubjects.map((subject, index) => (
                    <div key={subject.subject}>
                      {subject.emoji} Điểm {subject.subject} thấp hơn mục tiêu (${subject.averageScore}/10)
                      {index < weakSubjects.length - 1 && <br />}
                    </div>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            {/* Study streak */}
            <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  🔥 Chuỗi học tập
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">7</div>
                  <p className="text-sm text-muted-foreground">ngày liên tiếp</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bar Chart - Progress by Subject */}
          <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                📈 Tiến độ theo môn học
              </CardTitle>
              <CardDescription>Phần trăm hoàn thành các bài học</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={subjectProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{fontSize: 12}}
                    tickFormatter={(value) => {
                      const subject = subjectProgress.find(s => s.subject === value);
                      return subject ? `${subject.emoji} ${value}` : value;
                    }}
                  />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value}%`, "Hoàn thành"]}
                  />
                  <Bar dataKey="completed" fill="var(--color-completed)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pie Chart - Time Distribution */}
          <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                ⏰ Phân bổ thời gian học
              </CardTitle>
              <CardDescription>Thời gian học theo từng môn (giờ)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={pieChartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={timeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ subject, hours, percent }) => `${subject}: ${hours}h (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                  >
                    {timeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value} giờ`, "Thời gian học"]}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress Table */}
        <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              📋 Bảng chi tiết tiến độ
            </CardTitle>
            <CardDescription>Thông tin chi tiết về từng môn học</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Buổi học</TableHead>
                  <TableHead>Điểm TB</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Học lần cuối</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailedProgress.map((subject) => (
                  <TableRow key={subject.subject}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{subject.emoji}</span>
                        <span>{subject.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {subject.completedSessions}/{subject.totalSessions}
                        </div>
                        <Progress 
                          value={(subject.completedSessions / subject.totalSessions) * 100} 
                          className="h-2 w-20" 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{subject.averageScore}</span>
                        <span className="text-muted-foreground">/10</span>
                        {subject.averageScore >= 8 && <span>🌟</span>}
                        {subject.averageScore >= 7 && subject.averageScore < 8 && <span>👍</span>}
                        {subject.averageScore < 7 && <span>📚</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={subject.statusColor}>
                        {subject.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {subject.lastStudy}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              🏆 Thành tích gần đây
            </CardTitle>
            <CardDescription>Những cột mốc bé đã đạt được</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                <div className="text-3xl mb-2">🥇</div>
                <div className="font-semibold text-yellow-800">Học sinh giỏi Toán</div>
                <div className="text-sm text-yellow-600">Đạt điểm trung bình 8.5</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-3xl mb-2">📚</div>
                <div className="font-semibold text-blue-800">Hoàn thành 50 bài học</div>
                <div className="text-sm text-blue-600">Cột mốc quan trọng!</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-semibold text-green-800">Streak 7 ngày</div>
                <div className="text-sm text-green-600">Học đều đặn mỗi ngày</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
