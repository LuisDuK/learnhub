import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Zap,
} from "lucide-react";

// Course status types
type CourseStatus = "not-started" | "in-progress" | "completed";
type CourseCategory = "math" | "literature" | "english";

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

// Mock course data - focusing on 3 main subjects
const mockCourses: Course[] = [
  {
    id: 1,
    title: "🔢 Toán học cơ bản",
    instructor: "Thầy Minh vui vẻ",
    description:
      "Học toán qua trò chơi và câu đố thú vị. Phân số, số thập phân, phép tính cơ bản",
    category: "math",
    status: "in-progress",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    duration: "8 tuần",
    students: 850,
    rating: 4.9,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Phân số", "Phép tính", "Số học"],
    lastAccessed: "2 giờ trước",
    estimatedCompletion: "2 tuần",
    emoji: "🔢",
  },
  {
    id: 2,
    title: "📐 Hình học thú vị",
    instructor: "Cô Lan xinh đẹp",
    description:
      "Khám phá thế giới hình học qua những hình dạng và bài toán vui nhộn",
    category: "math",
    status: "not-started",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    duration: "6 tuần",
    students: 680,
    rating: 4.8,
    level: "Trung bình",
    thumbnail: "/placeholder.svg",
    tags: ["Hình học", "Chu vi", "Diện tích"],
    emoji: "📐",
  },
  {
    id: 3,
    title: "📚 Ngữ văn lớp 5",
    instructor: "Cô Hương hiền lành",
    description: "Đọc hiểu, viết văn và tìm hiểu các tác phẩm văn học Việt Nam",
    category: "literature",
    status: "in-progress",
    progress: 60,
    totalLessons: 25,
    completedLessons: 15,
    duration: "10 tuần",
    students: 920,
    rating: 4.9,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Đọc hiểu", "Viết văn", "Thơ"],
    lastAccessed: "1 ngày trước",
    estimatedCompletion: "4 tuần",
    emoji: "📚",
  },
  {
    id: 4,
    title: "✍️ Viết văn miêu tả",
    instructor: "Thầy Nam tài năng",
    description: "Học cách viết văn miêu tả người, cảnh vật một cách sinh động",
    category: "literature",
    status: "completed",
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    duration: "4 tuần",
    students: 560,
    rating: 4.7,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["Viết văn", "Miêu tả", "Tả người"],
    lastAccessed: "1 tuần trước",
    emoji: "✍️",
  },
  {
    id: 5,
    title: "🌍 Tiếng Anh cơ bản",
    instructor: "Miss Sarah vui vẻ",
    description: "Học tiếng Anh qua bài hát, trò chơi và câu chuyện thú vị",
    category: "english",
    status: "in-progress",
    progress: 45,
    totalLessons: 30,
    completedLessons: 14,
    duration: "12 tuần",
    students: 780,
    rating: 4.8,
    level: "Dễ",
    thumbnail: "/placeholder.svg",
    tags: ["T��� vựng", "Ngữ pháp", "Giao tiếp"],
    lastAccessed: "3 ngày trước",
    estimatedCompletion: "6 tuần",
    emoji: "🌍",
  },
  {
    id: 6,
    title: "🗣️ Tiếng Anh giao tiếp",
    instructor: "Mr. John thân thiện",
    description: "Luyện nói tiếng Anh tự tin qua các tình huống thực tế",
    category: "english",
    status: "not-started",
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    duration: "8 tuần",
    students: 420,
    rating: 4.6,
    level: "Trung bình",
    thumbnail: "/placeholder.svg",
    tags: ["Speaking", "Conversation", "Phát âm"],
    emoji: "🗣️",
  },
  {
    id: 7,
    title: "📖 Ngữ pháp tiếng Anh",
    instructor: "Cô Mai chuyên nghiệp",
    description:
      "Nắm vững ngữ pháp tiếng Anh qua các bài tập và ví dụ đơn giản",
    category: "english",
    status: "in-progress",
    progress: 30,
    totalLessons: 24,
    completedLessons: 7,
    duration: "10 tuần",
    students: 650,
    rating: 4.5,
    level: "Trung bình",
    thumbnail: "/placeholder.svg",
    tags: ["Grammar", "Tenses", "Cấu trúc"],
    lastAccessed: "5 ngày trước",
    estimatedCompletion: "7 tuần",
    emoji: "���",
  },
  {
    id: 8,
    title: "🧮 Toán nâng cao",
    instructor: "Thầy Hùng thông minh",
    description:
      "Giải các bài toán nâng cao, rèn luyện tư duy logic và sáng tạo",
    category: "math",
    status: "not-started",
    progress: 0,
    totalLessons: 18,
    completedLessons: 0,
    duration: "9 tuần",
    students: 320,
    rating: 4.4,
    level: "Khó",
    thumbnail: "/placeholder.svg",
    tags: ["Nâng cao", "Logic", "Tư duy"],
    emoji: "🧮",
  },
];

