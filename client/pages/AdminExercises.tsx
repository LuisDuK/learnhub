import React, { useState } from "react";
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
} from "lucide-react";

// Mock exercise data
const mockExercises = [
  {
    id: 1,
    title: "Phép cộng và trừ trong phạm vi 100",
    type: "Trắc nghiệm",
    subject: "Toán học",
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
    subject: "Tiếng Việt",
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
    subject: "Tiếng Anh",
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
    subject: "Khoa học",
    creator: "Cô Lê Thị Hoa",
    createdAt: "2024-01-25",
    totalQuestions: 3,
    difficulty: "Khó",
    submissions: 28,
    avgScore: 65,
  },
];

const subjects = [
  "Tất cả",
  "Toán học",
  "Tiếng Việt",
  "Tiếng Anh",
  "Khoa học",
  "Lịch sử",
  "Địa lý",
];
const types = ["Tất cả", "Trắc nghiệm", "Tự luận"];
const difficulties = ["Dễ", "Trung bình", "Khó"];

export default function AdminExercises() {
  const [exercises, setExercises] = useState(mockExercises);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [typeFilter, setTypeFilter] = useState("Tất cả");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({
    title: "",
    subject: "",
    type: "",
    difficulty: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      },
    ],
    essayPrompt: "",
  });

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
      newExercise.difficulty
    ) {
      const exercise = {
        id: exercises.length + 1,
        title: newExercise.title,
        type: newExercise.type,
        subject: newExercise.subject,
        creator: "Admin Nguyễn Đức",
        createdAt: new Date().toISOString().split("T")[0],
        totalQuestions:
          newExercise.type === "Trắc nghiệm" ? newExercise.questions.length : 1,
        difficulty: newExercise.difficulty,
        submissions: 0,
        avgScore: 0,
      };
      setExercises([...exercises, exercise]);
      setNewExercise({
        title: "",
        subject: "",
        type: "",
        difficulty: "",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
          },
        ],
        essayPrompt: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteExercise = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const addQuestion = () => {
    setNewExercise({
      ...newExercise,
      questions: [
        ...newExercise.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
        },
      ],
    });
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updatedQuestions = [...newExercise.questions];
    if (
      field === "question" ||
      field === "correctAnswer" ||
      field === "explanation"
    ) {
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    }
    setNewExercise({ ...newExercise, questions: updatedQuestions });
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updatedQuestions = [...newExercise.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setNewExercise({ ...newExercise, questions: updatedQuestions });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Trắc nghiệm":
        return "bg-blue-100 text-blue-800";
      case "Tự luận":
        return "bg-purple-100 text-purple-800";
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ✏️ Quản lý bài tập
            </h1>
            <p className="text-gray-600 mt-1">
              Tạo và quản lý bài tập cho học sinh
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Thêm bài tập
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm bài tập mới</DialogTitle>
                <DialogDescription>
                  Tạo bài tập trắc nghiệm hoặc tự luận cho học sinh
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tên bài tập</Label>
                    <Input
                      id="title"
                      value={newExercise.title}
                      onChange={(e) =>
                        setNewExercise({
                          ...newExercise,
                          title: e.target.value,
                        })
                      }
                      placeholder="Nhập tên bài tập"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Môn học</Label>
                    <Select
                      value={newExercise.subject}
                      onValueChange={(value) =>
                        setNewExercise({ ...newExercise, subject: value })
                      }
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại bài tập</Label>
                    <Select
                      value={newExercise.type}
                      onValueChange={(value) =>
                        setNewExercise({ ...newExercise, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Trắc nghiệm">Trắc nghiệm</SelectItem>
                        <SelectItem value="Tự luận">Tự luận</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Độ khó</Label>
                    <Select
                      value={newExercise.difficulty}
                      onValueChange={(value) =>
                        setNewExercise({ ...newExercise, difficulty: value })
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

                {/* Questions Section */}
                {newExercise.type === "Trắc nghiệm" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold">
                        Câu hỏi trắc nghiệm
                      </Label>
                      <Button
                        type="button"
                        onClick={addQuestion}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm câu hỏi
                      </Button>
                    </div>

                    {newExercise.questions.map((q, qIndex) => (
                      <div
                        key={qIndex}
                        className="p-4 border border-gray-200 rounded-lg space-y-3"
                      >
                        <div>
                          <Label htmlFor={`question-${qIndex}`}>
                            Câu hỏi {qIndex + 1}
                          </Label>
                          <Textarea
                            id={`question-${qIndex}`}
                            value={q.question}
                            onChange={(e) =>
                              updateQuestion(qIndex, "question", e.target.value)
                            }
                            placeholder="Nhập câu hỏi..."
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Các lựa chọn</Label>
                          {q.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm font-medium w-6">
                                {String.fromCharCode(65 + oIndex)}.
                              </span>
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateOption(qIndex, oIndex, e.target.value)
                                }
                                placeholder={`Lựa chọn ${String.fromCharCode(65 + oIndex)}`}
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <Label htmlFor={`correct-${qIndex}`}>
                            Đáp án đúng
                          </Label>
                          <Select
                            value={q.correctAnswer}
                            onValueChange={(value) =>
                              updateQuestion(qIndex, "correctAnswer", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn đáp án đúng" />
                            </SelectTrigger>
                            <SelectContent>
                              {q.options.map((_, oIndex) => (
                                <SelectItem
                                  key={oIndex}
                                  value={String.fromCharCode(65 + oIndex)}
                                >
                                  {String.fromCharCode(65 + oIndex)}.{" "}
                                  {q.options[oIndex]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {newExercise.type === "Tự luận" && (
                  <div className="space-y-2">
                    <Label htmlFor="essayPrompt">Đề bài tự luận</Label>
                    <Textarea
                      id="essayPrompt"
                      value={newExercise.essayPrompt}
                      onChange={(e) =>
                        setNewExercise({
                          ...newExercise,
                          essayPrompt: e.target.value,
                        })
                      }
                      placeholder="Nhập đề bài tự luận..."
                      rows={4}
                    />
                  </div>
                )}

                {/* File Upload Section */}
                <div className="space-y-2">
                  <Label>Upload tệp tin (Excel / PDF)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Kéo thả file hoặc click để chọn
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Hỗ trợ: Excel (.xlsx), PDF (.pdf)
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleAddExercise}>
                  <PenTool className="h-4 w-4 mr-2" />
                  Lưu bài tập
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

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
                <TableHead className="font-semibold text-center">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExercises.map((exercise) => (
                <TableRow key={exercise.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{exercise.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {exercise.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {exercise.totalQuestions} câu hỏi
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(exercise.type)}>
                      {exercise.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{exercise.subject}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {exercise.creator}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {exercise.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">
                        {exercise.submissions} bài nộp
                      </div>
                      <div className="text-gray-500">
                        Đi��m TB: {exercise.avgScore}
                      </div>
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
            <div className="text-2xl font-bold text-blue-600">
              {exercises.length}
            </div>
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
