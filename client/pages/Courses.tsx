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
  Award,
  Sparkles,
  Zap
} from "lucide-react";

// Course status types
type CourseStatus = "not-started" | "in-progress" | "completed";
type CourseCategory = "programming" | "art" | "math" | "science" | "music" | "sports";

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
  level: "Dễ" | "Trung bình" | "Khó";
  thumbnail: string;
  tags: string[];
  lastAccessed?: string;
  estimatedCompletion?: string;
  emoji: string;
}

// Mock course data - kid-friendly
const mockCourses: Course[] = [
  {
    id: 1,
    title: "🎮 Làm game với Scratch",
    instructor: "Thầy Minh vui vẻ",
    description: "Học cách tạo game đơn giản với Scratch. Bé sẽ làm được game của riêng mình!",
    category: "programming",
    status: "in-progress",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    duration: "4 tuần",
    students: 850,
    rating: 4.9,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Scratch", "Game", "Sáng tạo"],
    lastAccessed: "2 giờ trước",
    estimatedCompletion: "1 tuần",
    emoji: "🎮"
  },
  {
    id: 2,
    title: "🌈 Vẽ tranh số và màu sắc",
    instructor: "Cô Lan xinh đẹp",
    description: "Học vẽ tranh bằng máy tính và tìm hiểu về màu sắc đẹp mắt",
    category: "art",
    status: "in-progress",
    progress: 60,
    totalLessons: 16,
    completedLessons: 10,
    duration: "6 tuần",
    students: 680,
    rating: 4.8,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Vẽ", "Màu sắc", "Sáng tạo"],
    lastAccessed: "1 ngày trước",
    estimatedCompletion: "2 tuần",
    emoji: "🌈"
  },
  {
    id: 3,
    title: "🔢 Toán học siêu thú vị",
    instructor: "Thầy Hùng thông minh",
    description: "Toán học không khó! Học toán qua trò chơi và câu đố vui nhộn",
    category: "math",
    status: "in-progress",
    progress: 80,
    totalLessons: 25,
    completedLessons: 20,
    duration: "8 tuần",
    students: 920,
    rating: 4.9,
    level: "Trung bình",
    thumbnail: "/placeholder.svg",
    tags: ["Toán", "Trò chơi", "Thông minh"],
    lastAccessed: "3 ngày trước",
    estimatedCompletion: "1 tuần",
    emoji: "🔢"
  },
  {
    id: 4,
    title: "🌟 Khoa học thí nghiệm",
    instructor: "Cô Hoa hiền lành",
    description: "Khám phá thế giới khoa học qua những thí nghiệm an toàn và thú vị",
    category: "science",
    status: "completed",
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    duration: "5 tuần",
    students: 560,
    rating: 4.7,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Khoa học", "Thí nghiệm", "Khám phá"],
    lastAccessed: "1 tuần trước",
    emoji: "🌟"
  },
  {
    id: 5,
    title: "🎵 Âm nhạc và ca hát",
    instructor: "Thầy Nam vui tính",
    description: "Học hát và chơi nhạc cơ bản. Tạo ra những giai điệu hay ho!",
    category: "music",
    status: "not-started",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    duration: "6 tuần",
    students: 420,
    rating: 4.6,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Âm nhạc", "Ca hát", "Nhạc cụ"],
    emoji: "🎵"
  },
  {
    id: 6,
    title: "🏃‍♂️ Thể dục vui nhộn",
    instructor: "Cô Mai năng động",
    description: "Tập th��� dục tại nhà, học các động tác vui nhộn và khỏe mạnh",
    category: "sports",
    status: "completed",
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    duration: "3 tuần",
    students: 780,
    rating: 4.8,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Thể dục", "Khỏe mạnh", "Vui nhộn"],
    lastAccessed: "2 tuần trước",
    emoji: "🏃‍♂️"
  },
  {
    id: 7,
    title: "🎨 Làm đồ chơi DIY",
    instructor: "Cô Hương sáng tạo",
    description: "Tự tay làm những đồ chơi đẹp mắt từ giấy và vật liệu đơn giản",
    category: "art",
    status: "in-progress",
    progress: 25,
    totalLessons: 15,
    completedLessons: 4,
    duration: "5 tuần",
    students: 320,
    rating: 4.5,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["DIY", "Đồ chơi", "Sáng tạo"],
    lastAccessed: "5 ngày trước",
    estimatedCompletion: "4 tuần",
    emoji: "🎨"
  },
  {
    id: 8,
    title: "🌱 Trồng cây nhỏ",
    instructor: "Thầy Phúc yêu thiên nhiên",
    description: "Học cách chăm sóc cây cối và hiểu về thiên nhiên xung quanh",
    category: "science",
    status: "not-started",
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    duration: "7 tuần",
    students: 290,
    rating: 4.4,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Thiên nhiên", "Cây cối", "Môi trường"],
    emoji: "🌱"
  }
];

