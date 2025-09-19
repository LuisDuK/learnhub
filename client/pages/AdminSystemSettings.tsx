import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Shield,
  Upload,
  Save,
  Download,
  Database,
  Palette,
  Mail,
  Phone,
  Clock,
  Globe,
  Bell,
  Server,
  HardDrive,
  Monitor,
  Users,
  BookOpen,
  School,
} from "lucide-react";

// Mock backup data
const mockBackups = [
  {
    id: 1,
    filename: "backup_2024_01_28_14_30.sql",
    date: "2024-01-28 14:30:25",
    size: "2.3 MB",
    status: "Thành công",
  },
  {
    id: 2,
    filename: "backup_2024_01_27_14_30.sql",
    date: "2024-01-27 14:30:25",
    size: "2.1 MB",
    status: "Thành công",
  },
  {
    id: 3,
    filename: "backup_2024_01_26_14_30.sql",
    date: "2024-01-26 14:30:25",
    size: "2.0 MB",
    status: "Thành công",
  },
];

export default function AdminSystemSettings() {
  // Card A: System Information
  const [systemInfo, setSystemInfo] = useState({
    systemName: "KidsLearn - Hệ thống học tập cho trẻ em",
    logo: null,
    brandColor: "#3B82F6",
    supportEmail: "support@kidslearn.edu.vn",
    hotlinePhone: "1800-1234",
  });

  // Card B: User & Security Configuration
  const [userSecurity, setUserSecurity] = useState({
    passwordPolicy: "Trung bình",
    sessionTimeout: [30], // minutes
    enable2FA: false,
    allowNewRegistration: true,
  });

  // Card C: General Learning Configuration
  const [learningConfig, setLearningConfig] = useState({
    defaultLessonDuration: 30, // minutes
    maxExerciseRetries: 3,
    defaultLanguage: "Tiếng Việt",
  });

  // Card D: Notification & Email Configuration
  const [notificationConfig, setNotificationConfig] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpEmail: "system@kidslearn.edu.vn",
    smtpPassword: "",
    enableAutoEmails: true,
    enablePushNotifications: true,
  });

  // Card E: Backup & Recovery
  const [backups, setBackups] = useState(mockBackups);
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);

  const handleSaveSystemInfo = () => {
    alert("Thông tin hệ thống đã được lưu!");
  };

  const handleSaveUserSecurity = () => {
    alert("Cài đặt bảo mật đã được lưu!");
  };

  const handleSaveLearningConfig = () => {
    alert("Cấu hình học tập đã được lưu!");
  };

  const handleSaveNotificationConfig = () => {
    alert("Cấu hình thông báo đã được lưu!");
  };

  const handleBackupSystem = () => {
    const newBackup = {
      id: backups.length + 1,
      filename: `backup_${new Date().toISOString().slice(0, 19).replace(/[-:]/g, "_").replace("T", "_")}.sql`,
      date: new Date().toLocaleString("vi-VN"),
      size: "2.4 MB",
      status: "Thành công",
    };
    setBackups([newBackup, ...backups]);
    alert("Sao lưu dữ liệu thành công!");
  };

  const handleRestoreFromBackup = () => {
    alert("Tính năng khôi phục dữ liệu đang được phát triển!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Thành công":
        return "bg-green-100 text-green-800";
      case "Lỗi":
        return "bg-red-100 text-red-800";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600" />
              Cài đặt hệ thống (Quản trị viên)
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý cấu hình tổng quan của hệ thống KidsLearn - Chỉ dành cho
              quản trị viên
            </p>
          </div>
        </div>

        {/* Settings Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: System Information */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Monitor className="h-5 w-5" />
                A. Thông tin hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="systemName" className="font-medium">
                    Tên hệ thống
                  </Label>
                  <Input
                    id="systemName"
                    value={systemInfo.systemName}
                    onChange={(e) =>
                      setSystemInfo({
                        ...systemInfo,
                        systemName: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="font-medium">Upload logo (PNG/JPG)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      <School className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Chọn file
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="brandColor" className="font-medium">
                    Màu thương hiệu
                  </Label>
                  <div className="mt-2 flex items-center gap-4">
                    <input
                      type="color"
                      id="brandColor"
                      value={systemInfo.brandColor}
                      onChange={(e) =>
                        setSystemInfo({
                          ...systemInfo,
                          brandColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      value={systemInfo.brandColor}
                      onChange={(e) =>
                        setSystemInfo({
                          ...systemInfo,
                          brandColor: e.target.value,
                        })
                      }
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label
                      htmlFor="supportEmail"
                      className="font-medium flex items-center gap-1"
                    >
                      <Mail className="h-4 w-4" />
                      Email hỗ trợ
                    </Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={systemInfo.supportEmail}
                      onChange={(e) =>
                        setSystemInfo({
                          ...systemInfo,
                          supportEmail: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="hotlinePhone"
                      className="font-medium flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4" />
                      Số điện thoại hotline
                    </Label>
                    <Input
                      id="hotlinePhone"
                      value={systemInfo.hotlinePhone}
                      onChange={(e) =>
                        setSystemInfo({
                          ...systemInfo,
                          hotlinePhone: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveSystemInfo}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu thông tin hệ thống
              </Button>
            </CardContent>
          </Card>

          {/* Card B: User & Security Configuration */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Shield className="h-5 w-5" />
                B. Cấu hình người dùng & bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">Chính sách mật khẩu</Label>
                  <Select
                    value={userSecurity.passwordPolicy}
                    onValueChange={(value) =>
                      setUserSecurity({
                        ...userSecurity,
                        passwordPolicy: value,
                      })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yếu">Yếu (ít nhất 6 ký tự)</SelectItem>
                      <SelectItem value="Trung bình">
                        Trung bình (8 ký tự, chữ + số)
                      </SelectItem>
                      <SelectItem value="Mạnh">
                        Mạnh (12 ký tự, chữ + số + ký tự đặc biệt)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium">
                    Thời gian hết hạn phiên đăng nhập:{" "}
                    {userSecurity.sessionTimeout[0]} phút
                  </Label>
                  <Slider
                    value={userSecurity.sessionTimeout}
                    onValueChange={(value) =>
                      setUserSecurity({
                        ...userSecurity,
                        sessionTimeout: value,
                      })
                    }
                    min={15}
                    max={480}
                    step={15}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15 phút</span>
                    <span>4 giờ</span>
                    <span>8 giờ</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg">
                  <div>
                    <Label className="font-medium">
                      Bật xác thực 2 yếu tố (2FA)
                    </Label>
                    <p className="text-sm text-gray-600">
                      Yêu cầu mã OTP khi đăng nhập
                    </p>
                  </div>
                  <Switch
                    checked={userSecurity.enable2FA}
                    onCheckedChange={(checked) =>
                      setUserSecurity({ ...userSecurity, enable2FA: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg">
                  <div>
                    <Label className="font-medium">
                      Cho phép đăng ký tài khoản mới
                    </Label>
                    <p className="text-sm text-gray-600">
                      Học sinh có thể tự đăng ký tài khoản
                    </p>
                  </div>
                  <Switch
                    checked={userSecurity.allowNewRegistration}
                    onCheckedChange={(checked) =>
                      setUserSecurity({
                        ...userSecurity,
                        allowNewRegistration: checked,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveUserSecurity}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt bảo mật
              </Button>
            </CardContent>
          </Card>

          {/* Card C: General Learning Configuration */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <BookOpen className="h-5 w-5" />
                C. Cấu hình học tập chung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="lessonDuration"
                    className="font-medium flex items-center gap-1"
                  >
                    <Clock className="h-4 w-4" />
                    Thời lượng mặc định mỗi buổi học (phút)
                  </Label>
                  <Input
                    id="lessonDuration"
                    type="number"
                    value={learningConfig.defaultLessonDuration}
                    onChange={(e) =>
                      setLearningConfig({
                        ...learningConfig,
                        defaultLessonDuration: parseInt(e.target.value),
                      })
                    }
                    className="mt-1"
                    min="10"
                    max="120"
                  />
                </div>

                <div>
                  <Label htmlFor="maxRetries" className="font-medium">
                    Số lần làm lại bài tập tối đa
                  </Label>
                  <Input
                    id="maxRetries"
                    type="number"
                    value={learningConfig.maxExerciseRetries}
                    onChange={(e) =>
                      setLearningConfig({
                        ...learningConfig,
                        maxExerciseRetries: parseInt(e.target.value),
                      })
                    }
                    className="mt-1"
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <Label className="font-medium flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Ngôn ngữ mặc định
                  </Label>
                  <Select
                    value={learningConfig.defaultLanguage}
                    onValueChange={(value) =>
                      setLearningConfig({
                        ...learningConfig,
                        defaultLanguage: value,
                      })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tiếng Việt">🇻🇳 Tiếng Việt</SelectItem>
                      <SelectItem value="English">🇺🇸 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    📚 Môn học hệ thống
                  </h4>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Toán</Badge>
                    <Badge variant="secondary">Văn</Badge>
                    <Badge variant="secondary">Anh</Badge>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    Hệ thống hiện tại hỗ trợ 3 môn học chính
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSaveLearningConfig}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu cấu hình học tập
              </Button>
            </CardContent>
          </Card>

          {/* Card D: Notification & Email Configuration */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Bell className="h-5 w-5" />
                D. Cấu hình thông báo & Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="smtpHost"
                      className="font-medium flex items-center gap-1"
                    >
                      <Server className="h-4 w-4" />
                      SMTP Host
                    </Label>
                    <Input
                      id="smtpHost"
                      value={notificationConfig.smtpHost}
                      onChange={(e) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          smtpHost: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort" className="font-medium">
                      SMTP Port
                    </Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={notificationConfig.smtpPort}
                      onChange={(e) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          smtpPort: parseInt(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="smtpEmail" className="font-medium">
                    Email gửi
                  </Label>
                  <Input
                    id="smtpEmail"
                    type="email"
                    value={notificationConfig.smtpEmail}
                    onChange={(e) =>
                      setNotificationConfig({
                        ...notificationConfig,
                        smtpEmail: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="smtpPassword" className="font-medium">
                    Mật khẩu Email
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={notificationConfig.smtpPassword}
                    onChange={(e) =>
                      setNotificationConfig({
                        ...notificationConfig,
                        smtpPassword: e.target.value,
                      })
                    }
                    className="mt-1"
                    placeholder="Nhập mật khẩu SMTP"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                  <div>
                    <Label className="font-medium">Bật gửi email tự động</Label>
                    <p className="text-sm text-gray-600">
                      Quên mật khẩu, báo cáo tiến độ học
                    </p>
                  </div>
                  <Switch
                    checked={notificationConfig.enableAutoEmails}
                    onCheckedChange={(checked) =>
                      setNotificationConfig({
                        ...notificationConfig,
                        enableAutoEmails: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                  <div>
                    <Label className="font-medium">Bật thông báo đẩy</Label>
                    <p className="text-sm text-gray-600">
                      Push notification trên trình duyệt
                    </p>
                  </div>
                  <Switch
                    checked={notificationConfig.enablePushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationConfig({
                        ...notificationConfig,
                        enablePushNotifications: checked,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveNotificationConfig}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu cấu hình thông báo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Card E: Backup & Recovery - Full Width */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <Database className="h-5 w-5" />
              E. Sao lưu & phục hồi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleBackupSystem}
                className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <HardDrive className="h-4 w-4" />
                Backup dữ liệu hệ thống
              </Button>

              <Dialog
                open={isBackupDialogOpen}
                onOpenChange={setIsBackupDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-gray-300 flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Khôi phục dữ liệu từ file backup
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Khôi phục dữ liệu</DialogTitle>
                    <DialogDescription>
                      Chọn file backup để khôi phục dữ liệu hệ thống
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Chọn file backup (.sql)</Label>
                      <Input type="file" accept=".sql" className="mt-2" />
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>⚠️ Cảnh báo:</strong> Việc khôi phục sẽ ghi đè
                        toàn bộ dữ liệu hiện tại. Vui lòng đảm bảo đã sao lưu dữ
                        liệu trước khi thực hiện.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsBackupDialogOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        onClick={handleRestoreFromBackup}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Khôi phục
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <h4 className="font-medium mb-4">
                Danh sách các bản backup gần nhất
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên file</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Dung lượng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell className="font-medium">
                        {backup.filename}
                      </TableCell>
                      <TableCell>{backup.date}</TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(backup.status)}>
                          {backup.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Tải về
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
