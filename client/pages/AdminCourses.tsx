import React, { useState, useRef } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
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
  Users,
  TrendingUp,
  Filter,
  BookOpen,
  Play,
  FileText,
  GamepadIcon,
  Headphones,
  Eye,
  PlusCircle,
  Clock,
  Award,
  CheckCircle,
  Circle,
  Upload,
  Link,
  Image,
  Video,
  Bot,
  Sparkles,
  Wand2,
  Loader2,
  Save,
  Import,
  Copy,
  X,
  Grid3X3,
  List,
  Package,
  Star,
  Building2,
} from "lucide-react";

// Mock course data with lessons
const mockCourses = [
  {
    id: 1,
    name: "Toán học cơ bản",
    description:
      "Khóa học toán học dành cho học sinh tiểu học, bao gồm các phép tính cơ bản và hình học đơn giản.",
    image: "/placeholder.svg",
    subject: "Toán",
    difficulty: "Cơ bản",
    duration: "8 tuần",
    ageGroup: "6-8 tuổi",
    studentsCount: 120,
    completionRate: 85,
    status: "Đang mở",
    createdAt: "2024-01-15",
    aiGenerated: true,
    lessons: [
      {
        id: 1,
        title: "Số từ 1 đến 10",
        description: "Học cách đếm và nhận biết các số từ 1 đến 10",
        type: "video",
        duration: "15 phút",
        order: 1,
        completed: false,
        videoUrl: "https://www.youtube.com/watch?v=example123",
        content: "Nội dung bài giảng về số học...",
        materials: [],
      },
      {
        id: 2,
        title: "Phép cộng đơn giản",
        description: "Thực hành phép cộng với các số nhỏ hơn 10",
        type: "interactive",
        duration: "20 phút",
        order: 2,
        completed: false,
        content:
          "Hướng dẫn: Sử dụng các đối tượng cụ thể để thực hiện phép cộng...",
        materials: ["worksheet.pdf", "counting_objects.png"],
      },
      {
        id: 3,
        title: "Hình dạng cơ bản",
        description: "Nhận biết hình tròn, vuông, tam giác",
        type: "game",
        duration: "25 phút",
        order: 3,
        completed: false,
        content: "Trò chơi ghép hình: Ghép các hình dạng vào vị trí đúng...",
        gameUrl: "https://mathgames.com/shapes",
        materials: [],
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Bài tập đếm số",
        description: "Đếm các vật thể trong hình",
        type: "quiz",
        difficulty: "Dễ",
        points: 10,
        questions: [
          {
            id: 1,
            question: "Hãy đếm số quả táo trong hình?",
            type: "multiple_choice",
            image: "apples.jpg",
            options: ["3", "4", "5", "6"],
            correctAnswer: "C",
            explanation: "Trong hình có 5 quả táo",
          },
          {
            id: 2,
            question: "Có bao nhiêu con chó trong hình?",
            type: "multiple_choice",
            options: ["2", "3", "4", "5"],
            correctAnswer: "A",
            explanation: "Có 2 con chó trong hình",
          },
        ],
        instructions: "Quan sát hình ảnh và đếm số vật thể",
        timeLimit: 300,
      },
      {
        id: 2,
        title: "Bài tập cộng trừ",
        description: "Thực hiện các phép tính cơ bản",
        type: "practice",
        difficulty: "Trung bình",
        points: 15,
        questions: [
          {
            id: 1,
            question: "3 + 2 = ?",
            type: "short_answer",
            correctAnswer: "5",
            keywords: ["5", "năm"],
          },
          {
            id: 2,
            question: "Giải thích tại sao 4 + 1 = 5",
            type: "essay",
            maxWords: 50,
            keywords: ["cộng", "thêm", "tổng"],
            rubric: "Học sinh cần giải thích khái niệm phép cộng",
          },
        ],
        submissionType: "text",
        instructions: "Viết kết quả vào ô trả lời",
      },
    ],
  },
  {
    id: 2,
    name: "Tiếng Việt lớp 3",
    description:
      "Học tiếng Việt qua các bài văn và câu chuyện thú vị, phát triển kỹ năng đọc hiểu.",
    image: "/placeholder.svg",
    subject: "Văn",
    difficulty: "Trung bình",
    duration: "12 tuần",
    ageGroup: "8-9 tuổi",
    studentsCount: 95,
    completionRate: 78,
    status: "Đang mở",
    createdAt: "2024-01-20",
    aiGenerated: false,
    lessons: [
      {
        id: 1,
        title: "Bài thơ: Con gà trống",
        description: "Học thuộc và hiểu nghĩa bài thơ Con gà trống",
        type: "reading",
        duration: "30 phút",
        order: 1,
        completed: false,
      },
      {
        id: 2,
        title: "Kỹ năng đọc hiểu",
        description: "Luyện tập đọc hiểu văn bản ngắn",
        type: "exercise",
        duration: "25 phút",
        order: 2,
        completed: false,
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Trả lời câu hỏi về bài thơ",
        description: "Câu hỏi về nội dung và ý nghĩa bài thơ",
        type: "quiz",
        difficulty: "Trung bình",
        points: 20,
        questions: [
          {
            id: 1,
            question: "Bài thơ 'Con gà trống' nói về điều gì?",
            type: "essay",
            maxWords: 100,
            keywords: ["gà", "trống", "sáng", "gáy"],
            rubric: "Học sinh cần nắm được nội dung chính của bài thơ",
          },
        ],
      },
    ],
  },
];

