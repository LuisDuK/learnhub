import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Search,
  Filter,
  Calendar,
  Award
} from "lucide-react";

// Course status types
type CourseStatus = "not-started" | "in-progress" | "completed";
type CourseCategory = "frontend" | "backend" | "design" | "mobile" | "data" | "devops";

interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  category: CourseCategory;
  status: CourseStatus;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  students: number;
  rating: number;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  thumbnail: string;
  tags: string[];
  lastAccessed?: string;
  estimatedCompletion?: string;
}

// Mock course data
const mockCourses: Course[] = [
  {
    id: 1,
    title: "JavaScript Nâng cao",
    instructor: "Trần Văn A",
    description: "Học các concept nâng cao của JavaScript bao gồm async/await, closures, prototypes và design patterns",
    category: "frontend",
    status: "in-progress",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    duration: "8 tuần",
    students: 1250,
    rating: 4.8,
    level: "Nâng cao",
    thumbnail: "/placeholder.svg",
    tags: ["ES6", "Async", "OOP"],
    lastAccessed: "2 giờ trước",
    estimatedCompletion: "1 tuần"
  },
  {
    id: 2,
    title: "React.js Complete",
    instructor: "Nguyễn Thị B",
    description: "Khóa học toàn diện về React từ cơ bản đến nâng cao, bao gồm hooks, context, và testing",
    category: "frontend",
    status: "in-progress",
    progress: 60,
    totalLessons: 32,
    completedLessons: 19,
    duration: "12 tuần",
    students: 980,
    rating: 4.9,
    level: "Trung cấp",
    thumbnail: "/placeholder.svg",
    tags: ["React", "Hooks", "Testing"],
    lastAccessed: "1 ngày trước",
    estimatedCompletion: "3 tuần"
  },
  {
    id: 3,
    title: "Backend Development with Node.js",
    instructor: "Lê Minh C",
    description: "Xây dựng API và server với Node.js, Express, và MongoDB",
    category: "backend",
    status: "in-progress",
    progress: 40,
    totalLessons: 28,
    completedLessons: 11,
    duration: "10 tuần",
    students: 750,
    rating: 4.7,
    level: "Trung cấp",
    thumbnail: "/placeholder.svg",
    tags: ["Node.js", "Express", "MongoDB"],
    lastAccessed: "3 ngày trước",
    estimatedCompletion: "5 tuần"
  },
  {
    id: 4,
    title: "Database Management",
    instructor: "Phạm Văn D",
    description: "Quản lý cơ sở dữ liệu với SQL, PostgreSQL và optimization techniques",
    category: "backend",
    status: "completed",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    duration: "6 tuần",
    students: 650,
    rating: 4.6,
    level: "Cơ bản",
    thumbnail: "/placeholder.svg",
    tags: ["SQL", "PostgreSQL", "Optimization"],
    lastAccessed: "1 tuần trước"
  },
  {
    id: 5,
    title: "UI/UX Design Basics",
    instructor: "Hoàng Thị E",
    description: "Nguyên lý thiết kế UI/UX, Figma, và user research",
    category: "design",
    status: "not-started",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    duration: "8 tuần",
    students: 420,
    rating: 4.5,
    level: "Cơ bản",
    thumbnail: "/placeholder.svg",
    tags: ["Figma", "Design", "Research"]
  },
  {
    id: 6,
    title: "Mobile App Development",
    instructor: "Đỗ Văn F",
    description: "Phát triển ứng dụng mobile với React Native",
    category: "mobile",
    status: "not-started",
    progress: 0,
    totalLessons: 35,
    completedLessons: 0,
    duration: "14 tuần",
    students: 320,
    rating: 4.4,
    level: "Nâng cao",
    thumbnail: "/placeholder.svg",
    tags: ["React Native", "iOS", "Android"]
  },
  {
    id: 7,
    title: "Data Science with Python",
    instructor: "Ngô Thị G",
    description: "Phân tích dữ liệu và machine learning với Python",
    category: "data",
    status: "in-progress",
    progress: 25,
    totalLessons: 40,
    completedLessons: 10,
    duration: "16 tuần",
    students: 580,
    rating: 4.7,
    level: "Nâng cao",
    thumbnail: "/placeholder.svg",
    tags: ["Python", "Pandas", "ML"],
    lastAccessed: "5 ngày trước",
    estimatedCompletion: "10 tuần"
  },
  {
    id: 8,
    title: "DevOps Fundamentals",
    instructor: "Trần Minh H",
    description: "Docker, Kubernetes, CI/CD và cloud deployment",
    category: "devops",
    status: "completed",
    progress: 100,
    totalLessons: 22,
    completedLessons: 22,
    duration: "8 tuần",
    students: 450,
    rating: 4.8,
    level: "Trung cấp",
    thumbnail: "/placeholder.svg",
    tags: ["Docker", "Kubernetes", "AWS"],
    lastAccessed: "2 tuần trước"
  }
];

