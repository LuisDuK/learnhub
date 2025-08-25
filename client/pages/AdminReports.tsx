import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Download,
  Filter,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Calendar,
} from "lucide-react";

// Mock data for charts
const subjectScoresData = [
  { subject: "Toán học", avgScore: 85, students: 120 },
  { subject: "Tiếng Việt", avgScore: 78, students: 95 },
  { subject: "Tiếng Anh", avgScore: 92, students: 80 },
  { subject: "Khoa học", avgScore: 74, students: 75 },
  { subject: "Lịch sử", avgScore: 80, students: 60 },
  { subject: "Địa lý", avgScore: 76, students: 55 },
];

const progressTimelineData = [
  { month: "T1", student1: 20, student2: 15, student3: 25, avg: 20 },
  { month: "T2", student1: 35, student2: 28, student3: 40, avg: 34 },
  { month: "T3", student1: 50, student2: 45, student3: 55, avg: 50 },
  { month: "T4", student1: 65, student2: 60, student3: 70, avg: 65 },
  { month: "T5", student1: 78, student2: 75, student3: 85, avg: 79 },
  { month: "T6", student1: 85, student2: 82, student3: 92, avg: 86 },
];

const completionStatusData = [
  { name: "Hoàn thành", value: 45, color: "#10B981" },
  { name: "Đang học", value: 35, color: "#3B82F6" },
  { name: "Chưa bắt đầu", value: 15, color: "#F59E0B" },
  { name: "Tạm dừng", value: 5, color: "#EF4444" },
];

const studentPerformanceData = [
  {
    studentId: 101,
    studentName: "Nguyễn Minh Đức",
    subject: "Toán học",
    score: 95,
    progress: 85,
    class: "3A",
    lastActivity: "2024-01-28",
  },
  {
    studentId: 102,
    studentName: "Trần Thị Mai",
    subject: "Tiếng Việt",
    score: 87,
    progress: 78,
    class: "3B",
    lastActivity: "2024-01-27",
  },
  {
    studentId: 103,
    studentName: "Lê Văn An",
    subject: "Tiếng Anh",
    score: 92,
    progress: 90,
    class: "3A",
    lastActivity: "2024-01-28",
  },
  {
    studentId: 104,
    studentName: "Phạm Thị Hoa",
    subject: "Khoa học",
    score: 78,
    progress: 65,
    class: "3C",
    lastActivity: "2024-01-26",
  },
  {
    studentId: 105,
    studentName: "Nguyễn Văn Bình",
    subject: "Toán học",
    score: 82,
    progress: 72,
    class: "3B",
    lastActivity: "2024-01-28",
  },
];

export default function AdminReports() {
  const [filterBy, setFilterBy] = useState("all");
  const [timeRange, setTimeRange] = useState("month");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filteredStudentData = studentPerformanceData.filter((student) => {
    if (filterBy === "all") return true;
    if (filterBy === "student") return true;
    if (filterBy === "class") return true;
    if (filterBy === "subject")
      return selectedSubject === "all" || student.subject === selectedSubject;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    if (progress >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              📈 Báo cáo & Thống kê
            </h1>
            <p className="text-gray-600 mt-1">
              Phân tích chi tiết về hiệu suất học tập
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <Filter className="h-5 w-5" />
              Bộ lọc báo cáo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Lọc theo
                </label>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="student">Theo học sinh</SelectItem>
                    <SelectItem value="class">Theo lớp</SelectItem>
                    <SelectItem value="subject">Theo môn học</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Khoảng thời gian
                </label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Tuần này</SelectItem>
                    <SelectItem value="month">Tháng này</SelectItem>
                    <SelectItem value="quarter">Quý này</SelectItem>
                    <SelectItem value="year">Năm này</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Môn học
                </label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả môn</SelectItem>
                    <SelectItem value="Toán học">Toán học</SelectItem>
                    <SelectItem value="Tiếng Việt">Tiếng Việt</SelectItem>
                    <SelectItem value="Tiếng Anh">Tiếng Anh</SelectItem>
                    <SelectItem value="Khoa học">Khoa học</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Áp dụng bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng học sinh
                  </p>
                  <p className="text-2xl font-bold text-blue-600">1,234</p>
                  <p className="text-xs text-green-600 mt-1">
                    +12% tháng trước
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Điểm TB chung
                  </p>
                  <p className="text-2xl font-bold text-green-600">82.5</p>
                  <p className="text-xs text-green-600 mt-1">+5.2 điểm</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Khóa học hoàn thành
                  </p>
                  <p className="text-2xl font-bold text-orange-600">156</p>
                  <p className="text-xs text-blue-600 mt-1">18 khóa mới</p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Thời gian học TB
                  </p>
                  <p className="text-2xl font-bold text-purple-600">4.2h</p>
                  <p className="text-xs text-purple-600 mt-1">mỗi ngày</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Average Scores by Subject */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                📊 Điểm trung bình theo môn học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectScoresData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis
                    dataKey="subject"
                    fontSize={12}
                    tick={{ fill: "#374151" }}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#374151" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="avgScore"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart - Progress Timeline */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                📈 Tiến bộ học tập theo thời gian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                  <XAxis
                    dataKey="month"
                    fontSize={12}
                    tick={{ fill: "#374151" }}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#374151" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="student1"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="student2"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart - Completion Status */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                🥧 Tỉ lệ trạng thái hoàn thành
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={completionStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {completionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {completionStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Area Chart - Performance Trends */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                📉 Xu hướng hiệu suất học tập
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={progressTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                  <XAxis
                    dataKey="month"
                    fontSize={12}
                    tick={{ fill: "#374151" }}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#374151" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avg"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Performance Table */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-700">
              📋 Bảng dữ liệu chi tiết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">Học sinh</TableHead>
                    <TableHead className="font-semibold">Lớp</TableHead>
                    <TableHead className="font-semibold">Môn học</TableHead>
                    <TableHead className="font-semibold">Điểm số</TableHead>
                    <TableHead className="font-semibold">Tiến độ</TableHead>
                    <TableHead className="font-semibold">
                      Hoạt động cuối
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudentData.map((student) => (
                    <TableRow
                      key={student.studentId}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                            {student.studentName.charAt(0)}
                          </div>
                          <span className="font-medium">
                            {student.studentName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.class}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{student.subject}</Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-bold ${getScoreColor(student.score)}`}
                        >
                          {student.score}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(student.progress)}`}
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {student.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {student.lastActivity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