// Mock exercise bank data - from the exercise bank/kho bài tập
const mockExerciseBank = [
  {
    id: 101,
    title: "Bảng cửu chương 2-3-4",
    type: "Trắc nghiệm",
    subject: "Toán",
    creator: "Bộ GD&ĐT",
    createdAt: "2024-01-01",
    totalQuestions: 20,
    difficulty: "Dễ",
    usageCount: 156,
    rating: 4.8,
    department: "Khối lớp 1-2",
    tags: ["bảng cửu chương", "nhân"],
    description: "Bài tập cơ bản về bảng cửu chương 2, 3, 4",
    thumbnail: "🔢",
    questions: [
      {
        id: 1,
        question: "2 x 3 = ?",
        type: "multiple_choice",
        options: ["4", "5", "6", "7"],
        correctAnswer: "C",
        explanation: "2 x 3 = 6",
      },
      {
        id: 2,
        question: "3 x 4 = ?",
        type: "multiple_choice",
        options: ["10", "11", "12", "13"],
        correctAnswer: "C",
        explanation: "3 x 4 = 12",
      },
    ],
  },
  {
    id: 102,
    title: "Đọc hiểu văn bản ngắn",
    type: "Hỗn hợp",
    subject: "Văn",
    creator: "Bộ GD&ĐT",
    createdAt: "2024-01-05",
    totalQuestions: 8,
    difficulty: "Trung bình",
    usageCount: 89,
    rating: 4.6,
    department: "Khối lớp 3-5",
    tags: ["đọc hiểu", "văn bản"],
    description: "Rèn luyện kỹ năng đọc hiểu văn bản",
    thumbnail: "📖",
    questions: [
      {
        id: 1,
        question: "Đọc đoạn văn sau và trả lời: Ý chính của đoạn văn là gì?",
        type: "essay",
        maxWords: 100,
        keywords: ["ý chính", "nội dung"],
        rubric: "Học sinh cần xác định được ý chính của đoạn văn",
      },
    ],
  },
  {
    id: 103,
    title: "Family Members Vocabulary",
    type: "Trắc nghiệm",
    subject: "Anh",
    creator: "Cambridge Kids",
    createdAt: "2024-01-03",
    totalQuestions: 12,
    difficulty: "Dễ",
    usageCount: 234,
    rating: 4.9,
    department: "Khối mầm non",
    tags: ["gia đình", "từ vựng"],
    description: "Học từ vựng về các thành viên trong gia đình",
    thumbnail: "👨‍👩‍👧‍👦",
    questions: [
      {
        id: 1,
        question: "What is 'mother' in Vietnamese?",
        type: "multiple_choice",
        options: ["Bố", "Mẹ", "Anh", "Em"],
        correctAnswer: "B",
        explanation: "Mother = Mẹ",
      },
    ],
  },
  {
    id: 104,
    title: "Phép chia có dư",
    type: "Trắc nghiệm",
    subject: "Toán",
    creator: "Trường Tiểu học Chu Văn An",
    createdAt: "2024-01-12",
    totalQuestions: 15,
    difficulty: "Trung bình",
    usageCount: 67,
    rating: 4.4,
    department: "Khối lớp 3-5",
    tags: ["chia", "số dư"],
    description: "Luyện tập phép chia có số dư",
    thumbnail: "➗",
    questions: [
      {
        id: 1,
        question: "7 chia 3 bằng bao nhiêu dư bao nhiêu?",
        type: "short_answer",
        correctAnswer: "2 dư 1",
        keywords: ["2", "1", "hai", "một"],
      },
    ],
  },
];

const subjects = ["Tất cả", "Toán", "Văn", "Anh"];
const difficulties = ["Cơ bản", "Trung bình", "Nâng cao"];
const ageGroups = [
  "3-5 tuổi",
  "5-7 tuổi",
  "6-8 tuổi",
  "7-9 tuổi",
  "8-10 tuổi",
  "9-12 tuổi",
];
const departments = ["Tất cả", "Khối mầm non", "Khối lớp 1-2", "Khối lớp 3-5"];

// Question interface for exercise creation
interface Question {
  id?: string | number;
  question: string;
  type: "multiple_choice" | "essay" | "short_answer";
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  maxWords?: number;
  keywords?: string[];
  rubric?: string;
  image?: string;
}

