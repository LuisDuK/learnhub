import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Calendar,
  MessageCircle,
  TrendingUp,
  Settings,
  Home,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Tổng quan",
    icon: Home,
    href: "/",
  },
  {
    title: "Khóa học của tôi",
    icon: BookOpen,
    href: "/courses",
  },
  {
    title: "Study Plan",
    icon: Calendar,
    href: "/study-plan",
  },
  {
    title: "Chatbot",
    icon: MessageCircle,
    href: "/chatbot",
  },
  {
    title: "Báo cáo tiến độ",
    icon: TrendingUp,
    href: "/progress",
  },
  {
    title: "Cài đặt cá nhân",
    icon: Settings,
    href: "/settings",
  },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-gray-900">LearnHub</span>
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
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-gray-400 group-hover:text-gray-600",
                )}
              />
              <span className="flex-1">{item.title}</span>
              {isActive && <ChevronRight className="h-4 w-4 text-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              NMĐ
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Nguyễn Minh Đức
            </p>
            <p className="text-xs text-gray-500 truncate">Học viên</p>
          </div>
        </div>
      </div>
    </div>
  );
}
