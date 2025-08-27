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
  Target,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Brain,
} from "lucide-react";

// Mock AI-generated content
const mockGeneratedExercises = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Trong phép cộng 25 + 17, kết quả là:",
    options: ["42", "52", "32", "41"],
    correctAnswer: "A",
    explanation: "25 + 17 = 42. Ta có thể tính bằng cách cộng hàng đơn vị trước: 5 + 7 = 12, viết 2 nhớ 1. Sau đó cộng hàng chục: 2 + 1 + 1 (nhớ) = 4.",
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
    explanation: "6 × 8 = 48. Có thể nhớ bằng bảng cửu chương hoặc tính: 6 × 8 = 6 × (10 - 2) = 60 - 12 = 48",
    difficulty: "Trung bình",
    subject: "Toán",
    ageGroup: "8-9 tuổi",
    estimatedTime: "3 phút",
  },
  {
    id: 3,
    type: "essay",
    question: "Em hãy giải thích tại sao 0 chia cho bất kỳ số nào cũng bằng 0, nhưng không thể chia một số cho 0?",
    rubric: "Học sinh cần giải thích được: 1) 0 chia cho số khác 0 luôn bằng 0, 2) Chia cho 0 là không xác định, 3) Đưa ra ví dụ minh họa",
    maxWords: 150,
    keywords: ["không xác định", "quy tắc", "ví dụ"],
    explanation: "Câu hỏi này giúp học sinh hiểu được khái niệm cơ bản về phép chia và tại sao chia cho 0 là không được phép.",
    difficulty: "Nâng cao",
    subject: "Toán",
    ageGroup: "10-12 tuổi",
    estimatedTime: "10 phút",
  },
];

const subjects = ["Toán", "Tiếng Việt", "Tiếng Anh", "Khoa học", "Lịch sử"];
const difficulties = ["Dễ", "Trung bình", "Khó", "Nâng cao"];
const ageGroups = ["5-6 tuổi", "6-7 tuổi", "7-8 tuổi", "8-9 tuổi", "9-10 tuổi", "10-12 tuổi"];
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
    template: "Tạo {count} câu hỏi {type} về {topic} cho học sinh {ageGroup}, độ khó {difficulty}. Bao gồm đáp án và giải thích chi tiết."
  },
  {
    name: "Đề kiểm tra",
    description: "Tạo đề kiểm tra hoàn chỉnh",
    template: "Tạo đề kiểm tra {duration} phút về {topic} cho học sinh {ageGroup}, gồm {count} câu hỏi đa dạng từ dễ đến khó."
  },
  {
    name: "Bài tập thực hành",
    description: "Tạo bài tập áp dụng thực tế",
    template: "Tạo {count} bài tập thực hành về {topic} cho học sinh {ageGroup}, tập trung vào ứng dụng kiến thức vào tình huống thực tế."
  },
];

