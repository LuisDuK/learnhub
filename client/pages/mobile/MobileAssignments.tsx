import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const assignments = [
  { id: "quiz-1", title: "Trắc nghiệm To��n: Phân số", due: "Hạn 20:00 hôm nay" },
  { id: "hw-2", title: "BTVN Khoa học: Vật chất", due: "Hạn 02/09" },
];

export default function MobileAssignments() {
  return (
    <div className="space-y-3 p-4">
      {assignments.map((a) => (
        <Card key={a.id} className="border-accent/30">
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.due}</p>
            </div>
            <Link to={`/m/quiz/${a.id}`}>
              <Button>Vào làm</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
