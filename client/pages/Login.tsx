import { useState } from "react";
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
import { Sparkles, BookOpen, Calculator, Globe, PenTool } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = "/";
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate register process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex flex-col items-center justify-center p-4">
      {/* Logo Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-pulse shadow-lg">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🌟 KidsLearn
            </h1>
            <p className="text-lg text-muted-foreground">Học vui, học giỏi!</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-2xl">
          <div className="text-center">
            <Calculator className="h-8 w-8 text-primary mx-auto mb-1" />
            <span className="text-sm text-muted-foreground">Toán</span>
          </div>
          <div className="text-center">
            <BookOpen className="h-8 w-8 text-accent mx-auto mb-1" />
            <span className="text-sm text-muted-foreground">Văn</span>
          </div>
          <div className="text-center">
            <Globe className="h-8 w-8 text-secondary mx-auto mb-1" />
            <span className="text-sm text-muted-foreground">Anh</span>
          </div>
        </div>
      </div>

      {/* Login/Register Card */}
      <Card className="w-full max-w-md border-primary/20 shadow-2xl bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Chào mừng bé! 👋
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Đăng nhập để bắt đầu hành trình học tập thú vị
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-primary/10">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                📖 Đăng nhập
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                ✨ Đăng ký
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary font-medium">
                    📧 Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ten@email.com"
                    required
                    className="border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-primary font-medium"
                  >
                    🔒 Mật khẩu
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold rounded-xl h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang đăng nhập...
                    </div>
                  ) : (
                    "🚀 Đăng nhập ngay!"
                  )}
                </Button>
                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    🤔 Quên mật khẩu?
                  </Link>
                </div>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4 mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-primary font-medium"
                  >
                    👤 Họ và tên
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    required
                    className="border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="registerEmail"
                    className="text-primary font-medium"
                  >
                    📧 Email
                  </Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="ten@email.com"
                    required
                    className="border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="registerPassword"
                    className="text-primary font-medium"
                  >
                    🔒 Mật khẩu
                  </Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-primary font-medium"
                  >
                    🔐 Xác nhận mật khẩu
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/80 hover:to-secondary/80 text-white font-bold rounded-xl h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang tạo tài khoản...
                    </div>
                  ) : (
                    "🎉 Tạo tài khoản!"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-muted-foreground">
        <p className="text-sm">
          Nền tảng học tập trực tuyến dành cho học sinh 🎓
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xs">Được thiết kế với</span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span className="text-xs">cho các bạn học sinh</span>
        </div>
      </div>
    </div>
  );
}
