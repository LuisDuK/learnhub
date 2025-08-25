import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const email = searchParams.get("email") || "banhoc@email.com";
  const token = searchParams.get("token");

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Auto verify if token is present
  useEffect(() => {
    if (token) {
      handleAutoVerification();
    }
  }, [token]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAutoVerification = async () => {
    setIsLoading(true);
    // Simulate auto verification process
    setTimeout(() => {
      setIsLoading(false);
      setVerificationStatus("success");
    }, 2000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otpCode === "123456") {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    }, 1500);
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setTimeLeft(300);
    setCanResend(false);
    // Simulate resend email
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-green-200 shadow-2xl bg-white rounded-3xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              🎉 Xác thực thành công!
            </CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Tài khoản của bạn đã được kích hoạt
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 text-center space-y-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ✅ Email <strong>{email}</strong> đã được xác thực thành công!
                <br />
                Bạn có thể đăng nhập và bắt đầu hành trình học tập.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-blue-700 font-medium">
                    Bảo mật
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-700 font-medium">
                    Đã xác thực
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                    <Sparkles className="h-6 w-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-orange-700 font-medium">
                    Sẵn sàng
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl h-12 text-lg"
              >
                🚀 Đăng nhập ngay
              </Button>

              <p className="text-sm text-gray-600">
                Hoặc{" "}
                <Button
                  variant="link"
                  onClick={() => navigate("/")}
                  className="p-0 h-auto text-blue-600"
                >
                  quay về trang chủ
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              📧 Xác thực Email
            </h1>
            <p className="text-lg text-gray-600">EduSmart Platform</p>
          </div>
        </div>
      </div>

      {/* Verification Card */}
      <Card className="w-full max-w-md border-blue-200 shadow-2xl bg-white rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white pb-8">
          <CardTitle className="text-2xl font-bold">
            🔐 Xác thực tài khoản
          </CardTitle>
          <CardDescription className="text-blue-100 text-base">
            Vui lòng kiểm tra email để hoàn tất đăng ký
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Email sent confirmation */}
          <Alert className="border-blue-200 bg-blue-50">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              📨 Chúng tôi đã gửi email xác thực đến <strong>{email}</strong>
              <br />
              <span className="text-sm">
                Vui lòng kiểm tra hộp thư (bao gồm thư rác)
              </span>
            </AlertDescription>
          </Alert>

          {/* Two verification methods */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-bold text-gray-700 mb-2">
                Hai cách xác thực:
              </h3>
            </div>

            {/* Method 1: Click link */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h4 className="font-bold text-green-700">
                  Nhấp vào link trong email
                </h4>
              </div>
              <p className="text-sm text-green-600 ml-11">
                Tự động xác thực và chuyển hướng về trang đăng nhập
              </p>
            </div>

            {/* Method 2: Enter OTP */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h4 className="font-bold text-orange-700">
                  Nhập mã OTP (6 chữ số)
                </h4>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-3 ml-11">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-orange-700 font-medium">
                    Mã xác thực:
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="border-orange-200 focus:border-orange-500 rounded-xl text-center text-lg font-mono tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={otpCode.length !== 6 || isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Đang xác thực...
                    </div>
                  ) : (
                    "✅ Xác thực OTP"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Error message */}
          {verificationStatus === "error" && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                ❌ Mã OTP không đúng. Vui lòng kiểm tra lại hoặc yêu cầu gửi mã
                mới.
              </AlertDescription>
            </Alert>
          )}

          {/* Resend section */}
          <div className="text-center border-t pt-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {canResend
                  ? "Mã đã hết hạn"
                  : `Mã hết hạn sau ${formatTime(timeLeft)}`}
              </span>
            </div>

            <Button
              onClick={handleResendEmail}
              disabled={!canResend || isLoading}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Gửi lại email
            </Button>
          </div>

          {/* Help section */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-700 mb-2">💡 Cần trợ giúp?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kiểm tra thư mục Spam/Junk</li>
              <li>• Đảm bảo email chính xác</li>
              <li>• Thử nhấp vào link thay vì nhập OTP</li>
              <li>• Liên hệ hỗ trợ nếu vẫn gặp vấn đề</li>
            </ul>
          </div>

          {/* Back to login */}
          <div className="text-center">
            <Button
              onClick={() => navigate("/login")}
              variant="link"
              className="text-blue-600 hover:text-blue-700"
            >
              ← Quay lại đăng nhập
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-6 text-gray-600">
        <p className="text-sm">
          🔐 Xác thực email giúp bảo vệ tài khoản của bạn
        </p>
      </div>
    </div>
  );
}
