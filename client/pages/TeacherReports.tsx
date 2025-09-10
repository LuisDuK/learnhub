import React, { useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Calendar,
  Award,
  Clock,
  Target,
  Download,
  Filter,
  Eye,
  Star,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

// Mock data for course analytics
const courseAnalytics = [
  {
    id: 1,
    name: "Toán học lớp 3",
    studentsCount: 25,
    completionRate: 78,
    averageScore: 8.2,
    totalLessons: 12,
    completedLessons: 9,
    engagementRate: 85,
    lastWeekCompletion: 12,
    feedbackScore: 4.6,
    status: "active",
    weeklyProgress: [65, 68, 72, 75, 78],
    studentPerformance: {
      excellent: 8,
      good: 12,
      average: 4,
      needsImprovement: 1,
    },
    timeSpent: {
      thisWeek: 240, // minutes
      lastWeek: 220,
      average: 230,
    },
  },
  {
    id: 2,
    name: "Phép tính nâng cao",
    studentsCount: 15,
    completionRate: 92,
    averageScore: 9.1,
    totalLessons: 8,
    completedLessons: 8,
    engagementRate: 94,
    lastWeekCompletion: 8,
    feedbackScore: 4.9,
    status: "active",
    weeklyProgress: [85, 87, 89, 91, 92],
    studentPerformance: {
      excellent: 12,
      good: 3,
      average: 0,
      needsImprovement: 0,
    },
    timeSpent: {
      thisWeek: 180,
      lastWeek: 175,
      average: 170,
    },
  },
  {
    id: 3,
    name: "Hình học cơ bản",
    studentsCount: 18,
    completionRate: 65,
    averageScore: 7.5,
    totalLessons: 10,
    completedLessons: 6,
    engagementRate: 72,
    lastWeekCompletion: 5,
    feedbackScore: 4.2,
    status: "draft",
    weeklyProgress: [45, 52, 58, 62, 65],
    studentPerformance: {
      excellent: 3,
      good: 8,
      average: 6,
      needsImprovement: 1,
    },
    timeSpent: {
      thisWeek: 200,
      lastWeek: 195,
      average: 210,
    },
  },
];

// Mock student performance data
const studentDetails = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    courseId: 1,
    courseName: "Toán học lớp 3",
    completionRate: 95,
    averageScore: 9.2,
    timeSpent: 180, // minutes this week
    lastActivity: "2024-03-12",
    performance: "excellent",
    trend: "up",
  },
  {
    id: 2,
    name: "Trần Thị Bích",
    courseId: 1,
    courseName: "Toán học lớp 3",
    completionRate: 88,
    averageScore: 8.5,
    timeSpent: 165,
    lastActivity: "2024-03-11",
    performance: "good",
    trend: "up",
  },
  {
    id: 3,
    name: "Lê Minh Châu",
    courseId: 1,
    courseName: "Toán học lớp 3",
    completionRate: 45,
    averageScore: 6.8,
    timeSpent: 90,
    lastActivity: "2024-03-08",
    performance: "needsImprovement",
    trend: "down",
  },
];

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: "completion",
    message: "Nguyễn Văn An đã hoàn thành bài học 'Phép cộng trong phạm vi 20'",
    course: "Toán học lớp 3",
    time: "2 giờ trước",
    student: "Nguyễn Văn An",
  },
  {
    id: 2,
    type: "exercise",
    message: "15 học sinh đã nộp bài tập 'Bài tập phép cộng'",
    course: "Toán học lớp 3",
    time: "4 giờ trước",
    student: null,
  },
  {
    id: 3,
    type: "feedback",
    message: "Trần Thị Bích đã để lại đánh giá 5 sao cho môn học",
    course: "Phép tính nâng cao",
    time: "6 giờ trước",
    student: "Trần Thị Bích",
  },
  {
    id: 4,
    type: "question",
    message: "Lê Minh Châu đã đặt câu hỏi trong bài học",
    course: "Toán học lớp 3",
    time: "8 giờ trước",
    student: "Lê Minh Châu",
  },
];

