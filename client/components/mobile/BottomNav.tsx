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
      aria-label="Điều hướng chính"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-gradient-to-t from-background/95 to-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-screen-sm px-3 py-2">
        <ul className="relative grid grid-cols-5 gap-2 rounded-3xl border border-primary/20 bg-white/60 p-2 shadow-xl backdrop-blur-md dark:bg-card/60">
          {tabs.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/m"}
                className={({ isActive }) =>
                  cn(
                    "group relative flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-[11px] font-semibold transition-all",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        "absolute inset-0 -z-10 scale-95 rounded-2xl bg-gradient-to-b from-primary/10 to-accent/10 opacity-0 shadow-md transition-all",
                        isActive && "scale-100 opacity-100",
                      )}
                    />
                    <Icon className={cn("mb-0.5 h-6 w-6 transition-transform", isActive ? "animate-bounce" : "group-hover:scale-110")}/>
                    <span className="leading-none">{label}</span>
                    <span
                      className={cn(
                        "mt-1 h-1 w-1 rounded-full bg-primary transition-opacity",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50",
                      )}
                    />
                    {label === "Bài tập" && (
                      <span className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-red-400 to-pink-400 px-1.5 text-[10px] font-bold text-white shadow-sm">2</span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
