import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  BookOpen,
  Calculator,
  Globe,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  Shield,
  Loader2,
  GraduationCap,
  Building2,
  Phone,
  FileText,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
    useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Teacher registration states
  const [showTeacherRegisterDialog, setShowTeacherRegisterDialog] = useState(false);
  const [teacherRegisterSuccess, setTeacherRegisterSuccess] = useState(false);
  const [showTeacherPassword, setShowTeacherPassword] = useState(false);
  const [showTeacherConfirmPassword, setShowTeacherConfirmPassword] = useState(false);
  const [teacherForm, setTeacherForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    school: "",
    subject: "",
    experience: "",
    qualification: "",
    bio: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate register process
    setTimeout(() => {
      setIsLoading(false);
      setRegisterSuccess(true);
    }, 1500);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false);
      setForgotPasswordSent(true);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleTeacherRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate teacher registration process
    setTimeout(() => {
      setIsLoading(false);
      setTeacherRegisterSuccess(true);
    }, 2000);
  };

  const resetTeacherForm = () => {
    setTeacherForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      school: "",
      subject: "",
      experience: "",
      qualification: "",
      bio: "",
    });
    setTeacherRegisterSuccess(false);
    setShowTeacherRegisterDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col items-center justify-center p-4">

      {/* Login/Register Card */}
      <Card className="w-full max-w-md border-blue-200 shadow-2xl bg-white rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white pb-8">
          <CardTitle className="text-3xl font-bold">
            {activeTab === "login" ? "🎯 Đăng nhập" : "✨ Đăng ký"}
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            {activeTab === "login"
              ? "Chào mừng bé quay trở lại!"
              : "Tạo tài khoản để bắt đầu học!"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {registerSuccess ? (
            <Alert className="border-green-200 bg-green-50 text-center">
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <AlertDescription className="text-green-800 font-medium">
                🎉 Đăng ký thành công!
                <br />
                <span className="text-sm">
                  Vui lòng kiểm tra email để xác nhận tài khoản.
                </span>
              </AlertDescription>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() =>
                    navigate("/email-verification?email=banhoc@email.com")
                  }
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  📧 Xác thực ngay
                </Button>
                <Button
                  onClick={() => {
                    setRegisterSuccess(false);
                    setActiveTab("login");
                  }}
                  variant="outline"
                  className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                >
                  Đăng nhập
                </Button>
              </div>
            </Alert>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-blue-50 p-1 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold py-3"
                >
                  📖 Đăng nhập
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg font-bold py-3"
                >
                  ✨ Đăng ký
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-6 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-blue-700 font-semibold flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="banhoc@email.com"
                      required
                      className="border-blue-200 focus:border-blue-500 rounded-xl h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-blue-700 font-semibold flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      Mật khẩu
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="border-blue-200 focus:border-blue-500 rounded-xl h-12 text-base pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Đang đăng nhập...
                      </div>
                    ) : (
                      "🚀 Đăng nhập"
                    )}
                  </Button>

                  <div className="text-center">
                    <Dialog
                      open={showForgotPasswordDialog}
                      onOpenChange={setShowForgotPasswordDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="link"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          🤔 Quên mật khẩu?
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-blue-700">
                            🔐 Đặt lại mật khẩu
                          </DialogTitle>
                          <DialogDescription>
                            Nhập email để nhận hướng dẫn đặt lại mật khẩu
                          </DialogDescription>
                        </DialogHeader>
                        {forgotPasswordSent ? (
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                              ✅ Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến
                              email của bạn.
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <form
                            onSubmit={handleForgotPassword}
                            className="space-y-4"
                          >
                            <Input
                              type="email"
                              placeholder="Nhập email của bạn"
                              value={forgotPasswordEmail}
                              onChange={(e) =>
                                setForgotPasswordEmail(e.target.value)
                              }
                              required
                              className="border-blue-200 focus:border-blue-500 rounded-xl"
                            />
                            <Button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              ) : null}
                              Gửi hướng dẫn
                            </Button>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>

                {/* Social Login */}
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        Hoặc đăng nhập bằng
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin("google")}
                      className="border-gray-300 hover:bg-gray-50 rounded-xl h-12"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="font-medium">Google</span>
                      </div>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin("microsoft")}
                      className="border-gray-300 hover:bg-gray-50 rounded-xl h-12"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#f25022" d="M1 1h10v10H1z" />
                          <path fill="#00a4ef" d="M13 1h10v10H13z" />
                          <path fill="#7fba00" d="M1 13h10v10H1z" />
                          <path fill="#ffb900" d="M13 13h10v10H13z" />
                        </svg>
                        <span className="font-medium">Microsoft</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-6 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-orange-700 font-semibold flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Họ và tên
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nguyễn Văn An"
                      required
                      className="border-orange-200 focus:border-orange-500 rounded-xl h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="registerEmail"
                      className="text-orange-700 font-semibold flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="banhoc@email.com"
                      required
                      className="border-orange-200 focus:border-orange-500 rounded-xl h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="registerPassword"
                      className="text-orange-700 font-semibold flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      Mật khẩu
                    </Label>
                    <div className="relative">
                      <Input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="border-orange-200 focus:border-orange-500 rounded-xl h-12 text-base pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-orange-700 font-semibold flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Xác nhận mật khẩu
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="border-orange-200 focus:border-orange-500 rounded-xl h-12 text-base pr-12"
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

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Đang tạo tài khoản...
                      </div>
                    ) : (
                      "🎉 Đăng ký"
                    )}
                  </Button>
                </form>

                {/* Security Notice */}
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    🔐 <strong>Bảo mật:</strong> Sau khi đăng ký, hệ thống sẽ
                    gửi email xác thực. Bạn cần xác nhận email để kích hoạt tài
                    khoản và hỗ trợ xác thực 2 bước.
                  </AlertDescription>
                </Alert>

                {/* Teacher Registration Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-3">
                      Bạn là giáo viên?
                    </div>
                    <Dialog
                      open={showTeacherRegisterDialog}
                      onOpenChange={setShowTeacherRegisterDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 rounded-xl h-12 font-bold"
                        >
                          <GraduationCap className="h-5 w-5 mr-2" />
                          👩‍🏫 Đăng ký tài khoản giáo viên
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="pb-4 border-b border-gray-200">
                          <DialogTitle className="text-xl font-bold text-green-700 flex items-center gap-2">
                            <GraduationCap className="h-6 w-6" />
                            👩‍🏫 Đăng ký tài khoản giáo viên
                          </DialogTitle>
                          <DialogDescription className="text-gray-600">
                            Tạo tài khoản giáo viên để quản lý lớp học và tạo nội dung giáo dục
                          </DialogDescription>
                        </DialogHeader>

                        {teacherRegisterSuccess ? (
                          <div className="py-6">
                            <Alert className="border-green-200 bg-green-50 text-center">
                              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-3" />
                              <AlertDescription className="text-green-800 font-medium text-lg">
                                🎉 Đăng ký thành công!
                                <br />
                                <span className="text-sm mt-2 block">
                                  Tài khoản giáo viên của bạn đang chờ phê duyệt từ quản trị viên.
                                  <br />
                                  Bạn sẽ nhận được email thông báo trong vòng 24-48 giờ.
                                </span>
                              </AlertDescription>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => {
                                    resetTeacherForm();
                                    setActiveTab("login");
                                  }}
                                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                >
                                  Đăng nhập
                                </Button>
                                <Button
                                  onClick={resetTeacherForm}
                                  variant="outline"
                                  className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                                >
                                  Đóng
                                </Button>
                              </div>
                            </Alert>
                          </div>
                        ) : (
                          <form onSubmit={handleTeacherRegister} className="space-y-4 py-4">
                            {/* Personal Information */}
                            <div className="space-y-4">
                              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Thông tin cá nhân
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="teacherFullName" className="text-green-700 font-medium">
                                    Họ và tên *
                                  </Label>
                                  <Input
                                    id="teacherFullName"
                                    type="text"
                                    placeholder="Nguyễn Thị Lan"
                                    value={teacherForm.fullName}
                                    onChange={(e) => setTeacherForm({...teacherForm, fullName: e.target.value})}
                                    required
                                    className="border-green-200 focus:border-green-500 rounded-lg"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="teacherPhone" className="text-green-700 font-medium">
                                    Số điện thoại *
                                  </Label>
                                  <Input
                                    id="teacherPhone"
                                    type="tel"
                                    placeholder="0123456789"
                                    value={teacherForm.phone}
                                    onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
                                    required
                                    className="border-green-200 focus:border-green-500 rounded-lg"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="teacherEmail" className="text-green-700 font-medium">
                                  Email *
                                </Label>
                                <Input
                                  id="teacherEmail"
                                  type="email"
                                  placeholder="giaovien@email.com"
                                  value={teacherForm.email}
                                  onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
                                  required
                                  className="border-green-200 focus:border-green-500 rounded-lg"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="teacherPassword" className="text-green-700 font-medium">
                                    Mật khẩu *
                                  </Label>
                                  <div className="relative">
                                    <Input
                                      id="teacherPassword"
                                      type={showTeacherPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      value={teacherForm.password}
                                      onChange={(e) => setTeacherForm({...teacherForm, password: e.target.value})}
                                      required
                                      className="border-green-200 focus:border-green-500 rounded-lg pr-10"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                      onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                                    >
                                      {showTeacherPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="teacherConfirmPassword" className="text-green-700 font-medium">
                                    Xác nhận mật khẩu *
                                  </Label>
                                  <div className="relative">
                                    <Input
                                      id="teacherConfirmPassword"
                                      type={showTeacherConfirmPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      value={teacherForm.confirmPassword}
                                      onChange={(e) => setTeacherForm({...teacherForm, confirmPassword: e.target.value})}
                                      required
                                      className="border-green-200 focus:border-green-500 rounded-lg pr-10"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                      onClick={() => setShowTeacherConfirmPassword(!showTeacherConfirmPassword)}
                                    >
                                      {showTeacherConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-4 border-t border-gray-200 pt-4">
                              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Thông tin nghề nghiệp
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="teacherSchool" className="text-green-700 font-medium">
                                    Trường học hiện tại *
                                  </Label>
                                  <Input
                                    id="teacherSchool"
                                    type="text"
                                    placeholder="Trường Tiểu học ABC"
                                    value={teacherForm.school}
                                    onChange={(e) => setTeacherForm({...teacherForm, school: e.target.value})}
                                    required
                                    className="border-green-200 focus:border-green-500 rounded-lg"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="teacherSubject" className="text-green-700 font-medium">
                                    Môn học chuyên môn *
                                  </Label>
                                  <Select
                                    value={teacherForm.subject}
                                    onValueChange={(value) => setTeacherForm({...teacherForm, subject: value})}
                                  >
                                    <SelectTrigger className="border-green-200 focus:border-green-500 rounded-lg">
                                      <SelectValue placeholder="Chọn môn học" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="toan">Toán học</SelectItem>
                                      <SelectItem value="van">Tiếng Việt</SelectItem>
                                      <SelectItem value="anh">Tiếng Anh</SelectItem>
                                      <SelectItem value="khoa-hoc">Khoa học tự nhiên</SelectItem>
                                      <SelectItem value="xa-hoi">Khoa học xã hội</SelectItem>
                                      <SelectItem value="the-duc">Thể dục</SelectItem>
                                      <SelectItem value="my-thuat">Mỹ thuật</SelectItem>
                                      <SelectItem value="am-nhac">Âm nhạc</SelectItem>
                                      <SelectItem value="tin-hoc">Tin học</SelectItem>
                                      <SelectItem value="khac">Khác</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="teacherExperience" className="text-green-700 font-medium">
                                    Số năm kinh nghiệm *
                                  </Label>
                                  <Select
                                    value={teacherForm.experience}
                                    onValueChange={(value) => setTeacherForm({...teacherForm, experience: value})}
                                  >
                                    <SelectTrigger className="border-green-200 focus:border-green-500 rounded-lg">
                                      <SelectValue placeholder="Chọn kinh nghiệm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="moi">Mới tốt nghiệp</SelectItem>
                                      <SelectItem value="1-3">1-3 năm</SelectItem>
                                      <SelectItem value="3-5">3-5 năm</SelectItem>
                                      <SelectItem value="5-10">5-10 năm</SelectItem>
                                      <SelectItem value="10+">Trên 10 năm</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="teacherQualification" className="text-green-700 font-medium">
                                    Trình đ��� học vấn *
                                  </Label>
                                  <Select
                                    value={teacherForm.qualification}
                                    onValueChange={(value) => setTeacherForm({...teacherForm, qualification: value})}
                                  >
                                    <SelectTrigger className="border-green-200 focus:border-green-500 rounded-lg">
                                      <SelectValue placeholder="Chọn trình độ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cao-dang">Cao đẳng sư phạm</SelectItem>
                                      <SelectItem value="dai-hoc">Đại học sư phạm</SelectItem>
                                      <SelectItem value="thac-si">Thạc sĩ</SelectItem>
                                      <SelectItem value="tien-si">Tiến sĩ</SelectItem>
                                      <SelectItem value="khac">Khác</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="teacherBio" className="text-green-700 font-medium">
                                  Giới thiệu bản thân (tùy chọn)
                                </Label>
                                <Textarea
                                  id="teacherBio"
                                  placeholder="Chia sẻ về phương pháp giảng dạy và kinh nghiệm của bạn..."
                                  value={teacherForm.bio}
                                  onChange={(e) => setTeacherForm({...teacherForm, bio: e.target.value})}
                                  className="border-green-200 focus:border-green-500 rounded-lg"
                                  rows={3}
                                />
                              </div>
                            </div>

                            {/* Submit Button */}
                            <div className="border-t border-gray-200 pt-4">
                              <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg h-12 text-lg"
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <div className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Đang tạo tài khoản...
                                  </div>
                                ) : (
                                  <>
                                    <GraduationCap className="h-5 w-5 mr-2" />
                                    🎓 Đăng ký giáo viên
                                  </>
                                )}
                              </Button>

                              {/* Teacher Registration Notice */}
                              <Alert className="border-green-200 bg-green-50 mt-4">
                                <FileText className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800 text-sm">
                                  📋 <strong>Lưu ý:</strong> Tài khoản giáo viên cần được phê duyệt bởi
                                  quản trị viên trước khi có thể sử dụng. Quá trình này thường mất 24-48 giờ.
                                </AlertDescription>
                              </Alert>
                            </div>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-600">
        <p className="text-sm font-medium">
          🎓 Nền tảng học tập trực tuyến cho học sinh tiểu học & trung học
        </p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="text-xs">Được thiết kế với</span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span className="text-xs">cho các bạn học sinh</span>
        </div>
      </div>
    </div>
  );
}
