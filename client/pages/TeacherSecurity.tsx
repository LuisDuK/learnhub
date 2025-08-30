import React, { useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Monitor,
  Calendar,
  Save,
  RefreshCw,
  Download,
  Trash2,
  Plus,
  Settings,
  Bell,
  Mail,
  Globe,
  User,
} from "lucide-react";

// Mock security data
const mockSecurityData = {
  twoFactorEnabled: true,
  lastPasswordChange: "2024-02-15",
  loginNotifications: true,
  deviceNotifications: true,
  suspiciousActivityAlerts: true,
  accountLockoutEnabled: true,
  sessionTimeout: 30, // minutes
  allowedIPs: ["192.168.1.100", "10.0.0.50"],
  blockedIPs: [],

  // Security questions
  securityQuestions: [
    {
      id: 1,
      question: "Tên trường tiểu học đầu tiên của bạn?",
      isSet: true,
    },
    {
      id: 2,
      question: "Tên thú cưng đầu tiên của bạn?",
      isSet: true,
    },
    {
      id: 3,
      question: "Tên đường bạn sống khi còn nhỏ?",
      isSet: false,
    },
  ],

  // Recent login activities
  recentActivities: [
    {
      id: 1,
      device: "Chrome trên Windows",
      location: "TP.HCM, Việt Nam",
      time: "2024-03-12 14:30",
      ip: "192.168.1.100",
      status: "success",
      current: true,
    },
    {
      id: 2,
      device: "Safari trên iPhone",
      location: "TP.HCM, Việt Nam",
      time: "2024-03-12 08:15",
      ip: "192.168.1.101",
      status: "success",
      current: false,
    },
    {
      id: 3,
      device: "Chrome trên Android",
      location: "Hà Nội, Việt Nam",
      time: "2024-03-11 19:45",
      ip: "203.162.4.191",
      status: "blocked",
      current: false,
    },
  ],

  // Connected devices
  connectedDevices: [
    {
      id: 1,
      name: "Máy tính Windows",
      type: "desktop",
      browser: "Chrome",
      lastUsed: "2024-03-12 14:30",
      location: "TP.HCM",
      current: true,
    },
    {
      id: 2,
      name: "iPhone 13",
      type: "mobile",
      browser: "Safari",
      lastUsed: "2024-03-12 08:15",
      location: "TP.HCM",
      current: false,
    },
  ],
};

