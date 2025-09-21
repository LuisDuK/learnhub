import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Shield,
  Settings as SettingsIcon,
  Camera,
  Save,
  Key,
  Bell,
  Target,
  Clock,
  Sparkles,
  Upload,
  Calendar,
  School,
  Mail,
  Lock,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("reminders");

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    fullName: "Bé Minh Đức",
    email: "duc.nguyen@email.com",
    birthday: "2010-05-15",
    grade: "Lớp 5A",
    avatar: "/placeholder.svg",
  });

  const [studySettings, setStudySettings] = useState({
    dailyReminder: true,
    reminderTime: "19:00",
    defaultGoal: "midterm",
    studyStreak: 7,
    weeklyGoalHours: 10,
    channels: { push: true, email: false, sms: false },
    reminderDays: ["mon", "tue", "wed", "thu", "fri"] as string[],
    reminderTimeFrom: "18:00",
    reminderTimeTo: "21:00",
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1500);
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1500);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("studySettings");
      if (raw) {
        const parsed = JSON.parse(raw);
        setStudySettings((prev) => ({
          ...prev,
          ...parsed,
          channels: { push: true, email: false, sms: false, ...(parsed.channels || {}) },
          reminderDays: Array.isArray(parsed.reminderDays) ? parsed.reminderDays : prev.reminderDays,
          reminderTimeFrom: parsed.reminderTimeFrom || prev.reminderTimeFrom,
          reminderTimeTo: parsed.reminderTimeTo || prev.reminderTimeTo,
        }));
      }
    } catch {}
  }, []);

  const handleSaveStudySettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("studySettings", JSON.stringify(studySettings));
    } catch {}
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
            🔔 Cài đặt nhắc nhở
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            Quản lý thông tin và tùy chỉnh trải nghiệm học tập
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-1 bg-primary/10">
            <TabsTrigger
              value="reminders"
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Nhắc nhở
            </TabsTrigger>
          </TabsList>

          {/* Hidden legacy tabs removed for simplified reminders-only settings */}
          {/* Legacy content hidden in reminders-only mode */}
          <TabsContent value="legacy" className="hidden">
            <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Thông tin cá nhân
                </CardTitle>
                <CardDescription>
                  Cập nhật thông tin cá nhân của bé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                      <AvatarImage src={userProfile.avatar} alt="Avatar" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                        🧒
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-gradient-to-r from-primary to-accent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      Ảnh đại diện
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Nhấn vào biểu tượng máy ảnh để thay đổi ảnh đại diện
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Đổi ảnh
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <User className="h-4 w-4" />
                      Họ và tên
                    </Label>
                    <Input
                      id="fullName"
                      value={userProfile.fullName}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          fullName: e.target.value,
                        })
                      }
                      className="border-primary/20 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          email: e.target.value,
                        })
                      }
                      className="border-primary/20 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="birthday"
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <Calendar className="h-4 w-4" />
                      Ngày sinh
                    </Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={userProfile.birthday}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          birthday: e.target.value,
                        })
                      }
                      className="border-primary/20 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="grade"
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <School className="h-4 w-4" />
                      Lớp/Môn học
                    </Label>
                    <Select
                      value={userProfile.grade}
                      onValueChange={(value) =>
                        setUserProfile({ ...userProfile, grade: value })
                      }
                    >
                      <SelectTrigger className="border-primary/20 focus:border-primary rounded-xl">
                        <SelectValue placeholder="Chọn lớp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lớp 3A">📚 L��p 3A</SelectItem>
                        <SelectItem value="Lớp 4A">📚 Lớp 4A</SelectItem>
                        <SelectItem value="Lớp 5A">📚 Lớp 5A</SelectItem>
                        <SelectItem value="Lớp 6A">📚 Lớp 6A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu thay đổi
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab removed in reminders-only mode */}
          {/* Placeholder to keep layout compatible */}
          <TabsContent value="security" className="hidden">
            <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-white to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Bảo mật tài khoản
                </CardTitle>
                <CardDescription>
                  Thay đổi mật khẩu để bảo vệ tài khoản của bé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="currentPassword"
                      className="text-accent font-medium flex items-center gap-1"
                    >
                      <Key className="h-4 w-4" />
                      Mật khẩu hiện tại
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Nhập mật khẩu hiện tại"
                      className="border-accent/20 focus:border-accent rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="newPassword"
                      className="text-accent font-medium flex items-center gap-1"
                    >
                      <Lock className="h-4 w-4" />
                      Mật khẩu mới
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      className="border-accent/20 focus:border-accent rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-accent font-medium flex items-center gap-1"
                    >
                      <Lock className="h-4 w-4" />
                      Xác nhận mật khẩu mới
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Nhập lại m��t khẩu mới"
                      className="border-accent/20 focus:border-accent rounded-xl"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">
                    💡 Gợi ý tạo mật khẩu mạnh:
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Ít nhất 8 ký tự</li>
                    <li>• Bao gồm chữ hoa, chữ thường</li>
                    <li>• Có ít nhất 1 số và 1 ký tự đặc biệt</li>
                    <li>• Không sử dụng thông tin cá nhân</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-accent to-secondary hover:from-accent/80 hover:to-secondary/80 text-white font-bold rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang đổi...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Đổi m��t khẩu
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication Card */}
            <Card className="border-blue-200 shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Xác thực hai bước (2FA)
                </CardTitle>
                <CardDescription>
                  Tăng cường bảo mật tài khoản với lớp bảo vệ thêm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700">
                        Xác thực 2 bước
                      </h4>
                      <p className="text-sm text-blue-600">
                        Bảo vệ tài khoản với mã OTP qua email
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 border-orange-300"
                  >
                    Chưa kích hoạt
                  </Badge>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-700 mb-2">
                    �� Lợi ích của xác thực 2 bước:
                  </h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Bảo vệ tài khoản khỏi truy cập trái phép</li>
                    <li>• Được thông báo ngay khi có đăng nhập đáng ngờ</li>
                    <li>• An toàn hơn khi sử dụng WiFi công cộng</li>
                    <li>• Tuân thủ các tiêu chuẩn bảo mật hiện đại</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate("/two-factor-auth")}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Thiết lập 2FA
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/two-factor-auth")}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    📖 Tìm hiểu thêm
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map study settings content into reminders tab for this simplified mode */}
          <TabsContent value="reminders" className="space-y-6">
            <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-secondary" />
                  Cài đặt nhắc nhở
                </CardTitle>
                <CardDescription>
                  Tùy chỉnh thông báo và thời gian nhắc nhở học tập
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Study Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="text-lg font-bold text-primary">
                      {studySettings.studyStreak}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ngày liên tiếp
                    </div>
                  </div>
                 
                  <div className="text-center p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-lg font-bold text-secondary">85%</div>
                    <div className="text-sm text-muted-foreground">
                      Hoàn thành
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Daily Reminder */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-primary font-semibold flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Nhắc nhở học tập hằng ngày
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Nhận thông báo nhắc nhở học tập mỗi ngày
                      </p>
                    </div>
                    <Switch
                      checked={studySettings.dailyReminder}
                      onCheckedChange={(checked) =>
                        setStudySettings({
                          ...studySettings,
                          dailyReminder: checked,
                        })
                      }
                    />
                  </div>

                  {studySettings.dailyReminder && (
                    <div className="space-y-5 ml-6">
                      {/* Channels */}
                      <div className="space-y-2">
                        <Label className="text-primary font-medium flex items-center gap-1">
                          <Bell className="h-4 w-4" />
                          Kênh nhận thông báo
                        </Label>
                        <div className="flex flex-wrap gap-3">
                          <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${studySettings.channels.push ? "bg-secondary/10 border-secondary text-secondary" : "bg-white border-gray-200"}`}>
                            <Checkbox
                              checked={!!studySettings.channels.push}
                              onCheckedChange={(checked) =>
                                setStudySettings((prev) => ({
                                  ...prev,
                                  channels: { ...prev.channels, push: !!checked },
                                }))
                              }
                            />
                            <span>Push</span>
                          </label>
                          <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${studySettings.channels.email ? "bg-secondary/10 border-secondary text-secondary" : "bg-white border-gray-200"}`}>
                            <Checkbox
                              checked={!!studySettings.channels.email}
                              onCheckedChange={(checked) =>
                                setStudySettings((prev) => ({
                                  ...prev,
                                  channels: { ...prev.channels, email: !!checked },
                                }))
                              }
                            />
                            <span>Email</span>
                          </label>
                          <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${studySettings.channels.sms ? "bg-secondary/10 border-secondary text-secondary" : "bg-white border-gray-200"}`}>
                            <Checkbox
                              checked={!!studySettings.channels.sms}
                              onCheckedChange={(checked) =>
                                setStudySettings((prev) => ({
                                  ...prev,
                                  channels: { ...prev.channels, sms: !!checked },
                                }))
                              }
                            />
                            <span>SMS</span>
                          </label>
                        </div>
                      </div>

                      {/* Schedule */}
                      <div className="space-y-3">
                        <Label className="text-secondary font-medium flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Lịch nhắc mong muốn
                        </Label>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={studySettings.reminderTimeFrom}
                              onChange={(e) => setStudySettings({ ...studySettings, reminderTimeFrom: e.target.value })}
                              className="w-36"
                            />
                            <span className="text-sm text-muted-foreground">đến</span>
                            <Input
                              type="time"
                              value={studySettings.reminderTimeTo}
                              onChange={(e) => setStudySettings({ ...studySettings, reminderTimeTo: e.target.value })}
                              className="w-36"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {[
                            { k: "mon", l: "Th 2" },
                            { k: "tue", l: "Th 3" },
                            { k: "wed", l: "Th 4" },
                            { k: "thu", l: "Th 5" },
                            { k: "fri", l: "Th 6" },
                            { k: "sat", l: "Th 7" },
                            { k: "sun", l: "CN" },
                          ].map((d) => {
                            const active = studySettings.reminderDays.includes(d.k);
                            return (
                              <button
                                key={d.k}
                                type="button"
                                className={`px-3 py-1.5 rounded-lg border text-sm ${active ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200"}`}
                                onClick={() => {
                                  setStudySettings((prev) => ({
                                    ...prev,
                                    reminderDays: active
                                      ? prev.reminderDays.filter((x) => x !== d.k)
                                      : [...prev.reminderDays, d.k],
                                  }));
                                }}
                              >
                                {d.l}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />


                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveStudySettings}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 text-white font-bold rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