const statusLabels = {
  "not-started": "Chưa học",
  "in-progress": "Đang học",
  "completed": "Hoàn thành"
};

const categoryLabels = {
  "frontend": "Frontend",
  "backend": "Backend", 
  "design": "Design",
  "mobile": "Mobile",
  "data": "Data Science",
  "devops": "DevOps"
};

const statusColors = {
  "not-started": "secondary",
  "in-progress": "default",
  "completed": "secondary"
} as const;

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CourseCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<CourseStatus[]>([]);
  const [sortBy, setSortBy] = useState<string>("recent");

  // Filter courses based on search and filters
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(course.status);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "progress":
        return b.progress - a.progress;
      case "title":
        return a.title.localeCompare(b.title);
      case "rating":
        return b.rating - a.rating;
      default: // recent
        if (a.status === "in-progress" && b.status !== "in-progress") return -1;
        if (b.status === "in-progress" && a.status !== "in-progress") return 1;
        return 0;
    }
  });

  const toggleCategory = (category: CourseCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: CourseStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
                <p className="text-gray-600">Quản lý và theo dõi tiến độ các khóa học bạn đang tham gia</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm khóa học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Học gần đây</SelectItem>
                    <SelectItem value="progress">Tiến độ</SelectItem>
                    <SelectItem value="title">Tên khóa học</SelectItem>
                    <SelectItem value="rating">Đánh giá</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng khóa học</p>
                      <p className="text-2xl font-bold">{mockCourses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Đang học</p>
                      <p className="text-2xl font-bold">{mockCourses.filter(c => c.status === "in-progress").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hoàn thành</p>
                      <p className="text-2xl font-bold">{mockCourses.filter(c => c.status === "completed").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Chưa bắt đầu</p>
                      <p className="text-2xl font-bold">{mockCourses.filter(c => c.status === "not-started").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  {/* Course Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="h-12 w-12 text-primary/40" />
                    <div className="absolute top-3 left-3">
                      <Badge variant={statusColors[course.status]}>
                        {statusLabels[course.status]}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <p className="text-sm mb-2">{course.description}</p>
                        <div className="flex items-center justify-center gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">Giảng viên: {course.instructor}</p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Last accessed (for in-progress courses) */}
                    {course.status === "in-progress" && course.lastAccessed && (
                      <p className="text-xs text-muted-foreground">
                        Học lần cuối: {course.lastAccessed}
                      </p>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      variant={course.status === "not-started" ? "outline" : "default"}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {course.status === "not-started" ? "Bắt đầu học" : 
                       course.status === "completed" ? "Ôn tập" : "Tiếp tục học"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {sortedCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
              <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Bộ lọc</h2>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Chuyên ngành</Label>
              <div className="space-y-2">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={selectedCategories.includes(key as CourseCategory)}
                      onCheckedChange={() => toggleCategory(key as CourseCategory)}
                    />
                    <Label htmlFor={key} className="text-sm cursor-pointer">
                      {label} ({mockCourses.filter(c => c.category === key).length})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Status Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Trạng thái</Label>
              <div className="space-y-2">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={selectedStatuses.includes(key as CourseStatus)}
                      onCheckedChange={() => toggleStatus(key as CourseStatus)}
                    />
                    <Label htmlFor={key} className="text-sm cursor-pointer">
                      {label} ({mockCourses.filter(c => c.status === key).length})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedStatuses([]);
                setSearchTerm("");
              }}
            >
              Xóa tất cả bộ lọc
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
