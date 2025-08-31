import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const lessons = [
  { id: "l1", title: "Giới thiệu", type: "video" },
  { id: "l2", title: "Bài tập cơ bản", type: "exercise" },
  { id: "l3", title: "Tổng kết chương", type: "pdf" },
];

export default function MobileCourseDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Khóa học: {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nội dung, video và tài liệu học sẽ hiển thị tại đây.</p>
        </CardContent>
      </Card>

      <Card className="border-accent/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Danh sách bài học</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {lessons.map((l) => {
            let to = "";
            if (l.type === "video") to = `/m/course/${id}/lesson/${l.id}`;
            else if (l.type === "exercise") to = `/m/quiz/${l.id}`;
            else to = `/m/course/${id}/material/${l.id}`;
            return (
              <div key={l.id} className="flex items-center justify-between rounded-xl border border-primary/10 p-3">
                <div>
                  <p className="text-sm font-semibold">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.type.toUpperCase()}</p>
                </div>
                <Link to={to}>
                  <Button variant="outline">Vào học</Button>
                </Link>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
