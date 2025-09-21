import { TeacherLayout } from "@/components/TeacherLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Link2, Plus, Trash2, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

interface MediaItem {
  type: "video" | "audio" | "image" | "pdf";
  url: string;
  description: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  marker?: string; // mốc thời gian hoặc vị trí (tùy chọn)
}

export default function TeacherLessonCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();
  const isEdit = useMemo(() => Boolean(params.get("edit")), [params]);

  const [tab, setTab] = useState("info");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");

  // Mock books (client-side only) and selection state
  const mockBooks = [
    {
      id: "b1",
      title: "SGK Toán lớp 3",
      lessons: [
        { id: "b1-l1", title: "Phép cộng trong phạm vi 20" },
        { id: "b1-l2", title: "Phép cộng trong phạm vi 100" },
      ],
    },
    {
      id: "b2",
      title: "SGK Ngữ văn lớp 3",
      lessons: [
        { id: "b2-l1", title: "Kể chuyện theo tranh" },
        { id: "b2-l2", title: "Tập làm văn" },
      ],
    },
  ];

  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [selectedBookLessonId, setSelectedBookLessonId] = useState<string>("");

  // Mock lessons for edit prefilling
  const mockLessons = [
    {
      id: 1,
      subject: "Toán học",
      chapter: "Phép cộng trong phạm vi 100",
      title: "Cộng hai số có nhớ",
      shortDescription: "Học cách cộng hai số có nhớ với ví dụ minh họa",
      textBlocks: ["Giới thiệu cách thực hiện phép cộng có nhớ"],
      media: [],
      questions: [
        {
          id: "q1",
          text: "1+9=?",
          options: ["9", "10", "11", "12"],
          correctIndex: 1,
          marker: "00:15",
        },
      ],
      exercises: [{ id: "e1", question: "Tính 12+9", answer: "21" }],
    },
    {
      id: 2,
      subject: "Ngữ văn",
      chapter: "Kể chuyện",
      title: "Kể chuyện theo tranh",
      shortDescription: "Rèn luyện kỹ năng kể chuyện theo tranh",
      textBlocks: ["Hướng dẫn cách miêu tả nhân vật và cốt truyện"],
      media: [],
      questions: [],
      exercises: [],
    },
  ];

  const [loadedEdit, setLoadedEdit] = useState(false);

  useEffect(() => {
    const editId = params.get("edit");
    if (!editId || loadedEdit) return;
    const idNum = Number(editId);
    const lesson = mockLessons.find((l) => l.id === idNum);
    if (!lesson) return;

    // map subject text to select value keys used in the form
    const subjectMap: Record<string, string> = {
      "Toán học": "math",
      "Ngữ văn": "literature",
      "Tiếng Anh": "english",
      "Khoa học": "science",
    };

    setSubject(subjectMap[lesson.subject] || "");
    setChapter(lesson.chapter || "");
    setTitle(lesson.title || "");
    setShortDesc(lesson.shortDescription || "");
    setTextBlocks(lesson.textBlocks || [lesson.shortDescription || ""]);

    // try to find a matching book + lesson
    const matchingBook = mockBooks.find((b) =>
      b.lessons.some((ls) => ls.title === lesson.title),
    );
    if (matchingBook) {
      setSelectedBookId(matchingBook.id);
      const bl = matchingBook.lessons.find((ls) => ls.title === lesson.title);
      if (bl) setSelectedBookLessonId(bl.id);
    }

    // populate questions and exercises
    setQuestions((lesson.questions || []).map((q: any) => ({ ...q })));
    setExercises((lesson.exercises || []).map((ex: any) => ({ ...ex })));

    setLoadedEdit(true);
  }, [params, loadedEdit]);

  const [textBlocks, setTextBlocks] = useState<string[]>([""]);

  // AI modal state (used in Quiz/Exercises tabs)
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMode, setAiMode] = useState<"quiz" | "exercise">("quiz");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const ageGroups = [
    "5-6 tuổi",
    "6-7 tuổi",
    "7-8 tuổi",
    "8-9 tuổi",
    "9-10 tuổi",
    "10-12 tuổi",
  ];
  const difficulties = ["Dễ", "Trung bình", "Khó", "Nâng cao"];
  const [aiForm, setAiForm] = useState({
    subject: "",
    topic: "",
    ageGroup: "",
    difficulty: "",
    count: 3,
    inputMode: "description" as "description" | "reference",
    objective: "",
    objectiveImage: null as File | null,
    referenceDoc: null as File | null,
  });
  const [aiPreview, setAiPreview] = useState<any[]>([]);

  const openAIModal = (mode: "quiz" | "exercise") => {
    setAiMode(mode);
    setAiForm((prev) => ({
      ...prev,
      subject,
      topic: title,
    }));
    setIsGenerating(false);
    setGenerationProgress(0);
    setAiOpen(true);
  };

  const handleGenerateAI = async () => {
    // Cho phép tạo mẫu ngay cả khi thiếu thông tin: tự áp dụng giá trị mặc định thân thiện
    setAiForm((prev) => ({
      ...prev,
      subject: prev.subject || "math",
      topic: prev.topic || title || "Bài học",
      ageGroup: prev.ageGroup || "6-7 tuổi",
      difficulty: prev.difficulty || "Trung bình",
    }));
    setIsGenerating(true);
    setGenerationProgress(0);
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      await new Promise((r) => setTimeout(r, 500));
      setGenerationProgress(Math.round(((i + 1) / steps) * 100));
    }

    if (aiMode === "quiz") {
      const samples: QuizQuestion[] = Array.from({ length: aiForm.count }).map(
        (_, i) => ({
          id: crypto.randomUUID(),
          text: `AI câu hỏi ${i + 1}: ${aiForm.topic}`,
          options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          correctIndex: 1,
          marker: "00:30",
        }),
      );
      setAiPreview(samples as any[]);
    } else {
      const items = Array.from({ length: aiForm.count }).map((_, i) => ({
        id: crypto.randomUUID(),
        question: `Bài tập ${i + 1}: ${aiForm.topic}`,
        answer: "Đáp án mẫu",
      }));
      setAiPreview(items as any[]);
    }

    setIsGenerating(false);
  };

  const commitAIPreview = () => {
    if (aiPreview.length === 0) return;
    if (aiMode === "quiz") {
      setQuestions((q) => [...q, ...(aiPreview as QuizQuestion[])]);
      toast({
        title: "Đã chèn câu hỏi",
        description: `Đã thêm ${aiPreview.length} câu hỏi vào quiz.`,
      });
    } else {
      setExercises((ex) => [
        ...ex,
        ...(aiPreview as { id: string; question: string; answer: string }[]),
      ]);
      toast({
        title: "Đã chèn bài tập",
        description: `Đã thêm ${aiPreview.length} b��i tập.`,
      });
    }
    setAiPreview([]);
    setAiOpen(false);
  };
  const [media, setMedia] = useState<MediaItem[]>([]);

  const [includeQuiz, setIncludeQuiz] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Exercises (practice questions) - client side only
  type ExerciseItem = {
    id: string;
    type?: "short" | "multiple_choice";
    question: string;
    answer?: string;
    options?: string[];
    correctIndex?: number;
  };
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [exerciseDraft, setExerciseDraft] = useState<{
    type: "short" | "multiple_choice";
    question: string;
    answer: string;
    options: string[];
    correctIndex: number;
  }>({ type: "short", question: "", answer: "", options: ["", "", "", ""], correctIndex: 0 });

  const canSubmit = subject && title && chapter;

  const addTextBlock = () => setTextBlocks((arr) => [...arr, ""]);
  const removeTextBlock = (idx: number) =>
    setTextBlocks((arr) => arr.filter((_, i) => i !== idx));

  const addMedia = () =>
    setMedia((m) => [...m, { type: "video", url: "", description: "" }]);
  const updateMedia = (idx: number, patch: Partial<MediaItem>) =>
    setMedia((m) => m.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const removeMedia = (idx: number) =>
    setMedia((m) => m.filter((_, i) => i !== idx));

  const addQuestion = () =>
    setQuestions((q) => [
      ...q,
      {
        id: crypto.randomUUID(),
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ]);
  const updateQuestion = (id: string, patch: Partial<QuizQuestion>) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  const updateOption = (id: string, idx: number, value: string) =>
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === id
          ? { ...q, options: q.options.map((o, i) => (i === idx ? value : o)) }
          : q,
      ),
    );
  const removeQuestion = (id: string) =>
    setQuestions((qs) => qs.filter((q) => q.id !== id));

  // AI helpers (client-side mock)
  const generateAIQuestions = (count = 3) => {
    const samples = Array.from({ length: count }).map((_, i) => ({
      id: crypto.randomUUID(),
      text: `AI câu hỏi mẫu ${i + 1}: Nêu ví dụ về ${title || "bài học"}`,
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      correctIndex: 1,
      marker: "00:30",
    }));
    setQuestions((q) => [...q, ...samples]);
    toast({
      title: "AI đã tạo câu hỏi",
      description: `Đã tạo ${count} câu hỏi mẫu bằng AI.`,
    });
  };

  const generateAIExercises = (count = 3) => {
    const items = Array.from({ length: count }).map((_, i) => ({
      id: crypto.randomUUID(),
      question: `Bài tập AI ${i + 1}: Hãy giải bài toán nhỏ liên quan đến ${title || "bài học"}`,
      answer: "Đáp án mẫu",
    }));
    setExercises((ex) => [...ex, ...items]);
    toast({
      title: "AI đã tạo bài tập",
      description: `Đã tạo ${count} bài tập mẫu bằng AI.`,
    });
  };

  const handleFinish = () => {
    if (!canSubmit) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập Môn, Chương và Tiêu đề.",
      });
      setTab("info");
      return;
    }

    // Simulate save
    toast({
      title: isEdit ? "Đã cập nhật bài học" : "Đã tạo bài học",
      description: includeQuiz
        ? `Đã lưu ${questions.length} câu hỏi quiz cùng tài liệu học tập`
        : "Đã lưu bài học và tài liệu học tập",
    });
    navigate("/teacher/lessons");
  };

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">
            {isEdit ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
          </h1>
          <Badge variant="secondary" className="ml-2">
            Giao diện toàn trang
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/teacher/lessons")}
          >
            Hủy
          </Button>
          <Button onClick={handleFinish} disabled={!canSubmit}>
            {isEdit ? "Cập nhật" : "Hoàn tất"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nhập thông tin và nội dung bài học</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="info">1. Thông tin</TabsTrigger>
              <TabsTrigger value="materials">2. Tài liệu học tập</TabsTrigger>
              <TabsTrigger value="quiz">3. Quiz</TabsTrigger>
              <TabsTrigger value="exercises">4. Bài tập</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Môn học</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Toán học</SelectItem>
                      <SelectItem value="literature">Ngữ văn</SelectItem>
                      <SelectItem value="english">Tiếng Anh</SelectItem>
                      <SelectItem value="science">Khoa học</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Chương</Label>
                  <Input
                    placeholder="Nhập tên chương"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Tiêu đề</Label>
                  <Input
                    placeholder="Nhập tiêu đề bài học"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Mô tả ngắn</Label>
                  <Textarea
                    rows={3}
                    placeholder="Tóm tắt nội dung bài học"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Link2 className="h-4 w-4" /> Liên kết với sách
                    </Label>
                    <Select
                      value={selectedBookId}
                      onValueChange={(v) => {
                        setSelectedBookId(v);
                        setSelectedBookLessonId("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn sách" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBooks.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Liên kết tới bài học trong sách</Label>
                    <Select
                      value={selectedBookLessonId}
                      onValueChange={setSelectedBookLessonId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bài trong sách" />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          mockBooks.find((b) => b.id === selectedBookId)
                            ?.lessons || []
                        ).map((l) => (
                          <SelectItem key={l.id} value={l.id}>
                            {l.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setTab("materials")}>Tiếp tục</Button>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Văn bản hướng dẫn</h3>
                  <Button variant="outline" size="sm" onClick={addTextBlock}>
                    <Plus className="h-4 w-4 mr-1" /> Thêm đoạn văn
                  </Button>
                </div>
                {textBlocks.map((t, idx) => (
                  <div key={idx} className="space-y-2">
                    <Label>Đoạn {idx + 1}</Label>
                    <Textarea
                      rows={4}
                      placeholder="Nhập nội dung..."
                      value={t}
                      onChange={(e) =>
                        setTextBlocks((arr) =>
                          arr.map((v, i) => (i === idx ? e.target.value : v)),
                        )
                      }
                    />
                    {textBlocks.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeTextBlock(idx)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Xoá đoạn
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Tư liệu đa phương tiện</h3>
                  <Button variant="outline" size="sm" onClick={addMedia}>
                    <Plus className="h-4 w-4 mr-1" /> Thêm tư liệu
                  </Button>
                </div>
                {media.map((m, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
                  >
                    <div className="space-y-2 md:col-span-2">
                      <Label>Loại</Label>
                      <Select
                        value={m.type}
                        onValueChange={(v) =>
                          updateMedia(idx, { type: v as MediaItem["type"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="image">Hình ảnh</SelectItem>
                          <SelectItem value="pdf">Tài liệu PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <Label>Liên kết</Label>
                      <Input
                        placeholder="https://..."
                        value={m.url}
                        onChange={(e) =>
                          updateMedia(idx, { url: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-5">
                      <Label>Mô tả</Label>
                      <Input
                        placeholder="Mô tả ngắn"
                        value={m.description}
                        onChange={(e) =>
                          updateMedia(idx, { description: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeMedia(idx)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Xoá
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTab("info")}>
                  Quay lại
                </Button>
                <Button onClick={() => setTab("quiz")}>Tiếp tục</Button>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Câu hỏi Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Nhập câu hỏi kèm đáp án và gắn thời điểm/ mốc thời gian sẽ
                    hiển thị câu hỏi trong bài học (ví dụ 01:23)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={addQuestion}>
                    <Plus className="h-4 w-4 mr-1" /> Thêm câu hỏi
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openAIModal("quiz")}
                  >
                    🤖 AI tạo câu hỏi
                  </Button>
                </div>
              </div>

              {questions.map((q) => (
                <Card key={q.id}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="space-y-2">
                      <Label>Nội dung câu hỏi</Label>
                      <Input
                        value={q.text}
                        onChange={(e) =>
                          updateQuestion(q.id, { text: e.target.value })
                        }
                        placeholder="Nhập câu hỏi"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <RadioGroup
                            value={String(q.correctIndex)}
                            onValueChange={(v) =>
                              updateQuestion(q.id, { correctIndex: Number(v) })
                            }
                            className="flex items-center gap-2"
                          >
                            <RadioGroupItem
                              value={String(i)}
                              id={`${q.id}-opt-${i}`}
                            />
                          </RadioGroup>
                          <Input
                            value={opt}
                            onChange={(e) =>
                              updateOption(q.id, i, e.target.value)
                            }
                            placeholder={`Đáp án ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="h-4 w-4" /> Thời điểm hiển thị câu
                          hỏi (ví dụ 01:23)
                        </Label>
                        <Input
                          placeholder="Ví dụ: 01:23 or Trang 12"
                          value={q.marker || ""}
                          onChange={(e) =>
                            updateQuestion(q.id, { marker: e.target.value })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Thời điểm này sẽ được dùng khi phát lại bài học để
                          hiển thị câu hỏi tương ứng.
                        </p>
                      </div>
                      <div className="flex items-end justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeQuestion(q.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Xoá câu hỏi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTab("materials")}>
                  Quay lại
                </Button>
                <Button onClick={() => setTab("exercises")}>Tiếp tục</Button>
              </div>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Bài tập ôn tập</h3>
                    <p className="text-sm text-muted-foreground">
                      Thêm các câu hỏi ôn tập và đáp án để người học luyện tập
                      sau bài giảng
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Câu hỏi ôn tập</Label>
                  <Textarea
                    rows={2}
                    placeholder="Nhập câu hỏi"
                    value={exerciseDraft.question}
                    onChange={(e) =>
                      setExerciseDraft({ ...exerciseDraft, question: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loại câu hỏi</Label>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="exerciseType"
                        checked={exerciseDraft.type === "short"}
                        onChange={() => setExerciseDraft({ ...exerciseDraft, type: "short" })}
                      />
                      <span>Câu trả lời ngắn</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="exerciseType"
                        checked={exerciseDraft.type === "multiple_choice"}
                        onChange={() => setExerciseDraft({ ...exerciseDraft, type: "multiple_choice" })}
                      />
                      <span>Trắc nghiệm</span>
                    </label>
                  </div>
                </div>
                {exerciseDraft.type === "multiple_choice" ? (
                  <div className="space-y-2">
                    <Label>Đáp án (Trắc nghiệm)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {exerciseDraft.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="exerciseCorrect"
                            checked={exerciseDraft.correctIndex === i}
                            onChange={() => setExerciseDraft({ ...exerciseDraft, correctIndex: i })}
                          />
                          <Input
                            value={opt}
                            onChange={(e) =>
                              setExerciseDraft({
                                ...exerciseDraft,
                                options: exerciseDraft.options.map((o, idx) => (idx === i ? e.target.value : o)),
                              })
                            }
                            placeholder={`Đáp án ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Đáp án</Label>
                    <Textarea
                      rows={2}
                      placeholder="Nhập đáp án/ gợi ý"
                      value={exerciseDraft.answer}
                      onChange={(e) =>
                        setExerciseDraft({ ...exerciseDraft, answer: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setExerciseDraft({ question: "", answer: "" })
                    }
                  >
                    Xoá
                  </Button>
                  <Button
                    onClick={() => {
                      if (!exerciseDraft.question) return;
                      const newItem: ExerciseItem = {
                        id: crypto.randomUUID(),
                        type: exerciseDraft.type,
                        question: exerciseDraft.question,
                        answer: exerciseDraft.type === "short" ? exerciseDraft.answer : undefined,
                        options: exerciseDraft.type === "multiple_choice" ? exerciseDraft.options : undefined,
                        correctIndex: exerciseDraft.type === "multiple_choice" ? exerciseDraft.correctIndex : undefined,
                      };
                      setExercises((ex) => [...ex, newItem]);
                      setExerciseDraft({ type: "short", question: "", answer: "", options: ["", "", "", ""], correctIndex: 0 });
                    }}
                  >
                    Thêm câu hỏi ôn tập
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => openAIModal("exercise")}
                  >
                    🤖 AI tạo bài tập
                  </Button>
                </div>

                {exercises.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium">Danh sách bài tập</h4>
                    {exercises.map((ex) => (
                      <div
                        key={ex.id}
                        className="p-3 border rounded-md flex items-start justify-between"
                      >
                        <div className="min-w-0">
                          <div className="font-medium truncate">{ex.question}</div>
                          {ex.type === "multiple_choice" ? (
                            <div className="text-sm text-muted-foreground">
                              {ex.options?.map((opt, i) => (
                                <div key={i} className={ex.correctIndex === i ? "font-medium" : "text-sm text-muted-foreground"}>
                                  {String.fromCharCode(65 + i)}. {opt}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground truncate">{ex.answer}</div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setExercises((s) => s.filter((e) => e.id !== ex.id))
                          }
                        >
                          Xoá
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTab("quiz")}>
                  Quay lại
                </Button>
                <Button onClick={handleFinish}>Hoàn tất</Button>
              </div>
            </TabsContent>

            {/* AI Modal accessible from Quiz/Exercises */}
            <Dialog open={aiOpen} onOpenChange={setAiOpen}>
              <DialogContent className="max-w-6xl w-[95vw]">
                <DialogHeader>
                  <DialogTitle>
                    {aiMode === "quiz"
                      ? "AI tạo câu hỏi cho bài học"
                      : "AI tạo bài tập ôn tập"}
                  </DialogTitle>
                  <DialogDescription>
                    Điền thông tin để AI tạo nội dung phù hợp, kết quả sẽ chèn
                    vào mục hiện tại.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 lg:grid-cols-5 max-h-[70vh]">
                  <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2">
                    <div className="space-y-2">
                      <Label>Môn học</Label>
                      <Select
                        value={aiForm.subject}
                        onValueChange={(v) =>
                          setAiForm({ ...aiForm, subject: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn môn học" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Toán học</SelectItem>
                          <SelectItem value="literature">Ngữ văn</SelectItem>
                          <SelectItem value="english">Tiếng Anh</SelectItem>
                          <SelectItem value="science">Khoa học</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Chủ đề / Tiêu đề</Label>
                      <Input
                        value={aiForm.topic}
                        onChange={(e) =>
                          setAiForm({ ...aiForm, topic: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Độ tuổi</Label>
                      <Select
                        value={aiForm.ageGroup}
                        onValueChange={(v) =>
                          setAiForm({ ...aiForm, ageGroup: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn độ tuổi" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageGroups.map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Độ khó</Label>
                      <Select
                        value={aiForm.difficulty}
                        onValueChange={(v) =>
                          setAiForm({ ...aiForm, difficulty: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn độ khó" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Số lượng: {aiForm.count}</Label>
                      <Slider
                        value={[aiForm.count]}
                        onValueChange={(v) =>
                          setAiForm({ ...aiForm, count: v[0] })
                        }
                        min={1}
                        max={20}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Nguồn yêu cầu</Label>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="aimode"
                            checked={aiForm.inputMode === "description"}
                            onChange={() =>
                              setAiForm({ ...aiForm, inputMode: "description" })
                            }
                          />
                          <span>Mô tả yêu cầu</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="aimode"
                            checked={aiForm.inputMode === "reference"}
                            onChange={() =>
                              setAiForm({ ...aiForm, inputMode: "reference" })
                            }
                          />
                          <span>Tài liệu tham khảo</span>
                        </label>
                      </div>
                    </div>
                    {aiForm.inputMode === "description" ? (
                      <div className="space-y-2 md:col-span-2">
                        <Label>Mục tiêu</Label>
                        <Input
                          value={aiForm.objective}
                          onChange={(e) =>
                            setAiForm({ ...aiForm, objective: e.target.value })
                          }
                          placeholder="Ví dụ: củng cố phép cộng có nhớ"
                        />
                        <div className="space-y-1">
                          <Label>Ảnh yêu cầu (tuỳ chọn)</Label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setAiForm({
                                ...aiForm,
                                objectiveImage: e.target.files?.[0] || null,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 md:col-span-2">
                        <Label>Tài liệu tham khảo</Label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={(e) =>
                            setAiForm({
                              ...aiForm,
                              referenceDoc: e.target.files?.[0] || null,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-3 flex flex-col overflow-hidden">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>
                          Xem trước nội dung AI sinh ra trước khi chèn.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-[calc(70vh-8rem)] overflow-y-auto space-y-3">
                        {aiMode === "quiz" ? (
                          aiPreview.length > 0 ? (
                            (aiPreview as any[]).map((q: any, i: number) => (
                              <div key={q.id} className="p-3 border rounded">
                                <div className="font-medium">
                                  Câu {i + 1}: {q.text}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Mốc: {q.marker}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              Chưa có nội dung. Nhấn "Tạo bằng AI" để xem
                              preview.
                            </div>
                          )
                        ) : aiPreview.length > 0 ? (
                          (aiPreview as any[]).map((ex: any) => (
                            <div key={ex.id} className="p-3 border rounded">
                              <div className="font-medium">{ex.question}</div>
                              <div className="text-sm text-muted-foreground">
                                {ex.answer}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Chưa có nội dung. Nhấn "Tạo bằng AI" để xem preview.
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex-1 pr-4">
                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Tiến độ</span>
                          <span>{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setAiOpen(false)}>
                      Huỷ
                    </Button>
                    <Button
                      onClick={handleGenerateAI}
                      disabled={isGenerating}
                    >
                      Tạo bằng AI
                    </Button>
                    {aiPreview.length > 0 && (
                      <Button
                        className="bg-green-600 text-white"
                        onClick={commitAIPreview}
                      >
                        Chèn vào {aiMode === "quiz" ? "Quiz" : "Bài tập"}
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Tabs>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
