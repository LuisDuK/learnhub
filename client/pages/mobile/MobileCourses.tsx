import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const courses = [
  { id: "math-6", title: "Toán 6", tag: "Cơ bản", progress: 42 },
  { id: "sci-6", title: "Khoa học 6", tag: "Thí nghiệm", progress: 28 },
  { id: "eng-6", title: "Tiếng Anh 6", tag: "Giao tiếp", progress: 73 },
];

export default function MobileCourses() {
  return (
    <div className="space-y-3 p-4">
      {courses.map((c) => (
        <Link key={c.id} to={`/m/course/${c.id}`}>
          <Card className="border-primary/20 hover:bg-accent/5">
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{c.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="secondary">{c.tag}</Badge>
                  <span className="text-xs text-muted-foreground">{c.progress}%</span>
                </div>
              </div>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
