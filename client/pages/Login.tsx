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
  Loader2
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col items-center justify-center p-4">
      {/* Logo Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl animate-pulse">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              📚 EduSmart
            </h1>
            <p className="text-xl text-gray-600 font-medium">Hệ thống học tập cá nhân hóa</p>
          </div>
        </div>
        
        {/* 3 Main Subjects */}
        <div className="flex items-center justify-center gap-8">
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-bold text-blue-700">🔢 Toán học</span>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-bold text-green-700">📚 Ngữ văn</span>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-bold text-purple-700">🌍 Tiếng Anh</span>
          </div>
        </div>
      </div>

      {/* Login/Register Card */}
      <Card className="w-full max-w-md border-blue-200 shadow-2xl bg-white rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white pb-8">
          <CardTitle className="text-3xl font-bold">
            {activeTab === "login" ? "🎯 Đăng nhập" : "✨ Đăng ký"}
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            {activeTab === "login" 
              ? "Chào mừng bé quay trở lại!"
              : "Tạo tài khoản để bắt đầu học!"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {registerSuccess ? (
            <Alert className="border-green-200 bg-green-50 text-center">
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <AlertDescription className="text-green-800 font-medium">
                🎉 Đăng ký thành công! 
                <br />
                <span className="text-sm">Vui lòng kiểm tra email để xác nhận tài khoản.</span>
              </AlertDescription>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => navigate("/email-verification?email=banhoc@email.com")}
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    <Label htmlFor="email" className="text-blue-700 font-semibold flex items-center gap-2">
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
                    <Label htmlFor="password" className="text-blue-700 font-semibold flex items-center gap-2">
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
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    <Dialog open={showForgotPasswordDialog} onOpenChange={setShowForgotPasswordDialog}>
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
                          <DialogTitle className="text-blue-700">🔐 Đặt lại mật khẩu</DialogTitle>
                          <DialogDescription>
                            Nhập email để nhận hướng dẫn đặt lại mật khẩu
                          </DialogDescription>
                        </DialogHeader>
                        {forgotPasswordSent ? (
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                              ✅ Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <form onSubmit={handleForgotPassword} className="space-y-4">
                            <Input
                              type="email"
                              placeholder="Nhập email của bạn"
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
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
                      <span className="bg-white px-2 text-gray-500">Hoặc đăng nhập bằng</span>
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
                        <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">G</span>
                        </div>
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
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                          <span className="text-xs text-white font-bold">M</span>
                        </div>
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
                    <Label htmlFor="fullName" className="text-orange-700 font-semibold flex items-center gap-2">
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
                    <Label htmlFor="registerEmail" className="text-orange-700 font-semibold flex items-center gap-2">
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
                    <Label htmlFor="registerPassword" className="text-orange-700 font-semibold flex items-center gap-2">
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
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-orange-700 font-semibold flex items-center gap-2">
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    🔐 <strong>Bảo mật:</strong> Sau khi đăng ký, hệ thống sẽ gửi email xác thực. 
                    Bạn cần xác nhận email để kích hoạt tài khoản và hỗ trợ xác thực 2 bước.
                  </AlertDescription>
                </Alert>
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
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xs">Tập trung vào 3 môn học chính:</span>
          <span className="text-blue-600 font-bold text-xs">Toán</span>
          <span className="text-gray-400">•</span>
          <span className="text-green-600 font-bold text-xs">Văn</span>
          <span className="text-gray-400">•</span>
          <span className="text-purple-600 font-bold text-xs">Anh</span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="text-xs">Được thiết kế với</span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span className="text-xs">cho các bạn học sinh</span>
        </div>
      </div>
    </div>
  );
}
