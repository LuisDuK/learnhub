import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Tổng giờ học", value: "12.5h" },
  { label: "Bài đã hoàn thành", value: 36 },
  { label: "Chuỗi ngày học", value: 7 },
];

const bars = [
  { day: "T2", val: 30 },
  { day: "T3", val: 50 },
  { day: "T4", val: 20 },
  { day: "T5", val: 70 },
  { day: "T6", val: 40 },
  { day: "T7", val: 60 },
  { day: "CN", val: 20 },
];

export default function MobileProgress() {
  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="border-primary/20">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-accent/30">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base">Hoạt động tuần này</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-end justify-between gap-1">
            {bars.map((b) => (
              <div key={b.day} className="flex w-full flex-col items-center gap-1">
                <div className="w-5 rounded-md bg-primary" style={{ height: `${b.val * 1.2}px` }} />
                <span className="text-[10px] text-muted-foreground">{b.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
