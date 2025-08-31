import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Tổng giờ học", value: "12.5h" },
  { label: "Bài đã hoàn thành", value: 36 },
  { label: "Chuỗi ngày học", value: 7 },
];

const week = [
  { day: "T2", val: 30 },
  { day: "T3", val: 50 },
  { day: "T4", val: 20 },
  { day: "T5", val: 70 },
  { day: "T6", val: 40 },
  { day: "T7", val: 60 },
  { day: "CN", val: 20 },
];
const month = Array.from({ length: 30 }, (_, i) => ({ day: String(i + 1), val: Math.floor(Math.random() * 70) + 10 }));

export default function MobileProgress() {
  const [range, setRange] = useState<"week" | "month">("week");
  const data = range === "week" ? week : month;

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 p-3">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/60 p-3 text-center shadow-sm backdrop-blur dark:bg-card/60">
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
              <p className="text-xl font-extrabold text-primary">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-accent/30">
        <CardHeader className="flex items-center justify-between p-4 pb-0">
          <CardTitle className="text-base">Hoạt động {range === "week" ? "tuần này" : "tháng này"}</CardTitle>
          <div className="inline-flex rounded-xl border border-primary/20 bg-background p-1 text-xs">
            <button onClick={() => setRange("week")} className={`rounded-lg px-2 py-1 ${range === "week" ? "bg-primary text-white" : "text-foreground"}`}>Tuần</button>
            <button onClick={() => setRange("month")} className={`rounded-lg px-2 py-1 ${range === "month" ? "bg-primary text-white" : "text-foreground"}`}>Tháng</button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-end justify-between gap-1">
            {data.map((b) => (
              <div key={b.day} className="flex w-full flex-col items-center gap-1">
                <div className="w-6 rounded-full bg-gradient-to-t from-primary to-accent" style={{ height: `${Math.max(10, b.val)}px` }} />
                <span className="text-[10px] text-muted-foreground">{b.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Link to="/m/progress/detail">
              <Button variant="outline" className="rounded-2xl h-10 px-4">Xem chi tiết</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/m/plan" className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-4 text-center">
          <p className="text-sm font-bold">Lộ trình học</p>
          <p className="text-xs text-muted-foreground">Xem các chương</p>
        </Link>
        <Link to="/m/plan/create" className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/10 p-4 text-center">
          <p className="text-sm font-bold">Tạo lộ trình</p>
          <p className="text-xs text-muted-foreground">Theo mục tiêu</p>
        </Link>
      </div>
    </div>
  );
}
