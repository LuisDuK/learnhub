import React from "react";
import { Link } from "react-router-dom";
import { Bell, PlayCircle, FileText, Trophy, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const enrolled = [
  { id: "math-6", title: "Toán lớp 6", progress: 42, color: "from-primary/15 to-primary/5" },
  { id: "sci-6", title: "Khoa học lớp 6", progress: 28, color: "from-accent/15 to-accent/5" },
  { id: "eng-6", title: "Tiếng Anh lớp 6", progress: 73, color: "from-secondary/15 to-secondary/5" },
];

const quick = [
  { to: "/m/assignments", title: "Bài tập", desc: "Làm ngay", icon: ClipboardList, color: "bg-gradient-to-br from-primary/10 to-accent/10" },
  { to: "/m/courses", title: "Tiếp tục học", desc: "Bài gần đây", icon: PlayCircle, color: "bg-gradient-to-br from-accent/10 to-secondary/10" },
  { to: "/m/progress", title: "Thử thách", desc: "Tăng streak", icon: Trophy, color: "bg-gradient-to-br from-secondary/10 to-primary/10" },
  { to: "/m/courses", title: "Tài liệu", desc: "PDF, bài tập", icon: FileText, color: "bg-gradient-to-br from-primary/10 to-secondary/10" },
];

export default function MobileHome() {
  return (
    <div className="space-y-5 p-4">
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold">Chào bé Minh Đức! ✨</h1>
            <p className="text-sm text-muted-foreground">Hôm nay bé học gì vui nhỉ?</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Thông báo">
            <Bell className="h-6 w-6 text-primary animate-wiggle" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quick.map((q) => (
          <Link key={q.title} to={q.to} className={`rounded-2xl border border-primary/20 p-4 ${q.color} hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">{q.title}</p>
                <p className="text-xs text-muted-foreground">{q.desc}</p>
              </div>
              <q.icon className="h-7 w-7 text-primary" />
            </div>
          </Link>
        ))}
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Khóa học đang tham gia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1">
            {enrolled.map((c) => (
              <Link key={c.id} to={`/m/course/${c.id}`} className={`snap-start w-64 shrink-0 rounded-2xl border border-primary/20 p-4 shadow-md bg-gradient-to-br ${c.color}`}>
                <p className="font-semibold">{c.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Hoàn thành {c.progress}%</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="border-accent/30 text-center">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Chuỗi ngày</p>
            <p className="text-lg font-extrabold text-primary">7🔥</p>
          </CardContent>
        </Card>
        <Card className="border-accent/30 text-center">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Giờ học</p>
            <p className="text-lg font-extrabold text-primary">12.5h</p>
          </CardContent>
        </Card>
        <Card className="border-accent/30 text-center">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Bài hoàn thành</p>
            <p className="text-lg font-extrabold text-primary">36</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
