import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  MessageSquare,
  Settings,
  User,
  LogOut,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function TeacherHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    sessionStorage.clear();
    navigate("/login");
  };

  const pageTitle = (() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "";
    const last = parts[parts.length - 1];
    const map: Record<string, string> = {
      teacher: "Bảng điều khiển",
      "ai-generator": "AI Sinh bài tập",
      lessons: "Quản lý bài học",
      profile: "Thông tin cá nhân",
      security: "Bảo mật",
    };
    return map[last] || last.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  })();

  return (
    <header className="flex h-16 items-center justify-between border-b border-green-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-md bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col -ml-1">
          <div className="text-sm font-semibold">KidsLearn Teacher</div>
          {pageTitle && <div className="text-xs text-gray-600">{pageTitle}</div>}
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        {pageTitle && <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">3</Badge>
        </Button>

        <Button variant="ghost" size="sm" className="relative">
          <MessageSquare className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 p-0 text-xs text-white">7</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">Nguyễn Thị Lan</p>
                <p className="text-xs text-gray-600">Giáo viên</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Nguyễn Thị Lan</p>
              <p className="text-xs text-gray-600">giaovien@email.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/teacher/profile") }>
              <User className="mr-2 h-4 w-4" />
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/teacher/security") }>
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt bảo mật
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