export default function TeacherSecurity() {
  const [securityData, setSecurityData] = useState(mockSecurityData);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("password");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSettingChange = (setting: string, value: any) => {
    setSecurityData({ ...securityData, [setting]: value });
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return;
    }

    setIsChangingPassword(true);
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 2000);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleRevokeDevice = (deviceId: number) => {
    setSecurityData({
      ...securityData,
      connectedDevices: securityData.connectedDevices.filter(
        (device) => device.id !== deviceId,
      ),
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Monitor className="h-5 w-5" />;
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      case "suspicious":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Thành công";
      case "blocked":
        return "Bị chặn";
      case "suspicious":
        return "Nghi ngờ";
      default:
        return status;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-600" />
              Bảo mật tài khoản
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý cài đặt bảo mật và quyền riêng tư của bạn
            </p>
          </div>

          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt
              </>
            )}
          </Button>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Cài đặt bảo mật đã được cập nhật thành công!
            </AlertDescription>
          </Alert>
        )}

        {/* Security Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card
            className={
              securityData.twoFactorEnabled
                ? "border-green-200 bg-green-50"
                : "border-yellow-200 bg-yellow-50"
            }
          >
            <CardContent className="p-4 text-center">
              <Shield
                className={`h-8 w-8 mx-auto mb-2 ${securityData.twoFactorEnabled ? "text-green-600" : "text-yellow-600"}`}
              />
              <h3
                className={`font-semibold ${securityData.twoFactorEnabled ? "text-green-900" : "text-yellow-900"}`}
              >
                Xác thực 2 bước
              </h3>
              <p
                className={`text-sm ${securityData.twoFactorEnabled ? "text-green-700" : "text-yellow-700"}`}
              >
                {securityData.twoFactorEnabled ? "Đã bật" : "Chưa bật"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <Key className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Mật khẩu</h3>
              <p className="text-sm text-blue-700">
                Đổi{" "}
                {Math.floor(
                  (new Date().getTime() -
                    new Date(securityData.lastPasswordChange).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                ngày trước
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4 text-center">
              <Monitor className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Thiết bị</h3>
              <p className="text-sm text-purple-700">
                {securityData.connectedDevices.length} thiết bị kết nối
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900">Cảnh báo</h3>
              <p className="text-sm text-orange-700">
                {securityData.suspiciousActivityAlerts ? "Đã bật" : "Đã tắt"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="password">Mật khẩu</TabsTrigger>
            <TabsTrigger value="2fa">Xác thực 2 bước</TabsTrigger>
            <TabsTrigger value="privacy">Quyền riêng tư</TabsTrigger>
            <TabsTrigger value="devices">Thiết bị</TabsTrigger>
            <TabsTrigger value="activity">Hoạt động</TabsTrigger>
          </TabsList>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Đổi mật khẩu
                </CardTitle>
                <CardDescription>
                  Đảm bảo mật khẩu mạnh và thay đổi định kỳ để bảo vệ tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại *</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword: e.target.value,
                        })
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới *</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Xác nhận mật khẩu mới *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    <strong>Yêu cầu mật khẩu:</strong>
                    <ul className="mt-2 list-disc list-inside space-y-1">
                      <li>Ít nhất 8 ký tự</li>
                      <li>Bao gồm chữ hoa và chữ thường</li>
                      <li>Có ít nhất 1 số và 1 ký tự đặc biệt</li>
                      <li>Không sử dụng thông tin cá nhân</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handlePasswordChange}
                  disabled={
                    isChangingPassword ||
                    !passwordForm.currentPassword ||
                    !passwordForm.newPassword ||
                    passwordForm.newPassword !== passwordForm.confirmPassword
                  }
                  className="w-full"
                >
                  {isChangingPassword ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Đang đổi mật khẩu...
                    </>
                  ) : (
                    <>
                      <Key className="h-4 w-4 mr-2" />
                      Đổi mật khẩu
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Câu hỏi bảo mật</CardTitle>
                <CardDescription>
                  Thiết lập câu hỏi bảo mật để khôi phục tài khoản khi cần
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityData.securityQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-gray-600">
                        {question.isSet ? "Đã thiết lập" : "Chưa thiết lập"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {question.isSet ? "Cập nhật" : "Thiết lập"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2FA Tab */}
          <TabsContent value="2fa" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Xác thực hai bước (2FA)
                </CardTitle>
                <CardDescription>
                  Thêm lớp bảo mật bổ sung cho tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bật xác thực hai bước</Label>
                    <p className="text-sm text-gray-600">
                      Yêu cầu mã xác thực từ điện thoại khi đăng nhập
                    </p>
                  </div>
                  <Switch
                    checked={securityData.twoFactorEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange("twoFactorEnabled", checked)
                    }
                  />
                </div>

                {securityData.twoFactorEnabled && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Xác thực hai bước đã được bật. Tài khoản của bạn được bảo
                      vệ tốt hơn.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <h4 className="font-medium">Ứng dụng xác thực</h4>
                  <p className="text-sm text-gray-600">
                    Sử dụng ứng dụng như Google Authenticator hoặc Microsoft
                    Authenticator
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Cấu hình ứng dụng
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Mã khôi phục
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Cài đặt quyền riêng tư
                </CardTitle>
                <CardDescription>
                  Kiểm soát ai có thể xem thông tin và liên hệ với bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo đăng nhập</Label>
                    <p className="text-sm text-gray-600">
                      Nhận email khi có đăng nhập từ thiết bị mới
                    </p>
                  </div>
                  <Switch
                    checked={securityData.loginNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("loginNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cảnh báo thiết bị mới</Label>
                    <p className="text-sm text-gray-600">
                      Thông báo khi có thiết bị mới truy cập tài khoản
                    </p>
                  </div>
                  <Switch
                    checked={securityData.deviceNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("deviceNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cảnh báo hoạt động nghi ngờ</Label>
                    <p className="text-sm text-gray-600">
                      Thông báo về các hoạt động bất thường trên tài khoản
                    </p>
                  </div>
                  <Switch
                    checked={securityData.suspiciousActivityAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("suspiciousActivityAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Khóa tài khoản tự động</Label>
                    <p className="text-sm text-gray-600">
                      Tự động khóa tài khoản sau nhiều lần đăng nhập sai
                    </p>
                  </div>
                  <Switch
                    checked={securityData.accountLockoutEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange("accountLockoutEnabled", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phiên đăng nhập</CardTitle>
                <CardDescription>
                  Quản lý thời gian phiên làm việc
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Thời gian hết hạn phiên (phút)</Label>
                  <Input
                    type="number"
                    value={securityData.sessionTimeout}
                    onChange={(e) =>
                      handleSettingChange(
                        "sessionTimeout",
                        parseInt(e.target.value),
                      )
                    }
                    min={15}
                    max={480}
                  />
                  <p className="text-sm text-gray-600">
                    Tự động đăng xuất sau thời gian không hoạt động
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Thiết bị đã kết nối
                </CardTitle>
                <CardDescription>
                  Quản lý các thiết bị có quyền truy cập tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityData.connectedDevices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.type)}
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {device.name}
                          {device.current && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Hiện tại
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {device.browser} • {device.location}
                        </p>
                        <p className="text-xs text-gray-500">
                          Lần cuối: {device.lastUsed}
                        </p>
                      </div>
                    </div>
                    {!device.current && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeDevice(device.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Thu hồi
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Hoạt động đăng nhập gần đây
                </CardTitle>
                <CardDescription>
                  Theo dõi các lần truy cập tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityData.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        {getDeviceIcon("desktop")}
                        <Badge className={getStatusColor(activity.status)}>
                          {getStatusText(activity.status)}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {activity.device}
                          {activity.current && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Hiện tại
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time} • IP: {activity.ip}
                        </p>
                      </div>
                    </div>
                    {activity.status === "suspicious" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Báo cáo
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quản lý IP</CardTitle>
                <CardDescription>
                  Cho phép hoặc chặn địa chỉ IP cụ thể
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>IP được phép</Label>
                  <div className="space-y-2 mt-2">
                    {securityData.allowedIPs.map((ip, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-green-50 rounded"
                      >
                        <span className="text-sm text-green-800">{ip}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Thêm IP
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
