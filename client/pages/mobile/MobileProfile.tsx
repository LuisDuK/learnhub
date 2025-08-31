import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MobileProfile() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-14 w-14 border-2 border-primary/20">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-bold">Bé Minh Đức</p>
          <p className="text-sm text-muted-foreground">Lớp 6 • Việt Nam</p>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <span>Thông tin cá nhân</span>
            <Button variant="outline">Chỉnh sửa</Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Cài đặt</span>
            <Button variant="outline">Mở</Button>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" variant="destructive">
        Đăng xuất
      </Button>
    </div>
  );
}
