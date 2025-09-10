import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("profile");

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

  const handleSaveStudySettings = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
            ⚙️ Cài đặt cá nhân
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
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Bảo mật
            </TabsTrigger>
            <TabsTrigger
              value="study"
              className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2"
            >
              <SettingsIcon className="h-4 w-4" />
              Cài đặt học tập
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
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
                        <SelectItem value="Lớp 3A">📚 Lớp 3A</SelectItem>
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

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
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
                      placeholder="Nhập lại mật khẩu mới"
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
                    ✨ Lợi ích của xác thực 2 bước:
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

          {/* Study Settings Tab */}
          <TabsContent value="study" className="space-y-6">
            <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-secondary" />
                  Cài đặt học tập
                </CardTitle>
                <CardDescription>
                  Tùy chỉnh trải nghiệm học tập và nhắc nhở
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
                  <div className="text-center p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="text-2xl mb-2">⏰</div>
                    <div className="text-lg font-bold text-accent">
                      {studySettings.weeklyGoalHours}h
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Mục tiêu tuần
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
                      <Label className="text-secondary font-medium flex items-center gap-2">
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
                    <div className="space-y-2 ml-6">
                      <Label
                        htmlFor="reminderTime"
                        className="text-secondary font-medium flex items-center gap-1"
                      >
                        <Clock className="h-4 w-4" />
                        Giờ nhắc nhở
                      </Label>
                      <Select
                        value={studySettings.reminderTime}
                        onValueChange={(value) =>
                          setStudySettings({
                            ...studySettings,
                            reminderTime: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-48 border-secondary/20 focus:border-secondary rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18:00">
                            🕕 18:00 (6:00 PM)
                          </SelectItem>
                          <SelectItem value="19:00">
                            🕖 19:00 (7:00 PM)
                          </SelectItem>
                          <SelectItem value="20:00">
                            🕗 20:00 (8:00 PM)
                          </SelectItem>
                          <SelectItem value="21:00">
                            🕗 21:00 (9:00 PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Default Goal */}
                <div className="space-y-2">
                  <Label className="text-secondary font-medium flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Mục tiêu mặc định
                  </Label>
                  <Select
                    value={studySettings.defaultGoal}
                    onValueChange={(value) =>
                      setStudySettings({ ...studySettings, defaultGoal: value })
                    }
                  >
                    <SelectTrigger className="border-secondary/20 focus:border-secondary rounded-xl">
                      <SelectValue placeholder="Chọn mục tiêu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">🎯 Thi giữa kỳ</SelectItem>
                      <SelectItem value="final">📝 Thi cuối kỳ</SelectItem>
                      <SelectItem value="vocabulary">
                        📖 Ôn tập từ vựng
                      </SelectItem>
                      <SelectItem value="grammar">
                        📚 Ôn tập ngữ pháp
                      </SelectItem>
                      <SelectItem value="practice">🏋️ Luyện thi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Weekly Goal Hours */}
                <div className="space-y-2">
                  <Label className="text-secondary font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Mục tiêu học tập hàng tuần (giờ)
                  </Label>
                  <Select
                    value={studySettings.weeklyGoalHours.toString()}
                    onValueChange={(value) =>
                      setStudySettings({
                        ...studySettings,
                        weeklyGoalHours: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger className="border-secondary/20 focus:border-secondary rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⏰ 5 giờ/tuần</SelectItem>
                      <SelectItem value="8">⏰ 8 giờ/tuần</SelectItem>
                      <SelectItem value="10">⏰ 10 giờ/tuần</SelectItem>
                      <SelectItem value="12">⏰ 12 giờ/tuần</SelectItem>
                      <SelectItem value="15">⏰ 15 giờ/tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
