import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
} from "lucide-react";

// Mock course data
const mockCourses = [
  {
    id: 1,
    name: "Toán học cơ bản",
    description: "Khóa học toán học dành cho học sinh tiểu học, bao gồm các phép tính cơ bản và hình học đơn giản.",
    image: "/placeholder.svg",
    subject: "Toán học",
    teacher: "Cô Nguyễn Thị Mai",
    studentsCount: 120,
    completionRate: 85,
    status: "Đang mở",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Tiếng Việt lớp 3",
    description: "Học tiếng Việt qua các bài văn và câu chuyện thú vị, phát triển kỹ năng đọc hiểu.",
    image: "/placeholder.svg",
    subject: "Tiếng Việt",
    teacher: "Cô Trần Thị Lan",
    studentsCount: 95,
    completionRate: 78,
    status: "Đang mở",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Tiếng Anh cho trẻ em",
    description: "Khóa học tiếng Anh cơ bản với phương pháp học qua trò chơi và bài hát.",
    image: "/placeholder.svg",
    subject: "Tiếng Anh",
    teacher: "Thầy John Smith",
    studentsCount: 80,
    completionRate: 92,
    status: "Đang mở",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    name: "Khoa học tự nhiên",
    description: "Khám phá thế giới xung quanh qua các thí nghiệm đơn giản và quan sát thiên nhiên.",
    image: "/placeholder.svg",
    subject: "Khoa học",
    teacher: "Cô Lê Thị Hoa",
    studentsCount: 75,
    completionRate: 70,
    status: "Tạm dừng",
    createdAt: "2024-01-05",
  },
];

const subjects = ["Tất cả", "Toán học", "Tiếng Việt", "Tiếng Anh", "Khoa học", "Lịch sử", "Địa lý"];

const teachers = [
  "Cô Nguyễn Thị Mai",
  "Cô Trần Thị Lan", 
  "Thầy John Smith",
  "Cô Lê Thị Hoa",
  "Thầy Phạm Văn Nam"
];

export default function AdminCourses() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    subject: "",
    teacher: "",
    image: "",
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "Tất cả" || course.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.subject && newCourse.teacher) {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        image: "/placeholder.svg",
        studentsCount: 0,
        completionRate: 0,
        status: "Đang mở",
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCourses([...courses, course]);
      setNewCourse({ name: "", description: "", subject: "", teacher: "", image: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              📚 Quản lý khóa học
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý tất cả các khóa học và môn học
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Thêm khóa học
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Thêm khóa học mới</DialogTitle>
                <DialogDescription>
                  Tạo khóa học mới cho học sinh
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="courseName" className="text-right">
                    Tên môn học
                  </Label>
                  <Input
                    id="courseName"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="courseDesc" className="text-right">
                    Mô tả
                  </Label>
                  <Textarea
                    id="courseDesc"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Môn học
                  </Label>
                  <Select value={newCourse.subject} onValueChange={(value) => setNewCourse({...newCourse, subject: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.slice(1).map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">
                    Giáo viên
                  </Label>
                  <Select value={newCourse.teacher} onValueChange={(value) => setNewCourse({...newCourse, teacher: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn giáo viên phụ trách" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map(teacher => (
                        <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCourse}>Lưu</Button>
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
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow border-gray-200 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-32 object-cover rounded-lg bg-gradient-to-br from-blue-100 to-orange-100"
                  />
                  <Badge className={`absolute top-2 right-2 ${getStatusColor(course.status)}`}>
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
                      <DropdownMenuItem>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
                    <span className="text-gray-500">Giáo viên:</span>
                    <span className="font-medium text-blue-600">{course.teacher}</span>
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
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-gray-500">Hoàn thành:</span>
                    </div>
                    <span className={`font-medium ${getCompletionColor(course.completionRate)}`}>
                      {course.completionRate}%
                    </span>
                  </div>
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
            <Button onClick={() => {setSearchTerm(""); setSubjectFilter("Tất cả");}}>
              Xóa bộ lọc
            </Button>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-sm text-blue-600">Tổng khóa học</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.status === "Đang mở").length}
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
              {Math.round(courses.reduce((sum, c) => sum + c.completionRate, 0) / courses.length)}%
            </div>
            <div className="text-sm text-purple-600">Hoàn thành TB</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
