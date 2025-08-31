import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MobileResults() {
  const loc = useLocation() as {
    state?: { score: number; total: number; id?: string };
  };
  const score = loc.state?.score ?? 0;
  const total = loc.state?.total ?? 0;

  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">Kết quả</p>
          <p className="mt-1 text-3xl font-extrabold text-primary">
            {score} / {total}
          </p>
        </CardContent>
      </Card>
      <Link to="/m">
        <Button className="w-full">Về Trang chủ</Button>
      </Link>
    </div>
  );
}
