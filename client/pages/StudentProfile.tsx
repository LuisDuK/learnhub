import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, School, Info, Key, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/DashboardLayout";

interface StudentProfileData {
  fullName: string;
  dateOfBirth: string; // ISO date
  className: string;
  school: string;
  address: string;
  avatar: string;
}

const mockStudent: StudentProfileData = {
  fullName: "Nguyễn Minh Đức",
  dateOfBirth: "2015-09-05",
  className: "Lớp 3A",
  school: "Tiểu học Chu Văn An",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  avatar: "/placeholder.svg",
};

export default function StudentProfile() {
  const [data, setData] = useState<StudentProfileData>(mockStudent);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    ...mockStudent,
    newPassword: "",
    confirmPassword: "",
  } as StudentProfileData & { newPassword: string; confirmPassword: string });

  const initials = data.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  function validate(): string | null {
    if (!form.fullName.trim()) return "Vui lòng nhập họ tên";
    if (!form.dateOfBirth) return "Vui lòng chọn ngày sinh";
    if (!form.className.trim()) return "Vui lòng nhập lớp";
    if (!form.school.trim()) return "Vui lòng nhập trường";
    const np = (form as any).newPassword as string;
    const cp = (form as any).confirmPassword as string;
    if (np || cp) {
      if (np.length < 8) return "Mật khẩu mới tối thiểu 8 ký tự";
      if (np !== cp) return "Mật khẩu xác nhận không khớp";
    }
    return null;
  }

  function handleSave() {
    const err = validate();
    if (err) {
      toast({ title: "Lỗi", description: err, variant: "destructive" as any });
      return;
    }
    setTimeout(() => {
      const { newPassword: _np, confirmPassword: _cp, ...payload } = form as any;
      setData(payload);
      setIsEditing(false);
      toast({
        title: "Đã cập nhật",
        description: "Hồ sơ đã được lưu thành công.",
      });
    }, 600);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Overview */}
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={data.avatar} alt={data.fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{data.fullName}</h2>
              {/* Thông tin chi tiết được đưa xuống thẻ bên dưới, không hiển thị trên thanh này nữa */}
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary">Học sinh</Badge>
                <Badge variant="outline">Đang theo học</Badge>
              </div>
            </div>
            <div className="ml-auto">
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setForm({
                        ...(data as any),
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button onClick={handleSave}>Lưu thay đổi</Button>
                </div>
              ) : (
                <Button onClick={() => { setForm({ ...(data as any), newPassword: "", confirmPassword: "" }); setIsEditing(true); }}>Chỉnh sửa</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Thông tin học sinh - hiển thị kiểu như trang giáo viên */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin học sinh</CardTitle>
            <CardDescription>Chi tiết hồ sơ cá nhân</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                {isEditing ? (
                  <Input
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{data.fullName}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Ngày sinh</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">
                    {new Date(data.dateOfBirth).toLocaleDateString("vi-VN")}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Lớp</Label>
                {isEditing ? (
                  <Input
                    value={form.className}
                    onChange={(e) => setForm({ ...form, className: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{data.className}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Trường</Label>
                {isEditing ? (
                  <Input
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{data.school}</div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Địa chỉ</Label>
                {isEditing ? (
                  <Input
                    value={(form as any).address || ""}
                    onChange={(e) =>
                      setForm({ ...(form as any), address: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{data.address}</div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Ảnh đại diện (URL)</Label>
                {isEditing ? (
                  <Input
                    value={form.avatar}
                    onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded break-all">{data.avatar}</div>
                )}
              </div>
            </div>

            {isEditing && (
              <>
                <Separator />
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Key className="h-4 w-4" /> Mật khẩu mới
                    </Label>
                    <Input
                      type="password"
                      value={(form as any).newPassword}
                      onChange={(e) =>
                        setForm({ ...(form as any), newPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Xác nhận mật khẩu</Label>
                    <Input
                      type="password"
                      value={(form as any).confirmPassword}
                      onChange={(e) =>
                        setForm({ ...(form as any), confirmPassword: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Thông tin liên hệ</CardTitle>
            <CardDescription>Thông tin liên hệ của nhà trường</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 rounded-lg border">
              <div className="font-medium">Trường</div>
              <div className="text-sm text-muted-foreground">
                {data.school} • Phòng giáo vụ
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
