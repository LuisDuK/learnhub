import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex-1 p-6">
      <Card className="max-w-md mx-auto mt-20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trang này đang được phát triển. Hãy tiếp tục hỏi để tôi hoàn thiện
            nội dung cho trang này.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Quay lại
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
