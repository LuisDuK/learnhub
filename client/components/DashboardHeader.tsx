import React from "react";
import { Search, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem("user");
    sessionStorage.clear();
    // Navigate to login page
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-primary/20 bg-gradient-to-r from-white via-accent/5 to-primary/5 px-6 shadow-sm">
      {/* Search bar */}
      <div className="flex flex-1 items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary animate-pulse" />
          <Input
            type="search"
            placeholder="Tìm kiếm bài học vui nhộn..."
            className="pl-10 pr-4 w-full border-primary/20 focus:border-primary focus:ring-primary rounded-xl bg-white/80 backdrop-blur"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-110 transition-transform duration-300 hover:bg-primary/10 rounded-xl"
            >
              <Bell className="h-5 w-5 text-primary animate-wiggle" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-400 to-pink-400 animate-bounce"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 border-primary/20 shadow-xl"
          >
            <DropdownMenuLabel className="text-primary font-bold">
              🔔 Thông báo vui
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 hover:bg-primary/5 rounded-lg m-1">
              <div className="flex w-full justify-between items-center">
                <span className="font-medium text-primary">
                  🎮 Bài tập mới!
                </span>
                <span className="text-xs text-gray-500">2 phút trước</span>
              </div>
              <span className="text-sm text-gray-600">
                Bài tập "Làm game vui" đã sẵn sàng cho bé!
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 hover:bg-accent/5 rounded-lg m-1">
              <div className="flex w-full justify-between items-center">
                <span className="font-medium text-accent">
                  ⏰ Nhắc nhở học tập
                </span>
                <span className="text-xs text-gray-500">10 phút trước</span>
              </div>
              <span className="text-sm text-gray-600">
                Đã đến giờ học "Toán học thú vị" rồi bé ơi!
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 hover:bg-secondary/5 rounded-lg m-1">
              <div className="flex w-full justify-between items-center">
                <span className="font-medium text-secondary">
                  🎉 Chúc mừng!
                </span>
                <span className="text-xs text-gray-500">1 giờ trước</span>
              </div>
              <span className="text-sm text-gray-600">
                Bé đã hoàn thành "Vẽ tranh màu sắc"! Giỏi quá!
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full hover:scale-110 transition-transform duration-300"
            >
              <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold animate-heartbeat">
                  🧒
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 border-primary/20 shadow-xl"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg m-1">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-bold text-primary leading-none">
                  Bé Minh Đức
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  Học sinh thông minh
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem
              className="hover:bg-primary/5 rounded-lg m-1 cursor-pointer"
              onClick={handleSettings}
            >
              <Settings className="mr-2 h-4 w-4 text-primary" />
              <span>Cài đặt</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem
              className="text-red-500 hover:bg-red-50 rounded-lg m-1 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Tạm biệt</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