export default function TeacherAIGenerator() {
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [generationHistory, setGenerationHistory] = useState<any[]>([]);

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
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.name);
    const prompt = template.template
      .replace("{count}", formData.count.toString())
      .replace("{type}", exerciseTypes.find(t => t.value === formData.exerciseType)?.label || "c��u hỏi")
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress((i + 1) * 20);
    }

    // Generate mock exercises based on form data
    const generated = mockGeneratedExercises.map((exercise, index) => ({
      ...exercise,
      id: Date.now() + index,
      subject: formData.subject,
      ageGroup: formData.ageGroup,
      difficulty: formData.difficulty,
    })).slice(0, formData.count);

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

  const handleSaveExercise = (exercise: any) => {
    // Mock save to course
    console.log("Saving exercise:", exercise);
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
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exercises-${formData.subject}-${Date.now()}.json`;
    a.click();
  };

  const renderExercise = (exercise: any, index: number) => {
    return (
      <Card key={exercise.id} className="border border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Câu {index + 1}</Badge>
              <Badge className="bg-purple-100 text-purple-800">
                {exerciseTypes.find(t => t.value === exercise.type)?.label}
              </Badge>
              <Badge variant="secondary">{exercise.difficulty}</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={() => handleSaveExercise(exercise)}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
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
                    <span className="font-medium text-sm w-6">
                      {String.fromCharCode(65 + optionIndex)}.
                    </span>
                    <span className={
                      String.fromCharCode(65 + optionIndex) === exercise.correctAnswer 
                        ? "text-green-600 font-medium" 
                        : "text-gray-700"
                    }>
                      {option}
                    </span>
                    {String.fromCharCode(65 + optionIndex) === exercise.correctAnswer && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {exercise.type === "short_answer" && (
            <div>
              <Label className="text-sm font-medium text-gray-700">Đáp án:</Label>
              <p className="mt-1 text-green-600 font-medium">{exercise.correctAnswer}</p>
              {exercise.keywords && (
                <div className="mt-2">
                  <Label className="text-sm font-medium text-gray-700">Từ khóa chấp nhận:</Label>
                  <div className="flex gap-1 mt-1">
                    {exercise.keywords.map((keyword: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {exercise.type === "essay" && (
            <div className="space-y-2">
              <div>
                <Label className="text-sm font-medium text-gray-700">Rubric đánh giá:</Label>
                <p className="mt-1 text-gray-700 text-sm">{exercise.rubric}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Số từ tối đa:</Label>
                <p className="mt-1 text-gray-700 text-sm">{exercise.maxWords} từ</p>
              </div>
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
              Sử dụng AI để tạo bài tập và đề kiểm tra chất lượng cao
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

        {/* AI Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Thông minh</h3>
              <p className="text-sm text-purple-700">AI hiểu nội dung và tạo câu hỏi phù hợp</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Nhanh chóng</h3>
              <p className="text-sm text-blue-700">Tạo hàng chục câu hỏi trong vài giây</p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Chính xác</h3>
              <p className="text-sm text-green-700">Độ khó và nội dung phù hợp với lứa tuổi</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <Wand2 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900">Đa dạng</h3>
              <p className="text-sm text-orange-700">Nhiều loại câu hỏi và phong cách</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Tạo bài tập</TabsTrigger>
            <TabsTrigger value="history">Lịch sử ({generationHistory.length})</TabsTrigger>
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
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
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
                        onChange={(e) => handleInputChange("topic", e.target.value)}
                        placeholder="VD: Phép cộng trong phạm vi 20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="ageGroup">Độ tuổi *</Label>
                        <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange("ageGroup", value)}>
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
                        <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
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

                    <div className="space-y-2">
                      <Label htmlFor="exerciseType">Loại câu hỏi</Label>
                      <Select value={formData.exerciseType} onValueChange={(value) => handleInputChange("exerciseType", value)}>
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

                    <div className="space-y-2">
                      <Label htmlFor="count">Số câu hỏi: {formData.count}</Label>
                      <Slider
                        value={[formData.count]}
                        onValueChange={(value) => handleInputChange("count", value[0])}
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

                    <div className="space-y-3 pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeExplanations"
                          checked={formData.includeExplanations}
                          onCheckedChange={(checked) => handleInputChange("includeExplanations", checked)}
                        />
                        <Label htmlFor="includeExplanations" className="text-sm">
                          Bao gồm giải thích đáp án
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeImages"
                          checked={formData.includeImages}
                          onCheckedChange={(checked) => handleInputChange("includeImages", checked)}
                        />
                        <Label htmlFor="includeImages" className="text-sm">
                          Tạo hình ảnh minh họa (nếu có thể)
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customPrompt">Yêu cầu tùy chỉnh</Label>
                      <Textarea
                        id="customPrompt"
                        value={formData.customPrompt}
                        onChange={(e) => handleInputChange("customPrompt", e.target.value)}
                        placeholder="Thêm yêu cầu đặc biệt cho AI..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      disabled={isGenerating || !formData.subject || !formData.topic || !formData.ageGroup}
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
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Tạo lại
                        </Button>
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-1" />
                          Lưu tất cả
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {generatedContent.map((exercise, index) => renderExercise(exercise, index))}
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
                        Điền thông tin bên trái và nhấn "Tạo bài tập bằng AI" để bắt đầu
                      </p>
                      <Alert className="border-blue-200 bg-blue-50 text-left">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Mẹo:</strong> Hãy mô tả cụ thể chủ đề và yêu cầu để AI tạo ra bài tập chất lượng tốt nhất!
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
                            {item.count} câu hỏi • {new Date(item.timestamp).toLocaleString('vi-VN')}
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
                    Các bài tập đã tạo sẽ được lưu lại ở đây để bạn có thể xem lại
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiPromptTemplates.map((template) => (
                <Card key={template.name} className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{template.template}</p>
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