const statusLabels = {
  "not-started": "Chưa học",
  "in-progress": "Đang học",
  completed: "Hoàn thành",
};

const categoryLabels = {
  math: "🔢 Toán học",
  literature: "📚 Ngữ văn",
  english: "🌍 Tiếng Anh",
};

// Curriculum structure: Khối -> Môn học -> Chương -> Bài học
type CurriculumLesson = { id: string; title: string; duration?: string; status?: CourseStatus };
type CurriculumChapter = { id: string; title: string; lessons: CurriculumLesson[] };
type CurriculumSubject = { key: CourseCategory; name: string; emoji: string; chapters: CurriculumChapter[] };
type CurriculumGrade = { id: string; name: string; subjects: CurriculumSubject[] };

const curriculum: CurriculumGrade[] = [
  {
    id: "4",
    name: "Khối 4",
    subjects: [
      {
        key: "math",
        name: "Toán học",
        emoji: "🔢",
        chapters: [
          {
            id: "m4-c1",
            title: "Số học cơ bản",
            lessons: [
              { id: "1", title: "Phép cộng và trừ trong 100", duration: "30p", status: "in-progress" },
              { id: "2", title: "Phép nhân cơ bản", duration: "25p", status: "not-started" },
            ],
          },
          {
            id: "m4-c2",
            title: "Hình học vui",
            lessons: [
              { id: "3", title: "Đường thẳng và đoạn thẳng", duration: "20p", status: "not-started" },
              { id: "4", title: "Chu vi hình chữ nhật", duration: "25p", status: "completed" },
            ],
          },
        ],
      },
      {
        key: "literature",
        name: "Ngữ văn",
        emoji: "📚",
        chapters: [
          {
            id: "v4-c1",
            title: "Đọc hiểu",
            lessons: [
              { id: "5", title: "Bài thơ: Quê hương", duration: "20p", status: "in-progress" },
              { id: "6", title: "Truyện: Cậu bé thông minh", duration: "18p", status: "not-started" },
            ],
          },
          {
            id: "v4-c2",
            title: "Tập làm văn",
            lessons: [
              { id: "7", title: "Viết đoạn văn tả người", duration: "30p", status: "not-started" },
            ],
          },
        ],
      },
      {
        key: "english",
        name: "Tiếng Anh",
        emoji: "🌍",
        chapters: [
          {
            id: "e4-c1",
            title: "Grammar Basics",
            lessons: [
              { id: "8", title: "Present Simple", duration: "22p", status: "in-progress" },
              { id: "9", title: "There is/There are", duration: "20p", status: "not-started" },
            ],
          },
          {
            id: "e4-c2",
            title: "Vocabulary",
            lessons: [
              { id: "10", title: "My Family", duration: "18p", status: "not-started" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Khối 5",
    subjects: [
      {
        key: "math",
        name: "Toán học",
        emoji: "🧮",
        chapters: [
          {
            id: "m5-c1",
            title: "Phân số & thập phân",
            lessons: [
              { id: "11", title: "Giới thiệu phân số", duration: "28p", status: "not-started" },
              { id: "12", title: "Số thập phân cơ bản", duration: "26p", status: "not-started" },
            ],
          },
        ],
      },
      {
        key: "literature",
        name: "Ngữ văn",
        emoji: "📖",
        chapters: [
          {
            id: "v5-c1",
            title: "Văn miêu tả",
            lessons: [
              { id: "13", title: "Tả cảnh sân trường", duration: "24p", status: "not-started" },
            ],
          },
        ],
      },
      {
        key: "english",
        name: "Tiếng Anh",
        emoji: "🗣️",
        chapters: [
          {
            id: "e5-c1",
            title: "Speaking",
            lessons: [
              { id: "14", title: "Daily Conversations", duration: "20p", status: "not-started" },
            ],
          },
        ],
      },
    ],
  },
];

const statusColors = {
  "not-started": "secondary",
  "in-progress": "default",
  completed: "secondary",
} as const;

export default function Courses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    CourseCategory[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<CourseStatus[]>([]);
  const [sortBy, setSortBy] = useState<string>("recent");

  // Hierarchical selection state
  const [selectedGradeId, setSelectedGradeId] = useState<string>(curriculum[0]?.id || "4");
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<CourseCategory | null>(null);
  const selectedGrade = curriculum.find((g) => g.id === selectedGradeId) || curriculum[0];
  const selectedSubject = selectedGrade?.subjects.find((s) => s.key === selectedSubjectKey) || null;

  // Filter courses based on search and filters
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(course.status);

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
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleStatus = (status: CourseStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
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
                  📚 Các môn học của bé
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </h1>
                <p className="text-gray-600 text-lg">
                  Chọn môn học mà bé thích để bắt đầu hành trình học tập! 🚀
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="🔍 Tìm môn học..."
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
                    <SelectItem value="title">🔤 Tên môn học</SelectItem>
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
                      <p className="text-sm text-muted-foreground">
                        Tổng môn học
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {mockCourses.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📚</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Đang học</p>
                      <p className="text-2xl font-bold text-primary">
                        {
                          mockCourses.filter((c) => c.status === "in-progress")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🏆</div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Hoàn thành
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {
                          mockCourses.filter((c) => c.status === "completed")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🎁</div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Chưa bắt đầu
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {
                          mockCourses.filter((c) => c.status === "not-started")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chọn Khối */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {curriculum.map((g) => (
                <Button
                  key={g.id}
                  variant={g.id === selectedGradeId ? "default" : "outline"}
                  onClick={() => {
                    setSelectedGradeId(g.id);
                    setSelectedSubjectKey(null);
                  }}
                  className={g.id === selectedGradeId ? "bg-primary text-white" : "border-primary/30"}
                >
                  {g.name}
                </Button>
              ))}
            </div>

            {/* Danh sách Môn học của khối đã chọn */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-primary">Môn học</h2>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {selectedGrade?.subjects.map((s) => (
                  <Card
                    key={s.key}
                    className={`cursor-pointer border ${selectedSubjectKey === s.key ? "border-primary bg-primary/5" : "border-primary/20"}`}
                    onClick={() => setSelectedSubjectKey(s.key)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="text-2xl mr-2">{s.emoji}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.chapters.reduce((sum, c) => sum + c.lessons.length, 0)} bài học
                        </div>
                      </div>
                      <Badge variant={selectedSubjectKey === s.key ? "default" : "secondary"}>
                        Chọn
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chương -> Bài học */}
            {selectedSubject && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-primary">
                    {selectedSubject.emoji} {selectedSubject.name} — Chương
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedSubjectKey(null)} className="border-primary/30">
                    ← Chọn môn khác
                  </Button>
                </div>
                <Accordion type="multiple" className="rounded-xl border border-primary/20 bg-white">
                  {selectedSubject.chapters.map((ch) => {
                    const lessons = ch.lessons.filter((l) =>
                      l.title.toLowerCase().includes(searchTerm.toLowerCase()),
                    );
                    return (
                      <AccordionItem key={ch.id} value={ch.id} className="border-b border-primary/10">
                        <AccordionTrigger className="px-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{ch.title}</span>
                            <Badge variant="secondary" className="ml-2">
                              {ch.lessons.length} bài học
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="divide-y">
                            {lessons.map((l) => (
                              <div key={l.id} className="flex items-center justify-between py-3 px-4 hover:bg-primary/5">
                                <div>
                                  <div className="font-medium">{l.title}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-3">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {l.duration || "--"}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {l.status && (
                                    <Badge variant="outline" className="text-xs">
                                      {statusLabels[l.status]}
                                    </Badge>
                                  )}
                                  <Button onClick={() => navigate(`/lesson/${l.id}`)} className="bg-gradient-to-r from-primary to-accent text-white">
                                    <Play className="h-4 w-4 mr-2" /> Học
                                  </Button>
                                </div>
                              </div>
                            ))}
                            {lessons.length === 0 && (
                              <div className="py-4 px-4 text-sm text-muted-foreground">Không có bài học khớp tìm kiếm.</div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            )}
          </div>

          {/* Empty state */}
          {sortedCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy môn học
              </h3>
              <p className="text-gray-600">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé! 🔍
              </p>
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        <div className="w-80 border-l border-primary/20 bg-gradient-to-b from-white to-accent/10 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-2xl">🎛️</div>
            <h2 className="text-lg font-bold text-primary">Bộ lọc môn học</h2>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-sm font-bold mb-3 block text-primary">
                🎯 Chọn môn học
              </Label>
              <div className="space-y-3">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <Checkbox
                      id={key}
                      checked={selectedCategories.includes(
                        key as CourseCategory,
                      )}
                      onCheckedChange={() =>
                        toggleCategory(key as CourseCategory)
                      }
                      className="border-primary/40"
                    />
                    <Label
                      htmlFor={key}
                      className="text-sm cursor-pointer font-medium"
                    >
                      {label} (
                      {mockCourses.filter((c) => c.category === key).length})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-primary/20" />

            {/* Status Filter */}
            <div>
              <Label className="text-sm font-bold mb-3 block text-primary">
                📊 Trạng thái học
              </Label>
              <div className="space-y-3">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <Checkbox
                      id={key}
                      checked={selectedStatuses.includes(key as CourseStatus)}
                      onCheckedChange={() => toggleStatus(key as CourseStatus)}
                      className="border-accent/40"
                    />
                    <Label
                      htmlFor={key}
                      className="text-sm cursor-pointer font-medium"
                    >
                      {label} (
                      {mockCourses.filter((c) => c.status === key).length})
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
              <p className="text-sm font-bold text-primary mb-1">
                Học nhiều sẽ thông minh!
              </p>
              <p className="text-xs text-muted-foreground">
                Bé đã học{" "}
                {mockCourses.filter((c) => c.status === "completed").length}{" "}
                môn học rồi đấy! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
