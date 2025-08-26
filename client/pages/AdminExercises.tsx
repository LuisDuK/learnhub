import React, { useState, useRef } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Upload,
  FileText,
  CheckCircle,
  PenTool,
  Filter,
  Bot,
  Copy,
  Download,
  X,
  Wand2,
  FileSpreadsheet,
  FilePdf,
  Loader2,
  Save,
  Import,
  Sparkles,
} from "lucide-react";

// Mock exercise data
const mockExercises = [
  {
    id: 1,
    title: "Phép cộng và trừ trong phạm vi 100",
    type: "Trắc nghiệm",
    subject: "Toán",
    creator: "Cô Nguyễn Thị Mai",
    createdAt: "2024-01-15",
    totalQuestions: 10,
    difficulty: "Dễ",
    submissions: 45,
    avgScore: 85,
  },
  {
    id: 2,
    title: "Viết đoạn văn tả cảnh thiên nhiên",
    type: "Tự luận",
    subject: "Văn",
    creator: "Cô Trần Thị Lan",
    createdAt: "2024-01-20",
    totalQuestions: 1,
    difficulty: "Trung bình",
    submissions: 32,
    avgScore: 78,
  },
  {
    id: 3,
    title: "Colors and Numbers",
    type: "Trắc nghiệm",
    subject: "Anh",
    creator: "Thầy John Smith",
    createdAt: "2024-01-10",
    totalQuestions: 15,
    difficulty: "Dễ",
    submissions: 67,
    avgScore: 92,
  },
  {
    id: 4,
    title: "Quan sát và mô tả hiện tượng",
    type: "Tự luận",
    subject: "Toán",
    creator: "Cô Lê Thị Hoa",
    createdAt: "2024-01-25",
    totalQuestions: 3,
    difficulty: "Khó",
    submissions: 28,
    avgScore: 65,
  },
];

const subjects = ["Tất cả", "Toán", "Văn", "Anh"];
const types = ["Tất cả", "Trắc nghiệm", "Tự luận", "Hỗn hợp"];
const difficulties = ["Dễ", "Trung bình", "Khó"];

interface Question {
  id?: string;
  question: string;
  type: "multiple_choice" | "essay" | "short_answer";
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  maxWords?: number;
  keywords?: string[];
  rubric?: string;
}

interface ExerciseForm {
  title: string;
  subject: string;
  type: string;
  difficulty: string;
  timeLimit?: number;
  description?: string;
  questions: Question[];
}

