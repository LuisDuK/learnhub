import { useMemo, useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Link2, Plus, Trash2, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  const [textBlocks, setTextBlocks] = useState<string[]>([""]);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const [includeQuiz, setIncludeQuiz] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [scheduleAt, setScheduleAt] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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
      { id: crypto.randomUUID(), text: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  const updateQuestion = (id: string, patch: Partial<QuizQuestion>) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  const updateOption = (id: string, idx: number, value: string) =>
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? { ...q, options: q.options.map((o, i) => (i === idx ? value : o)) } : q)),
    );
  const removeQuestion = (id: string) =>
    setQuestions((qs) => qs.filter((q) => q.id !== id));

  const handleFinish = () => {
    if (!canSubmit) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng nhập Môn, Chương và Tiêu đề." });
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
          <Badge variant="secondary" className="ml-2">Giao diện toàn trang</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/teacher/lessons")}>Hủy</Button>
          <Button onClick={handleFinish} disabled={!canSubmit}>{isEdit ? "Cập nhật" : "Hoàn tất"}</Button>
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
              <TabsTrigger value="quiz">3. Quiz & Bài tập</TabsTrigger>
              <TabsTrigger value="schedule">4. Lịch/Thời gian</TabsTrigger>
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
                  <Input placeholder="Nhập tên chương" value={chapter} onChange={(e) => setChapter(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Tiêu đề</Label>
                  <Input placeholder="Nhập tiêu đề bài học" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Mô tả ngắn</Label>
                  <Textarea rows={3} placeholder="Tóm tắt nội dung bài học" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Link2 className="h-4 w-4" /> Liên kết với sách</Label>
                    <Select value={selectedBookId} onValueChange={(v) => { setSelectedBookId(v); setSelectedBookLessonId(""); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn sách" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBooks.map((b) => (
                          <SelectItem key={b.id} value={b.id}>{b.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Liên kết tới bài học trong sách</Label>
                    <Select value={selectedBookLessonId} onValueChange={setSelectedBookLessonId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bài trong sách" />
                      </SelectTrigger>
                      <SelectContent>
                        {(mockBooks.find((b) => b.id === selectedBookId)?.lessons || []).map((l) => (
                          <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>
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
                      onChange={(e) => setTextBlocks((arr) => arr.map((v, i) => (i === idx ? e.target.value : v)))}
                    />
                    {textBlocks.length > 1 && (
                      <Button variant="destructive" size="sm" onClick={() => removeTextBlock(idx)}>
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
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Loại</Label>
                      <Select value={m.type} onValueChange={(v) => updateMedia(idx, { type: v as MediaItem["type"] })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
                      <Input placeholder="https://..." value={m.url} onChange={(e) => updateMedia(idx, { url: e.target.value })} />
                    </div>
                    <div className="space-y-2 md:col-span-5">
                      <Label>Mô tả</Label>
                      <Input placeholder="Mô tả ngắn" value={m.description} onChange={(e) => updateMedia(idx, { description: e.target.value })} />
                    </div>
                    <div className="md:col-span-1">
                      <Button variant="destructive" size="sm" onClick={() => removeMedia(idx)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Xoá
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTab("info")}>Quay lại</Button>
                <Button onClick={() => setTab("quiz")}>Tiếp tục</Button>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Câu hỏi Quiz</h3>
                  <p className="text-sm text-muted-foreground">Nhập câu hỏi kèm đáp án, có thể gắn mốc thời gian hoặc vị trí</p>
                </div>
                <Button variant="outline" size="sm" onClick={addQuestion}>
                  <Plus className="h-4 w-4 mr-1" /> Thêm câu hỏi
                </Button>
              </div>

              {questions.map((q) => (
                <Card key={q.id}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="space-y-2">
                      <Label>Nội dung câu hỏi</Label>
                      <Input value={q.text} onChange={(e) => updateQuestion(q.id, { text: e.target.value })} placeholder="Nhập câu hỏi" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <RadioGroup
                            value={String(q.correctIndex)}
                            onValueChange={(v) => updateQuestion(q.id, { correctIndex: Number(v) })}
                            className="flex items-center gap-2"
                          >
                            <RadioGroupItem value={String(i)} id={`${q.id}-opt-${i}`} />
                          </RadioGroup>
                          <Input
                            value={opt}
                            onChange={(e) => updateOption(q.id, i, e.target.value)}
                            placeholder={`Đáp án ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mốc thời gian/Vị trí (tùy chọn)</Label>
                        <Input
                          placeholder="Ví dụ: 01:23 hoặc Trang 12"
                          value={q.marker || ""}
                          onChange={(e) => updateQuestion(q.id, { marker: e.target.value })}
                        />
                      </div>
                      <div className="flex items-end justify-end">
                        <Button variant="destructive" size="sm" onClick={() => removeQuestion(q.id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Xoá câu hỏi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTab("materials")}>Quay lại</Button>
                <Button onClick={() => setTab("schedule")}>Tiếp tục</Button>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Thời gian dự kiến</Label>
                  <Input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Vị trí/Lớp</Label>
                  <Input placeholder="Ví dụ: Lớp 3A - Phòng 201" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTab("quiz")}>Quay lại</Button>
                <Button onClick={handleFinish}>Hoàn tất</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TeacherLayout>
  );
}
