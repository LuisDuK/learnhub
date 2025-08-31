import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MobileLearningPathCreate() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/m/plan");
  }

  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tạo lộ trình học</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <Input
              placeholder="Tên lộ trình (vd: Ôn Toán HK1)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Mục tiêu (vd: Hoàn thành 3 chương/tuần)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Tạo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
