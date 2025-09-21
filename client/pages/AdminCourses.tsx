import React, { useState } from "react";
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
  MoreHorizontal,
  Users,
  TrendingUp,
  Filter,
  BookOpen,
  Play,
  FileText,
  GamepadIcon,
  Headphones,
  Eye,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Check,
  X,
  List,
  Star,
  Building2,
  Calendar,
  User,
} from "lucide-react";

// Mock course data with approval status
const mockCourses = [
  {
    id: 1,
    name: "Toán học cơ bản",
    description:
      "Môn học toán học dành cho học sinh tiểu học, bao gồm các phép tính cơ bản và hình học đơn giản.",
    image: "/placeholder.svg",
    subject: "Toán",
    difficulty: "Cơ bản",
    duration: "8 tuần",
    ageGroup: "6-8 tuổi",
    studentsCount: 120,
    completionRate: 85,
    status: "approved",
    createdAt: "2024-01-15",
    createdBy: "Giáo viên Nguyễn Thị Lan",
    lastModified: "2024-02-20",
    approvedAt: "2024-01-20",
    approvedBy: "Admin Trần Văn Nam",
    lessons: [
      {
        id: 1,
        title: "Số từ 1 đến 10",
        description: "Học cách đếm và nhận biết các số từ 1 đến 10",
        type: "video",
        duration: "15 phút",
        status: "approved",
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Bài tập đếm số",
        description: "Đếm các vật thể trong hình",
        type: "quiz",
        difficulty: "Dễ",
        status: "approved",
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
    status: "approved",
    createdAt: "2024-01-20",
    createdBy: "Giáo viên Phạm Thị Hoa",
    lastModified: "2024-02-15",
    approvedAt: "2024-01-25",
    approvedBy: "Admin Trần Văn Nam",
    lessons: [
      {
        id: 1,
        title: "Bài thơ: Con gà trống",
        description: "Học thuộc và hiểu nghĩa bài thơ Con gà trống",
        type: "reading",
        duration: "30 phút",
        status: "approved",
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Trả lời câu hỏi về bài thơ",
        description: "Câu hỏi về nội dung và ý nghĩa bài thơ",
        type: "quiz",
        difficulty: "Trung bình",
        status: "approved",
      },
    ],
  },
];

// Mock pending content awaiting approval
const mockPendingContent = [
  {
    id: "course_3",
    type: "course",
    action: "create",
    title: "Tiếng Anh cơ bản",
    description: "Môn học tiếng Anh cho trẻ em từ 5-7 tuổi",
    subject: "Anh",
    difficulty: "Cơ bản",
    duration: "10 tuần",
    ageGroup: "5-7 tuổi",
    submittedAt: "2024-03-01",
    submittedBy: "Giáo viên Lê Thị Mai",
    status: "pending",
    details: {
      name: "Tiếng Anh cơ bản",
      description:
        "Môn học tiếng Anh cho trẻ em từ 5-7 tuổi với các hoạt động vui nhộn",
      objectives: "Giúp trẻ em làm quen với tiếng Anh cơ bản",
      prerequisites: "Không yêu c��u kiến thức trước",
    },
  },
  {
    id: "lesson_4",
    type: "lesson",
    action: "create",
    title: "Bài học: Phép trừ đơn giản",
    description: "Bài học về phép trừ trong môn học Toán học cơ bản",
    courseId: 1,
    courseName: "Toán học cơ bản",
    submittedAt: "2024-03-02",
    submittedBy: "Giáo viên Nguyễn Thị Lan",
    status: "pending",
    details: {
      title: "Phép trừ đơn giản",
      description: "Học cách thực hiện phép trừ với các số nhỏ hơn 10",
      type: "interactive",
      duration: "20 phút",
      content: "Nội dung bài học về phép trừ...",
    },
  },
  {
    id: "exercise_5",
    type: "exercise",
    action: "update",
    title: "Cập nhật bài tập: Bài tập đếm số",
    description: "Chỉnh sửa câu hỏi trong bài tập đếm số",
    courseId: 1,
    courseName: "Toán học cơ bản",
    submittedAt: "2024-03-03",
    submittedBy: "Giáo viên Nguyễn Thị Lan",
    status: "pending",
    details: {
      title: "Bài tập đếm số (đã cập nhật)",
      description: "Đếm các vật thể trong hình với câu hỏi mới",
      type: "quiz",
      difficulty: "Dễ",
      changes: "Thêm 3 câu hỏi mới và cập nhật hình ảnh",
    },
  },
  {
    id: "course_4",
    type: "course",
    action: "delete",
    title: "Xóa môn học: Khoa học tự nhiên",
    description: "Yêu cầu xóa môn học không còn phù hợp",
    submittedAt: "2024-03-04",
    submittedBy: "Giáo viên Trần Văn Dũng",
    status: "pending",
    details: {
      reason: "Môn học không còn phù hợp với chương trình mới",
      affectedStudents: 25,
      alternativeCourse: "Khoa học vui nhộn",
    },
  },
  // Demo placeholder item (realistic sample) for admin preview
  {
    id: "lesson_demo",
    type: "lesson",
    action: "create",
    title: "Bài học: Từ vựng và phát âm cơ bản",
    description: "Bài học giới thiệu từ vựng cơ bản và luyện phát âm dành cho trẻ 5-7 tu��i",
    courseId: 999,
    courseName: "English Basics",
    submittedAt: new Date().toISOString(),
    submittedBy: "Giáo viên Nguyễn Văn A",
    status: "pending",
    details: {
      title: "Từ vựng: Gia đình và màu sắc",
      description: "Giới thiệu từ vựng về gia đình và màu sắc, kèm hoạt động lặp lại và bài tập ngắn.",
      type: "video",
      duration: "8 phút",
      content: "Nội dung bài học gồm phần mở đầu, hướng dẫn phát âm, và hoạt động tương tác để củng cố từ vựng.",
      textBlocks: [
        "Mở đầu: Chào mừng các em đến với bài học tiếng Anh cơ bản.",
        "Phần chính: Học từ vựng về gia đình (father, mother, sister, brother) và các màu sắc (red, blue, green).",
      ],
      media: [
        {
          type: "video",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          description: "Video hướng dẫn phát âm",
        },
      ],
      questions: [
        {
          id: "q1",
          text: "Từ tiếng Anh cho 'mẹ' là gì?",
          options: ["father", "mother", "sister", "brother"],
          correctIndex: 1,
          marker: "00:30",
        },
        {
          id: "q2",
          text: "Màu nào tương ứng với 'blue'?",
          options: ["Đỏ", "Xanh", "Vàng", "Trắng"],
          correctIndex: 1,
          marker: "01:15",
        },
      ],
      exercises: [
        {
          id: "ex1",
          question: "Viết từ 'mother' và dịch sang tiếng Việt.",
          answer: "mother - mẹ",
        },
      ],
    },
  },
];

const subjects = ["Tất cả", "Toán", "Văn", "Anh"];
const grades = ["Tất cả", "Khối 1", "Khối 2", "Khối 3", "Khối 4", "Khối 5"];
const getCourseGrade = (course: (typeof mockCourses)[0]) => {
  const m = course.name.match(/lớp\s*(\d+)/i);
  if (m) {
    const num = Math.min(5, Math.max(1, Number(m[1])));
    return `Khối ${num}`;
  }
  return "Tất cả";
};

export default function AdminCourses() {
  const [courses] = useState(mockCourses);
  const [pendingContent, setPendingContent] = useState(mockPendingContent);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [gradeFilter, setGradeFilter] = useState("Tất cả");
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof mockCourses)[0] | null
  >(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [selectedPendingItem, setSelectedPendingItem] = useState<any>(null);
  const [approvalComment, setApprovalComment] = useState("");
  const [activeTab, setActiveTab] = useState<"courses" | "approval">("courses");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "Tất cả" || course.subject === subjectFilter;
    const matchesGrade =
      gradeFilter === "Tất cả" || getCourseGrade(course) === gradeFilter;
    return matchesSearch && matchesSubject && matchesGrade;
  });

  const pendingCounts = {
    courses: pendingContent.filter((item) => item.type === "course").length,
    lessons: pendingContent.filter((item) => item.type === "lesson").length,
    exercises: pendingContent.filter((item) => item.type === "exercise").length,
    total: pendingContent.length,
  };

  const handleViewCourse = (course: (typeof mockCourses)[0]) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  };

  const handleApproval = (item: any, approved: boolean) => {
    const updatedPending = pendingContent.filter((p) => p.id !== item.id);
    setPendingContent(updatedPending);

    // In a real app, this would make an API call to approve/reject the content
    console.log(
      `${approved ? "Approved" : "Rejected"} ${item.type}: ${item.title}`,
    );
    if (approvalComment) {
      console.log(`Comment: ${approvalComment}`);
    }

    setSelectedPendingItem(null);
    setApprovalComment("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "create":
        return "Tạo mới";
      case "update":
        return "Chỉnh sửa";
      case "delete":
        return "Xóa";
      default:
        return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-blue-100 text-blue-800";
      case "update":
        return "bg-orange-100 text-orange-800";
      case "delete":
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
        return <FileText className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Quản lý môn học
            </h1>
            <p className="text-gray-600 mt-1">
              Xem và phê duyệt nội dung môn học, bài giảng và bài tập
            </p>
          </div>

          <div className="flex gap-3">
            <Dialog
              open={isApprovalDialogOpen}
              onOpenChange={setIsApprovalDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Phê duyệt nội dung
                  {pendingCounts.total > 0 && (
                    <Badge className="ml-2 bg-white text-green-600">
                      {pendingCounts.total}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b border-gray-200">
                  <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Phê duyệt nội dung
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Xem và phê duyệt các nội dung mới, chỉnh sửa hoặc xóa đang
                    chờ duyệt
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  {/* Pending Content List */}
                  <div className="space-y-4">
                    {pendingContent.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Không có nội dung nào chờ phê duyệt</p>
                      </div>
                    ) : (
                      pendingContent.map((item) => (
                        <Card
                          key={item.id}
                          className="border border-yellow-200 bg-yellow-50"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge
                                    className={getActionColor(item.action)}
                                  >
                                    {getActionText(item.action)}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    {item.type === "course"
                                      ? "Môn học"
                                      : item.type === "lesson"
                                        ? "Bài giảng"
                                        : "Bài tập"}
                                  </Badge>
                                  {item.courseName && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {item.courseName}
                                    </Badge>
                                  )}
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {item.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {item.submittedBy}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(
                                      item.submittedAt,
                                    ).toLocaleDateString("vi-VN")}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedPendingItem(item)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Xem chi tiết
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproval(item, true)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Chấp nhận
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproval(item, false)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Từ chối
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm môn học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Chọn khối" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Chọn môn" />
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
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(course.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(course.status)}
                      Đã duyệt
                    </div>
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-none tracking-tight">
                      {course.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{course.subject}</Badge>
                      <Badge variant="secondary">{course.difficulty}</Badge>
                    </div>
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
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Độ tuổi:</span>
                    <span>{course.ageGroup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Thời lượng:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Học sinh:</span>
                    <span>{course.studentsCount}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hoàn thành:</span>
                      <span
                        className={getCompletionColor(course.completionRate)}
                      >
                        {course.completionRate}%
                      </span>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <div className="flex items-center justify-between w-full">
                  <span>
                    Tạo:{" "}
                    {new Date(course.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <span>Bởi: {course.createdBy}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View Course Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
            {selectedCourse && (
              <>
                <DialogHeader className="pb-4 border-b border-gray-200">
                  <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    {selectedCourse.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Chi tiết môn học đã được phê duyệt
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Thông tin</TabsTrigger>
                    <TabsTrigger value="lessons">
                      Bài giảng ({selectedCourse.lessons?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="exercises">
                      Bài tập ({selectedCourse.exercises?.length || 0})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Môn học
                        </Label>
                        <p className="text-sm">{selectedCourse.subject}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Độ khó
                        </Label>
                        <p className="text-sm">{selectedCourse.difficulty}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Thời lượng
                        </Label>
                        <p className="text-sm">{selectedCourse.duration}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Độ tuổi
                        </Label>
                        <p className="text-sm">{selectedCourse.ageGroup}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Tạo bởi
                        </Label>
                        <p className="text-sm">{selectedCourse.createdBy}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          Phê duyệt bởi
                        </Label>
                        <p className="text-sm">{selectedCourse.approvedBy}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Mô tả
                      </Label>
                      <p className="text-sm mt-1">
                        {selectedCourse.description}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="lessons" className="space-y-4">
                    {selectedCourse.lessons &&
                    selectedCourse.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.lessons.map((lesson, index) => (
                          <Card key={lesson.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {getLessonTypeIcon(lesson.type)}
                                  <div>
                                    <h4 className="font-medium">
                                      {lesson.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {lesson.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {lesson.duration}
                                      </Badge>
                                      <Badge
                                        className={getStatusColor(
                                          lesson.status,
                                        )}
                                      >
                                        Đã duyệt
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Chưa có bài giảng nào</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="exercises" className="space-y-4">
                    {selectedCourse.exercises &&
                    selectedCourse.exercises.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.exercises.map((exercise, index) => (
                          <Card key={exercise.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-blue-500" />
                                  <div>
                                    <h4 className="font-medium">
                                      {exercise.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {exercise.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {exercise.type}
                                      </Badge>
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {exercise.difficulty}
                                      </Badge>
                                      <Badge
                                        className={getStatusColor(
                                          exercise.status,
                                        )}
                                      >
                                        Đã duyệt
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Chưa có bài tập nào</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Pending Item Detail Dialog */}
        <Dialog
          open={!!selectedPendingItem}
          onOpenChange={() => setSelectedPendingItem(null)}
        >
          <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
            {selectedPendingItem && (
              <>
                <DialogHeader className="pb-4 border-b border-gray-200">
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Chi tiết yêu cầu{" "}
                    {getActionText(selectedPendingItem.action).toLowerCase()}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    {selectedPendingItem.title}
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-500">Loại</Label>
                        <div className="mt-1 font-medium">
                          {selectedPendingItem.type === "course"
                            ? "Môn học"
                            : selectedPendingItem.type === "lesson"
                              ? "Bài giảng"
                              : "Bài tập"}
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-500">Người gửi</Label>
                        <div className="mt-1">{selectedPendingItem.submittedBy}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-500">Hành động</Label>
                        <div className="mt-1">
                          <Badge className={getActionColor(selectedPendingItem.action)}>
                            {getActionText(selectedPendingItem.action)}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-500">Ngày gửi</Label>
                        <div className="mt-1">
                          {new Date(selectedPendingItem.submittedAt).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200"></div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">Mô tả</Label>
                    <p className="text-sm mt-1 text-gray-700">{selectedPendingItem.description}</p>
                  </div>

                  {selectedPendingItem.details && (
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm font-semibold mb-3">Chi tiết</h4>

                      {/* If lesson: show title and duration above text blocks */}
                      {selectedPendingItem.type === "lesson" && (
                        <div className="mb-3">
                          <Label className="text-xs text-gray-500">Tiêu đề</Label>
                          <p className="mt-1 font-medium">{selectedPendingItem.details?.title}</p>
                          {selectedPendingItem.details?.duration && (
                            <div className="mt-2">
                              <Label className="text-xs text-gray-500">Thời lượng</Label>
                              <p className="mt-1">{selectedPendingItem.details?.duration}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show free text blocks if present */}
                      {selectedPendingItem.details?.textBlocks && (
                        <div className="mb-3">
                          <Label className="text-xs text-gray-500">Nội dung văn bản</Label>
                          <div className="mt-2 space-y-2 text-sm text-gray-700">
                            {selectedPendingItem.details.textBlocks.map((tb: string, i: number) => (
                              <p key={i} className="whitespace-pre-wrap">{tb}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Media items: video, audio, image, pdf */}
                      {selectedPendingItem.details?.media && selectedPendingItem.details.media.length > 0 && (
                        <div className="mb-3">
                          <Label className="text-xs text-gray-500">Tư liệu đa phương tiện</Label>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedPendingItem.details.media.map((m: any, mi: number) => (
                              <div key={mi} className="p-2 border rounded flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate">{m.type.toUpperCase()}</div>
                                  <div className="text-xs text-muted-foreground truncate">{m.description}</div>
                                </div>
                                <div className="ml-3 flex-shrink-0">
                                  {m.type === 'image' ? (
                                    <img src={m.url} alt={m.description || 'image'} className="h-20 w-28 object-cover rounded" />
                                  ) : m.type === 'pdf' ? (
                                    <div className="flex flex-col items-end">
                                      <iframe src={m.url} title={m.description || 'pdf'} className="h-40 w-64 border rounded" />
                                      <a href={m.url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm mt-1">Mở PDF</a>
                                    </div>
                                  ) : m.type === 'audio' ? (
                                    <audio controls src={m.url} className="h-10" />
                                  ) : m.type === 'video' ? (
                                    <video controls src={m.url} className="h-28 w-40 object-contain rounded" />
                                  ) : (
                                    <a href={m.url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">Mở liên kết</a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lesson details */}
                      {selectedPendingItem.type === "lesson" && (
                        <div className="mb-3">
                          {selectedPendingItem.details?.content && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Nội dung</Label>
                              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{selectedPendingItem.details?.content}</p>
                            </div>
                          )}

                          {/* Quiz questions embedded in the lesson */}
                          {selectedPendingItem.details?.questions && selectedPendingItem.details.questions.length > 0 && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Quiz</Label>
                              <div className="mt-2 space-y-2">
                                {selectedPendingItem.details.questions.map((q: any, qi: number) => (
                                  <div key={q.id || qi} className="p-2 border rounded bg-gray-50">
                                    <div className="font-medium">Câu {qi + 1}: {q.text}</div>
                                    {q.marker && <div className="text-xs text-muted-foreground">Mốc: {q.marker}</div>}
                                    <div className="mt-1 text-sm">
                                      {q.options?.map((opt: string, oi: number) => (
                                        <div key={oi} className={q.correctIndex === oi ? 'font-semibold text-green-700' : 'text-sm text-muted-foreground'}>
                                          {String.fromCharCode(65 + oi)}. {opt}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exercises embedded in the lesson */}
                          {selectedPendingItem.details?.exercises && selectedPendingItem.details.exercises.length > 0 && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Bài tập</Label>
                              <div className="mt-2 space-y-2">
                                {selectedPendingItem.details.exercises.map((ex: any, ei: number) => (
                                  <div key={ex.id || ei} className="p-2 border rounded bg-gray-50">
                                    <div className="font-medium">{ex.question || ex.title}</div>
                                    {ex.options ? (
                                      <div className="mt-1 text-sm">
                                        {ex.options.map((opt: string, oi: number) => (
                                          <div key={oi} className={ex.correctIndex === oi ? 'font-semibold text-green-700' : 'text-sm text-muted-foreground'}>
                                            {String.fromCharCode(65 + oi)}. {opt}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="mt-1 text-sm text-muted-foreground">Đáp án: {ex.answer || ex.solution}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Exercise or update details standalone */}
                      {selectedPendingItem.type === "exercise" && (
                        <div className="mb-3">
                          <div className="mb-2">
                            <Label className="text-xs text-gray-500">Tiêu đề</Label>
                            <p className="mt-1 font-medium">{selectedPendingItem.details?.title}</p>
                          </div>
                          <div className="mb-2">
                            <Label className="text-xs text-gray-500">Mô tả</Label>
                            <p className="mt-1">{selectedPendingItem.details?.description}</p>
                          </div>

                          {selectedPendingItem.details?.options && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Đáp án (trắc nghiệm)</Label>
                              <div className="mt-1 text-sm">
                                {selectedPendingItem.details.options.map((opt: string, i: number) => (
                                  <div key={i} className={selectedPendingItem.details.correctIndex === i ? 'font-semibold text-green-700' : 'text-sm text-muted-foreground'}>
                                    {String.fromCharCode(65 + i)}. {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedPendingItem.details?.answer && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Đáp án</Label>
                              <p className="mt-1 text-sm text-muted-foreground">{selectedPendingItem.details.answer}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Delete request details */}
                      {selectedPendingItem.action === "delete" && (
                        <div className="mb-3">
                          {selectedPendingItem.details?.reason && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Lý do xóa</Label>
                              <p className="mt-1 whitespace-pre-wrap">{selectedPendingItem.details?.reason}</p>
                            </div>
                          )}
                          {selectedPendingItem.details?.affectedStudents !== undefined && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Số học sinh bị ảnh hưởng</Label>
                              <p className="mt-1">{selectedPendingItem.details?.affectedStudents}</p>
                            </div>
                          )}
                          {selectedPendingItem.details?.alternativeCourse && (
                            <div className="mb-2">
                              <Label className="text-xs text-gray-500">Môn thay thế gợi ý</Label>
                              <p className="mt-1">{selectedPendingItem.details?.alternativeCourse}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fallback: show raw JSON if nothing matched */}
                      {(!["course", "lesson", "exercise"].includes(selectedPendingItem.type) && selectedPendingItem.action !== "delete") && (
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(selectedPendingItem.details, null, 2)}</pre>
                      )}
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-gray-500">Ghi chú phê duyệt (tùy chọn)</Label>
                    <textarea
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                      placeholder="Thêm ghi chú về quyết định phê duyệt..."
                    />
                  </div>
                </div>

                <DialogFooter className="border-t border-gray-200 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPendingItem(null)}
                  >
                    Đóng
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleApproval(selectedPendingItem, false)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Từ chối
                  </Button>
                  <Button
                    onClick={() => handleApproval(selectedPendingItem, true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Chấp nhận
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
