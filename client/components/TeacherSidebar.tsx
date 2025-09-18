import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  BarChart3,
  Settings,
  Home,
  ChevronRight,
  LogOut,
  GraduationCap,
  Bot,
  User,
  Shield,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Tổng quan",
    icon: LayoutDashboard,
    href: "/teacher",
  },
  {
    title: "Quản lý bài học",
    icon: PenTool,
    href: "/teacher/lessons",
  },
  {
    title: "AI sinh bài tập",
    icon: Bot,
    href: "/teacher/ai-generator",
  },
  {
    title: "Báo cáo & Thống kê",
    icon: BarChart3,
    href: "/teacher/reports",
  },
  {
    title: "Thông tin cá nhân",
    icon: User,
    href: "/teacher/profile",
  },
  {
    title: "Bảo mật",
    icon: Shield,
    href: "/teacher/security",
  },
];

export function TeacherSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleBackToStudent = () => {
    navigate("/");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-green-50 to-blue-50 border-r border-green-200 shadow-lg">
      {/* Logo */}
      <div
        className="flex h-16 items-center border-b border-green-200"
        style={{ padding: "0 30px 0 24px" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500 animate-pulse">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              KidsLearn Teacher
            </span>
            <span className="text-xs text-green-600">Dành cho giáo viên</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 hover:scale-105",
                isActive
                  ? "bg-gradient-to-r from-green-100 to-blue-100 text-green-700 shadow-md border border-green-200"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600",
              )}
            >
              {isActive ? (
                <>
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      "text-green-600",
                    )}
                  />
                  <span className="flex-1">{item.title}</span>
                  <ChevronRight className="h-4 w-4 text-green-600" />
                </>
              ) : (
                <>
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 font-medium">{item.title}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Teacher section */}
      <div className="border-t border-green-200 px-4 pt-4 pb-2 space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 p-3 border border-green-200">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <span className="text-lg text-white font-bold">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-green-700 truncate">
              Gi��o viên Nguyễn Thị Lan
            </p>
            <p className="text-xs text-green-600 truncate">
              Toán học - 5 năm kinh nghiệm
            </p>
          </div>
        </div>

        {/* Back to Student View */}
        <Button
          onClick={handleBackToStudent}
          variant="outline"
          className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-all duration-300 rounded-xl"
        >
          <Home className="h-4 w-4 mr-2" />
          Chế độ học sinh
        </Button>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300 rounded-xl"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
