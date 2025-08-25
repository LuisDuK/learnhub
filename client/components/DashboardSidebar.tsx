import { cn } from "@/lib/utils";
import {
  Sparkles,
  Gamepad2,
  Calendar,
  Bot,
  Trophy,
  Heart,
  Home,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "🏠 Trang chủ",
    icon: Home,
    href: "/",
  },
  {
    title: "📚 Các khóa học",
    icon: Gamepad2,
    href: "/courses",
  },
  {
    title: "📅 Kế hoạch học",
    icon: Calendar,
    href: "/study-plan",
  },
  {
    title: "🤖 Trợ lý thông minh",
    icon: Bot,
    href: "/chatbot",
  },
  {
    title: "🏆 Thành tích của bé",
    icon: Trophy,
    href: "/progress",
  },
  {
    title: "⚙️ Cài đặt",
    icon: Heart,
    href: "/settings",
  },
];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data (localStorage, sessionStorage, etc.)
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-sidebar-background to-accent/20 border-r border-primary/20 shadow-lg">
      {/* Logo */}
      <div
        className="flex h-16 items-center border-b border-gray-200"
        style={{ padding: "0 30px 0 24px" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-pulse">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🌟 KidsLearn
            </span>
            <span className="text-xs text-muted-foreground">
              Học vui, học giỏi!
            </span>
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
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-md border border-primary/20"
                  : "text-gray-600 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 hover:text-primary",
              )}
            >
              {isActive ? (
                <>
                  <item.icon
                    className={cn("h-5 w-5 transition-colors", "text-primary")}
                  />
                  <span className="flex-1">{item.title}</span>
                  <ChevronRight className="h-4 w-4 text-primary" />
                </>
              ) : (
                <span className="flex-1 font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-3 border border-primary/20">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-bounce">
            <span className="text-lg">🧒</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary truncate">
              Bé Minh Đức
            </p>
            <p className="text-xs text-muted-foreground truncate">
              ✨ Học sinh thông minh
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300 rounded-xl"
        >
          <LogOut className="h-4 w-4 mr-2" />
          👋 Tạm biệt
        </Button>
      </div>
    </div>
  );
}
