import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const assignments = [
  {
    id: "quiz-1",
    title: "Trắc nghiệm Toán: Phân số",
    due: "Hạn 20:00 hôm nay",
    urgent: true,
  },
  {
    id: "hw-2",
    title: "BTVN Khoa học: Vật chất",
    due: "Hạn 02/09",
    urgent: false,
  },
];

export default function MobileAssignments() {
  return (
    <div className="space-y-3 p-4">
      {assignments.map((a) => (
        <Card
          key={a.id}
          className={`rounded-2xl border ${a.urgent ? "border-red-300" : "border-accent/30"} bg-gradient-to-r from-primary/5 to-accent/5`}
        >
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{a.title}</p>
              <p
                className={`text-xs ${a.urgent ? "text-red-500" : "text-muted-foreground"}`}
              >
                {a.due}
              </p>
            </div>
            <Link to={`/m/quiz/${a.id}`}>
              <Button className="animate-heartbeat">Vào làm</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
