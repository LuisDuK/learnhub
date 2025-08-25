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
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Calendar,
  Target,
  Clock,
  User,
  TrendingUp,
  Eye,
} from "lucide-react";

// Mock learning path data
const mockLearningPaths = [
  {
    id: 1,
    studentName: "Nguyễn Minh Đức",
    studentId: 101,
    goal: "Làm chủ toán học lớp 3",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    priority: "Cao",
    status: "Đang học",
    totalLessons: 20,
    completedLessons: 15,
    estimatedTime: "8 tuần",
  },
  {
    id: 2,
    studentName: "Trần Thị Mai",
    studentId: 102,
    goal: "Cải thiện kỹ năng đọc hiểu",
    progress: 45,
    startDate: "2024-01-20",
    endDate: "2024-04-20",
    priority: "Trung bình",
    status: "Đang học",
    totalLessons: 16,
    completedLessons: 7,
    estimatedTime: "12 tuần",
  },
  {
    id: 3,
    studentName: "Lê Văn An",
    studentId: 103,
    goal: "Học tiếng Anh cơ bản",
    progress: 100,
    startDate: "2023-12-01",
    endDate: "2024-02-01",
    priority: "Cao",
    status: "Hoàn thành",
    totalLessons: 12,
    completedLessons: 12,
    estimatedTime: "8 tuần",
  },
  {
    id: 4,
    studentName: "Phạm Thị Hoa",
    studentId: 104,
    goal: "Khám phá khoa học tự nhiên",
    progress: 20,
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    priority: "Thấp",
    status: "Đang học",
    totalLessons: 18,
    completedLessons: 4,
    estimatedTime: "12 tuần",
  },
];

const students = [
  { id: 101, name: "Nguyễn Minh Đức" },
  { id: 102, name: "Trần Thị Mai" },
  { id: 103, name: "Lê Văn An" },
  { id: 104, name: "Phạm Thị Hoa" },
  { id: 105, name: "Nguyễn Văn Bình" },
];

const priorities = ["Cao", "Trung bình", "Thấp"];
const durations = ["2 tuần", "1 tháng", "2 tháng", "3 tháng"];

