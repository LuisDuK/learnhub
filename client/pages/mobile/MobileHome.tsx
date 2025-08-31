import React from "react";
import { Link } from "react-router-dom";
import { Bell, PlayCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const enrolled = [
  { id: "math-6", title: "Toán lớp 6", progress: 42 },
  { id: "sci-6", title: "Khoa học lớp 6", progress: 28 },
  { id: "eng-6", title: "Tiếng Anh lớp 6", progress: 73 },
];

export default function MobileHome() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Chào bé Minh Đức! ✨</h1>
          <p className="text-sm text-muted-foreground">Hôm nay bé học gì vui nhỉ?</p>
        </div>
        <Button variant="ghost" size="icon" aria-label="Thông báo">
          <Bell className="h-5 w-5 text-primary" />
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Khóa học đang tham gia</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3">
          {enrolled.map((c) => (
            <Link key={c.id} to={`/m/course/${c.id}`} className="block rounded-xl border border-primary/20 p-3 hover:bg-accent/5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">Hoàn thành {c.progress}%</p>
                </div>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="border-accent/30">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-semibold">Tiếp tục học</p>
              <p className="text-xs text-muted-foreground">Bài giảng gần đây</p>
            </div>
            <PlayCircle className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
        <Card className="border-primary/30">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-semibold">Tài liệu</p>
              <p className="text-xs text-muted-foreground">PDF, bài tập</p>
            </div>
            <FileText className="h-8 w-8 text-accent-foreground" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
