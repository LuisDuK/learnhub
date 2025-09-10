import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MobileMaterial() {
  const { id, materialId } = useParams();
  return (
    <div className="space-y-4 p-4">
      <Card className="border-accent/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tài liệu: {materialId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/10"></div>
          <div className="flex gap-2">
            <Button>Tải PDF</Button>
            <Button variant="outline">Mở đọc</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Tài liệu thuộc môn học: {id}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
