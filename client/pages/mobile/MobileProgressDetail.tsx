import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const courseProgress = [
  { course: "Toán 6", completed: 12, total: 20 },
  { course: "Khoa học 6", completed: 6, total: 18 },
  { course: "Tiếng Anh 6", completed: 22, total: 30 },
];

const daily = [
  { day: "T2", mins: 35 },
  { day: "T3", mins: 50 },
  { day: "T4", mins: 10 },
  { day: "T5", mins: 70 },
  { day: "T6", mins: 40 },
  { day: "T7", mins: 55 },
  { day: "CN", mins: 15 },
];

export default function MobileProgressDetail() {
  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tổng quan theo khóa học</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courseProgress.map((c) => {
            const pct = Math.round((c.completed / c.total) * 100);
            return (
              <div
                key={c.course}
                className="rounded-xl border border-primary/10 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{c.course}</p>
                  <span className="text-xs text-muted-foreground">
                    {c.completed}/{c.total}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-accent/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Thời gian học từng ngày</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-1">
            {daily.map((d) => (
              <div
                key={d.day}
                className="flex w-full flex-col items-center gap-1"
              >
                <div
                  className="w-6 rounded-md bg-accent"
                  style={{ height: `${d.mins * 1}px` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {d.day}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {d.mins}p
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
