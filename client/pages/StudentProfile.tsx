import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Phone, User, School, Target, Users, Info } from "lucide-react";
import { useState } from "react";

interface ParentInfo {
  fatherName?: string;
  motherName?: string;
  phone: string;
  email?: string;
}

interface StudentProfileData {
  fullName: string;
  dateOfBirth: string; // ISO date
  className: string;
  school: string;
  avatar: string;
  studyGoals: string[];
  parent: ParentInfo;
}

const mockStudent: StudentProfileData = {
  fullName: "Nguyễn Minh Đức",
  dateOfBirth: "2015-09-05",
  className: "Lớp 3A",
  school: "Tiểu học Chu Văn An",
  avatar: "/placeholder.svg",
  studyGoals: [
    "Hoàn thành Toán lớp 3 với điểm > 9.0",
    "Đọc hiểu tốt các đoạn văn ngắn",
    "Giao tiếp tiếng Anh cơ bản",
  ],
  parent: {
    fatherName: "Nguyễn Văn An",
    motherName: "Trần Thị Hoa",
    phone: "0901 234 567",
    email: "phuhuynh.duc@example.com",
  },
};

export default function StudentProfile() {
  const [data] = useState<StudentProfileData>(mockStudent);
  const [openGoalIdx, setOpenGoalIdx] = useState<number | null>(null);
  const [openContact, setOpenContact] = useState(false);

  const initials = data.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-7 w-7 text-primary" /> Hồ sơ học sinh
          </h1>
          <p className="text-muted-foreground mt-1">
            Xem thông tin cá nhân, mục tiêu học tập và liên hệ phụ huynh
          </p>
        </div>

        {/* Overview */}
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={data.avatar} alt={data.fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{data.fullName}</h2>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(data.dateOfBirth).toLocaleDateString("vi-VN")}</span>
                <span className="inline-flex items-center gap-1"><School className="h-4 w-4" /> {data.school}</span>
                <span className="inline-flex items-center gap-1"><Info className="h-4 w-4" /> {data.className}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary">Học sinh</Badge>
                <Badge variant="outline">Đang theo học</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{data.studyGoals.length}</div>
                <div className="text-xs text-muted-foreground">Mục tiêu</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">1</div>
                <div className="text-xs text-muted-foreground">Liên hệ phụ huynh</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals" className="flex items-center gap-2"><Target className="h-4 w-4" /> Mục tiêu học tập</TabsTrigger>
            <TabsTrigger value="parent" className="flex items-center gap-2"><Users className="h-4 w-4" /> Thông tin phụ huynh</TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2"><Phone className="h-4 w-4" /> Liên hệ</TabsTrigger>
          </TabsList>

          {/* Goals */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> Mục tiêu học tập</CardTitle>
                <CardDescription>Danh sách mục tiêu hiện tại của học sinh</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.studyGoals.map((g, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary">#{idx + 1}</Badge>
                      <span>{g}</span>
                    </div>
                    <Dialog open={openGoalIdx === idx} onOpenChange={(o) => setOpenGoalIdx(o ? idx : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Xem chi tiết</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chi tiết mục tiêu #{idx + 1}</DialogTitle>
                          <DialogDescription>Mục tiêu cụ thể và gợi ý thực hiện</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p className="font-medium">{g}</p>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            <li>Chia nhỏ thành các mốc theo tuần</li>
                            <li>Theo dõi tiến độ trên trang Tiến độ</li>
                            <li>Nhận nhắc nhở phù hợp lịch học</li>
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parent */}
          <TabsContent value="parent">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Thông tin phụ huynh</CardTitle>
                <CardDescription>Thông tin liên hệ và người giám hộ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.parent.fatherName && (
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span>Cha: <span className="font-medium">{data.parent.fatherName}</span></span>
                    <Badge variant="outline">Giám hộ</Badge>
                  </div>
                )}
                {data.parent.motherName && (
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span>Mẹ: <span className="font-medium">{data.parent.motherName}</span></span>
                    <Badge variant="secondary">Phụ huynh</Badge>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <span>Số điện thoại: <span className="font-medium">{data.parent.phone}</span></span>
                  <Button variant="outline" size="sm" onClick={() => setOpenContact(true)}>Xem chi tiết</Button>
                </div>
                {data.parent.email && (
                  <div className="p-3 rounded-lg border text-sm text-muted-foreground">
                    Email: {data.parent.email}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" /> Thông tin liên hệ</CardTitle>
                <CardDescription>Thông tin liên hệ của phụ huynh và nhà trường</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 rounded-lg border">
                  <div className="font-medium">Phụ huynh</div>
                  <div className="text-sm text-muted-foreground">{data.parent.phone} {data.parent.email ? `• ${data.parent.email}` : ""}</div>
                </div>
                <div className="p-3 rounded-lg border">
                  <div className="font-medium">Trường</div>
                  <div className="text-sm text-muted-foreground">{data.school} • Phòng giáo vụ</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Dialog */}
        <Dialog open={openContact} onOpenChange={setOpenContact}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết liên hệ phụ huynh</DialogTitle>
              <DialogDescription>Thông tin liên hệ để nhà trường/giáo viên tiện trao đổi</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              {data.parent.fatherName && <p>Cha: <span className="font-medium">{data.parent.fatherName}</span></p>}
              {data.parent.motherName && <p>Mẹ: <span className="font-medium">{data.parent.motherName}</span></p>}
              <p>Điện thoại: <span className="font-medium">{data.parent.phone}</span></p>
              {data.parent.email && <p>Email: <span className="font-medium">{data.parent.email}</span></p>}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
