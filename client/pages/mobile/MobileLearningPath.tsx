import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const path = [
  { id: 1, title: "Chương 1: Số tự nhiên", status: "done" },
  { id: 2, title: "Chương 2: Phân số", status: "current" },
  { id: 3, title: "Chương 3: Hình học cơ bản", status: "locked" },
];

export default function MobileLearningPath() {
  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-2"><CardTitle className="text-base">Lộ trình học</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {path.map((p) => (
            <div key={p.id} className={`flex items-center justify-between rounded-xl border p-3 ${p.status === "done" ? "border-primary/20 bg-primary/5" : p.status === "current" ? "border-accent/30 bg-accent/5" : "border-muted"}`}>
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.status === "done" ? "Đã hoàn thành" : p.status === "current" ? "Đang học" : "Chưa mở khóa"}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs ${p.status === "done" ? "bg-primary text-primary-foreground" : p.status === "current" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}>
                {p.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
