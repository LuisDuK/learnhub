import { useMemo, useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  BookOpen,
  Edit,
  Trash2,
  Search,
  FileText,
  Tag,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const mockLessons = [
  {
    id: 1,
    subject: "Toán học",
    chapter: "Phép cộng trong phạm vi 100",
    title: "Cộng hai số có nhớ",
    shortDescription: "Học cách cộng hai số có nhớ với ví dụ minh họa",
    status: "draft",
    duration: "20 phút",
    order: 1,
  },
  {
    id: 2,
    subject: "Ngữ văn",
    chapter: "Kể chuyện",
    title: "Kể chuyện theo tranh",
    shortDescription: "Rèn luyện kỹ năng kể chuyện theo tranh",
    status: "published",
    duration: "30 phút",
    order: 2,
  },
  {
    id: 3,
    subject: "Tiếng Anh",
    chapter: "Từ vựng cơ bản",
    title: "Từ vựng gia đình",
    shortDescription: "Học các từ vựng về gia đình qua trò chơi",
    status: "published",
    duration: "15 phút",
    order: 3,
  },
];

const subjects = ["Tất cả", "Toán học", "Ngữ văn", "Tiếng Anh"];
const statuses = ["Tất cả", "published", "draft"];

export default function TeacherLessons() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const filteredLessons = useMemo(() => {
    return mockLessons.filter((l) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        l.chapter.toLowerCase().includes(q);
      const matchesSubject = subjectFilter === "Tất cả" || l.subject === subjectFilter;
      const matchesStatus = statusFilter === "Tất cả" || l.status === statusFilter;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [searchTerm, subjectFilter, statusFilter]);

  const total = mockLessons.length;
  const published = mockLessons.filter((l) => l.status === "published").length;
  const drafts = mockLessons.filter((l) => l.status === "draft").length;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-green-600" /> Quản lý bài học
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Tạo, chỉnh sửa và quản lý các bài học — giao diện toàn trang, không cần backend
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/teacher/lessons/new")} className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <Plus className="h-4 w-4 mr-2" /> Thêm bài học mới
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <div>
                <p className="text-sm font-medium">Tổng bài học</p>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total}</div>
              <p className="text-xs text-muted-foreground">Tổng số bài học</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <div>
                <p className="text-sm font-medium">Đã xuất bản</p>
              </div>
              <Badge className="bg-green-100 text-green-800">{published}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{published}</div>
              <p className="text-xs text-muted-foreground">Bài học sẵn sàng cho học sinh</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <div>
                <p className="text-sm font-medium">Bản nháp</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">{drafts}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{drafts}</div>
              <p className="text-xs text-muted-foreground">Bài học cần hoàn thiện</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <div>
                <p className="text-sm font-medium">Môn học</p>
              </div>
              <Tag className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(mockLessons.map((l) => l.subject)).size}</div>
              <p className="text-xs text-muted-foreground">Số môn chứa bài học</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tiêu đề, môn, chương..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Môn học" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === "Tất cả" ? "Tất cả" : s === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.chapter} • {lesson.subject}</p>
                      </div>
                    </div>
                    <Badge variant={lesson.status === "published" ? undefined : "secondary"}>
                      {lesson.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                    </Badge>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{lesson.shortDescription}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="px-2 py-1 rounded-md bg-muted text-xs">#{lesson.order}</span>
                      <span>{lesson.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/teacher/lessons/new?edit=${lesson.id}`)}>
                        <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" /> Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <CardFooter className="text-xs text-muted-foreground">
                Tạo mẫu giao diện — không lưu backend
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
}
