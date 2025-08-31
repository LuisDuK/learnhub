import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const courses = [
  {
    id: "math-6",
    title: "Toán 6",
    tag: "Cơ bản",
    progress: 42,
    color: "from-primary/15 to-primary/5",
  },
  {
    id: "sci-6",
    title: "Khoa học 6",
    tag: "Thí nghiệm",
    progress: 28,
    color: "from-accent/15 to-accent/5",
  },
  {
    id: "eng-6",
    title: "Tiếng Anh 6",
    tag: "Giao tiếp",
    progress: 73,
    color: "from-secondary/15 to-secondary/5",
  },
];

export default function MobileCourses() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {courses.map((c) => (
        <Link
          key={c.id}
          to={`/m/course/${c.id}`}
          className={`rounded-2xl border border-primary/20 bg-gradient-to-br ${c.color} p-4 shadow-sm hover:scale-[1.02] transition-transform`}
        >
          <p className="font-semibold">{c.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary">{c.tag}</Badge>
            <span className="text-xs text-muted-foreground">{c.progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary"
              style={{ width: `${c.progress}%` }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
