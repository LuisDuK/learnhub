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
} from "lucide-react";

// Mock course data with lessons
const mockCourses = [
  {
    id: 1,
    name: "Toán học cơ bản",
    description:
      "Khóa học toán học dành cho học sinh ti���u h��c, bao gồm các phép tính cơ bản và hình học đơn giản.",
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
        title: "Số t�� 1 đến 10",
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
            image: "apples.jpg",
            options: ["3", "4", "5", "6"],
            correctAnswer: "5",
          },
        ],
        instructions: "Quan sát hình ảnh và đếm số vật thể",
        timeLimit: 300,
      },
      {
        id: 2,
        title: "Bài tập cộng trừ",
        description: "Thực hi���n các phép tính cơ bản",
        type: "practice",
        difficulty: "Trung bình",
        points: 15,
        content:
          "Giải các bài toán sau:\n1. 3 + 2 = ?\n2. 5 - 1 = ?\n3. 4 + 3 = ?",
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
      },
    ],
  },
  {
    id: 3,
    name: "Tiếng Anh cho trẻ em",
    description:
      "Khóa học tiếng Anh cơ bản với phương pháp học qua trò chơi và bài hát.",
    image: "/placeholder.svg",
    subject: "Anh",
    difficulty: "Cơ bản",
    duration: "10 tuần",
    ageGroup: "5-7 tuổi",
    studentsCount: 80,
    completionRate: 92,
    status: "Đang mở",
    createdAt: "2024-01-10",
    aiGenerated: true,
    lessons: [
      {
        id: 1,
        title: "Hello and Greetings",
        description: "Học cách chào hỏi bằng tiếng Anh",
        type: "video",
        duration: "15 phút",
        order: 1,
        completed: false,
      },
      {
        id: 2,
        title: "Colors Song",
        description: "Học màu sắc qua bài hát vui nhộn",
        type: "song",
        duration: "10 phút",
        order: 2,
        completed: false,
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Color Matching Game",
        description: "Ghép màu sắc với tên tiếng Anh",
        type: "game",
        difficulty: "Dễ",
        points: 10,
      },
    ],
  },
  {
    id: 4,
    name: "Khoa học tự nhiên",
    description:
      "Khám phá thế giới xung quanh qua các thí nghiệm đơn giản và quan sát thiên nhiên.",
    image: "/placeholder.svg",
    subject: "Toán",
    difficulty: "Trung bình",
    duration: "6 tuần",
    ageGroup: "7-9 tuổi",
    studentsCount: 75,
    completionRate: 70,
    status: "Tạm dừng",
    createdAt: "2024-01-05",
    aiGenerated: false,
    lessons: [
      {
        id: 1,
        title: "Các loại lá cây",
        description: "Quan sát và phân loại các dạng lá khác nhau",
        type: "observation",
        duration: "20 phút",
        order: 1,
        completed: false,
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Thí nghiệm nảy mầm",
        description: "Quan sát quá trình nảy m��m của hạt đậu",
        type: "experiment",
        difficulty: "Trung bình",
        points: 25,
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

// Question interface for exercise creation
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
  const [isEditExerciseDialogOpen, setIsEditExerciseDialogOpen] =
    useState(false);
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

  // Assign from exercise bank states
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedExercisesFromBank, setSelectedExercisesFromBank] = useState<number[]>([]);
  const [exerciseBank] = useState([
    // Mock exercise bank - this would come from the actual exercise bank/kho bài tập
    {
      id: 101,
      title: "Phép cộng cơ bản",
      type: "Trắc nghiệm",
      subject: "Toán",
      difficulty: "Dễ",
      totalQuestions: 10,
      creator: "Cô Nguyễn Thị Mai",
      createdAt: "2024-01-15"
    },
    {
      id: 102,
      title: "Viết đoạn văn tả người",
      type: "Tự luận",
      subject: "Văn",
      difficulty: "Trung bình",
      totalQuestions: 1,
      creator: "Cô Trần Thị Lan",
      createdAt: "2024-01-20"
    },
    {
      id: 103,
      title: "Colors and Shapes",
      type: "Trắc nghiệm",
      subject: "Anh",
      difficulty: "Dễ",
      totalQuestions: 8,
      creator: "Thầy John Smith",
      createdAt: "2024-01-10"
    }
  ]);

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
        questions: [...(newExercise.questions || []), ...aiQuestions]
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
          options: ["Tính giao hoán", "Tính kết hợp", "Có phần tử đơn vị", "Tất cả đều đúng"],
          correctAnswer: "D",
          explanation: "Phép cộng có đầy đủ các tính chất được liệt kê"
        }
      ];

      setNewExercise({
        ...newExercise,
        questions: [...(newExercise.questions || []), ...fileQuestions]
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
      questions: [...(newExercise.questions || []), ...questions]
    });

    setBulkQuestions("");
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
              Quản lý tất cả các khóa học và môn học (Được điều hành bởi Quản
              trị viên)
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
                    placeholder="Học sinh sẽ đạt được nh��ng mục tiêu gì sau khóa học..."
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
                    placeholder="Kiến thức cần có tr��ớc khi học khóa này..."
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
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Chi tiết khóa học: {selectedCourse?.name}
              </DialogTitle>
              <DialogDescription>
                Thông tin chi tiết và nội dung khóa học
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
                        <Label className="font-semibold">Độ tuổi:</Label>
                        <div className="text-sm text-purple-600">
                          {selectedCourse.ageGroup}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Thời lượng:</Label>
                        <div className="text-sm text-orange-600">
                          {selectedCourse.duration}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Học sinh:</Label>
                        <div className="text-sm">
                          {selectedCourse.studentsCount}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="font-semibold">Hoàn thành:</Label>
                        <div
                          className={`text-sm font-medium ${getCompletionColor(selectedCourse.completionRate)}`}
                        >
                          {selectedCourse.completionRate}%
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold">
                        Ng��y tạo:
                      </Label>
                      <div className="col-span-3 text-sm">
                        {selectedCourse.createdAt}
                      </div>
                    </div>
                    {selectedCourse.aiGenerated && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold">
                          AI Generated:
                        </Label>
                        <div className="col-span-3">
                          <Badge variant="outline" className="text-blue-600">
                            �� Quản trị AI
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "lessons" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Danh sách bài giảng
                      </h3>
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => setIsAddLessonDialogOpen(true)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        Thêm bài giảng
                      </Button>
                    </div>

                    {selectedCourse.lessons &&
                    selectedCourse.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.lessons
                          .sort((a, b) => a.order - b.order)
                          .map((lesson, index) => (
                            <Card key={lesson.id} className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">
                                      #{lesson.order}
                                    </span>
                                    {getLessonTypeIcon(lesson.type)}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                      {lesson.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {lesson.description}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock className="h-3 w-3" />
                                        {lesson.duration}
                                      </div>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {lesson.type}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {lesson.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-gray-300" />
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem
                                        onClick={() => handleEditLesson(lesson)}
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Chỉnh sửa
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() =>
                                          handleDeleteLesson(lesson.id)
                                        }
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Xóa
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Chưa có bài giảng nào</p>
                        <Button
                          className="mt-4 gap-2"
                          onClick={() => setIsAddLessonDialogOpen(true)}
                        >
                          <PlusCircle className="h-4 w-4" />
                          Thêm bài giảng đầu tiên
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "exercises" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Danh sách bài tập
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0"
                          onClick={() => setIsAssignDialogOpen(true)}
                        >
                          <Link className="h-4 w-4" />
                          Gán từ kho
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                          onClick={() => setIsAIDialogOpen(true)}
                        >
                          <Bot className="h-4 w-4" />
                          AI Tạo bài tập
                        </Button>
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => setIsAddExerciseDialogOpen(true)}
                        >
                          <PlusCircle className="h-4 w-4" />
                          Thêm bài tập
                        </Button>
                      </div>
                    </div>

                    {selectedCourse.exercises &&
                    selectedCourse.exercises.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.exercises.map((exercise) => (
                          <Card key={exercise.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="flex items-center gap-2">
                                  {getExerciseTypeIcon(exercise.type)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">
                                    {exercise.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {exercise.description}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <Badge
                                      variant={
                                        exercise.difficulty === "Dễ"
                                          ? "default"
                                          : exercise.difficulty === "Trung bình"
                                            ? "secondary"
                                            : "destructive"
                                      }
                                      className="text-xs"
                                    >
                                      {exercise.difficulty}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                      <Award className="h-3 w-3" />
                                      {exercise.points} điểm
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {exercise.type}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => handleEditExercise(exercise)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                      handleDeleteExercise(exercise.id)
                                    }
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Edit className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Chưa có bài tập nào</p>
                        <Button
                          className="mt-4 gap-2"
                          onClick={() => setIsAddExerciseDialogOpen(true)}
                        >
                          <PlusCircle className="h-4 w-4" />
                          Thêm bài tập đầu tiên
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Đóng
              </Button>
              {activeTab !== "info" && (
                <Button
                  className="gap-2"
                  onClick={() => {
                    if (activeTab === "lessons") {
                      setIsAddLessonDialogOpen(true);
                    } else if (activeTab === "exercises") {
                      setIsAddExerciseDialogOpen(true);
                    }
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Chỉnh sửa nội dung
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit className="h-5 w-5 text-orange-600" />
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
                  <Label
                    htmlFor="editSubject"
                    className="text-right col-span-2"
                  >
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
                  <Label
                    htmlFor="editDuration"
                    className="text-right col-span-2"
                  >
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
                  <Label
                    htmlFor="editAgeGroup"
                    className="text-right col-span-2"
                  >
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
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Cập nhật khóa học
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Lesson Dialog */}
        <Dialog
          open={isEditLessonDialogOpen}
          onOpenChange={setIsEditLessonDialogOpen}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Chỉnh sửa bài giảng
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Cập nhật thông tin và nội dung bài giảng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lessonTitle" className="text-right">
                  Tiêu đề *
                </Label>
                <Input
                  id="lessonTitle"
                  value={editLesson.title || ""}
                  onChange={(e) =>
                    setEditLesson({ ...editLesson, title: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="VD: Số từ 1 đến 10"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lessonDesc" className="text-right">
                  Mô tả *
                </Label>
                <Textarea
                  id="lessonDesc"
                  value={editLesson.description || ""}
                  onChange={(e) =>
                    setEditLesson({
                      ...editLesson,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  rows={3}
                  placeholder="Mô tả n��i dung bài giảng..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="lessonType">Loại bài *</Label>
                  <Select
                    value={editLesson.type || ""}
                    onValueChange={(value) =>
                      setEditLesson({ ...editLesson, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="reading">Bài đọc</SelectItem>
                      <SelectItem value="interactive">Tương tác</SelectItem>
                      <SelectItem value="game">Trò chơi</SelectItem>
                      <SelectItem value="song">Bài hát</SelectItem>
                      <SelectItem value="exercise">Bài tập</SelectItem>
                      <SelectItem value="observation">Quan sát</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="lessonDuration">Thời lượng *</Label>
                  <Input
                    id="lessonDuration"
                    value={editLesson.duration || ""}
                    onChange={(e) =>
                      setEditLesson({ ...editLesson, duration: e.target.value })
                    }
                    placeholder="VD: 15 phút"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lessonOrder" className="text-right">
                  Thứ tự *
                </Label>
                <Input
                  id="lessonOrder"
                  type="number"
                  value={editLesson.order || ""}
                  onChange={(e) =>
                    setEditLesson({
                      ...editLesson,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                  placeholder="1, 2, 3..."
                  min="1"
                />
              </div>

              {/* Content fields based on lesson type */}
              {editLesson.type === "video" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="videoUrl" className="text-right">
                    <Video className="inline h-4 w-4 mr-1" />
                    Link Video *
                  </Label>
                  <Input
                    id="videoUrl"
                    value={editLesson.videoUrl || ""}
                    onChange={(e) =>
                      setEditLesson({ ...editLesson, videoUrl: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}

              {editLesson.type === "game" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gameUrl" className="text-right">
                    <GamepadIcon className="inline h-4 w-4 mr-1" />
                    Link Game *
                  </Label>
                  <Input
                    id="gameUrl"
                    value={editLesson.gameUrl || ""}
                    onChange={(e) =>
                      setEditLesson({ ...editLesson, gameUrl: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="https://mathgames.com/..."
                  />
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lessonContent" className="text-right">
                  <FileText className="inline h-4 w-4 mr-1" />
                  Nội dung bài giảng
                </Label>
                <Textarea
                  id="lessonContent"
                  value={editLesson.content || ""}
                  onChange={(e) =>
                    setEditLesson({ ...editLesson, content: e.target.value })
                  }
                  className="col-span-3"
                  rows={4}
                  placeholder="Nội dung chi tiết, hướng dẫn, ghi chú..."
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lessonMaterials" className="text-right">
                  <Upload className="inline h-4 w-4 mr-1" />
                  Tài liệu đính kèm
                </Label>
                <div className="col-span-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Kéo thả file hoặc click để chọn
                    </p>
                    <Button variant="outline" size="sm">
                      Chọn file
                    </Button>
                    {editLesson.materials &&
                      editLesson.materials.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {editLesson.materials.map(
                            (file: string, index: number) => (
                              <div
                                key={index}
                                className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded"
                              >
                                {file}
                              </div>
                            ),
                          )}
                        </div>
                      )}
                  </div>
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
                    onClick={() => setIsEditLessonDialogOpen(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleUpdateLesson}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Cập nhật bài giảng
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Exercise Dialog */}
        <Dialog
          open={isEditExerciseDialogOpen}
          onOpenChange={setIsEditExerciseDialogOpen}
        >
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Chỉnh sửa bài tập
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Cập nhật thông tin và nội dung bài tập
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exerciseTitle" className="text-right">
                  Tiêu đề *
                </Label>
                <Input
                  id="exerciseTitle"
                  value={editExercise.title || ""}
                  onChange={(e) =>
                    setEditExercise({ ...editExercise, title: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="VD: Bài tập đếm số"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exerciseDesc" className="text-right">
                  Mô tả *
                </Label>
                <Textarea
                  id="exerciseDesc"
                  value={editExercise.description || ""}
                  onChange={(e) =>
                    setEditExercise({
                      ...editExercise,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  rows={3}
                  placeholder="Mô tả nội dung bài t��p..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="exerciseType">Loại bài *</Label>
                  <Select
                    value={editExercise.type || ""}
                    onValueChange={(value) =>
                      setEditExercise({ ...editExercise, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lo���i" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="practice">Thực hành</SelectItem>
                      <SelectItem value="game">Trò chơi</SelectItem>
                      <SelectItem value="experiment">Thí nghiệm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="exerciseDifficulty">Độ khó *</Label>
                  <Select
                    value={editExercise.difficulty || ""}
                    onValueChange={(value) =>
                      setEditExercise({ ...editExercise, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ch���n độ khó" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dễ">Dễ</SelectItem>
                      <SelectItem value="Trung bình">Trung bình</SelectItem>
                      <SelectItem value="Khó">Khó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="exercisePoints">Điểm số *</Label>
                  <Input
                    id="exercisePoints"
                    type="number"
                    value={editExercise.points || ""}
                    onChange={(e) =>
                      setEditExercise({
                        ...editExercise,
                        points: parseInt(e.target.value),
                      })
                    }
                    placeholder="10, 15, 20..."
                    min="1"
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                  <Label htmlFor="timeLimit">Thời gian (giây)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={editExercise.timeLimit || ""}
                    onChange={(e) =>
                      setEditExercise({
                        ...editExercise,
                        timeLimit: parseInt(e.target.value),
                      })
                    }
                    placeholder="300, 600..."
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructions" className="text-right">
                  Hướng dẫn *
                </Label>
                <Textarea
                  id="instructions"
                  value={editExercise.instructions || ""}
                  onChange={(e) =>
                    setEditExercise({
                      ...editExercise,
                      instructions: e.target.value,
                    })
                  }
                  className="col-span-3"
                  rows={2}
                  placeholder="Hướng dẫn làm bài cho học sinh..."
                />
              </div>

              {editExercise.type === "quiz" && (
                <div className="col-span-4">
                  <Label className="text-sm font-medium">Câu hỏi Quiz</Label>
                  <div className="mt-2 space-y-3 border rounded-lg p-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Câu hỏi:</Label>
                      <Input
                        placeholder="Nhập câu hỏi..."
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Tùy chọn A:</Label>
                      <Input placeholder="Tùy chọn A" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Tùy chọn B:</Label>
                      <Input placeholder="Tùy chọn B" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Tùy chọn C:</Label>
                      <Input placeholder="T��y chọn C" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Đáp án đúng:</Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Chọn đáp án đúng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Tùy chọn A</SelectItem>
                          <SelectItem value="B">Tùy chọn B</SelectItem>
                          <SelectItem value="C">Tùy chọn C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Hình ảnh:</Label>
                      <div className="col-span-3">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Image className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">
                            Tải lên hình ảnh (nếu có)
                          </p>
                          <Button variant="outline" size="sm" className="mt-1">
                            Chọn ảnh
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(editExercise.type === "practice" ||
                editExercise.type === "experiment") && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="exerciseContent" className="text-right">
                    Nội dung bài tập *
                  </Label>
                  <Textarea
                    id="exerciseContent"
                    value={editExercise.content || ""}
                    onChange={(e) =>
                      setEditExercise({
                        ...editExercise,
                        content: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={5}
                    placeholder="Nhập đề bài, câu hỏi, yêu cầu..."
                  />
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="submissionType" className="text-right">
                  Kiểu nộp bài
                </Label>
                <Select
                  value={editExercise.submissionType || "text"}
                  onValueChange={(value) =>
                    setEditExercise({ ...editExercise, submissionType: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn kiểu nộp bài" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Nhập văn bản</SelectItem>
                    <SelectItem value="file">Tải lên file</SelectItem>
                    <SelectItem value="image">Tải lên hình ảnh</SelectItem>
                    <SelectItem value="audio">Ghi âm âm thanh</SelectItem>
                  </SelectContent>
                </Select>
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
                    onClick={() => setIsEditExerciseDialogOpen(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleUpdateExercise}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Cập nhật bài tập
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Lesson Dialog */}
        <Dialog
          open={isAddLessonDialogOpen}
          onOpenChange={setIsAddLessonDialogOpen}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Thêm bài giảng mới
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Tạo bài giảng mới cho khóa học này
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-6">
              <div className="bg-blue-50 rounded-lg p-5 space-y-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Thông tin bài giảng
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="newLessonTitle"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tiêu đề bài giảng *
                    </Label>
                    <Input
                      id="newLessonTitle"
                      value={newLesson.title || ""}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, title: e.target.value })
                      }
                      placeholder="VD: Số từ 1 đến 10"
                      className="w-full bg-white border-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="newLessonDesc"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mô tả bài giảng *
                    </Label>
                    <Textarea
                      id="newLessonDesc"
                      value={newLesson.description || ""}
                      onChange={(e) =>
                        setNewLesson({
                          ...newLesson,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Mô tả nội dung và mục tiêu bài giảng..."
                      className="w-full resize-none bg-white border-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="newLessonType"
                        className="text-sm font-medium text-gray-700"
                      >
                        Loại bài giảng *
                      </Label>
                      <Select
                        value={newLesson.type || ""}
                        onValueChange={(value) =>
                          setNewLesson({ ...newLesson, type: value })
                        }
                      >
                        <SelectTrigger className="w-full bg-white border-blue-200">
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4 text-red-500" />
                              Video
                            </div>
                          </SelectItem>
                          <SelectItem value="reading">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-green-500" />
                              Bài đọc
                            </div>
                          </SelectItem>
                          <SelectItem value="interactive">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-orange-500" />
                              Tương tác
                            </div>
                          </SelectItem>
                          <SelectItem value="game">
                            <div className="flex items-center gap-2">
                              <GamepadIcon className="h-4 w-4 text-purple-500" />
                              Trò chơi
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newLessonDuration"
                        className="text-sm font-medium text-gray-700"
                      >
                        Thời lượng *
                      </Label>
                      <Input
                        id="newLessonDuration"
                        value={newLesson.duration || ""}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            duration: e.target.value,
                          })
                        }
                        placeholder="VD: 15 phút"
                        className="w-full bg-white border-blue-200 focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newLessonOrder"
                        className="text-sm font-medium text-gray-700"
                      >
                        Thứ tự
                      </Label>
                      <Input
                        id="newLessonOrder"
                        type="number"
                        value={newLesson.order || ""}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            order: parseInt(e.target.value),
                          })
                        }
                        placeholder="1, 2, 3..."
                        min="1"
                        className="w-full bg-white border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 rounded-b-lg border-t border-gray-200">
              <div className="flex items-center justify-between w-full">
                <div className="text-xs text-gray-500">
                  * Các trường b��t buộc
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddLessonDialogOpen(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleAddLesson}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài giảng
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* AI Exercise Dialog */}
        <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI Tạo bài tập cho khóa học
              </DialogTitle>
              <DialogDescription>
                Mô tả yêu cầu và AI sẽ t��o bài tập phù hợp cho khóa học này
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
                    placeholder="Ví dụ: Tạo 5 câu hỏi trắc nghiệm về phép cộng trong phạm vi 100, phù hợp với khóa học này..."
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
        </Dialog>

        {/* Add Exercise Dialog */}
        <Dialog
          open={isAddExerciseDialogOpen}
          onOpenChange={setIsAddExerciseDialogOpen}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Thêm bài tập mới
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Tạo bài tập mới cho khóa học này
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-6">
              <div className="bg-green-50 rounded-lg p-5 space-y-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Thông tin bài tập
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="newExerciseTitle"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tiêu đề bài tập *
                    </Label>
                    <Input
                      id="newExerciseTitle"
                      value={newExercise.title || ""}
                      onChange={(e) =>
                        setNewExercise({
                          ...newExercise,
                          title: e.target.value,
                        })
                      }
                      placeholder="VD: Bài tập đếm số"
                      className="w-full bg-white border-green-200 focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="newExerciseDesc"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mô tả bài tập *
                    </Label>
                    <Textarea
                      id="newExerciseDesc"
                      value={newExercise.description || ""}
                      onChange={(e) =>
                        setNewExercise({
                          ...newExercise,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Mô tả mục tiêu và nội dung bài tập..."
                      className="w-full resize-none bg-white border-green-200 focus:border-green-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="newExerciseType"
                        className="text-sm font-medium text-gray-700"
                      >
                        Loại bài tập *
                      </Label>
                      <Select
                        value={newExercise.type || ""}
                        onValueChange={(value) =>
                          setNewExercise({ ...newExercise, type: value })
                        }
                      >
                        <SelectTrigger className="w-full bg-white border-green-200">
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiz">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              Quiz
                            </div>
                          </SelectItem>
                          <SelectItem value="practice">
                            <div className="flex items-center gap-2">
                              <Edit className="h-4 w-4 text-green-500" />
                              Thực hành
                            </div>
                          </SelectItem>
                          <SelectItem value="game">
                            <div className="flex items-center gap-2">
                              <GamepadIcon className="h-4 w-4 text-purple-500" />
                              Trò chơi
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newExerciseDifficulty"
                        className="text-sm font-medium text-gray-700"
                      >
                        Độ khó *
                      </Label>
                      <Select
                        value={newExercise.difficulty || ""}
                        onValueChange={(value) =>
                          setNewExercise({ ...newExercise, difficulty: value })
                        }
                      >
                        <SelectTrigger className="w-full bg-white border-green-200">
                          <SelectValue placeholder="Chọn độ khó" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dễ">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              Dễ
                            </div>
                          </SelectItem>
                          <SelectItem value="Trung bình">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              Trung bình
                            </div>
                          </SelectItem>
                          <SelectItem value="Khó">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              Khó
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="newExercisePoints"
                        className="text-sm font-medium text-gray-700"
                      >
                        Điểm thưởng *
                      </Label>
                      <Input
                        id="newExercisePoints"
                        type="number"
                        value={newExercise.points || ""}
                        onChange={(e) =>
                          setNewExercise({
                            ...newExercise,
                            points: parseInt(e.target.value),
                          })
                        }
                        placeholder="10, 15, 20..."
                        min="1"
                        className="w-full bg-white border-green-200 focus:border-green-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newExerciseTime"
                        className="text-sm font-medium text-gray-700"
                      >
                        Thời gian (phút)
                      </Label>
                      <Input
                        id="newExerciseTime"
                        type="number"
                        value={Math.round((newExercise.timeLimit || 0) / 60)}
                        onChange={(e) =>
                          setNewExercise({
                            ...newExercise,
                            timeLimit: parseInt(e.target.value) * 60,
                          })
                        }
                        placeholder="5, 10, 15..."
                        min="0"
                        className="w-full bg-white border-green-200 focus:border-green-400"
                      />
                    </div>
                  </div>
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
                    onClick={() => setIsAddExerciseDialogOpen(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleAddExercise}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    T���o bài tập
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
