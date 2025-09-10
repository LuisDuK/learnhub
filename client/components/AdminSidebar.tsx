import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Route,
  PenTool,
  BarChart3,
  Settings,
  Home,
  ChevronRight,
  LogOut,
  Shield,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Tổng quan",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Quản lý người dùng",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Quản lý môn học",
    icon: BookOpen,
    href: "/admin/subjects",
  },
  {
    title: "Cấu hình AI (Quản trị viên)",
    icon: Settings,
    href: "/admin/ai-config",
  },
  {
    title: "Cài đặt hệ thống",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleBackToStudent = () => {
    navigate("/");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-blue-50 to-orange-50 border-r border-blue-200 shadow-lg">
      {/* Logo */}
      <div
        className="flex h-16 items-center border-b border-blue-200"
        style={{ padding: "0 30px 0 24px" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-500 animate-pulse">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              KidsLearn Admin
            </span>
            <span className="text-xs text-blue-600">Hệ thống quản trị</span>
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
                  ? "bg-gradient-to-r from-blue-100 to-orange-100 text-blue-700 shadow-md border border-blue-200"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600",
              )}
            >
              {isActive ? (
                <>
                  <item.icon
                    className={cn("h-5 w-5 transition-colors", "text-blue-600")}
                  />
                  <span className="flex-1">{item.title}</span>
                  <ChevronRight className="h-4 w-4 text-blue-600" />
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

      {/* Admin section */}
      <div className="border-t border-blue-200 px-4 pt-4 pb-2 space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-100 to-orange-100 p-3 border border-blue-200">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center">
            <span className="text-lg text-white font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-blue-700 truncate">
              Admin Nguyễn Đức
            </p>
            <p className="text-xs text-blue-600 truncate">
              Quản trị viên hệ thống
            </p>
          </div>
        </div>

        {/* Back to Student View */}
        <Button
          onClick={handleBackToStudent}
          variant="outline"
          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-300 rounded-xl"
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