export default function AdminExercises() {
  const [exercises, setExercises] = useState(mockExercises);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [typeFilter, setTypeFilter] = useState("Tất cả");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newExercise, setNewExercise] = useState<ExerciseForm>({
    title: "",
    subject: "",
    type: "",
    difficulty: "",
    timeLimit: 60,
    description: "",
    questions: [],
  });

  const [aiPrompt, setAiPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bulkQuestions, setBulkQuestions] = useState("");

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "Tất cả" || exercise.subject === subjectFilter;
    const matchesType = typeFilter === "Tất cả" || exercise.type === typeFilter;
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleAddExercise = () => {
    if (
      newExercise.title &&
      newExercise.subject &&
      newExercise.type &&
      newExercise.difficulty &&
      newExercise.questions.length > 0
    ) {
      const exercise = {
        id: exercises.length + 1,
        title: newExercise.title,
        type: newExercise.type,
        subject: newExercise.subject,
        creator: "Admin Nguyễn Đức",
        createdAt: new Date().toISOString().split("T")[0],
        totalQuestions: newExercise.questions.length,
        difficulty: newExercise.difficulty,
        submissions: 0,
        avgScore: 0,
      };
      setExercises([...exercises, exercise]);
      resetForm();
      setIsAddDialogOpen(false);
    }
  };

  const resetForm = () => {
    setNewExercise({
      title: "",
      subject: "",
      type: "",
      difficulty: "",
      timeLimit: 60,
      description: "",
      questions: [],
    });
  };

  const handleDeleteExercise = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const addQuestion = (type: "multiple_choice" | "essay" | "short_answer" = "multiple_choice") => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      type,
      ...(type === "multiple_choice" && {
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      }),
      ...(type === "essay" && {
        maxWords: 300,
        keywords: [],
        rubric: "",
      }),
      ...(type === "short_answer" && {
        correctAnswer: "",
        keywords: [],
      }),
    };
    setNewExercise({
      ...newExercise,
      questions: [...newExercise.questions, newQuestion],
    });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...newExercise.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setNewExercise({ ...newExercise, questions: updatedQuestions });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = newExercise.questions.filter((_, i) => i !== index);
    setNewExercise({ ...newExercise, questions: updatedQuestions });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...newExercise.questions];
    if (updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options![optionIndex] = value;
      setNewExercise({ ...newExercise, questions: updatedQuestions });
    }
  };

  const duplicateQuestion = (index: number) => {
    const questionToCopy = { ...newExercise.questions[index] };
    questionToCopy.id = Date.now().toString();
    const updatedQuestions = [...newExercise.questions];
    updatedQuestions.splice(index + 1, 0, questionToCopy);
    setNewExercise({ ...newExercise, questions: updatedQuestions });
  };

  // AI Exercise Generation
  const handleAIGeneration = async () => {
    setIsProcessing(true);
    setProcessingStep("Đang xử lý yêu cầu AI...");
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessingStep("Tạo câu hỏi từ AI...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI generated questions
      const aiQuestions: Question[] = [
        {
          id: "ai1",
          question: "Tổng của 25 + 37 bằng bao nhiêu?",
          type: "multiple_choice",
          options: ["52", "62", "72", "82"],
          correctAnswer: "B",
          explanation: "25 + 37 = 62"
        },
        {
          id: "ai2", 
          question: "Hãy giải thích tại sao 5 x 6 = 30",
          type: "essay",
          maxWords: 100,
          keywords: ["phép nhân", "tính chất", "ví dụ"],
          rubric: "Học sinh cần giải thích khái niệm phép nhân và đưa ra ví dụ cụ thể"
        }
      ];
      
      setNewExercise({
        ...newExercise,
        questions: [...newExercise.questions, ...aiQuestions]
      });
      
      setProcessingStep("Hoàn thành!");
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAIDialogOpen(false);
    } catch (error) {
      console.error("AI generation error:", error);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
      setAiPrompt("");
    }
  };

  // File Upload Processing
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);
    setProcessingStep("Đang tải file...");
    
    try {
      // Simulate file processing
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setProcessingStep("Phân tích nội dung file...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProcessingStep("Tạo câu hỏi từ file...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock questions from file
      const fileQuestions: Question[] = [
        {
          id: "file1",
          question: "Theo tài liệu, đâu là đặc điểm chính của phép cộng?",
          type: "multiple_choice", 
          options: ["Tính giao hoán", "Tính kết hợp", "Có phần tử đơn vị", "T���t cả đều đúng"],
          correctAnswer: "D",
          explanation: "Phép cộng có đầy đủ các tính chất được liệt kê"
        }
      ];
      
      setNewExercise({
        ...newExercise,
        questions: [...newExercise.questions, ...fileQuestions]
      });
      
      setProcessingStep("Hoàn thành!");
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
      setProcessingStep("");
      setUploadedFile(null);
    }
  };

  // Bulk Import Questions
  const handleBulkImport = () => {
    const lines = bulkQuestions.split('\n').filter(line => line.trim());
    const questions: Question[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('Q:')) {
        const questionText = line.substring(2).trim();
        questions.push({
          id: `bulk_${index}`,
          question: questionText,
          type: "short_answer",
          correctAnswer: "",
          keywords: [],
        });
      }
    });
    
    setNewExercise({
      ...newExercise,
      questions: [...newExercise.questions, ...questions]
    });
    
    setBulkQuestions("");
    setIsBulkImportOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Trắc nghiệm":
        return "bg-blue-100 text-blue-800";
      case "Tự luận":
        return "bg-purple-100 text-purple-800";
      case "Hỗn hợp":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-100 text-green-800";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800";
      case "Khó":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderQuestionForm = (question: Question, index: number) => {
    return (
      <div key={question.id || index} className="p-4 border border-gray-200 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Câu hỏi {index + 1}</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => duplicateQuestion(index)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeQuestion(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label>Loại câu hỏi</Label>
          <Select
            value={question.type}
            onValueChange={(value: "multiple_choice" | "essay" | "short_answer") =>
              updateQuestion(index, "type", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple_choice">Trắc nghiệm</SelectItem>
              <SelectItem value="essay">Tự luận dài</SelectItem>
              <SelectItem value="short_answer">Trả lời ngắn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Câu hỏi</Label>
          <Textarea
            value={question.question}
            onChange={(e) => updateQuestion(index, "question", e.target.value)}
            placeholder="Nhập câu hỏi..."
            rows={3}
          />
        </div>

        {question.type === "multiple_choice" && (
          <>
            <div className="space-y-2">
              <Label>Các lựa chọn</Label>
              {question.options?.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <span className="text-sm font-medium w-6">
                    {String.fromCharCode(65 + oIndex)}.
                  </span>
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, oIndex, e.target.value)}
                    placeholder={`Lựa chọn ${String.fromCharCode(65 + oIndex)}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <Label>Đáp án đúng</Label>
              <Select
                value={question.correctAnswer}
                onValueChange={(value) => updateQuestion(index, "correctAnswer", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đáp án đúng" />
                </SelectTrigger>
                <SelectContent>
                  {question.options?.map((_, oIndex) => (
                    <SelectItem key={oIndex} value={String.fromCharCode(65 + oIndex)}>
                      {String.fromCharCode(65 + oIndex)}. {question.options![oIndex]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Gi��i thích (tùy chọn)</Label>
              <Textarea
                value={question.explanation || ""}
                onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
                placeholder="Giải thích tại sao đáp án này đúng..."
                rows={2}
              />
            </div>
          </>
        )}

        {question.type === "essay" && (
          <>
            <div>
              <Label>Số từ tối đa</Label>
              <Input
                type="number"
                value={question.maxWords || 300}
                onChange={(e) => updateQuestion(index, "maxWords", parseInt(e.target.value))}
                placeholder="300"
              />
            </div>
            <div>
              <Label>Từ khóa đánh giá (cách nhau bởi dấu phẩy)</Label>
              <Input
                value={question.keywords?.join(", ") || ""}
                onChange={(e) => updateQuestion(index, "keywords", e.target.value.split(", ").filter(k => k.trim()))}
                placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
              />
            </div>
            <div>
              <Label>Rubric đánh giá</Label>
              <Textarea
                value={question.rubric || ""}
                onChange={(e) => updateQuestion(index, "rubric", e.target.value)}
                placeholder="Tiêu chí đánh giá bài làm của học sinh..."
                rows={3}
              />
            </div>
          </>
        )}

        {question.type === "short_answer" && (
          <>
            <div>
              <Label>Đáp án mẫu</Label>
              <Input
                value={question.correctAnswer || ""}
                onChange={(e) => updateQuestion(index, "correctAnswer", e.target.value)}
                placeholder="Đáp án đúng..."
              />
            </div>
            <div>
              <Label>Từ khóa chấp nhận (cách nhau bởi dấu phẩy)</Label>
              <Input
                value={question.keywords?.join(", ") || ""}
                onChange={(e) => updateQuestion(index, "keywords", e.target.value.split(", ").filter(k => k.trim()))}
                placeholder="từ khóa 1, từ khóa 2"
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              <PenTool className="inline-block h-8 w-8 mr-2" />
              Quản lý bài tập
            </h1>
            <p className="text-gray-600 mt-1">
              Tạo và quản lý bài tập cho học sinh với AI và import hàng loạt
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Tạo bài tập
                </Button>
              </DialogTrigger>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm bài tập
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* AI Generation Dialog */}
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Tạo bài tập
            </DialogTitle>
            <DialogDescription>
              Mô tả yêu cầu và AI sẽ tạo bài tập phù hợp cho bạn
            </DialogDescription>
          </DialogHeader>

          {isProcessing ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{processingStep}</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>Mô tả bài tập cần tạo</Label>
                <Textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ví dụ: Tạo 5 câu hỏi trắc nghiệm về phép cộng trong phạm vi 100, độ khó vừa phải cho học sinh lớp 2..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Hoặc upload file tài liệu</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadedFile(file);
                        handleFileUpload(file);
                      }
                    }}
                    accept=".pdf,.docx,.xlsx,.txt"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Chọn file (PDF, Word, Excel, TXT)
                  </Button>
                  {uploadedFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Đã chọn: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              onClick={handleAIGeneration} 
              disabled={!aiPrompt.trim() || isProcessing}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Tạo bài tập
            </Button>
          </DialogFooter>
        </DialogContent>

        {/* Main Exercise Dialog */}
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo bài tập mới</DialogTitle>
            <DialogDescription>
              Tạo bài tập với nhiều dạng câu hỏi khác nhau
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="questions">
                Câu hỏi ({newExercise.questions.length})
              </TabsTrigger>
              <TabsTrigger value="import">Import hàng loạt</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tên bài tập</Label>
                  <Input
                    value={newExercise.title}
                    onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                    placeholder="Nhập tên bài tập"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Môn học</Label>
                  <Select
                    value={newExercise.subject}
                    onValueChange={(value) => setNewExercise({ ...newExercise, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.slice(1).map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Loại bài tập</Label>
                  <Select
                    value={newExercise.type}
                    onValueChange={(value) => setNewExercise({ ...newExercise, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trắc nghiệm">Trắc nghiệm</SelectItem>
                      <SelectItem value="Tự luận">Tự luận</SelectItem>
                      <SelectItem value="Hỗn hợp">Hỗn hợp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Độ khó</Label>
                  <Select
                    value={newExercise.difficulty}
                    onValueChange={(value) => setNewExercise({ ...newExercise, difficulty: value })}
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
                <div className="space-y-2">
                  <Label>Thời gian (phút)</Label>
                  <Input
                    type="number"
                    value={newExercise.timeLimit}
                    onChange={(e) => setNewExercise({ ...newExercise, timeLimit: parseInt(e.target.value) })}
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mô tả bài tập</Label>
                <Textarea
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                  placeholder="Mô tả ngắn gọn về bài tập..."
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Danh sách câu hỏi</Label>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm câu hỏi
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => addQuestion("multiple_choice")}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Trắc nghiệm
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => addQuestion("essay")}>
                        <FileText className="mr-2 h-4 w-4" />
                        Tự luận dài
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => addQuestion("short_answer")}>
                        <Edit className="mr-2 h-4 w-4" />
                        Trả lời ngắn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {newExercise.questions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <PenTool className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có câu hỏi nào. Thêm câu hỏi đầu tiên!</p>
                </div>
              )}

              <div className="space-y-4">
                {newExercise.questions.map((question, index) => renderQuestionForm(question, index))}
              </div>
            </TabsContent>

            <TabsContent value="import" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold">Import câu hỏi hàng loạt</Label>
                  <p className="text-sm text-gray-600">
                    Nhập nhiều câu hỏi cùng lúc, mỗi câu hỏi bắt đầu bằng "Q:"
                  </p>
                </div>

                <Textarea
                  value={bulkQuestions}
                  onChange={(e) => setBulkQuestions(e.target.value)}
                  placeholder={`Q: 2 + 3 = ?
Q: Thủ đô của Việt Nam là gì?
Q: Viết đoạn văn tả về mùa xuân`}
                  rows={10}
                  className="font-mono"
                />

                <div className="flex gap-2">
                  <Button onClick={handleBulkImport} disabled={!bulkQuestions.trim()}>
                    <Import className="h-4 w-4 mr-2" />
                    Import câu hỏi
                  </Button>
                  <Button variant="outline" onClick={() => setBulkQuestions("")}>
                    Xóa tất cả
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Hướng dẫn định dạng:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Mỗi câu hỏi bắt đầu bằng "Q:"</li>
                    <li>• Câu hỏi sẽ được tạo dạng trả lời ngắn mặc định</li>
                    <li>• Có thể chỉnh sửa loại câu hỏi sau khi import</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => {resetForm(); setIsAddDialogOpen(false);}}>
              Hủy
            </Button>
            <Button onClick={handleAddExercise} disabled={!newExercise.title || !newExercise.subject || newExercise.questions.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Lưu bài tập
            </Button>
          </DialogFooter>
        </DialogContent>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm bài tập..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exercises Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Tên bài tập</TableHead>
                <TableHead className="font-semibold">Loại</TableHead>
                <TableHead className="font-semibold">Môn học</TableHead>
                <TableHead className="font-semibold">Độ khó</TableHead>
                <TableHead className="font-semibold">Người tạo</TableHead>
                <TableHead className="font-semibold">Ngày tạo</TableHead>
                <TableHead className="font-semibold">Thống kê</TableHead>
                <TableHead className="font-semibold text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExercises.map((exercise) => (
                <TableRow key={exercise.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{exercise.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{exercise.title}</p>
                      <p className="text-xs text-gray-500">{exercise.totalQuestions} câu hỏi</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(exercise.type)}>{exercise.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{exercise.subject}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{exercise.creator}</TableCell>
                  <TableCell className="text-sm text-gray-600">{exercise.createdAt}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">{exercise.submissions} bài nộp</div>
                      <div className="text-gray-500">Điểm TB: {exercise.avgScore}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem kết quả
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Sao chép
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Xuất Excel
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{exercises.length}</div>
            <div className="text-sm text-blue-600">Tổng bài tập</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {exercises.filter((e) => e.type === "Trắc nghiệm").length}
            </div>
            <div className="text-sm text-green-600">Trắc nghiệm</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">
              {exercises.filter((e) => e.type === "Tự luận").length}
            </div>
            <div className="text-sm text-purple-600">Tự luận</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {exercises.reduce((sum, e) => sum + e.submissions, 0)}
            </div>
            <div className="text-sm text-orange-600">Tổng bài nộp</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
