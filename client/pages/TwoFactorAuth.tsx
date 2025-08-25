import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Mail,
  Smartphone,
  Key,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Lock,
  RefreshCw,
  Settings,
} from "lucide-react";

export default function TwoFactorAuth() {
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState<
    "settings" | "verify" | "complete"
  >("settings");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const handleEnable2FA = async () => {
    setIsLoading(true);
    // Simulate enabling 2FA
    setTimeout(() => {
      setIsLoading(false);
      setSetupStep("verify");
    }, 1000);
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) return;

    setIsLoading(true);
    setVerificationError(false);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === "123456") {
        setIsEnabled(true);
        setSetupStep("complete");
      } else {
        setVerificationError(true);
      }
    }, 1500);
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    // Simulate disabling 2FA
    setTimeout(() => {
      setIsLoading(false);
      setIsEnabled(false);
      setSetupStep("settings");
      setVerificationCode("");
      setVerificationError(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🔐 Xác thực 2 bước
            </h1>
            <p className="text-lg text-gray-600">Bảo vệ tài khoản học tập</p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-lg border-blue-200 shadow-2xl bg-white rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-8">
          <CardTitle className="text-2xl font-bold">
            {setupStep === "settings" && "⚙️ Cài đặt bảo mật"}
            {setupStep === "verify" && "📱 Xác thực thiết lập"}
            {setupStep === "complete" && "✅ Hoàn tất thiết lập"}
          </CardTitle>
          <CardDescription className="text-blue-100 text-base">
            {setupStep === "settings" &&
              "Tăng cường bảo mật cho tài khoản của bạn"}
            {setupStep === "verify" && "Xác nhận mã để hoàn tất thiết lập"}
            {setupStep === "complete" && "Xác thực 2 bước đã được kích hoạt"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Settings Step */}
          {setupStep === "settings" && (
            <div className="space-y-6">
              {/* Current Status */}
              <Alert
                className={`${isEnabled ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
              >
                <Shield
                  className={`h-4 w-4 ${isEnabled ? "text-green-600" : "text-orange-600"}`}
                />
                <AlertDescription
                  className={isEnabled ? "text-green-800" : "text-orange-800"}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {isEnabled
                        ? "🟢 Xác thực 2 bước đã được bật"
                        : "🟡 Xác thực 2 bước chưa được bật"}
                    </span>
                    <Badge variant={isEnabled ? "default" : "secondary"}>
                      {isEnabled ? "Đã bật" : "Chưa bật"}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>

              {/* 2FA Methods */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-700">
                  📞 Phương thức xác thực có sẵn:
                </h3>

                <div className="space-y-3">
                  {/* Email method */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700">
                          Email OTP
                        </h4>
                        <p className="text-sm text-blue-600">
                          Nhận mã qua email
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 border-blue-300"
                    >
                      Khuyến nghị
                    </Badge>
                  </div>

                  {/* SMS method (disabled for demo) */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">SMS OTP</h4>
                        <p className="text-sm text-gray-600">
                          Nhận mã qua tin nhắn
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Sắp có</Badge>
                  </div>
                </div>
              </div>

              {/* Toggle 2FA */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-purple-700">
                      Kích hoạt xác thực 2 bước
                    </h4>
                    <p className="text-sm text-purple-600">
                      Bảo vệ tài khoản với lớp bảo mật thêm
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleEnable2FA();
                    } else {
                      handleDisable2FA();
                    }
                  }}
                  disabled={isLoading}
                />
              </div>

              {/* Benefits */}
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
            </div>
          )}

          {/* Verification Step */}
          {setupStep === "verify" && (
            <div className="space-y-6">
              <Alert className="border-blue-200 bg-blue-50">
                <Mail className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  📧 Chúng tôi đã gửi mã xác thực 6 số đến email của bạn.
                  <br />
                  <span className="text-sm">
                    Vui lòng kiểm tra hộp thư và nhập mã để hoàn tất thiết lập.
                  </span>
                </AlertDescription>
              </Alert>

              <form onSubmit={handleVerify2FA} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="verification-code"
                    className="text-purple-700 font-semibold flex items-center gap-2"
                  >
                    <Key className="h-4 w-4" />
                    Mã xác thực (6 chữ số)
                  </Label>
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) =>
                      setVerificationCode(
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    className="border-purple-200 focus:border-purple-500 rounded-xl h-12 text-center text-xl font-mono tracking-widest"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-600 text-center">
                    💡 Để test, sử dụng mã:{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      123456
                    </span>
                  </p>
                </div>

                {verificationError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      ❌ Mã xác thực không đúng. Vui lòng thử lại.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSetupStep("settings")}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    ← Quay lại
                  </Button>
                  <Button
                    type="submit"
                    disabled={verificationCode.length !== 6 || isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Đang xác thực...
                      </div>
                    ) : (
                      "✅ Xác thực"
                    )}
                  </Button>
                </div>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  📧 Gửi lại mã xác thực
                </Button>
              </div>
            </div>
          )}

          {/* Complete Step */}
          {setupStep === "complete" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  🎉{" "}
                  <strong>Xác thực 2 bước đã được kích hoạt thành công!</strong>
                  <br />
                  Tài khoản của bạn giờ đây được bảo vệ tốt hơn.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-700 mb-2">
                    🔒 Từ bây giờ khi đăng nhập:
                  </h4>
                  <ol className="text-sm text-blue-600 space-y-1 text-left">
                    <li>1. Nhập email và mật khẩu như bình thường</li>
                    <li>2. Nhận mã OTP qua email</li>
                    <li>3. Nhập mã OTP để hoàn tất đăng nhập</li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate("/settings")}
                    variant="outline"
                    className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Hoàn tất
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Back to settings */}
          {setupStep === "settings" && (
            <div className="text-center mt-6">
              <Button
                onClick={() => navigate("/settings")}
                variant="link"
                className="text-blue-600 hover:text-blue-700"
              >
                ← Quay lại cài đặt
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-6 text-gray-600">
        <p className="text-sm">
          🛡️ Xác thực 2 bước giúp bảo vệ tài khoản học tập của bạn
        </p>
      </div>
    </div>
  );
}
