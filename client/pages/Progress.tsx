import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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
  Trophy,
  Star,
  Award,
  Brain,
  Target,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock student data
const studentInfo = {
  name: "Nguyễn Minh Đức",
  class: "Lớp 5A",
  avatar: "/placeholder.svg",
  totalBadges: 12,
  level: "Học sinh giỏi",
};

// Mock subject scores data - average scores for bar chart
const subjectScores = [
  { subject: "Toán", score: 8.5, emoji: "🔢", color: "#3B82F6" },
  { subject: "Văn", score: 7.2, emoji: "📚", color: "#10B981" },
  { subject: "Anh", score: 6.8, emoji: "🌍", color: "#8B5CF6" },
  { subject: "Khoa học", score: 8.0, emoji: "🔬", color: "#F59E0B" },
  { subject: "Lịch sử", score: 7.5, emoji: "📜", color: "#EF4444" },
];

// Mock progress data - weekly/monthly progress for line chart
const progressData = [
  { period: "T1", math: 7.5, literature: 6.8, english: 6.2 },
  { period: "T2", math: 7.8, literature: 6.9, english: 6.4 },
  { period: "T3", math: 8.0, literature: 7.0, english: 6.5 },
  { period: "T4", math: 8.2, literature: 7.1, english: 6.6 },
  { period: "T5", math: 8.3, literature: 7.2, english: 6.7 },
  { period: "T6", math: 8.5, literature: 7.2, english: 6.8 },
];

// Mock achievement badges
const achievements = [
  {
    id: 1,
    title: "Học giỏi Toán",
    description: "Đạt điểm trung bình 8.5 môn Toán",
    icon: "🏆",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    earned: true,
  },
  {
    id: 2,
    title: "Chăm chỉ làm bài tập",
    description: "Hoàn thành 95% bài tập được giao",
    icon: "📝",
    color: "bg-green-100 border-green-300 text-green-800",
    earned: true,
  },
  {
    id: 3,
    title: "Tiến bộ vượt bậc",
    description: "Cải thiện điểm số 1.5 điểm trong tháng",
    icon: "🚀",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    earned: true,
  },
  {
    id: 4,
    title: "Học sinh xuất sắc",
    description: "Đạt điểm trung bình trên 8.0 tất cả môn",
    icon: "⭐",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    earned: false,
  },
  {
    id: 5,
    title: "Đọc sách nhiều",
    description: "Đọc hết 20 cuốn sách trong học kỳ",
    icon: "📖",
    color: "bg-orange-100 border-orange-300 text-orange-800",
    earned: true,
  },
  {
    id: 6,
    title: "Giao tiếp tiếng Anh t���t",
    description: "Đạt 7.0 điểm speaking tiếng Anh",
    icon: "🗣️",
    color: "bg-indigo-100 border-indigo-300 text-indigo-800",
    earned: false,
  },
];

// Mock detailed scores by subject
const detailedScores = [
  {
    subject: "Toán",
    emoji: "🔢",
    scores: [8.0, 8.5, 9.0, 8.0, 8.5],
    average: 8.5,
    status: "Giỏi",
    statusColor: "bg-green-100 text-green-700 border-green-300",
    trend: "up",
    lastTest: "9.0",
    improvement: "+0.5",
  },
  {
    subject: "Văn",
    emoji: "📚",
    scores: [7.0, 7.5, 7.0, 7.5, 7.0],
    average: 7.2,
    status: "Khá",
    statusColor: "bg-blue-100 text-blue-700 border-blue-300",
    trend: "stable",
    lastTest: "7.0",
    improvement: "0",
  },
  {
    subject: "Anh",
    emoji: "🌍",
    scores: [6.5, 6.0, 7.0, 6.5, 7.5],
    average: 6.8,
    status: "Trung bình",
    statusColor: "bg-yellow-100 text-yellow-700 border-yellow-300",
    trend: "up",
    lastTest: "7.5",
    improvement: "+1.0",
  },
  {
    subject: "Khoa học",
    emoji: "🔬",
    scores: [8.0, 8.5, 7.5, 8.0, 8.0],
    average: 8.0,
    status: "Giỏi",
    statusColor: "bg-green-100 text-green-700 border-green-300",
    trend: "stable",
    lastTest: "8.0",
    improvement: "0",
  },
  {
    subject: "Lịch sử",
    emoji: "📜",
    scores: [7.0, 7.5, 8.0, 7.5, 7.5],
    average: 7.5,
    status: "Khá",
    statusColor: "bg-blue-100 text-blue-700 border-blue-300",
    trend: "up",
    lastTest: "7.5",
    improvement: "+0.5",
  },
];

// AI suggestions based on performance
const aiSuggestions = [
  {
    id: 1,
    type: "improvement",
    icon: "📚",
    title: "Cải thiện môn Văn",
    suggestion: "Bạn nên tập trung ôn thêm môn Văn trong tuần tới để nâng điểm trung bình. Đặc biệt chú ý phần đọc hiểu và viết văn.",
    priority: "high",
    color: "bg-red-50 border-red-200 text-red-800",
  },
  {
    id: 2,
    type: "strength",
    icon: "🔢",
    title: "Duy trì thế mạnh Toán",
    suggestion: "Bạn đang học rất tốt môn Toán! Hãy tiếp tục duy trì và thử thách bản thân với những bài toán khó hơn.",
    priority: "medium",
    color: "bg-green-50 border-green-200 text-green-800",
  },
  {
    id: 3,
    type: "practice",
    icon: "🌍",
    title: "Luyện tập thêm tiếng Anh",
    suggestion: "Điểm tiếng Anh đang có xu hướng tăng! Hãy dành 30 phút mỗi ngày để luy���n nghe và nói để cải thiện thêm.",
    priority: "medium",
    color: "bg-blue-50 border-blue-200 text-blue-800",
  },
];

