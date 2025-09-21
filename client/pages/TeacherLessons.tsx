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
  CardDescription,
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
  Bot,
  Sparkles,
  RefreshCw,
  Wand2,
  Save,
  Copy,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

  // AI generator modal state
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const difficulties = ["Dễ", "Trung bình", "Khó", "Nâng cao"];
  const ageGroups = [
    "5-6 tuổi",
    "6-7 tuổi",
    "7-8 tuổi",
    "8-9 tuổi",
    "9-10 tuổi",
    "10-12 tuổi",
  ];
  const exerciseTypes = [
    { value: "multiple_choice", label: "Trắc nghiệm" },
    { value: "short_answer", label: "Trả lời ngắn" },
    { value: "essay", label: "Tự luận" },
    { value: "true_false", label: "Đúng/Sai" },
    { value: "fill_blank", label: "Điền từ" },
    { value: "matching", label: "Nối từ" },
  ];

  const [aiForm, setAiForm] = useState({
    subject: "",
    topic: "",
    ageGroup: "",
    difficulty: "",
    exerciseType: "",
    count: 5,
    inputMode: "description" as "description" | "reference",
    objective: "",
    objectiveImage: null as File | null,
    referenceDoc: null as File | null,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const mockGeneratedExercises = [
    {
      id: 1,
      type: "multiple_choice",
      question: "Trong phép cộng 25 + 17, kết quả là:",
      options: ["42", "52", "32", "41"],
      correctAnswer: "A",
      explanation:
        "25 + 17 = 42. Ta có thể tính bằng cách cộng hàng đơn vị trước: 5 + 7 = 12, viết 2 nhớ 1. Sau đó cộng hàng chục: 2 + 1 + 1 (nhớ) = 4.",
      difficulty: "Dễ",
      subject: "Toán",
      ageGroup: "7-8 tuổi",
      estimatedTime: "2 phút",
    },
    {
      id: 2,
      type: "short_answer",
      question: "Hãy tính kết quả của phép tính: 6 × 8 = ?",
      correctAnswer: "48",
      keywords: ["48", "bốn m��ơi tám"],
      explanation:
        "6 × 8 = 48. Có thể nhớ bằng bảng cửu chương hoặc tính: 6 × (10 - 2) = 60 - 12 = 48",
      difficulty: "Trung bình",
      subject: "Toán",
      ageGroup: "8-9 tuổi",
      estimatedTime: "3 phút",
    },
    {
      id: 3,
      type: "essay",
      question:
        "Em hãy giải thích tại sao 0 chia cho bất kỳ số nào cũng bằng 0, nhưng không thể chia một số cho 0?",
      rubric:
        "Học sinh cần giải thích được: 1) 0 chia cho số khác 0 luôn bằng 0, 2) Chia cho 0 là không xác định, 3) Đưa ra ví dụ minh họa",
      maxWords: 150,
      keywords: ["không xác định", "quy tắc", "ví dụ"],
      explanation:
        "Câu hỏi này giúp học sinh hiểu được khái niệm cơ bản về phép chia và tại sao chia cho 0 là không được phép.",
      difficulty: "Nâng cao",
      subject: "Toán",
      ageGroup: "10-12 tuổi",
      estimatedTime: "10 phút",
    },
  ];

  const openAIModalForLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setAiForm((prev) => ({
      ...prev,
      subject: lesson.subject || "",
      topic: lesson.title || "",
    }));
    setGeneratedContent([]);
    setEditingId(null);
    setGenerationProgress(0);
    setIsGenerating(false);
    setAiOpen(true);
  };

  const handleGenerateAI = async () => {
    if (!aiForm.subject || !aiForm.topic || !aiForm.ageGroup) return;
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedContent([]);
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setGenerationProgress(Math.round(((i + 1) / steps) * 100));
    }
    const generated = mockGeneratedExercises
      .map((exercise, index) => ({
        ...exercise,
        id: Date.now() + index,
        subject: aiForm.subject,
        ageGroup: aiForm.ageGroup,
        difficulty: aiForm.difficulty || (exercise as any).difficulty,
      }))
      .slice(0, aiForm.count);
    setGeneratedContent(generated);
    setIsGenerating(false);
  };

  const startEdit = (id: number) => setEditingId(id);
  const saveEdit = (id: number, patch: any) => {
    setGeneratedContent((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
    setEditingId(null);
  };

  const addManualQuestion = () => {
    const newQ = {
      id: Date.now(),
      type: aiForm.exerciseType || "multiple_choice",
      question: `Câu hỏi thủ công: ${aiForm.topic || "(chủ đề)"}`,
      options: ["A", "B", "C", "D"],
      correctAnswer: "A",
      explanation: "",
      difficulty: aiForm.difficulty || "Trung bình",
      subject: aiForm.subject || "",
      ageGroup: aiForm.ageGroup || "",
      estimatedTime: "2 phút",
    } as any;
    setGeneratedContent((g) => [...g, newQ]);
  };

  const filteredLessons = useMemo(() => {
    return mockLessons.filter((l) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        l.chapter.toLowerCase().includes(q);
      const matchesSubject =
        subjectFilter === "Tất cả" || l.subject === subjectFilter;
      const matchesStatus =
        statusFilter === "Tất cả" || l.status === statusFilter;
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
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/teacher/lessons/new")}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white"
            >
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
              <p className="text-xs text-muted-foreground">
                Bài học sẵn sàng cho học sinh
              </p>
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
              <p className="text-xs text-muted-foreground">
                Bài học cần hoàn thiện
              </p>
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
              <div className="text-2xl font-bold">
                {new Set(mockLessons.map((l) => l.subject)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Số môn chứa bài học
              </p>
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
                    {s === "Tất cả"
                      ? "Tất cả"
                      : s === "published"
                        ? "Đã xuất bản"
                        : "Bản nháp"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg truncate">
                        {lesson.title}
                      </h3>
                      <Badge
                        variant={
                          lesson.status === "published"
                            ? undefined
                            : "secondary"
                        }
                      >
                        {lesson.status === "published"
                          ? "Đã xuất bản"
                          : "Bản nháp"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {lesson.chapter} • {lesson.subject}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {lesson.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end text-sm text-muted-foreground">
                    <span className="font-medium">#{lesson.order}</span>
                    <span>{lesson.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/teacher/lessons/new?edit=${lesson.id}`)
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" /> Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
}
