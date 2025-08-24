import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <Card className="max-w-md mx-auto mt-20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">
              404 - Không tìm thấy trang
            </CardTitle>
            <CardDescription className="text-center">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link to="/">Về trang chủ</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