export default function AdminCourses() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof mockCourses)[0] | null
  >(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<typeof newCourse>({});
  const [activeTab, setActiveTab] = useState<"info" | "lessons" | "exercises">(
    "info",
  );
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isEditLessonDialogOpen, setIsEditLessonDialogOpen] = useState(false);
  const [isEditExerciseDialogOpen, setIsEditExerciseDialogOpen] = useState(false);
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false);
  const [isAddExerciseDialogOpen, setIsAddExerciseDialogOpen] = useState(false);
  const [editLesson, setEditLesson] = useState<any>({});
  const [editExercise, setEditExercise] = useState<any>({});
  const [newLesson, setNewLesson] = useState<any>({});
  const [newExercise, setNewExercise] = useState<any>({});

  // AI and bulk import states
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bulkQuestions, setBulkQuestions] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exercise bank assignment states
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedExercisesFromBank, setSelectedExercisesFromBank] = useState<Set<number>>(new Set());
  const [bankViewMode, setBankViewMode] = useState<'grid' | 'list'>('grid');
  const [bankSearchTerm, setBankSearchTerm] = useState("");
  const [bankSubjectFilter, setBankSubjectFilter] = useState("Tất cả");
  const [bankDepartmentFilter, setBankDepartmentFilter] = useState("Tất cả");

  // Question editing states
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    subject: "",
    difficulty: "",
    duration: "",
    ageGroup: "",
    objectives: "",
    prerequisites: "",
    image: "",
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "Tất cả" || course.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const filteredBankExercises = mockExerciseBank.filter((exercise) => {
    const matchesSearch =
      exercise.title.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
      exercise.tags.some(tag => tag.includes(bankSearchTerm.toLowerCase()));
    const matchesSubject =
      bankSubjectFilter === "Tất cả" || exercise.subject === bankSubjectFilter;
    const matchesDepartment =
      bankDepartmentFilter === "Tất cả" || exercise.department === bankDepartmentFilter;
    return matchesSearch && matchesSubject && matchesDepartment;
  });

  const handleAddCourse = () => {
    if (
      newCourse.name &&
      newCourse.description &&
      newCourse.subject &&
      newCourse.difficulty &&
      newCourse.duration &&
      newCourse.ageGroup
    ) {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        image: "/placeholder.svg",
        studentsCount: 0,
        completionRate: 0,
        status: "Đang mở",
        createdAt: new Date().toISOString().split("T")[0],
        aiGenerated: false,
        lessons: [],
        exercises: [],
      };
      setCourses([...courses, course]);
      setNewCourse({
        name: "",
        description: "",
        subject: "",
        difficulty: "",
        duration: "",
        ageGroup: "",
        objectives: "",
        prerequisites: "",
        image: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleViewCourse = (course: (typeof mockCourses)[0]) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  };

  const handleEditCourse = (course: (typeof mockCourses)[0]) => {
    setSelectedCourse(course);
    setEditCourse({
      name: course.name,
      description: course.description,
      subject: course.subject,
      difficulty: course.difficulty,
      duration: course.duration,
      ageGroup: course.ageGroup,
      objectives: "",
      prerequisites: "",
      image: course.image,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCourse = () => {
    if (selectedCourse && editCourse.name) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              name: editCourse.name,
              description: editCourse.description,
              subject: editCourse.subject,
              difficulty: editCourse.difficulty,
              duration: editCourse.duration,
              ageGroup: editCourse.ageGroup,
              image: editCourse.image || course.image,
            }
          : course,
      );
      setCourses(updatedCourses);
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setEditLesson({
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      duration: lesson.duration,
      order: lesson.order,
      videoUrl: lesson.videoUrl || "",
      content: lesson.content || "",
      gameUrl: lesson.gameUrl || "",
      materials: lesson.materials || [],
    });
    setIsEditLessonDialogOpen(true);
  };

  const handleUpdateLesson = () => {
    if (selectedCourse && selectedLesson && editLesson.title) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              lessons: course.lessons?.map((lesson) =>
                lesson.id === selectedLesson.id
                  ? {
                      ...lesson,
                      title: editLesson.title,
                      description: editLesson.description,
                      type: editLesson.type,
                      duration: editLesson.duration,
                      order: editLesson.order,
                      videoUrl: editLesson.videoUrl,
                      content: editLesson.content,
                      gameUrl: editLesson.gameUrl,
                      materials: editLesson.materials,
                    }
                  : lesson,
              ),
            }
          : course,
      );
      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
      setIsEditLessonDialogOpen(false);
      setSelectedLesson(null);
    }
  };

  const handleEditExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setEditExercise({
      title: exercise.title,
      description: exercise.description,
      type: exercise.type,
      difficulty: exercise.difficulty,
      points: exercise.points,
      questions: exercise.questions || [],
      content: exercise.content || "",
      instructions: exercise.instructions || "",
      timeLimit: exercise.timeLimit || 0,
      submissionType: exercise.submissionType || "text",
    });
    setIsEditExerciseDialogOpen(true);
  };

  const handleUpdateExercise = () => {
    if (selectedCourse && selectedExercise && editExercise.title) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              exercises: course.exercises?.map((exercise) =>
                exercise.id === selectedExercise.id
                  ? {
                      ...exercise,
                      title: editExercise.title,
                      description: editExercise.description,
                      type: editExercise.type,
                      difficulty: editExercise.difficulty,
                      points: editExercise.points,
                      questions: editExercise.questions,
                      content: editExercise.content,
                      instructions: editExercise.instructions,
                      timeLimit: editExercise.timeLimit,
                      submissionType: editExercise.submissionType,
                    }
                  : exercise,
              ),
            }
          : course,
      );
      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
      setIsEditExerciseDialogOpen(false);
      setSelectedExercise(null);
    }
  };

  const handleDeleteLesson = (lessonId: number) => {
    if (selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              lessons: course.lessons?.filter(
                (lesson) => lesson.id !== lessonId,
              ),
            }
          : course,
      );
      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
    }
  };

  const handleDeleteExercise = (exerciseId: number) => {
    if (selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              exercises: course.exercises?.filter(
                (exercise) => exercise.id !== exerciseId,
              ),
            }
          : course,
      );
      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
    }
  };

  const handleAddLesson = () => {
    if (selectedCourse && newLesson.title) {
      const lesson = {
        id: Math.max(...(selectedCourse.lessons?.map((l) => l.id) || [0])) + 1,
        title: newLesson.title,
        description: newLesson.description,
        type: newLesson.type,
        duration: newLesson.duration,
        order: newLesson.order || (selectedCourse.lessons?.length || 0) + 1,
        completed: false,
        videoUrl: newLesson.videoUrl || "",
        content: newLesson.content || "",
        gameUrl: newLesson.gameUrl || "",
        materials: newLesson.materials || [],
      };

      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              lessons: [...(course.lessons || []), lesson],
            }
          : course,
      );
      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
      setNewLesson({});
      setIsAddLessonDialogOpen(false);
    }
  };

  const handleAddExercise = () => {
    if (selectedCourse && newExercise.title) {
      const exercise = {
        id:
          Math.max(...(selectedCourse.exercises?.map((e) => e.id) || [0])) + 1,
        title: newExercise.title,
        description: newExercise.description,
        type: newExercise.type,
        difficulty: newExercise.difficulty,
        points: newExercise.points,
        questions: newExercise.questions || [],
        content: newExercise.content || "",
        instructions: newExercise.instructions || "",
        timeLimit: newExercise.timeLimit || 0,
        submissionType: newExercise.submissionType || "text",
      };

      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              exercises: [...(course.exercises || []), exercise],
            }
          : course,
      );
      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
      setNewExercise({});
      setIsAddExerciseDialogOpen(false);
    }
  };

  // AI Exercise Generation
  const handleAIGeneration = async () => {
    setIsProcessing(true);
    setProcessingStep("Đang xử lý yêu cầu AI...");

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setProcessingStep("Tạo câu hỏi từ AI...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock AI generated questions
      const aiQuestions: Question[] = [
        {
          id: "ai1",
          question: "Tổng của 25 + 37 bằng bao nhiêu?",
          type: "multiple_choice",
          options: ["52", "62", "72", "82"],
          correctAnswer: "B",
          explanation: "25 + 37 = 62",
        },
        {
          id: "ai2",
          question: "Hãy giải thích tại sao 5 x 6 = 30",
          type: "essay",
          maxWords: 100,
          keywords: ["phép nhân", "tính chất", "ví dụ"],
          rubric:
            "Học sinh cần giải thích khái niệm phép nhân và đưa ra ví dụ cụ thể",
        },
      ];

      setNewExercise({
        ...newExercise,
        questions: [...(newExercise.questions || []), ...aiQuestions],
      });

      setProcessingStep("Hoàn thành!");
      await new Promise((resolve) => setTimeout(resolve, 500));
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
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      setProcessingStep("Phân tích nội dung file...");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setProcessingStep("Tạo câu hỏi từ file...");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock questions from file
      const fileQuestions: Question[] = [
        {
          id: "file1",
          question: "Theo tài liệu, đâu là đặc điểm chính của phép cộng?",
          type: "multiple_choice",
          options: [
            "Tính giao hoán",
            "Tính kết hợp",
            "Có phần tử đơn vị",
            "Tất cả đều đúng",
          ],
          correctAnswer: "D",
          explanation: "Phép cộng có đầy đủ các tính chất được liệt kê",
        },
      ];

      setNewExercise({
        ...newExercise,
        questions: [...(newExercise.questions || []), ...fileQuestions],
      });

      setProcessingStep("Hoàn thành!");
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
      setProcessingStep("");
      setUploadedFile(null);
    }
  };

  // Bulk Import Questions
  const handleBulkImport = () => {
    const lines = bulkQuestions.split("\n").filter((line) => line.trim());
    const questions: Question[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith("Q:")) {
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
      questions: [...(newExercise.questions || []), ...questions],
    });

    setBulkQuestions("");
  };

  // Exercise bank functions
  const toggleExerciseSelection = (exerciseId: number) => {
    const newSelected = new Set(selectedExercisesFromBank);
    if (newSelected.has(exerciseId)) {
      newSelected.delete(exerciseId);
    } else {
      newSelected.add(exerciseId);
    }
    setSelectedExercisesFromBank(newSelected);
  };

  const handleAssignExercises = () => {
    if (selectedCourse && selectedExercisesFromBank.size > 0) {
      const exercisesToAssign = Array.from(selectedExercisesFromBank).map(exerciseId => {
        const bankExercise = mockExerciseBank.find(ex => ex.id === exerciseId);
        if (bankExercise) {
          return {
            id: Math.max(...(selectedCourse.exercises?.map((e) => e.id) || [0])) + bankExercise.id,
            title: bankExercise.title,
            description: `${bankExercise.description} (Gán từ kho bài tập)`,
            type: bankExercise.type.toLowerCase().replace(/\s+/g, "_"),
            difficulty: bankExercise.difficulty,
            points: 10,
            timeLimit: 600,
            questions: bankExercise.questions || [],
            assignedFrom: "bank",
            originalId: bankExercise.id,
            instructions: "Bài tập được gán từ kho bài tập",
            submissionType: "text",
          };
        }
        return null;
      }).filter(Boolean);

      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              exercises: [...(course.exercises || []), ...exercisesToAssign],
            }
          : course,
      );

      setCourses(updatedCourses);
      setSelectedCourse(
        updatedCourses.find((c) => c.id === selectedCourse.id) || null,
      );
      setSelectedExercisesFromBank(new Set());
      setIsAssignDialogOpen(false);
    }
  };

  // Question editing functions
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

    if (isEditExerciseDialogOpen) {
      setEditExercise({
        ...editExercise,
        questions: [...(editExercise.questions || []), newQuestion],
      });
    } else {
      setNewExercise({
        ...newExercise,
        questions: [...(newExercise.questions || []), newQuestion],
      });
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const targetExercise = isEditExerciseDialogOpen ? editExercise : newExercise;
    const setTargetExercise = isEditExerciseDialogOpen ? setEditExercise : setNewExercise;
    
    const updatedQuestions = [...(targetExercise.questions || [])];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    
    setTargetExercise({
      ...targetExercise,
      questions: updatedQuestions,
    });
  };

  const removeQuestion = (index: number) => {
    const targetExercise = isEditExerciseDialogOpen ? editExercise : newExercise;
    const setTargetExercise = isEditExerciseDialogOpen ? setEditExercise : setNewExercise;
    
    const updatedQuestions = (targetExercise.questions || []).filter((_, i) => i !== index);
    
    setTargetExercise({
      ...targetExercise,
      questions: updatedQuestions,
    });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const targetExercise = isEditExerciseDialogOpen ? editExercise : newExercise;
    const setTargetExercise = isEditExerciseDialogOpen ? setEditExercise : setNewExercise;
    
    const updatedQuestions = [...(targetExercise.questions || [])];
    if (updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options![optionIndex] = value;
      setTargetExercise({
        ...targetExercise,
        questions: updatedQuestions,
      });
    }
  };

  const duplicateQuestion = (index: number) => {
    const targetExercise = isEditExerciseDialogOpen ? editExercise : newExercise;
    const setTargetExercise = isEditExerciseDialogOpen ? setEditExercise : setNewExercise;
    
    const questionToCopy = { ...(targetExercise.questions || [])[index] };
    questionToCopy.id = Date.now().toString();
    const updatedQuestions = [...(targetExercise.questions || [])];
    updatedQuestions.splice(index + 1, 0, questionToCopy);
    
    setTargetExercise({
      ...targetExercise,
      questions: updatedQuestions,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang mở":
        return "bg-green-100 text-green-800";
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800";
      case "Đã đóng":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
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

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4 text-blue-500" />;
      case "reading":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "game":
        return <GamepadIcon className="h-4 w-4 text-purple-500" />;
      case "song":
        return <Headphones className="h-4 w-4 text-pink-500" />;
      case "interactive":
        return <Eye className="h-4 w-4 text-orange-500" />;
      case "exercise":
        return <Edit className="h-4 w-4 text-red-500" />;
      case "observation":
        return <Eye className="h-4 w-4 text-teal-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getExerciseTypeIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "practice":
        return <Edit className="h-4 w-4 text-green-500" />;
      case "game":
        return <GamepadIcon className="h-4 w-4 text-purple-500" />;
      case "experiment":
        return <Eye className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderBankExerciseCard = (exercise: any) => {
    const isSelected = selectedExercisesFromBank.has(exercise.id);
    
    return (
      <Card 
        key={exercise.id} 
        className={`cursor-pointer transition-all hover:shadow-lg ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
        }`}
        onClick={() => toggleExerciseSelection(exercise.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{exercise.thumbnail}</div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {exercise.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {exercise.subject}
                  </Badge>
                  <Badge className={`text-xs ${getTypeColor(exercise.type)}`}>
                    {exercise.type}
                  </Badge>
                </div>
              </div>
            </div>
            <Checkbox
              checked={isSelected}
              onChange={() => {}}
              className="mt-1"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {exercise.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Khối:</span>
              <span className="font-medium">{exercise.department}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Độ khó:</span>
              <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Đánh giá:</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{exercise.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Số câu:</span>
              <span className="font-medium">{exercise.totalQuestions}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {exercise.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
            {exercise.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{exercise.tags.length - 3}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderQuestionForm = (question: Question, index: number) => {
    return (
      <div
        key={question.id || index}
        className="p-4 border border-gray-200 rounded-lg space-y-3"
      >
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
                    <SelectItem
                      key={oIndex}
                      value={String.fromCharCode(65 + oIndex)}
                    >
                      {String.fromCharCode(65 + oIndex)}. {question.options![oIndex]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Giải thích (tùy chọn)</Label>
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
                onChange={(e) =>
                  updateQuestion(
                    index,
                    "keywords",
                    e.target.value.split(", ").filter((k) => k.trim()),
                  )
                }
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
                onChange={(e) =>
                  updateQuestion(
                    index,
                    "keywords",
                    e.target.value.split(", ").filter((k) => k.trim()),
                  )
                }
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
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Quản lý khóa học
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý tất cả các khóa học và môn học - Có thể chỉnh sửa chi tiết từng bài tập
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Thêm khóa học
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
              <DialogHeader className="pb-4 border-b border-gray-200">
                <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Thêm khóa học mới
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Tạo khóa học mới cho học sinh. Tất cả nội dung sẽ được quản lý
                  bởi quản trị viên.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="courseName" className="text-right">
                    Tên khóa học *
                  </Label>
                  <Input
                    id="courseName"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="VD: Toán học cơ bản"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="courseDesc" className="text-right">
                    Mô tả *
                  </Label>
                  <Textarea
                    id="courseDesc"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={3}
                    placeholder="Mô tả chi tiết về khóa học..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label htmlFor="subject" className="text-right col-span-2">
                      Môn học *
                    </Label>
                    <Select
                      value={newCourse.subject}
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, subject: value })
                      }
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Chọn môn" />
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

                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label
                      htmlFor="difficulty"
                      className="text-right col-span-2"
                    >
                      Độ khó *
                    </Label>
                    <Select
                      value={newCourse.difficulty}
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, difficulty: value })
                      }
                    >
                      <SelectTrigger className="col-span-2">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label htmlFor="duration" className="text-right col-span-2">
                      Thời lượng *
                    </Label>
                    <Input
                      id="duration"
                      value={newCourse.duration}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, duration: e.target.value })
                      }
                      className="col-span-2"
                      placeholder="VD: 8 tuần"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label htmlFor="ageGroup" className="text-right col-span-2">
                      Độ tuổi *
                    </Label>
                    <Select
                      value={newCourse.ageGroup}
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, ageGroup: value })
                      }
                    >
                      <SelectTrigger className="col-span-2">
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
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="objectives" className="text-right">
                    Mục tiêu học tập
                  </Label>
                  <Textarea
                    id="objectives"
                    value={newCourse.objectives}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        objectives: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={2}
                    placeholder="Học sinh sẽ đạt được những mục tiêu gì sau khóa học..."
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prerequisites" className="text-right">
                    Yêu cầu trước
                  </Label>
                  <Textarea
                    id="prerequisites"
                    value={newCourse.prerequisites}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        prerequisites: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={2}
                    placeholder="Kiến thức cần có trước khi học khóa này..."
                  />
                </div>
              </div>
              <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 rounded-b-lg border-t border-gray-200">
                <div className="flex items-center justify-between w-full">
                  <div className="text-xs text-gray-500">
                    * Các trường bắt buộc
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={handleAddCourse}
                      className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo khóa học
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Lọc theo môn" />
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

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow border-gray-200 overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-32 object-cover rounded-lg bg-gradient-to-br from-blue-100 to-orange-100"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${getStatusColor(course.status)}`}
                  >
                    {course.status}
                  </Badge>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {course.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {course.subject}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewCourse(course)}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditCourse(course)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Độ tuổi:</span>
                    <span className="font-medium text-purple-600">
                      {course.ageGroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Thời lượng:</span>
                    <span className="font-medium text-orange-600">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Độ khó:</span>
                    <Badge
                      variant={
                        course.difficulty === "Cơ bản"
                          ? "default"
                          : course.difficulty === "Trung bình"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {course.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-500">Học sinh:</span>
                    </div>
                    <span className="font-medium">{course.studentsCount}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-indigo-500" />
                      <span className="text-gray-500">Bài giảng:</span>
                    </div>
                    <span className="font-medium text-indigo-600">
                      {course.lessons?.length || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Edit className="h-4 w-4 text-emerald-500" />
                      <span className="text-gray-500">Bài tập:</span>
                    </div>
                    <span className="font-medium text-emerald-600">
                      {course.exercises?.length || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-gray-500">Hoàn thành:</span>
                    </div>
                    <span
                      className={`font-medium ${getCompletionColor(course.completionRate)}`}
                    >
                      {course.completionRate}%
                    </span>
                  </div>

                  {course.aiGenerated && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">🤖</span>
                        <span className="text-gray-500">AI Generated:</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs text-blue-600"
                      >
                        Quản trị AI
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="w-full">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Tiến độ hoàn thành</span>
                    <span>{course.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-gray-500 mb-4">
              Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSubjectFilter("Tất cả");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">
              {courses.length}
            </div>
            <div className="text-sm text-blue-600">Tổng khóa học</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter((c) => c.status === "Đang mở").length}
            </div>
            <div className="text-sm text-green-600">Đang mở</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {courses.reduce((sum, c) => sum + c.studentsCount, 0)}
            </div>
            <div className="text-sm text-orange-600">Tổng học sinh</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(
                courses.reduce((sum, c) => sum + c.completionRate, 0) /
                  courses.length,
              )}
              %
            </div>
            <div className="text-sm text-purple-600">Hoàn thành TB</div>
          </div>
        </div>

        {/* View Course Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Chi tiết khóa học: {selectedCourse?.name}
              </DialogTitle>
              <DialogDescription>
                Quản lý nội dung và bài tập của khóa học - Có thể chỉnh sửa chi tiết từng câu hỏi
              </DialogDescription>
            </DialogHeader>

            {selectedCourse && (
              <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "info"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    📋 Thông tin chung
                  </button>
                  <button
                    onClick={() => setActiveTab("lessons")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "lessons"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    📚 Bài giảng ({selectedCourse.lessons?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab("exercises")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "exercises"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    ✏️ Bài tập ({selectedCourse.exercises?.length || 0})
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "info" && (
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold">
                        Tên khóa học:
                      </Label>
                      <div className="col-span-3">{selectedCourse.name}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold">
                        Môn học:
                      </Label>
                      <div className="col-span-3">
                        <Badge variant="outline">
                          {selectedCourse.subject}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold">Mô tả:</Label>
                      <div className="col-span-3 text-sm">
                        {selectedCourse.description}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Độ khó:</Label>
                        <Badge
                          variant={
                            selectedCourse.difficulty === "Cơ bản"
                              ? "default"
                              : selectedCourse.difficulty === "Trung bình"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {selectedCourse.difficulty}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Trạng thái:</Label>
                        <Badge
                          className={getStatusColor(selectedCourse.status)}
                        >
                          {selectedCourse.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Thời lượng:</Label>
                        <span className="text-sm">{selectedCourse.duration}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Độ tuổi:</Label>
                        <span className="text-sm">{selectedCourse.ageGroup}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Học sinh:</Label>
                        <span className="text-sm">{selectedCourse.studentsCount}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Ho��n thành:</Label>
                        <span className="text-sm">{selectedCourse.completionRate}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "lessons" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Danh sách bài giảng</h3>
                      <Dialog open={isAddLessonDialogOpen} onOpenChange={setIsAddLessonDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm bài giảng
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Thêm bài giảng mới</DialogTitle>
                            <DialogDescription>
                              Tạo bài giảng mới cho khóa học
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="lessonTitle" className="text-right">
                                Tiêu đề *
                              </Label>
                              <Input
                                id="lessonTitle"
                                value={newLesson.title || ""}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, title: e.target.value })
                                }
                                className="col-span-3"
                                placeholder="Tiêu đề bài giảng"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="lessonDescription" className="text-right">
                                Mô tả
                              </Label>
                              <Textarea
                                id="lessonDescription"
                                value={newLesson.description || ""}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, description: e.target.value })
                                }
                                className="col-span-3"
                                placeholder="Mô tả bài giảng"
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="lessonType" className="text-right">
                                Loại bài giảng *
                              </Label>
                              <Select
                                value={newLesson.type || ""}
                                onValueChange={(value) =>
                                  setNewLesson({ ...newLesson, type: value })
                                }
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Chọn loại bài giảng" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="reading">Đọc hiểu</SelectItem>
                                  <SelectItem value="interactive">Tương tác</SelectItem>
                                  <SelectItem value="game">Trò chơi</SelectItem>
                                  <SelectItem value="song">Bài hát</SelectItem>
                                  <SelectItem value="exercise">Bài tập</SelectItem>
                                  <SelectItem value="observation">Quan sát</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="lessonDuration" className="text-right">
                                Thời lượng *
                              </Label>
                              <Input
                                id="lessonDuration"
                                value={newLesson.duration || ""}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, duration: e.target.value })
                                }
                                className="col-span-3"
                                placeholder="VD: 15 phút"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="lessonContent" className="text-right">
                                Nội dung
                              </Label>
                              <Textarea
                                id="lessonContent"
                                value={newLesson.content || ""}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, content: e.target.value })
                                }
                                className="col-span-3"
                                placeholder="Nội dung chi tiết của bài giảng"
                                rows={4}
                              />
                            </div>
                            {newLesson.type === "video" && (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="videoUrl" className="text-right">
                                  URL Video
                                </Label>
                                <Input
                                  id="videoUrl"
                                  value={newLesson.videoUrl || ""}
                                  onChange={(e) =>
                                    setNewLesson({ ...newLesson, videoUrl: e.target.value })
                                  }
                                  className="col-span-3"
                                  placeholder="https://youtube.com/watch?v=..."
                                />
                              </div>
                            )}
                            {newLesson.type === "game" && (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gameUrl" className="text-right">
                                  URL Trò chơi
                                </Label>
                                <Input
                                  id="gameUrl"
                                  value={newLesson.gameUrl || ""}
                                  onChange={(e) =>
                                    setNewLesson({ ...newLesson, gameUrl: e.target.value })
                                  }
                                  className="col-span-3"
                                  placeholder="https://game.example.com"
                                />
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setNewLesson({});
                                setIsAddLessonDialogOpen(false);
                              }}
                            >
                              Hủy
                            </Button>
                            <Button
                              onClick={handleAddLesson}
                              disabled={!newLesson.title || !newLesson.type || !newLesson.duration}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Thêm bài giảng
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {selectedCourse.lessons && selectedCourse.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.lessons.map((lesson) => (
                          <Card key={lesson.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getLessonTypeIcon(lesson.type)}
                                <div>
                                  <h4 className="font-semibold">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600">{lesson.description}</p>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs text-gray-500">
                                      <Clock className="h-3 w-3 inline mr-1" />
                                      {lesson.duration}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {lesson.type}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditLesson(lesson)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteLesson(lesson.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Chưa có bài giảng nào. Thêm bài giảng đầu tiên!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "exercises" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Danh sách bài tập</h3>
                      <div className="flex gap-2">
                        {/* Exercise Bank Assignment Dialog */}
                        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Gán từ kho bài tập
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-hidden">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-green-500" />
                                Kho bài tập - Chọn bài tập để gán vào khóa học
                              </DialogTitle>
                              <DialogDescription>
                                Duyệt và chọn bài tập từ kho để gán vào khóa học. Có thể chọn nhiều bài tập cùng lúc.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              {/* Bank Search and Filters */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="relative flex-1 max-w-md">
                                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                  <Input
                                    placeholder="Tìm kiếm trong kho bài tập..."
                                    value={bankSearchTerm}
                                    onChange={(e) => setBankSearchTerm(e.target.value)}
                                    className="pl-10"
                                  />
                                </div>
                                <Select value={bankSubjectFilter} onValueChange={setBankSubjectFilter}>
                                  <SelectTrigger className="w-40">
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
                                <Select value={bankDepartmentFilter} onValueChange={setBankDepartmentFilter}>
                                  <SelectTrigger className="w-40">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {departments.map((dept) => (
                                      <SelectItem key={dept} value={dept}>
                                        {dept}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBankViewMode('grid')}
                                    className={bankViewMode === 'grid' ? 'bg-blue-100' : ''}
                                  >
                                    <Grid3X3 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBankViewMode('list')}
                                    className={bankViewMode === 'list' ? 'bg-blue-100' : ''}
                                  >
                                    <List className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Selected Counter */}
                              {selectedExercisesFromBank.size > 0 && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-blue-800 font-medium">
                                    Đã chọn {selectedExercisesFromBank.size} bài tập
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedExercisesFromBank(new Set())}
                                  >
                                    Bỏ chọn tất cả
                                  </Button>
                                </div>
                              )}

                              {/* Exercise Bank Grid/List */}
                              <div className="overflow-y-auto max-h-[500px]">
                                {bankViewMode === 'grid' ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredBankExercises.map((exercise) => renderBankExerciseCard(exercise))}
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    {filteredBankExercises.map((exercise) => (
                                      <Card
                                        key={exercise.id}
                                        className={`cursor-pointer transition-all hover:shadow-md ${
                                          selectedExercisesFromBank.has(exercise.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                        }`}
                                        onClick={() => toggleExerciseSelection(exercise.id)}
                                      >
                                        <CardContent className="p-4">
                                          <div className="flex items-center gap-4">
                                            <Checkbox
                                              checked={selectedExercisesFromBank.has(exercise.id)}
                                              onChange={() => {}}
                                            />
                                            <div className="text-2xl">{exercise.thumbnail}</div>
                                            <div className="flex-1">
                                              <h3 className="font-semibold">{exercise.title}</h3>
                                              <p className="text-sm text-gray-600 line-clamp-1">
                                                {exercise.description}
                                              </p>
                                              <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline" className="text-xs">
                                                  {exercise.subject}
                                                </Badge>
                                                <Badge className={`text-xs ${getTypeColor(exercise.type)}`}>
                                                  {exercise.type}
                                                </Badge>
                                                <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                                                  {exercise.difficulty}
                                                </Badge>
                                              </div>
                                            </div>
                                            <div className="text-right text-sm">
                                              <div className="flex items-center gap-1 mb-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span>{exercise.rating}</span>
                                              </div>
                                              <div className="text-gray-500">
                                                {exercise.totalQuestions} câu
                                              </div>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedExercisesFromBank(new Set());
                                  setIsAssignDialogOpen(false);
                                }}
                              >
                                Đóng
                              </Button>
                              <Button
                                onClick={handleAssignExercises}
                                disabled={selectedExercisesFromBank.size === 0}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Gán {selectedExercisesFromBank.size} bài tập được chọn
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* AI Generate Exercise Dialog */}
                        <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                            >
                              <Bot className="h-4 w-4 mr-2" />
                              AI tạo bài tập
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-500" />
                                AI tạo bài tập cho khóa học
                              </DialogTitle>
                              <DialogDescription>
                                Mô tả yêu cầu và AI sẽ tạo bài tập phù hợp cho khóa học này
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
                                  <Label>Mô tả bài tập cần tạo cho khóa học "{selectedCourse?.name}"</Label>
                                  <Textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder={`Ví dụ: Tạo 5 câu hỏi trắc nghiệm về ${selectedCourse?.subject || 'môn học'} phù hợp với độ tuổi ${selectedCourse?.ageGroup || '6-8 tuổi'}, độ khó ${selectedCourse?.difficulty || 'cơ bản'}...`}
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
                                variant="outline"
                                onClick={() => {
                                  setAiPrompt("");
                                  setIsAIDialogOpen(false);
                                }}
                              >
                                Hủy
                              </Button>
                              <Button
                                onClick={() => {
                                  // Call AI generation and then create exercise
                                  handleAIGeneration();
                                  // After AI generation, open the add exercise dialog
                                  setTimeout(() => {
                                    setIsAddExerciseDialogOpen(true);
                                  }, 100);
                                }}
                                disabled={!aiPrompt.trim() || isProcessing}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              >
                                <Wand2 className="h-4 w-4 mr-2" />
                                Tạo bài tập với AI
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isAddExerciseDialogOpen} onOpenChange={setIsAddExerciseDialogOpen}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="h-4 w-4 mr-2" />
                              Tạo bài tập mới
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Tạo bài tập mới</DialogTitle>
                              <DialogDescription>
                                Tạo bài tập với nhiều dạng câu hỏi khác nhau - Có thể chỉnh sửa chi tiết từng câu hỏi
                              </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="basic" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                                <TabsTrigger value="questions">
                                  Câu hỏi ({(newExercise.questions || []).length})
                                </TabsTrigger>
                                <TabsTrigger value="import">Import hàng loạt</TabsTrigger>
                              </TabsList>

                              <TabsContent value="basic" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Tên bài tập</Label>
                                    <Input
                                      value={newExercise.title || ""}
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
                                    <Label>Loại bài tập</Label>
                                    <Select
                                      value={newExercise.type || ""}
                                      onValueChange={(value) =>
                                        setNewExercise({ ...newExercise, type: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="quiz">Trắc nghiệm</SelectItem>
                                        <SelectItem value="practice">Luyện tập</SelectItem>
                                        <SelectItem value="game">Trò chơi</SelectItem>
                                        <SelectItem value="experiment">Thí nghiệm</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label>Độ khó</Label>
                                    <Select
                                      value={newExercise.difficulty || ""}
                                      onValueChange={(value) =>
                                        setNewExercise({
                                          ...newExercise,
                                          difficulty: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn độ khó" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Dễ">Dễ</SelectItem>
                                        <SelectItem value="Trung bình">Trung bình</SelectItem>
                                        <SelectItem value="Khó">Khó</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Điểm số</Label>
                                    <Input
                                      type="number"
                                      value={newExercise.points || ""}
                                      onChange={(e) =>
                                        setNewExercise({
                                          ...newExercise,
                                          points: parseInt(e.target.value),
                                        })
                                      }
                                      placeholder="10"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Thời gian (giây)</Label>
                                    <Input
                                      type="number"
                                      value={newExercise.timeLimit || ""}
                                      onChange={(e) =>
                                        setNewExercise({
                                          ...newExercise,
                                          timeLimit: parseInt(e.target.value),
                                        })
                                      }
                                      placeholder="600"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Mô tả bài tập</Label>
                                  <Textarea
                                    value={newExercise.description || ""}
                                    onChange={(e) =>
                                      setNewExercise({
                                        ...newExercise,
                                        description: e.target.value,
                                      })
                                    }
                                    placeholder="Mô tả ngắn gọn về bài tập..."
                                    rows={3}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Hướng dẫn làm bài</Label>
                                  <Textarea
                                    value={newExercise.instructions || ""}
                                    onChange={(e) =>
                                      setNewExercise({
                                        ...newExercise,
                                        instructions: e.target.value,
                                      })
                                    }
                                    placeholder="Hướng dẫn chi tiết cho học sinh..."
                                    rows={3}
                                  />
                                </div>
                              </TabsContent>

                              <TabsContent value="questions" className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label className="text-lg font-semibold">
                                    Danh sách câu hỏi ({(newExercise.questions || []).length} câu)
                                  </Label>
                                  <div className="flex gap-2">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Plus className="h-4 w-4 mr-2" />
                                          Thêm câu hỏi
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem
                                          onClick={() => addQuestion("multiple_choice")}
                                        >
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Trắc nghiệm
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => addQuestion("essay")}
                                        >
                                          <FileText className="mr-2 h-4 w-4" />
                                          Tự luận dài
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => addQuestion("short_answer")}
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Trả lời ngắn
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>

                                {(!newExercise.questions || newExercise.questions.length === 0) && (
                                  <div className="text-center py-8 text-gray-500">
                                    <Edit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Chưa có câu hỏi nào. Thêm câu hỏi đầu tiên!</p>
                                  </div>
                                )}

                                <div className="space-y-4">
                                  {(newExercise.questions || []).map((question, index) =>
                                    renderQuestionForm(question, index),
                                  )}
                                </div>
                              </TabsContent>

                              <TabsContent value="import" className="space-y-4">
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-lg font-semibold">
                                      Import câu hỏi hàng loạt
                                    </Label>
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
                                    <Button
                                      onClick={handleBulkImport}
                                      disabled={!bulkQuestions.trim()}
                                    >
                                      <Import className="h-4 w-4 mr-2" />
                                      Import câu hỏi
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => setBulkQuestions("")}
                                    >
                                      Xóa tất cả
                                    </Button>
                                  </div>

                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">
                                      Hướng dẫn định dạng:
                                    </h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                      <li>• Mỗi câu hỏi bắt đầu bằng "Q:"</li>
                                      <li>
                                        • Câu hỏi sẽ được tạo dạng trả lời ngắn mặc định
                                      </li>
                                      <li>
                                        • Có thể chỉnh sửa loại câu hỏi sau khi import
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setNewExercise({});
                                  setIsAddExerciseDialogOpen(false);
                                }}
                              >
                                Hủy
                              </Button>
                              <Button
                                onClick={handleAddExercise}
                                disabled={
                                  !newExercise.title ||
                                  !newExercise.type ||
                                  !newExercise.difficulty ||
                                  !(newExercise.questions && newExercise.questions.length > 0)
                                }
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Tạo bài tập
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {selectedCourse.exercises && selectedCourse.exercises.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.exercises.map((exercise) => (
                          <Card key={exercise.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getExerciseTypeIcon(exercise.type)}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold">{exercise.title}</h4>
                                    {exercise.assignedFrom === "bank" && (
                                      <Badge variant="secondary" className="text-xs">
                                        Từ kho bài tập
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                                  <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-500">
                                      <Award className="h-3 w-3 inline mr-1" />
                                      {exercise.points} điểm
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {exercise.difficulty}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {Array.isArray(exercise.questions) 
                                        ? exercise.questions.length 
                                        : exercise.questions || 0} câu hỏi
                                    </span>
                                    {exercise.timeLimit && (
                                      <span className="text-xs text-gray-500">
                                        <Clock className="h-3 w-3 inline mr-1" />
                                        {Math.floor(exercise.timeLimit / 60)} phút
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditExercise(exercise)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Chỉnh sửa
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteExercise(exercise.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Edit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Chưa có bài tập nào. Tạo bài tập đầu tiên hoặc gán từ kho bài tập!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Exercise Dialog - with detailed question editing */}
        <Dialog open={isEditExerciseDialogOpen} onOpenChange={setIsEditExerciseDialogOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa bài tập: {editExercise.title}</DialogTitle>
              <DialogDescription>
                Chỉnh sửa thông tin và từng câu hỏi của bài tập
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="questions">
                  Câu hỏi ({(editExercise.questions || []).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tên bài tập</Label>
                    <Input
                      value={editExercise.title || ""}
                      onChange={(e) =>
                        setEditExercise({
                          ...editExercise,
                          title: e.target.value,
                        })
                      }
                      placeholder="Nhập tên bài tập"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Loại bài tập</Label>
                    <Select
                      value={editExercise.type || ""}
                      onValueChange={(value) =>
                        setEditExercise({ ...editExercise, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">Trắc nghiệm</SelectItem>
                        <SelectItem value="practice">Luyện tập</SelectItem>
                        <SelectItem value="game">Trò chơi</SelectItem>
                        <SelectItem value="experiment">Thí nghiệm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Độ khó</Label>
                    <Select
                      value={editExercise.difficulty || ""}
                      onValueChange={(value) =>
                        setEditExercise({
                          ...editExercise,
                          difficulty: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn độ khó" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dễ">Dễ</SelectItem>
                        <SelectItem value="Trung bình">Trung bình</SelectItem>
                        <SelectItem value="Khó">Khó</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Điểm số</Label>
                    <Input
                      type="number"
                      value={editExercise.points || ""}
                      onChange={(e) =>
                        setEditExercise({
                          ...editExercise,
                          points: parseInt(e.target.value),
                        })
                      }
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Thời gian (giây)</Label>
                    <Input
                      type="number"
                      value={editExercise.timeLimit || ""}
                      onChange={(e) =>
                        setEditExercise({
                          ...editExercise,
                          timeLimit: parseInt(e.target.value),
                        })
                      }
                      placeholder="600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mô tả bài tập</Label>
                  <Textarea
                    value={editExercise.description || ""}
                    onChange={(e) =>
                      setEditExercise({
                        ...editExercise,
                        description: e.target.value,
                      })
                    }
                    placeholder="Mô tả ngắn gọn về bài tập..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hướng dẫn làm bài</Label>
                  <Textarea
                    value={editExercise.instructions || ""}
                    onChange={(e) =>
                      setEditExercise({
                        ...editExercise,
                        instructions: e.target.value,
                      })
                    }
                    placeholder="Hướng dẫn chi tiết cho học sinh..."
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="questions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">
                    Chỉnh sửa từng câu hỏi ({(editExercise.questions || []).length} câu)
                  </Label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm câu hỏi
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => addQuestion("multiple_choice")}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Trắc nghiệm
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => addQuestion("essay")}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Tự luận dài
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => addQuestion("short_answer")}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Trả lời ngắn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {(!editExercise.questions || editExercise.questions.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <Edit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Chưa có câu hỏi nào. Thêm câu hỏi đầu tiên!</p>
                  </div>
                )}

                <div className="space-y-4">
                  {(editExercise.questions || []).map((question, index) =>
                    renderQuestionForm(question, index),
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditExercise({});
                  setIsEditExerciseDialogOpen(false);
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdateExercise}
                disabled={!editExercise.title}
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Lesson Dialog */}
        <Dialog open={isEditLessonDialogOpen} onOpenChange={setIsEditLessonDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa bài giảng</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin bài giảng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLessonTitle" className="text-right">
                  Tiêu đề *
                </Label>
                <Input
                  id="editLessonTitle"
                  value={editLesson.title || ""}
                  onChange={(e) =>
                    setEditLesson({ ...editLesson, title: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Tiêu đề bài giảng"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLessonDescription" className="text-right">
                  Mô tả
                </Label>
                <Textarea
                  id="editLessonDescription"
                  value={editLesson.description || ""}
                  onChange={(e) =>
                    setEditLesson({ ...editLesson, description: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Mô tả bài giảng"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLessonType" className="text-right">
                  Loại bài giảng *
                </Label>
                <Select
                  value={editLesson.type || ""}
                  onValueChange={(value) =>
                    setEditLesson({ ...editLesson, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn loại bài giảng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="reading">Đọc hiểu</SelectItem>
                    <SelectItem value="interactive">Tương tác</SelectItem>
                    <SelectItem value="game">Trò chơi</SelectItem>
                    <SelectItem value="song">Bài hát</SelectItem>
                    <SelectItem value="exercise">Bài tập</SelectItem>
                    <SelectItem value="observation">Quan sát</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLessonDuration" className="text-right">
                  Thời lượng *
                </Label>
                <Input
                  id="editLessonDuration"
                  value={editLesson.duration || ""}
                  onChange={(e) =>
                    setEditLesson({ ...editLesson, duration: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="VD: 15 phút"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLessonContent" className="text-right">
                  Nội dung
                </Label>
                <Textarea
                  id="editLessonContent"
                  value={editLesson.content || ""}
                  onChange={(e) =>
                    setEditLesson({ ...editLesson, content: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Nội dung chi tiết của bài giảng"
                  rows={4}
                />
              </div>
              {editLesson.type === "video" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editVideoUrl" className="text-right">
                    URL Video
                  </Label>
                  <Input
                    id="editVideoUrl"
                    value={editLesson.videoUrl || ""}
                    onChange={(e) =>
                      setEditLesson({ ...editLesson, videoUrl: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              )}
              {editLesson.type === "game" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editGameUrl" className="text-right">
                    URL Trò chơi
                  </Label>
                  <Input
                    id="editGameUrl"
                    value={editLesson.gameUrl || ""}
                    onChange={(e) =>
                      setEditLesson({ ...editLesson, gameUrl: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="https://game.example.com"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditLesson({});
                  setIsEditLessonDialogOpen(false);
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdateLesson}
                disabled={!editLesson.title || !editLesson.type || !editLesson.duration}
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Chỉnh sửa khóa học
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Cập nhật thông tin khóa học
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editCourseName" className="text-right">
                  Tên khóa học *
                </Label>
                <Input
                  id="editCourseName"
                  value={editCourse.name || ""}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, name: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="VD: Toán học cơ bản"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editCourseDesc" className="text-right">
                  Mô tả *
                </Label>
                <Textarea
                  id="editCourseDesc"
                  value={editCourse.description || ""}
                  onChange={(e) =>
                    setEditCourse({
                      ...editCourse,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  rows={3}
                  placeholder="Mô tả chi tiết về khóa học..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                  <Label htmlFor="editSubject" className="text-right col-span-2">
                    Môn học *
                  </Label>
                  <Select
                    value={editCourse.subject || ""}
                    onValueChange={(value) =>
                      setEditCourse({ ...editCourse, subject: value })
                    }
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Chọn môn" />
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

                <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                  <Label
                    htmlFor="editDifficulty"
                    className="text-right col-span-2"
                  >
                    Độ khó *
                  </Label>
                  <Select
                    value={editCourse.difficulty || ""}
                    onValueChange={(value) =>
                      setEditCourse({ ...editCourse, difficulty: value })
                    }
                  >
                    <SelectTrigger className="col-span-2">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                  <Label htmlFor="editDuration" className="text-right col-span-2">
                    Thời lượng *
                  </Label>
                  <Input
                    id="editDuration"
                    value={editCourse.duration || ""}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, duration: e.target.value })
                    }
                    className="col-span-2"
                    placeholder="VD: 8 tuần"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                  <Label htmlFor="editAgeGroup" className="text-right col-span-2">
                    Độ tuổi *
                  </Label>
                  <Select
                    value={editCourse.ageGroup || ""}
                    onValueChange={(value) =>
                      setEditCourse({ ...editCourse, ageGroup: value })
                    }
                  >
                    <SelectTrigger className="col-span-2">
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
              </div>
            </div>
            <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 rounded-b-lg border-t border-gray-200">
              <div className="flex items-center justify-between w-full">
                <div className="text-xs text-gray-500">
                  * Các trường bắt buộc
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleUpdateCourse}
                    className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
