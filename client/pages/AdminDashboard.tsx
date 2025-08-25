import React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, TrendingUp, BarChart3, Route } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for demo
const subjectData = [
  { subject: "Toán học", students: 120 },
  { subject: "Tiếng Việt", students: 95 },
  { subject: "Tiếng Anh", students: 80 },
  { subject: "Khoa học", students: 75 },
  { subject: "Lịch sử", students: 60 },
  { subject: "Địa lý", students: 55 },
];

const progressData = [
  { name: "Hoàn thành", value: 45, color: "#10B981" },
  { name: "Đang học", value: 35, color: "#3B82F6" },
  { name: "Chưa học", value: 20, color: "#F59E0B" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Tổng quan hệ thống
            </h1>
            <p className="text-gray-600 mt-1">
              Thống kê tổng quan về hoạt động học tập
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng số học sinh
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <p className="text-xs text-green-600 mt-1">
                +12% so với tháng trước
              </p>
            </CardContent>
          </Card>

          {/* Active Learning Paths */}
          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Lộ trình học tập
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Route className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-xs text-green-600 mt-1">+2 lộ trình mới</p>
            </CardContent>
          </Card>

          {/* Active Courses */}
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Khóa học đang mở
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">24</div>
              <p className="text-xs text-blue-600 mt-1">6 môn học chính</p>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tỉ lệ hoàn thành
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">78.5%</div>
              <p className="text-xs text-green-600 mt-1">
                +5.2% so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Students by Subject */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                Số lượng học sinh theo môn học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectData}>
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
                    dataKey="students"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart - Learning Progress */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <TrendingUp className="h-5 w-5" />
                Tỉ lệ trạng thái lộ trình học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
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
                {progressData.map((item, index) => (
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
        </div>

        {/* Quick Actions */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-700 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-blue-700">Thêm học sinh</h3>
                <p className="text-sm text-gray-600">
                  Tạo tài khoản mới cho học sinh
                </p>
              </div>
              <div className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
                <BookOpen className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-semibold text-orange-700">Tạo khóa học</h3>
                <p className="text-sm text-gray-600">
                  Thiết lập khóa học mới cho học sinh
                </p>
              </div>
              <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
                <GraduationCap className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-green-700">Xem báo cáo</h3>
                <p className="text-sm text-gray-600">
                  Theo dõi tiến độ học tập chi tiết
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