export default function AdminLearningPaths() {
  const [learningPaths, setLearningPaths] = useState(mockLearningPaths);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewDetailId, setViewDetailId] = useState<number | null>(null);
  const [newPath, setNewPath] = useState({
    studentId: "",
    goal: "",
    duration: "",
    startDate: "",
    priority: "",
  });

  const filteredPaths = learningPaths.filter((path) => {
    return path.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           path.goal.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddPath = () => {
    if (newPath.studentId && newPath.goal && newPath.duration && newPath.startDate && newPath.priority) {
      const student = students.find(s => s.id.toString() === newPath.studentId);
      if (student) {
        const startDate = new Date(newPath.startDate);
        const durationWeeks = newPath.duration === "2 tuần" ? 2 : 
                             newPath.duration === "1 tháng" ? 4 :
                             newPath.duration === "2 tháng" ? 8 : 12;
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + (durationWeeks * 7));

        const path = {
          id: learningPaths.length + 1,
          studentName: student.name,
          studentId: student.id,
          goal: newPath.goal,
          progress: 0,
          startDate: newPath.startDate,
          endDate: endDate.toISOString().split('T')[0],
          priority: newPath.priority,
          status: "Đang học",
          totalLessons: Math.floor(Math.random() * 15) + 10,
          completedLessons: 0,
          estimatedTime: newPath.duration,
        };
        setLearningPaths([...learningPaths, path]);
        setNewPath({ studentId: "", goal: "", duration: "", startDate: "", priority: "" });
        setIsAddDialogOpen(false);
      }
    }
  };

  const handleDeletePath = (id: number) => {
    setLearningPaths(learningPaths.filter(path => path.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao":
        return "bg-red-100 text-red-800";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800";
      case "Thấp":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang học":
        return "bg-blue-100 text-blue-800";
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const selectedPath = viewDetailId ? learningPaths.find(p => p.id === viewDetailId) : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🗺️ Quản lý lộ trình học
            </h1>
            <p className="text-gray-600 mt-1">
              Theo dõi và quản lý lộ trình học tập của học sinh
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tạo lộ trình mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tạo lộ trình học mới</DialogTitle>
                <DialogDescription>
                  AI sẽ tự động tạo timeline học tập dựa trên thông tin bạn cung cấp
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student" className="text-right">
                    Chọn học sinh
                  </Label>
                  <Select value={newPath.studentId} onValueChange={(value) => setNewPath({...newPath, studentId: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn học sinh" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal" className="text-right">
                    Mục tiêu
                  </Label>
                  <Textarea
                    id="goal"
                    value={newPath.goal}
                    onChange={(e) => setNewPath({...newPath, goal: e.target.value})}
                    className="col-span-3"
                    placeholder="Nhập mục tiêu học tập..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Khoảng thời gian
                  </Label>
                  <Select value={newPath.duration} onValueChange={(value) => setNewPath({...newPath, duration: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map(duration => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Ngày bắt đầu
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newPath.startDate}
                    onChange={(e) => setNewPath({...newPath, startDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Độ ưu tiên
                  </Label>
                  <Select value={newPath.priority} onValueChange={(value) => setNewPath({...newPath, priority: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddPath}>
                  <Target className="h-4 w-4 mr-2" />
                  Tạo lộ trình
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên học sinh hoặc mục tiêu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Learning Paths Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Học sinh</TableHead>
                <TableHead className="font-semibold">Mục tiêu</TableHead>
                <TableHead className="font-semibold">Tiến độ</TableHead>
                <TableHead className="font-semibold">Thời gian</TableHead>
                <TableHead className="font-semibold">Ưu tiên</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPaths.map((path) => (
                <TableRow key={path.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{path.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                        {path.studentName.charAt(0)}
                      </div>
                      <span className="font-medium">{path.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm font-medium text-gray-900 truncate">{path.goal}</p>
                      <p className="text-xs text-gray-500">{path.completedLessons}/{path.totalLessons} bài học</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-20">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className={`h-2 ${getProgressColor(path.progress)}`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{path.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{path.estimatedTime}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(path.priority)}>
                      {path.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(path.status)}>
                      {path.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewDetailId(path.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeletePath(path.id)}
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

        {/* Detail View Dialog */}
        <Dialog open={!!viewDetailId} onOpenChange={() => setViewDetailId(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Chi tiết lộ trình học</DialogTitle>
              <DialogDescription>
                Timeline và tiến độ học tập chi tiết
              </DialogDescription>
            </DialogHeader>
            {selectedPath && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Học sinh</Label>
                    <p className="text-lg font-semibold">{selectedPath.studentName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Mục tiêu</Label>
                    <p className="text-lg">{selectedPath.goal}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-gray-500">Tiến độ tổng thể</Label>
                    <span className="text-sm font-medium">{selectedPath.progress}%</span>
                  </div>
                  <Progress value={selectedPath.progress} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{selectedPath.completedLessons}/{selectedPath.totalLessons} bài học hoàn thành</span>
                    <span>{selectedPath.estimatedTime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedPath.completedLessons}</div>
                    <div className="text-xs text-blue-600">Đã hoàn thành</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{selectedPath.totalLessons - selectedPath.completedLessons}</div>
                    <div className="text-xs text-yellow-600">Còn lại</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{Math.round((selectedPath.completedLessons / selectedPath.totalLessons) * 100)}%</div>
                    <div className="text-xs text-green-600">Hiệu suất</div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{learningPaths.length}</div>
            <div className="text-sm text-blue-600">Tổng lộ trình</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {learningPaths.filter(p => p.status === "Đang học").length}
            </div>
            <div className="text-sm text-green-600">Đang thực hiện</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {learningPaths.filter(p => p.status === "Hoàn thành").length}
            </div>
            <div className="text-sm text-orange-600">Đã hoàn thành</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(learningPaths.reduce((sum, p) => sum + p.progress, 0) / learningPaths.length)}%
            </div>
            <div className="text-sm text-purple-600">Tiến độ TB</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
