import React, { useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
  BookOpen,
  Play,
  FileText,
  GamepadIcon,
  Eye,
  Clock,
  Calendar,
  Star,
  BarChart3,
  Filter,
  GraduationCap,
  Save,
  X,
} from "lucide-react";

// Mock course data for teacher
const mockTeacherCourses = [
  {
    id: 1,
    name: "Toán học lớp 3",
    description: "Khóa học toán học cơ bản cho học sinh lớp 3, bao gồm các phép tính cơ bản và hình học đơn giản.",
    image: "/placeholder.svg",
    subject: "Toán",
    difficulty: "Cơ bản",
    duration: "8 tuần",
    ageGroup: "8-9 tuổi",
    studentsCount: 25,
    completionRate: 78,
    status: "active",
    createdAt: "2024-02-01",
    lastActivity: "2024-03-10",
    totalLessons: 12,
    completedLessons: 9,
    objectives: "Giúp học sinh nắm vững các phép tính cơ bản và áp dụng vào thực tế",
    prerequisites: "Biết đếm số từ 1 đến 100",
    lessons: [
      {
        id: 1,
        title: "Phép cộng trong phạm vi 20",
        description: "Học cách cộng các số nhỏ hơn 20",
        type: "video",
        duration: "20 phút",
        order: 1,
        completed: true,
      },
      {
        id: 2,
        title: "Phép trừ trong phạm vi 20",
        description: "Học cách trừ các số nhỏ hơn 20",
        type: "interactive",
        duration: "25 phút",
        order: 2,
        completed: false,
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Bài tập phép cộng",
        description: "Luyện tập phép cộng cơ bản",
        type: "quiz",
        difficulty: "Dễ",
        points: 10,
        completed: 15,
        total: 25,
      },
    ],
  },
  {
    id: 2,
    name: "Phép tính nâng cao",
    description: "Bài tập nâng cao cho học sinh giỏi toán",
    image: "/placeholder.svg",
    subject: "Toán",
    difficulty: "Nâng cao",
    duration: "6 tuần",
    ageGroup: "8-10 tuổi",
    studentsCount: 15,
    completionRate: 92,
    status: "active",
    createdAt: "2024-01-15",
    lastActivity: "2024-03-12",
    totalLessons: 8,
    completedLessons: 8,
    objectives: "Phát triển tư duy logic và khả năng giải quyết vấn đề",
    prerequisites: "Đã hoàn thành khóa học toán cơ bản",
    lessons: [],
    exercises: [],
  },
  {
    id: 3,
    name: "Hình học cơ bản",
    description: "Khóa học về hình học cho trẻ em",
    image: "/placeholder.svg",
    subject: "Toán",
    difficulty: "Trung bình",
    duration: "5 tuần",
    ageGroup: "7-9 tuổi",
    studentsCount: 18,
    completionRate: 65,
    status: "draft",
    createdAt: "2024-03-01",
    lastActivity: "2024-03-08",
    totalLessons: 10,
    completedLessons: 6,
    objectives: "Nhận biết và phân biệt các hình học cơ bản",
    prerequisites: "Không yêu cầu kiến thức trước",
    lessons: [],
    exercises: [],
  },
];

const subjects = ["Tất cả", "Toán", "Văn", "Anh", "Khoa học"];
const difficulties = ["Cơ bản", "Trung bình", "Nâng cao"];
const ageGroups = ["6-7 tuổi", "7-8 tuổi", "8-9 tuổi", "9-10 tuổi", "10-12 tuổi"];
const durations = ["4 tuần", "6 tuần", "8 tuần", "10 tuần", "12 tuần"];

