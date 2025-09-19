import React, { useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bot,
  Sparkles,
  FileText,
  Download,
  Copy,
  RefreshCw,
  Wand2,
  Settings,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

// Mock AI-generated content
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
    keywords: ["48", "bốn mươi tám"],
    explanation:
      "6 × 8 = 48. Có thể nhớ bằng bảng cửu chương hoặc tính: 6 × 8 = 6 × (10 - 2) = 60 - 12 = 48",
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
      "Học sinh cần giải thích được: 1) 0 chia cho số khác 0 luôn bằng 0, 2) Chia cho 0 là không xác định, 3) Đưa ra ví d�� minh họa",
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

const subjects = ["Toán", "Văn", "Anh"];
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

const aiPromptTemplates = [
  {
    name: "Bài tập cơ bản",
    description: "Tạo bài tập ôn luyện kiến thức cơ bản",
    template:
      "Tạo {count} câu hỏi {type} về {topic} cho học sinh {ageGroup}, độ khó {difficulty}. Bao gồm đáp án và giải thích chi tiết.",
  },
  {
    name: "Đề kiểm tra",
    description: "Tạo đề kiểm tra hoàn chỉnh",
    template:
      "Tạo đề kiểm tra {duration} phút về {topic} cho h��c sinh {ageGroup}, gồm {count} câu hỏi đa dạng từ dễ đến khó.",
  },
  {
    name: "Bài tập thực hành",
    description: "Tạo bài tập áp dụng thực tế",
    template:
      "Tạo {count} bài tập thực hành về {topic} cho học sinh {ageGroup}, tập trung vào ứng dụng kiến thức vào tình huống thực tế.",
  },
];

import { useToast } from "@/hooks/use-toast";

export default function TeacherAIGenerator() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [generationHistory, setGenerationHistory] = useState<any[]>([]);

  // Local edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  // Mock learning path lessons
  const mockPathLessons = [
    { id: "l1", title: "Phép cộng cơ bản" },
    { id: "l2", title: "Phép cộng có nhớ" },
    { id: "l3", title: "Phép trừ cơ bản" },
  ];

  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    ageGroup: "",
    difficulty: "",
    exerciseType: "",
    count: 5,
    duration: 30,
    customPrompt: "",
    includeExplanations: true,
    includeImages: false,
    language: "vietnamese",
    format: "standard",
    objective: "",
    selectedLessons: [] as string[],
    // inputMode: 'description' (normal) or 'reference' (upload doc)
    inputMode: "description",
    // uploaded files (client-side only)
    objectiveImage: null as File | null,
    referenceDoc: null as File | null,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.name);
    const prompt = template.template
      .replace("{count}", formData.count.toString())
      .replace(
        "{type}",
        exerciseTypes.find((t) => t.value === formData.exerciseType)?.label ||
          "câu hỏi",
      )
      .replace("{topic}", formData.topic || "chủ đề")
      .replace("{ageGroup}", formData.ageGroup || "học sinh")
      .replace("{difficulty}", formData.difficulty || "phù hợp")
      .replace("{duration}", formData.duration.toString());

    setFormData({ ...formData, customPrompt: prompt });
  };

  const handleGenerate = async () => {
    if (!formData.subject || !formData.topic || !formData.ageGroup) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedContent([]);

    // Simulate AI generation process
    const steps = [
      "Phân tích yêu cầu...",
      "Tạo nội dung câu hỏi...",
      "Tạo đáp án và giải thích...",
      "Kiểm tra chất lượng...",
      "Hoàn thiện bài tập...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGenerationProgress((i + 1) * 20);
    }

    // Generate mock exercises based on form data
    const generated = mockGeneratedExercises
      .map((exercise, index) => ({
        ...exercise,
        id: Date.now() + index,
        subject: formData.subject,
        ageGroup: formData.ageGroup,
        difficulty: formData.difficulty,
      }))
      .slice(0, formData.count);

    setGeneratedContent(generated);

    // Add to history
    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      subject: formData.subject,
      topic: formData.topic,
      count: generated.length,
      exercises: generated,
    };
    setGenerationHistory([historyItem, ...generationHistory]);

    setIsGenerating(false);
    setGenerationProgress(100);
  };

  const addManualQuestion = () => {
    const newQ = {
      id: Date.now(),
      type: formData.exerciseType || "multiple_choice",
      question: `Câu hỏi thủ công: ${formData.topic || "(chủ đề)"}`,
      options: ["A","B","C","D"],
      correctAnswer: "A",
      explanation: "",
      difficulty: formData.difficulty || "Trung bình",
      subject: formData.subject || "",
      ageGroup: formData.ageGroup || "",
      estimatedTime: "2 phút",
    };
    setGeneratedContent((g) => [...g, newQ]);
    toast({ title: "Thêm câu", description: "Đã thêm câu hỏi thủ công vào cuối danh sách." });
  };

  const handleSaveExercise = (exercise: any) => {
    // Mock save to course
    toast({ title: "Đã lưu câu hỏi", description: "Câu hỏi được lưu vào kho bài tập (giả lập)." });
    console.log("Saving exercise:", exercise);
  };

  const handlePublishAll = () => {
    // Mock publish: add to history as published
    const item = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      subject: formData.subject,
      topic: formData.topic,
      count: generatedContent.length,
      exercises: generatedContent,
      published: true,
    };
    setGenerationHistory((h) => [item, ...h]);
    toast({ title: "Đã xuất bản", description: "Bài ôn đ�� được xuất bản (giả lập)." });
  };

  const handleSaveAll = () => {
    const item = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      subject: formData.subject,
      topic: formData.topic,
      count: generatedContent.length,
      exercises: generatedContent,
      published: false,
    };
    setGenerationHistory((h) => [item, ...h]);
    toast({ title: "Đã lưu", description: "Bộ bài ôn đã được lưu (giả lập)." });
  };

  const handleExportAll = () => {
    const data = {
      metadata: {
        subject: formData.subject,
        topic: formData.topic,
        ageGroup: formData.ageGroup,
        difficulty: formData.difficulty,
        generatedAt: new Date().toISOString(),
      },
      exercises: generatedContent,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exercises-${formData.subject}-${Date.now()}.json`;
    a.click();
  };

  const moveItem = (fromId: number, toId: number) => {
    const fromIndex = generatedContent.findIndex((c) => c.id === fromId);
    const toIndex = generatedContent.findIndex((c) => c.id === toId);
    if (fromIndex === -1 || toIndex === -1) return;
    const next = [...generatedContent];
    const [item] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    setGeneratedContent(next);
  };

  const startEdit = (id: number) => {
    setEditingId(id);
  };

  const saveEdit = (id: number, patch: any) => {
    setGeneratedContent((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    setEditingId(null);
    toast({ title: "Đã lưu", description: "Câu hỏi đã được cập nhật." });
  };

  const renderExercise = (exercise: any, index: number) => {
    const isEditing = editingId === exercise.id;
    return (
      <Card
        key={exercise.id}
        className="border border-purple-200"
        draggable
        onDragStart={() => setDraggingId(exercise.id)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (draggingId != null && draggingId !== exercise.id) {
            moveItem(draggingId, exercise.id);
          }
          setDraggingId(null);
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Câu {index + 1}</Badge>
              <Badge className="bg-purple-100 text-purple-800">
                {exerciseTypes.find((t) => t.value === exercise.type)?.label}
              </Badge>
              {!isEditing ? (
                <Badge variant="secondary">{exercise.difficulty}</Badge>
              ) : (
                <Select
                  value={exercise.difficulty}
                  onValueChange={(v) => saveEdit(exercise.id, { difficulty: v })}
                >
                  <SelectTrigger className="w-[120px]"></SelectTrigger>
                  <SelectContent>
                    {difficulties.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button size="sm" variant="outline" onClick={() => startEdit(exercise.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    navigator.clipboard?.writeText(JSON.stringify(exercise, null, 2));
                    toast({ title: "Đã sao ch��p", description: "Câu hỏi đã được sao chép vào clipboard." });
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleSaveExercise(exercise)}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setGeneratedContent((s) => s.filter((x) => x.id !== exercise.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => saveEdit(exercise.id, { ...exercise })}>
                    Lưu
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setEditingId(null)}>
                    Huỷ
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditing ? (
            <>
              <div>
                <Label className="text-sm font-medium text-gray-700">Câu hỏi:</Label>
                <p className="mt-1 text-gray-900">{exercise.question}</p>
              </div>

              {exercise.type === "multiple_choice" && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Các lựa chọn:</Label>
                  <div className="mt-2 space-y-1">
                    {exercise.options.map((option: string, optionIndex: number) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <span className="font-medium text-sm w-6">{String.fromCharCode(65 + optionIndex)}.</span>
                        <span className={String.fromCharCode(65 + optionIndex) === exercise.correctAnswer ? "text-green-600 font-medium" : "text-gray-700"}>{option}</span>
                        {String.fromCharCode(65 + optionIndex) === exercise.correctAnswer && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exercise.type === "short_answer" && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Đáp án:</Label>
                  <p className="mt-1 text-green-600 font-medium">{exercise.correctAnswer}</p>
                </div>
              )}

              {exercise.explanation && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Giải thích:</Label>
                  <p className="mt-1 text-gray-600 text-sm">{exercise.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                <span>Thời gian ước tính: {exercise.estimatedTime}</span>
                <span>Độ tuổi: {exercise.ageGroup}</span>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Chỉnh sửa câu hỏi</Label>
                <Input value={exercise.question} onChange={(e) => setGeneratedContent((prev) => prev.map((p) => p.id === exercise.id ? { ...p, question: e.target.value } : p))} />
              </div>
              {exercise.type === "multiple_choice" && (
                <div className="space-y-2">
                  {exercise.options.map((opt: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-6">{String.fromCharCode(65 + i)}.</span>
                      <Input value={opt} onChange={(e) => setGeneratedContent((prev) => prev.map((p) => p.id === exercise.id ? { ...p, options: p.options.map((o: string, idx: number) => idx === i ? e.target.value : o) } : p))} />
                      <Button size="sm" variant={exercise.correctAnswer === String.fromCharCode(65 + i) ? "secondary" : "outline"} onClick={() => setGeneratedContent((prev) => prev.map((p) => p.id === exercise.id ? { ...p, correctAnswer: String.fromCharCode(65 + i) } : p))}>Đúng</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Bot className="h-8 w-8 text-purple-600" />
              AI Sinh bài tập
            </h1>
            <p className="text-gray-600 mt-1">
              Sử dụng AI để tạo bài tập v�� đề kiểm tra chất lượng cao
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Cài đặt AI
            </Button>
            {generatedContent.length > 0 && (
              <Button onClick={handleExportAll}>
                <Download className="h-4 w-4 mr-2" />
                Xuất tất cả
              </Button>
            )}
          </div>
        </div>


        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 items-center justify-center bg-[#F0F2F5] rounded-[14px] text-[#4D80B3] h-10 p-1">
            <TabsTrigger value="create">Tạo bài tập</TabsTrigger>
            <TabsTrigger value="history">
              Lịch sử ({generationHistory.length})
            </TabsTrigger>
            <TabsTrigger value="templates">Mẫu có sẵn</TabsTrigger>
          </TabsList>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Generation Form */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-purple-600" />
                      Thông tin bài tập
                    </CardTitle>
                    <CardDescription>
                      Điền thông tin để AI tạo bài tập phù hợp
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Môn học *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          handleInputChange("subject", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn môn học" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Chủ đề/Nội dung *</Label>
                      <Input
                        id="topic"
                        value={formData.topic}
                        onChange={(e) =>
                          handleInputChange("topic", e.target.value)
                        }
                        placeholder="VD: Phép cộng trong phạm vi 20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Chọn bài trong lộ trình</Label>
                      <div className="flex flex-col gap-2">
                        {mockPathLessons.map((ls) => (
                          <label key={ls.id} className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.selectedLessons.includes(ls.id)}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...formData.selectedLessons, ls.id]
                                  : formData.selectedLessons.filter((id) => id !== ls.id);
                                handleInputChange("selectedLessons", next);
                              }}
                            />
                            <span className="text-sm">{ls.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.inputMode === "description" && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="ageGroup">Độ tuổi *</Label>
                          <Select
                            value={formData.ageGroup}
                            onValueChange={(value) =>
                              handleInputChange("ageGroup", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn độ tuổi" />
                            </SelectTrigger>
                            <SelectContent>
                              {ageGroups.map((age) => (
                                <SelectItem key={age} value={age}>
                                  {age}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Độ khó</Label>
                          <Select
                            value={formData.difficulty}
                            onValueChange={(value) =>
                              handleInputChange("difficulty", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn độ khó" />
                            </SelectTrigger>
                            <SelectContent>
                              {difficulties.map((difficulty) => (
                                <SelectItem key={difficulty} value={difficulty}>
                                  {difficulty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {formData.inputMode === "description" && (
                      <div className="space-y-2">
                        <Label htmlFor="exerciseType">Loại câu hỏi</Label>
                        <Select
                          value={formData.exerciseType}
                          onValueChange={(value) =>
                            handleInputChange("exerciseType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại câu hỏi" />
                          </SelectTrigger>
                          <SelectContent>
                            {exerciseTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {formData.inputMode === "description" && (
                      <div className="space-y-2">
                        <Label htmlFor="count">
                          Số câu hỏi: {formData.count}
                        </Label>
                        <Slider
                          value={[formData.count]}
                          onValueChange={(value) =>
                            handleInputChange("count", value[0])
                          }
                          max={20}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>1</span>
                          <span>20</span>
                        </div>
                      </div>
                    )}

                    {formData.inputMode === "description" && (
                      <div className="space-y-3 pt-2 border-t">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeExplanations"
                            checked={formData.includeExplanations}
                            onCheckedChange={(checked) =>
                              handleInputChange("includeExplanations", checked)
                            }
                          />
                          <Label
                            htmlFor="includeExplanations"
                            className="text-sm"
                          >
                            Bao gồm giải thích đáp án
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeImages"
                            checked={formData.includeImages}
                            onCheckedChange={(checked) =>
                              handleInputChange("includeImages", checked)
                            }
                          />
                          <Label htmlFor="includeImages" className="text-sm">
                            Tạo hình ảnh minh họa (nếu có thể)
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="inputMode">Nguồn yêu cầu</Label>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="inputMode"
                            checked={formData.inputMode === "description"}
                            onChange={() => handleInputChange("inputMode", "description")}
                          />
                          <span>Mô tả yêu cầu</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name="inputMode"
                            checked={formData.inputMode === "reference"}
                            onChange={() => handleInputChange("inputMode", "reference")}
                          />
                          <span>Tải tài liệu tham khảo</span>
                        </label>
                      </div>
                    </div>

                    {formData.inputMode === "description" ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="objective">Mục tiêu bài ôn</Label>
                          <Input
                            id="objective"
                            value={formData.objective}
                            onChange={(e) => handleInputChange("objective", e.target.value)}
                            placeholder="Ví dụ: củng cố phép cộng có nhớ, rèn phản xạ tính nhẩm"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Hoặc gửi ảnh yêu cầu</Label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0] || null;
                              handleInputChange("objectiveImage", f);
                            }}
                          />
                          {formData.objectiveImage && (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(formData.objectiveImage)}
                                alt="preview"
                                className="h-24 object-contain border rounded"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label>Tải tài liệu tham khảo</Label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={(e) => handleInputChange("referenceDoc", e.target.files?.[0] || null)}
                        />
                        {formData.referenceDoc && (
                          <div className="text-sm text-muted-foreground">Tệp đã chọn: {formData.referenceDoc.name}</div>
                        )}
                        <div className="text-xs text-muted-foreground">Sau khi tải lên, AI sẽ tạo bài ôn tương tự nội dung trong tài liệu.</div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="customPrompt">Yêu cầu tùy chỉnh</Label>
                      <Textarea
                        id="customPrompt"
                        value={formData.customPrompt}
                        onChange={(e) =>
                          handleInputChange("customPrompt", e.target.value)
                        }
                        placeholder="Thêm yêu cầu đặc biệt cho AI..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleGenerate()}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        disabled={
                          isGenerating || !formData.subject || !formData.topic || !formData.ageGroup
                        }
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Đang tạo...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Tạo bài tập bằng AI
                          </>
                        )}
                      </Button>

                      <Button variant="outline" onClick={() => {
                        // open advanced modal or prefill using template
                        setSelectedTemplate("");
                        toast({ title: "Mẫu", description: "Chọn mẫu hoặc điều chỉnh yêu cầu trước khi tạo." });
                      }}>
                        <Wand2 className="h-4 w-4 mr-2" /> Tùy chỉnh
                      </Button>
                    </div>

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Tiến độ</span>
                          <span>{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Generated Content */}
              <div className="lg:col-span-2">
                {generatedContent.length > 0 ? (
                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Bài tập được tạo ({generatedContent.length})
                      </h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => addManualQuestion()}>
                          <Plus className="h-4 w-4 mr-1" />
                          Thêm câu
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleGenerate()}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Tạo lại
                        </Button>
                        <Button size="sm" onClick={() => handleSaveAll()}>
                          <Save className="h-4 w-4 mr-1" />
                          Lưu tất cả
                        </Button>
                        <Button size="sm" className="bg-green-600 text-white" onClick={() => handlePublishAll()}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Xuất bản
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {generatedContent.map((exercise, index) =>
                        renderExercise(exercise, index),
                      )}
                    </div>
                  </div>
                ) : (
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-12 text-center">
                      <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">
                        Chưa có bài tập nào được tạo
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Điền thông tin bên trái và nhấn "Tạo bài tập bằng AI" để
                        bắt đầu
                      </p>
                      <Alert className="border-blue-200 bg-blue-50 text-left">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Mẹo:</strong> Hãy mô tả cụ thể chủ đề và yêu
                          cầu để AI tạo ra bài tập chất lượng tốt nhất!
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            {generationHistory.length > 0 ? (
              <div className="space-y-4">
                {generationHistory.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {item.subject} - {item.topic}
                          </CardTitle>
                          <CardDescription>
                            {item.count} câu hỏi •{" "}
                            {new Date(item.timestamp).toLocaleString("vi-VN")}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Chưa có lịch sử tạo bài tập
                  </h3>
                  <p className="text-gray-500">
                    Các bài tập đã tạo sẽ được lưu lại ở đây để bạn có thể xem
                    lại
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiPromptTemplates.map((template) => (
                <Card
                  key={template.name}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200"
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {template.template}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleTemplateSelect(template);
                        setActiveTab("create");
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Sử dụng mẫu này
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