const chartConfig = {
  math: {
    label: "Toán",
    color: "#3B82F6",
  },
  literature: {
    label: "Văn", 
    color: "#10B981",
  },
  english: {
    label: "Anh",
    color: "#8B5CF6",
  },
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <ArrowUp className="h-4 w-4 text-green-600" />;
    case "down":
      return <ArrowDown className="h-4 w-4 text-red-600" />;
    default:
      return <Minus className="h-4 w-4 text-gray-600" />;
  }
};

export default function Progress() {
  const earnedBadges = achievements.filter(a => a.earned);
  const overallAverage = detailedScores.reduce((acc, score) => acc + score.average, 0) / detailedScores.length;

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        
        {/* TOP BAR - Student Info & Badges */}
        <Card className="border-primary/20 shadow-lg bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src={studentInfo.avatar} alt={studentInfo.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                    {studentInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Student Info */}
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {studentInfo.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">{studentInfo.class}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="default" className="bg-gradient-to-r from-primary to-accent text-white">
                      {studentInfo.level}
                    </Badge>
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50">
                      <Trophy className="h-4 w-4 mr-1" />
                      {earnedBadges.length} huy hiệu
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="text-right">
                <div className="text-4xl font-bold text-primary mb-2">
                  {overallAverage.toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Điểm trung bình</p>
                <div className="flex items-center justify-end gap-2 mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">Xếp loại: {overallAverage >= 8 ? 'Giỏi' : overallAverage >= 6.5 ? 'Khá' : 'Trung bình'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MIDDLE SECTION */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Bar Chart - Average Scores by Subject */}
          <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                📊 Điểm trung bình từng môn
              </CardTitle>
              <CardDescription>
                Xem điểm trung bình của bé trong học kỳ này
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={subjectScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const subject = subjectScores.find(s => s.subject === value);
                      return subject ? `${subject.emoji} ${value}` : value;
                    }}
                  />
                  <YAxis domain={[0, 10]} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value} điểm`, "Điểm trung bình"]}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="#3B82F6"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Line Chart - Progress Over Time */}
          <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                📈 Tiến bộ theo tháng
              </CardTitle>
              <CardDescription>
                Theo dõi sự tiến bộ của bé qua từng tháng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 10]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="math" 
                    stroke="var(--color-math)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-math)', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="literature" 
                    stroke="var(--color-literature)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-literature)', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="english" 
                    stroke="var(--color-english)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-english)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badges */}
        <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" />
              🏆 Huy hiệu thành tích
            </CardTitle>
            <CardDescription>
              Những thành tích bé đã đạt được và đang phấn đấu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    achievement.earned 
                      ? `${achievement.color} hover:scale-105 shadow-md` 
                      : 'bg-gray-50 border-gray-200 text-gray-500 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                    <p className="text-xs">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BOTTOM SECTION */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Detailed Scores Table */}
          <Card className="lg:col-span-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                📋 Chi tiết điểm số theo môn
              </CardTitle>
              <CardDescription>
                Xem chi tiết điểm số và xu hướng từng môn học
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Môn học</TableHead>
                    <TableHead>Điểm TB</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Xu hướng</TableHead>
                    <TableHead>Bài kiểm tra gần nhất</TableHead>
                    <TableHead>Tiến bộ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedScores.map((score) => (
                    <TableRow key={score.subject}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{score.emoji}</span>
                          <span>{score.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{score.average}</span>
                          <span className="text-muted-foreground">/10</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={score.statusColor}>
                          {score.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(score.trend)}
                          <span className="text-sm">
                            {score.trend === 'up' ? 'Tăng' : score.trend === 'down' ? 'Giảm' : 'Ổn định'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{score.lastTest}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          score.improvement.startsWith('+') ? 'text-green-600' : 
                          score.improvement.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {score.improvement}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                🤖 Gợi ý từ AI
              </CardTitle>
              <CardDescription>
                Lời khuyên cá nhân hóa để cải thiện kết quả học tập
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <Alert key={suggestion.id} className={`${suggestion.color} border-l-4`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{suggestion.icon}</div>
                    <div className="flex-1">
                      <AlertTitle className="text-sm font-bold mb-2 flex items-center gap-2">
                        {suggestion.title}
                        {suggestion.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            Ưu tiên
                          </Badge>
                        )}
                      </AlertTitle>
                      <AlertDescription className="text-sm leading-relaxed">
                        {suggestion.suggestion}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}

              {/* Motivational message */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 text-center">
                <div className="text-3xl mb-2">🌟</div>
                <p className="font-bold text-primary mb-1">Bé học rất chăm chỉ!</p>
                <p className="text-sm text-muted-foreground">
                  Hãy tiếp tục cố gắng để đạt được nhiều thành tích hơn nữa nhé! 💪
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