const statusLabels = {
  "not-started": "Chưa học",
  "in-progress": "Đang học",
  "completed": "Hoàn thành"
};

const categoryLabels = {
  "programming": "🎮 Lập trình",
  "art": "🎨 Nghệ thuật", 
  "math": "🔢 Toán học",
  "science": "🌟 Khoa học",
  "music": "🎵 Âm nhạc",
  "sports": "🏃‍♂️ Thể thao"
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
      <div className="flex h-full bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
                  📚 Các khóa học của bé
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </h1>
                <p className="text-gray-600 text-lg">Chọn khóa học mà bé thích để bắt đầu hành trình học tập! 🚀</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="🔍 Tìm khóa học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80 border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-primary/20 rounded-xl">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">⏰ Học gần đây</SelectItem>
                    <SelectItem value="progress">📊 Tiến độ</SelectItem>
                    <SelectItem value="title">🔤 Tên khóa học</SelectItem>
                    <SelectItem value="rating">⭐ Đánh giá</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📚</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng khóa học</p>
                      <p className="text-2xl font-bold text-primary">{mockCourses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🎯</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Đang học</p>
                      <p className="text-2xl font-bold text-primary">{mockCourses.filter(c => c.status === "in-progress").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🏆</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hoàn thành</p>
                      <p className="text-2xl font-bold text-primary">{mockCourses.filter(c => c.status === "completed").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🎁</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Chưa bắt đầu</p>
                      <p className="text-2xl font-bold text-primary">{mockCourses.filter(c => c.status === "not-started").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 overflow-hidden">
                <CardContent className="p-0">
                  {/* Course Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{course.emoji}</div>
                    <div className="absolute top-3 left-3">
                      <Badge variant={statusColors[course.status]} className="text-xs">
                        {statusLabels[course.status]}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="text-xs bg-white/80">{course.level}</Badge>
                    </div>
                    
                    {/* Hover overlay with sparkles */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <p className="text-sm mb-3 font-medium">{course.description}</p>
                        <div className="flex items-center justify-center gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students} bạn nhỏ
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-300" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      {/* Animated sparkles */}
                      <div className="absolute top-2 left-2 text-yellow-300 animate-ping">✨</div>
                      <div className="absolute bottom-2 right-2 text-yellow-300 animate-ping" style={{animationDelay: '0.2s'}}>⭐</div>
                      <div className="absolute top-1/2 right-4 text-yellow-300 animate-ping" style={{animationDelay: '0.4s'}}>💫</div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">👨‍🏫 {course.instructor}</p>
                    </div>

                    {/* Progress */}
                    {course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>📖 {course.completedLessons}/{course.totalLessons} bài học</span>
                          <span className="font-bold text-primary">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-3 bg-primary/10" />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Last accessed (for in-progress courses) */}
                    {course.status === "in-progress" && course.lastAccessed && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        ⏰ Học lần cuối: {course.lastAccessed}
                      </p>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {course.status === "not-started" ? "🚀 Bắt đầu học!" : 
                       course.status === "completed" ? "🔄 Ôn tập lại!" : "📖 Tiếp tục học!"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {sortedCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
              <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé! 🔍</p>
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        <div className="w-80 border-l border-primary/20 bg-gradient-to-b from-white to-accent/10 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-2xl">🎛️</div>
            <h2 className="text-lg font-bold text-primary">Bộ lọc khóa học</h2>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-sm font-bold mb-3 block text-primary">🎯 Chọn môn học</Label>
              <div className="space-y-3">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <Checkbox
                      id={key}
                      checked={selectedCategories.includes(key as CourseCategory)}
                      onCheckedChange={() => toggleCategory(key as CourseCategory)}
                      className="border-primary/40"
                    />
                    <Label htmlFor={key} className="text-sm cursor-pointer font-medium">
                      {label} ({mockCourses.filter(c => c.category === key).length})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-primary/20" />

            {/* Status Filter */}
            <div>
              <Label className="text-sm font-bold mb-3 block text-primary">📊 Trạng thái học</Label>
              <div className="space-y-3">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/5 transition-colors">
                    <Checkbox
                      id={key}
                      checked={selectedStatuses.includes(key as CourseStatus)}
                      onCheckedChange={() => toggleStatus(key as CourseStatus)}
                      className="border-accent/40"
                    />
                    <Label htmlFor={key} className="text-sm cursor-pointer font-medium">
                      {label} ({mockCourses.filter(c => c.status === key).length})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-primary/20" />

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              className="w-full border-primary/40 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl font-bold"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedStatuses([]);
                setSearchTerm("");
              }}
            >
              🗑️ Xóa tất cả bộ lọc
            </Button>

            {/* Fun motivational section */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20 text-center">
              <div className="text-4xl mb-2">🌟</div>
              <p className="text-sm font-bold text-primary mb-1">Học nhiều sẽ thông minh!</p>
              <p className="text-xs text-muted-foreground">Bé đã học {mockCourses.filter(c => c.status === "completed").length} khóa học rồi đấy! 🎉</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
