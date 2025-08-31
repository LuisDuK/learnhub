import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, ClipboardList, BarChart2, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/m", label: "Trang chủ", icon: Home },
  { to: "/m/courses", label: "Khóa học", icon: BookOpen },
  { to: "/m/assignments", label: "Bài tập", icon: ClipboardList },
  { to: "/m/progress", label: "Tiến độ", icon: BarChart2 },
  { to: "/m/profile", label: "Cá nhân", icon: User },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-gradient-to-t from-background/95 to-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-screen-sm grid-cols-5 gap-1 px-2 py-2">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/m"}
              className={({ isActive }) =>
                cn(
                  "group flex flex-col items-center justify-center rounded-2xl px-2 py-1 text-xs font-medium transition-all",
                  isActive
                    ? "text-primary bg-gradient-to-b from-primary/10 to-accent/10"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/10",
                )
              }
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="leading-none">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