export default function TeacherReports() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("week");
  const [performanceFilter, setPerformanceFilter] = useState<string>("all");

  const filteredAnalytics =
    selectedCourse === "all"
      ? courseAnalytics
      : courseAnalytics.filter(
          (course) => course.id.toString() === selectedCourse,
        );

  const totalStudents = courseAnalytics.reduce(
    (sum, course) => sum + course.studentsCount,
    0,
  );
  const averageCompletion = Math.round(
    courseAnalytics.reduce((sum, course) => sum + course.completionRate, 0) /
      courseAnalytics.length,
  );
  const averageScore = (
    courseAnalytics.reduce((sum, course) => sum + course.averageScore, 0) /
    courseAnalytics.length
  ).toFixed(1);
  const totalLessons = courseAnalytics.reduce(
    (sum, course) => sum + course.totalLessons,
    0,
  );

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "average":
        return "bg-yellow-100 text-yellow-800";
      case "needsImprovement":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceText = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "Xuất sắc";
      case "good":
        return "Tốt";
      case "average":
        return "Trung bình";
      case "needsImprovement":
        return "Cần cải thiện";
      default:
        return performance;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "exercise":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "feedback":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "question":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-green-600" />
              Báo cáo & Thống kê
            </h1>
            <p className="text-gray-600 mt-1">
              Theo dõi hiệu quả giảng dạy và tiến độ học sinh
            </p>
          </div>

          <div className="flex gap-3">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Chọn môn học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả môn học</SelectItem>
                {courseAnalytics.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm này</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng học sinh
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Trong tất cả môn học
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tỷ lệ hoàn thành
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageCompletion}%</div>
              <p className="text-xs text-muted-foreground">
                Trung bình tất cả môn học
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Điểm trung bình
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}</div>
              <p className="text-xs text-muted-foreground">
                Trên thang điểm 10
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng bài học
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLessons}</div>
              <p className="text-xs text-muted-foreground">
                Đã tạo và phát hành
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="courses">Chi tiết môn học</TabsTrigger>
            <TabsTrigger value="students">Học sinh</TabsTrigger>
            <TabsTrigger value="activities">Hoạt động</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Hiệu quả môn học</CardTitle>
                  <CardDescription>
                    Tỷ lệ hoàn thành theo từng môn học
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredAnalytics.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm text-gray-600">
                          {course.completionRate}%
                        </span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{course.studentsCount} học sinh</span>
                        <span>Điểm TB: {course.averageScore}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Engagement Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mức độ tương tác</CardTitle>
                  <CardDescription>
                    Thống kê tương tác của học sinh
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredAnalytics.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{course.name}</h4>
                        <Badge
                          className={
                            course.engagementRate >= 80
                              ? "bg-green-100 text-green-800"
                              : course.engagementRate >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {course.engagementRate}% tương tác
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">
                            Thời gian tuần này:
                          </span>
                          <p className="font-medium">
                            {course.timeSpent.thisWeek} phút
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Đánh giá:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {course.feedbackScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Student Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Phân bố kết quả học sinh
                </CardTitle>
                <CardDescription>
                  Thống kê hiệu quả học tập theo mức độ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredAnalytics.map((course) => (
                    <div key={course.id} className="space-y-4">
                      <h4 className="font-semibold text-center">
                        {course.name}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-100 text-green-800">
                            Xuất sắc
                          </Badge>
                          <span className="font-medium">
                            {course.studentPerformance.excellent}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-blue-100 text-blue-800">
                            Tốt
                          </Badge>
                          <span className="font-medium">
                            {course.studentPerformance.good}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Trung bình
                          </Badge>
                          <span className="font-medium">
                            {course.studentPerformance.average}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-red-100 text-red-800">
                            Cần cải thiện
                          </Badge>
                          <span className="font-medium">
                            {course.studentPerformance.needsImprovement}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-center text-sm text-gray-600">
                          Tổng: {course.studentsCount} học sinh
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Detail Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredAnalytics.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{course.name}</CardTitle>
                      <Badge
                        className={
                          course.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {course.status === "active"
                          ? "Đang hoạt động"
                          : "Bản nháp"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Basic Stats */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Thống kê cơ bản</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Học sinh:</span>
                            <span className="font-medium">
                              {course.studentsCount}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hoàn thành:</span>
                            <span className="font-medium">
                              {course.completionRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Điểm TB:</span>
                            <span className="font-medium">
                              {course.averageScore}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bài học:</span>
                            <span className="font-medium">
                              {course.completedLessons}/{course.totalLessons}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Engagement */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Mức độ tương tác</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Tỷ lệ tương tác:
                            </span>
                            <span className="font-medium">
                              {course.engagementRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Thời gian/tuần:
                            </span>
                            <span className="font-medium">
                              {course.timeSpent.thisWeek}p
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Đánh giá:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {course.feedbackScore}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Hoàn thành tuần:
                            </span>
                            <span className="font-medium">
                              {course.lastWeekCompletion}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Trend */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Xu hướng tiến độ</h4>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            5 tuần gần nhất:
                          </div>
                          <div className="flex items-center gap-1">
                            {course.weeklyProgress.map((progress, index) => (
                              <div
                                key={index}
                                className="flex flex-col items-center"
                              >
                                <div
                                  className="w-4 h-8 bg-blue-200 rounded-t"
                                  style={{
                                    height: `${(progress / 100) * 32}px`,
                                  }}
                                />
                                <span className="text-xs text-gray-500 mt-1">
                                  {progress}%
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Tăng{" "}
                              {course.weeklyProgress[4] -
                                course.weeklyProgress[0]}
                              % trong 5 tuần
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Chi tiết học sinh</h3>
              <Select
                value={performanceFilter}
                onValueChange={setPerformanceFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Lọc theo hiệu quả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả h���c sinh</SelectItem>
                  <SelectItem value="excellent">Xuất sắc</SelectItem>
                  <SelectItem value="good">Tốt</SelectItem>
                  <SelectItem value="average">Trung bình</SelectItem>
                  <SelectItem value="needsImprovement">
                    Cần cải thiện
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {studentDetails
                .filter(
                  (student) =>
                    performanceFilter === "all" ||
                    student.performance === performanceFilter,
                )
                .map((student) => (
                  <Card key={student.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                            {student.name.split(" ").pop()?.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-gray-600">
                              {student.courseName}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                className={getPerformanceColor(
                                  student.performance,
                                )}
                              >
                                {getPerformanceText(student.performance)}
                              </Badge>
                              {getTrendIcon(student.trend)}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <div className="text-lg font-bold">
                              {student.completionRate}%
                            </div>
                            <div className="text-xs text-gray-600">
                              Hoàn thành
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">
                              {student.averageScore}
                            </div>
                            <div className="text-xs text-gray-600">Điểm TB</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">
                              {student.timeSpent}p
                            </div>
                            <div className="text-xs text-gray-600">
                              Thời gian
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Hoạt động cuối:
                          </div>
                          <div className="text-sm font-medium">
                            {new Date(student.lastActivity).toLocaleDateString(
                              "vi-VN",
                            )}
                          </div>
                          <Button size="sm" variant="outline" className="mt-2">
                            <Eye className="h-4 w-4 mr-1" />
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoạt động gần đây</CardTitle>
                <CardDescription>
                  Theo dõi hoạt động của học sinh trong các khóa học
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                          <span className="text-xs text-gray-300">���</span>
                          <span className="text-xs text-blue-600">
                            {activity.course}
                          </span>
                          {activity.student && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className="text-xs text-green-600">
                                {activity.student}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
