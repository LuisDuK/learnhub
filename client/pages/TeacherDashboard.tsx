import React from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
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
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Clock,
  Target,
  Plus,
  Bot,
  BarChart3,
  Calendar,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for teacher's courses
const teacherCourses = [
  {
    id: 1,
    name: "Toán học lớp 3",
    description: "Môn học toán học cơ bản cho học sinh lớp 3",
    studentsCount: 25,
    completionRate: 78,
    status: "active",
    totalLessons: 12,
    completedLessons: 9,
    createdAt: "2024-02-01",
    lastActivity: "2024-03-10",
  },
  {
    id: 2,
    name: "Phép tính nâng cao",
    description: "Bài tập nâng cao cho học sinh giỏi toán",
    studentsCount: 15,
    completionRate: 92,
    status: "active",
    totalLessons: 8,
    completedLessons: 8,
    createdAt: "2024-01-15",
    lastActivity: "2024-03-12",
  },
  {
    id: 3,
    name: "Hình học cơ bản",
    description: "Môn học về hình học cho trẻ em",
    studentsCount: 18,
    completionRate: 65,
    status: "draft",
    totalLessons: 10,
    completedLessons: 6,
    createdAt: "2024-03-01",
    lastActivity: "2024-03-08",
  },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "submission",
    message: "15 học sinh đã nộp bài tập Toán học lớp 3",
    time: "2 giờ trước",
    course: "Toán học lớp 3",
  },
  {
    id: 2,
    type: "completion",
    message: "Học sinh Nguyễn Văn An đã hoàn thành môn học",
    time: "4 giờ trước",
    course: "Phép tính nâng cao",
  },
  {
    id: 3,
    type: "question",
    message: "3 câu hỏi mới từ học sinh cần trả lời",
    time: "6 giờ trước",
    course: "Toán học lớp 3",
  },
  {
    id: 4,
    type: "ai_generated",
    message: "AI đã tạo 5 bài tập mới cho môn học",
    time: "1 ngày trước",
    course: "Hình học cơ bản",
  },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const totalStudents = teacherCourses.reduce(
    (sum, course) => sum + course.studentsCount,
    0,
  );
  const averageCompletion = Math.round(
    teacherCourses.reduce((sum, course) => sum + course.completionRate, 0) /
      teacherCourses.length,
  );
  const activeCourses = teacherCourses.filter(
    (course) => course.status === "active",
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "draft":
        return "Bản nháp";
      case "completed":
        return "Đã hoàn thành";
      default:
        return status;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "completion":
        return <Award className="h-4 w-4 text-green-500" />;
      case "question":
        return <MessageSquare className="h-4 w-4 text-orange-500" />;
      case "ai_generated":
        return <Bot className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-green-600" />
              Chào mừng, Giáo viên Nguyễn Thị Lan!
            </h1>
            <p className="text-gray-600 mt-1">
              Hôm nay là{" "}
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/teacher/ai-generator")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI sinh bài tập
            </Button>
            <Button
              onClick={() => navigate("/teacher/subjects")}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo môn học mới
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng môn học
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeCourses} đang hoạt động
              </p>
            </CardContent>
          </Card>

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
                Trên tất cả môn học
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
                Hoạt động hôm nay
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Bài nộp và tương tác
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Môn học của tôi</CardTitle>
                  <CardDescription>
                    Quản lý và theo dõi tiến độ các môn học
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/teacher/subjects")}
                >
                  Xem tất cả
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {teacherCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {course.name}
                        </h3>
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusText(course.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.studentsCount} học sinh
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {course.completedLessons}/{course.totalLessons} bài
                          học
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {course.completionRate}% hoàn thành
                        </span>
                      </div>
                      <Progress
                        value={course.completionRate}
                        className="mt-2 h-2"
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoạt động gần đây</CardTitle>
                <CardDescription>
                  Cập nhật mới nhất từ môn học của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <span className="text-xs text-gray-300">•</span>
                        <p className="text-xs text-blue-600">
                          {activity.course}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/teacher/ai-generator")}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Tạo bài tập bằng AI
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/teacher/subjects")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm môn học mới
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/teacher/reports")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Xem báo cáo chi tiết
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/teacher/profile")}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Cập nhật hồ sơ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