export default function TeacherCourses() {
  const [courses, setCourses] = useState(mockTeacherCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof mockTeacherCourses[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "lessons" | "exercises" | "analytics">("info");

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    subject: "",
    difficulty: "",
    duration: "",
    ageGroup: "",
    objectives: "",
    prerequisites: "",
    image: "/placeholder.svg",
  });

  const [editCourse, setEditCourse] = useState({
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
    const matchesStatus =
      statusFilter === "Tất cả" || course.status === statusFilter.toLowerCase();
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.subject) {
      const course = {
        id: Math.max(...courses.map(c => c.id)) + 1,
        ...newCourse,
        studentsCount: 0,
        completionRate: 0,
        status: "draft" as const,
        createdAt: new Date().toISOString().split("T")[0],
        lastActivity: new Date().toISOString().split("T")[0],
        totalLessons: 0,
        completedLessons: 0,
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
        image: "/placeholder.svg",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditCourse = (course: typeof mockTeacherCourses[0]) => {
    setSelectedCourse(course);
    setEditCourse({
      name: course.name,
      description: course.description,
      subject: course.subject,
      difficulty: course.difficulty,
      duration: course.duration,
      ageGroup: course.ageGroup,
      objectives: course.objectives,
      prerequisites: course.prerequisites,
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
              ...editCourse,
              lastActivity: new Date().toISOString().split("T")[0],
            }
          : course
      );
      setCourses(updatedCourses);
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleViewCourse = (course: typeof mockTeacherCourses[0]) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  };

  const toggleCourseStatus = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === 'active' ? 'draft' : 'active' as const }
        : course
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "draft":
        return "Bản nháp";
      case "completed":
        return "Đã hoàn thành";
      default:
        return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Cơ bản":
        return "bg-green-100 text-green-800";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800";
      case "Nâng cao":
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
      case "interactive":
        return <Eye className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              Quản lý khóa học
            </h1>
            <p className="text-gray-600 mt-1">
              Tạo, chỉnh sửa và quản lý các khóa học của bạn
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tạo khóa học mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader className="pb-4 border-b border-gray-200">
                <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  Tạo khóa học mới
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Điền thông tin để tạo khóa học mới cho học sinh của bạn
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="courseName" className="text-right">
                    Tên khóa học *
                  </Label>
                  <Input
                    id="courseName"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="col-span-3"
                    placeholder="VD: Toán học lớp 3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="courseDesc" className="text-right">
                    Mô tả *
                  </Label>
                  <Textarea
                    id="courseDesc"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                    placeholder="Mô tả chi tiết về khóa học..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label className="text-right col-span-2">Môn học *</Label>
                    <Select
                      value={newCourse.subject}
                      onValueChange={(value) => setNewCourse({ ...newCourse, subject: value })}
                    >
                      <SelectTrigger className="col-span-2">
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

                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label className="text-right col-span-2">Độ khó *</Label>
                    <Select
                      value={newCourse.difficulty}
                      onValueChange={(value) => setNewCourse({ ...newCourse, difficulty: value })}
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
                    <Label className="text-right col-span-2">Thời lượng</Label>
                    <Select
                      value={newCourse.duration}
                      onValueChange={(value) => setNewCourse({ ...newCourse, duration: value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Chọn thời lượng" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration} value={duration}>
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label className="text-right col-span-2">Độ tuổi</Label>
                    <Select
                      value={newCourse.ageGroup}
                      onValueChange={(value) => setNewCourse({ ...newCourse, ageGroup: value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Chọn độ tuổi" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((ageGroup) => (
                          <SelectItem key={ageGroup} value={ageGroup}>
                            {ageGroup}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="objectives" className="text-right">
                    Mục tiêu
                  </Label>
                  <Textarea
                    id="objectives"
                    value={newCourse.objectives}
                    onChange={(e) => setNewCourse({ ...newCourse, objectives: e.target.value })}
                    className="col-span-3"
                    rows={2}
                    placeholder="Mục tiêu của khóa học..."
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prerequisites" className="text-right">
                    Yêu cầu trước
                  </Label>
                  <Textarea
                    id="prerequisites"
                    value={newCourse.prerequisites}
                    onChange={(e) => setNewCourse({ ...newCourse, prerequisites: e.target.value })}
                    className="col-span-3"
                    rows={2}
                    placeholder="Kiến thức cần có trước khi học..."
                  />
                </div>
              </div>
              <DialogFooter className="border-t border-gray-200 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleAddCourse}>
                  <Save className="h-4 w-4 mr-2" />
                  Tạo khóa học
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Tổng khóa học</p>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">
                {courses.filter(c => c.status === 'active').length} đang hoạt động
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Tổng học sinh</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses.reduce((sum, course) => sum + course.studentsCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Trong tất cả khóa học
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Tỷ lệ hoàn thành</p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  courses.reduce((sum, course) => sum + course.completionRate, 0) / courses.length
                )}%
              </div>
              <p className="text-xs text-muted-foreground">
                Trung bình
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Bài học</p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses.reduce((sum, course) => sum + course.totalLessons, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Tổng số bài học
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Môn học" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả">Tất cả</SelectItem>
                <SelectItem value="Active">Đang hoạt động</SelectItem>
                <SelectItem value="Draft">Bản nháp</SelectItem>
                <SelectItem value="Completed">Đã hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getStatusColor(course.status)}>
                    {getStatusText(course.status)}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewCourse(course)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleCourseStatus(course.id)}>
                        {course.status === 'active' ? (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Chuyển thành nháp
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Kích hoạt
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-none tracking-tight">
                      {course.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{course.subject}</Badge>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Học sinh:</span>
                    <span className="font-medium">{course.studentsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Bài học:</span>
                    <span className="font-medium">{course.completedLessons}/{course.totalLessons}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hoàn thành:</span>
                      <span className={`font-medium ${getCompletionColor(course.completionRate)}`}>
                        {course.completionRate}%
                      </span>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="text-xs text-muted-foreground">
                <div className="flex items-center justify-between w-full">
                  <span>Tạo: {new Date(course.createdAt).toLocaleDateString('vi-VN')}</span>
                  <span>Cập nhật: {new Date(course.lastActivity).toLocaleDateString('vi-VN')}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Edit Course Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Chỉnh sửa khóa học
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Cập nhật thông tin khóa học
              </DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editCourseName" className="text-right">
                    Tên khóa học *
                  </Label>
                  <Input
                    id="editCourseName"
                    value={editCourse.name}
                    onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editCourseDesc" className="text-right">
                    Mô tả *
                  </Label>
                  <Textarea
                    id="editCourseDesc"
                    value={editCourse.description}
                    onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label className="text-right col-span-2">Môn học *</Label>
                    <Select
                      value={editCourse.subject}
                      onValueChange={(value) => setEditCourse({ ...editCourse, subject: value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue />
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
                    <Label className="text-right col-span-2">Độ khó *</Label>
                    <Select
                      value={editCourse.difficulty}
                      onValueChange={(value) => setEditCourse({ ...editCourse, difficulty: value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue />
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
                    <Label className="text-right col-span-2">Thời lượng</Label>
                    <Select
                      value={editCourse.duration}
                      onValueChange={(value) => setEditCourse({ ...editCourse, duration: value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration} value={duration}>
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 col-span-1">
                    <Label className="text-right col-span-2">Độ tuổi</Label>
                    <Select
                      value={editCourse.ageGroup}
                      onValueChange={(value) => setEditCourse({ ...editCourse, ageGroup: value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((ageGroup) => (
                          <SelectItem key={ageGroup} value={ageGroup}>
                            {ageGroup}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editObjectives" className="text-right">
                    Mục tiêu
                  </Label>
                  <Textarea
                    id="editObjectives"
                    value={editCourse.objectives}
                    onChange={(e) => setEditCourse({ ...editCourse, objectives: e.target.value })}
                    className="col-span-3"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editPrerequisites" className="text-right">
                    Yêu cầu trước
                  </Label>
                  <Textarea
                    id="editPrerequisites"
                    value={editCourse.prerequisites}
                    onChange={(e) => setEditCourse({ ...editCourse, prerequisites: e.target.value })}
                    className="col-span-3"
                    rows={2}
                  />
                </div>
              </div>
            )}
            <DialogFooter className="border-t border-gray-200 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleUpdateCourse}>
                <Save className="h-4 w-4 mr-2" />
                Cập nhật
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Course Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
            {selectedCourse && (
              <>
                <DialogHeader className="pb-4 border-b border-gray-200">
                  <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    {selectedCourse.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Chi tiết và thống kê khóa học
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="info">Thông tin</TabsTrigger>
                    <TabsTrigger value="lessons">
                      Bài học ({selectedCourse.lessons?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="exercises">
                      Bài tập ({selectedCourse.exercises?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                      Thống kê
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Môn học</Label>
                        <p className="text-sm">{selectedCourse.subject}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Độ khó</Label>
                        <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
                          {selectedCourse.difficulty}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Thời lượng</Label>
                        <p className="text-sm">{selectedCourse.duration}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Độ tuổi</Label>
                        <p className="text-sm">{selectedCourse.ageGroup}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Trạng thái</Label>
                        <Badge className={getStatusColor(selectedCourse.status)}>
                          {getStatusText(selectedCourse.status)}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Ngày tạo</Label>
                        <p className="text-sm">{new Date(selectedCourse.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Mô tả</Label>
                      <p className="text-sm mt-1">{selectedCourse.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Mục tiêu</Label>
                      <p className="text-sm mt-1">{selectedCourse.objectives || "Chưa có mục tiêu"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Yêu cầu trước</Label>
                      <p className="text-sm mt-1">{selectedCourse.prerequisites || "Không yêu cầu"}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lessons" className="space-y-4">
                    {selectedCourse.lessons && selectedCourse.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.lessons.map((lesson, index) => (
                          <Card key={lesson.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {getLessonTypeIcon(lesson.type)}
                                  <div>
                                    <h4 className="font-medium">{lesson.title}</h4>
                                    <p className="text-sm text-gray-600">{lesson.description}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        {lesson.duration}
                                      </Badge>
                                      {lesson.completed ? (
                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                          Hoàn thành
                                        </Badge>
                                      ) : (
                                        <Badge variant="secondary" className="text-xs">
                                          Chưa hoàn thành
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">#{lesson.order}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Chưa có bài học nào</p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm bài học đầu tiên
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="exercises" className="space-y-4">
                    {selectedCourse.exercises && selectedCourse.exercises.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.exercises.map((exercise, index) => (
                          <Card key={exercise.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-blue-500" />
                                  <div>
                                    <h4 className="font-medium">{exercise.title}</h4>
                                    <p className="text-sm text-gray-600">{exercise.description}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        {exercise.type}
                                      </Badge>
                                      <Badge className={getDifficultyColor(exercise.difficulty)} >
                                        {exercise.difficulty}
                                      </Badge>
                                      <span className="text-xs text-gray-500">
                                        {exercise.completed}/{exercise.total} đã nộp
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-blue-600">
                                  {exercise.points} điểm
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Chưa có bài tập nào</p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm bài tập đầu tiên
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Tổng quan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Học sinh tham gia:</span>
                            <span className="font-medium">{selectedCourse.studentsCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tỷ lệ hoàn thành:</span>
                            <span className={`font-medium ${getCompletionColor(selectedCourse.completionRate)}`}>
                              {selectedCourse.completionRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Bài học:</span>
                            <span className="font-medium">
                              {selectedCourse.completedLessons}/{selectedCourse.totalLessons}
                            </span>
                          </div>
                          <Progress value={selectedCourse.completionRate} className="h-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Hoạt động</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Lần cập nhật cuối:</span>
                            <span className="font-medium">
                              {new Date(selectedCourse.lastActivity).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tuổi khóa học:</span>
                            <span className="font-medium">
                              {Math.floor((new Date().getTime() - new Date(selectedCourse.createdAt).getTime()) / (1000 * 60 * 60 * 24))} ngày
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Đánh giá trung bình:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">4.8</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}
