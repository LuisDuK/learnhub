import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Play, Lock, Flag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const path = [
  { id: 1, title: "Chương 1: Số tự nhiên", status: "done" as const },
  { id: 2, title: "Chương 2: Phân số", status: "current" as const },
  { id: 3, title: "Chương 3: Hình học cơ bản", status: "locked" as const },
];

export default function MobileLearningPath() {
  const doneCount = path.filter((p) => p.status === "done").length;
  const pct = Math.round((doneCount / path.length) * 100);

  return (
    <div className="space-y-4 p-4">
      {/* Header Progress */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Lộ trình học</p>
            <p className="text-2xl font-extrabold text-primary">{pct}%</p>
            <p className="text-xs text-muted-foreground">{doneCount}/{path.length} chương</p>
          </div>
          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-accent/30">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base">Các chương</CardTitle>
          <Link to="/m/plan/create">
            <Button size="sm" variant="outline" className="rounded-full">
              <Flag className="mr-1 h-4 w-4" /> Tạo lộ trình
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <ol className="relative ml-4 border-l-2 border-primary/20">
            {path.map((p, idx) => {
              const isDone = p.status === "done";
              const isCurrent = p.status === "current";
              const isLocked = p.status === "locked";
              return (
                <li key={p.id} className="mb-5 ml-4">
                  <span className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    isDone
                      ? "border-primary bg-primary/20"
                      : isCurrent
                      ? "border-accent bg-accent/20 animate-pulse"
                      : "border-muted bg-muted"
                  }`}>
                    {isDone && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    {isCurrent && <Play className="h-4 w-4 text-accent" />}
                    {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </span>
                  <div className={`rounded-xl border p-3 shadow-sm ${
                    isDone
                      ? "border-primary/20 bg-gradient-to-r from-primary/10 to-white"
                      : isCurrent
                      ? "border-accent/30 bg-gradient-to-r from-accent/10 to-white"
                      : "border-muted bg-card"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{isDone ? "Đã hoàn thành" : isCurrent ? "Đang học" : "Chưa mở khóa"}</p>
                      </div>
                      {isCurrent ? (
                        <Link to="/m/courses">
                          <Button size="sm">Tiếp tục</Button>
                        </Link>
                      ) : isDone ? (
                        <Link to="/m/courses">
                          <Button size="sm" variant="outline">Ôn lại</Button>
                        </Link>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Khóa
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
