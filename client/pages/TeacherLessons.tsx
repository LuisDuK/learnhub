import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const mockLessons = [
  {
    id: 1,
    subject: "Toán học",
    chapter: "Phép cộng trong phạm vi 100",
    title: "Cộng hai số có nhớ",
    shortDescription: "Học cách cộng hai số có nhớ với ví dụ minh họa",
    status: "draft",
  },
  {
    id: 2,
    subject: "Ngữ văn",
    chapter: "Kể chuyện",
    title: "Kể chuyện theo tranh",
    shortDescription: "Rèn luyện kỹ năng kể chuyện theo tranh",
    status: "published",
  },
];

export default function TeacherLessons() {
  const navigate = useNavigate();
  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý bài học</h1>
          <p className="text-sm text-muted-foreground">
            Tạo, chỉnh sửa và quản lý các bài học của bạn
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/teacher/lessons/new")}>
            <Plus className="h-4 w-4 mr-2" /> Thêm bài học mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockLessons.map((lesson) => (
          <Card key={lesson.id} className="hover-grow fun-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                {lesson.title}
              </CardTitle>
              <Badge variant={lesson.status === "published" ? "default" : "secondary"}>
                {lesson.status === "published" ? "Đã xuất bản" : "Bản nháp"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <div><span className="font-medium text-foreground">Môn:</span> {lesson.subject}</div>
                <div><span className="font-medium text-foreground">Chương:</span> {lesson.chapter}</div>
                <div className="mt-1">{lesson.shortDescription}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/teacher/lessons/new?edit=${lesson.id}`}>
                    <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" /> Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
