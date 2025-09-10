import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MobileLesson() {
  const { id, lessonId } = useParams();
  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Bài giảng: {lessonId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10"></div>
          <p className="text-sm text-muted-foreground">
            Video bài học và ghi chú sẽ hiển thị ở đây. Môn học: {id}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
