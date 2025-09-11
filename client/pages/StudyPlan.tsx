import { useState, useEffect, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudyPlanLayout from "@/components/StudyPlanLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Target,
  Edit,
  CheckCircle,
  Circle,
  PlayCircle,
  Calculator,
  BookOpen,
  Globe,
  Sparkles,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock study plan data focusing on Math, Literature, English
const studyGoals = [
  { id: "midterm", label: "🎯 Ôn tập thi giữa kỳ", duration: "2 tuần" },
  { id: "grammar", label: "📚 Ôn tập ngữ pháp", duration: "3 tuần" },
  { id: "exam", label: "📝 Luyện thi cuối kỳ", duration: "4 tuần" },
  { id: "vocabulary", label: "📖 Mở r��ng từ vựng", duration: "6 tuần" },
];

const weeklyPlan = [
  {
    week: "Tuần 1",
    startDate: "20/01 - 26/01",
    lessons: [
      {
        id: 1,
        subject: "math",
        title: "Ôn tập — Phân số và số thập phân",
        duration: "45 phút",
        status: "completed",
        day: "Thứ 2",
        time: "14:00",
      },
      {
        id: 2,
        subject: "literature",
        title: "Ôn tập — Bài thơ Quê hương",
        duration: "60 phút",
        status: "completed",
        day: "Thứ 3",
        time: "15:00",
      },
      {
        id: 3,
        subject: "english",
        title: "Ôn tập — Present Simple Tense",
        duration: "45 phút",
        status: "in-progress",
        day: "Thứ 4",
        time: "16:00",
        videoUrl: "https://www.youtube.com/embed/5MgBikgcWnY",
        pdfUrl:
          "https://cdn.builder.io/o/assets%2F3178c0bbf5d64e32906afe2d8af514ea%2F4d4c87b7bec5493eac83c432e8a64018?alt=media&token=d3b1f7c1-2128-4c68-9b5e-ac04d1cfbf77&apiKey=3178c0bbf5d64e32906afe2d8af514ea",
      },
      {
        id: 4,
        subject: "math",
        title: "Ôn tập — Phép tính với phân số",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "14:00",
        videoUrl: "https://www.youtube.com/embed/5MgBikgcWnY",
      },
    ],
  },
  {
    week: "Tuần 2",
    startDate: "27/01 - 02/02",
    lessons: [
      {
        id: 5,
        subject: "literature",
        title: "Ôn tập — Viết văn tả người",
        duration: "90 phút",
        status: "not-started",
        day: "Thứ 2",
        time: "15:00",
      },
      {
        id: 6,
        subject: "english",
        title: "Ôn tập — Writing - My Family",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 4",
        time: "16:00",
        pdfUrl:
          "https://cdn.builder.io/o/assets%2F3178c0bbf5d64e32906afe2d8af514ea%2F4d4c87b7bec5493eac83c432e8a64018?alt=media&token=d3b1f7c1-2128-4c68-9b5e-ac04d1cfbf77&apiKey=3178c0bbf5d64e32906afe2d8af514ea",
      },
      {
        id: 7,
        subject: "math",
        title: "Ôn tập — Biểu đồ và thống kê",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "14:00",
      },
    ],
  },
  {
    week: "Tuần 3",
    startDate: "03/02 - 09/02",
    lessons: [
      {
        id: 8,
        subject: "english",
        title: "Ôn tập — Speaking Practice",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 2",
        time: "16:00",
      },
      {
        id: 9,
        subject: "math",
        title: "Ôn tập — Hình học cơ bản",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 4",
        time: "14:00",
      },
      {
        id: 10,
        subject: "literature",
        title: "Ôn tập — Đọc hiểu văn bản",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 6",
        time: "15:00",
      },
    ],
  },
];

const subjectConfig = {
  math: {
    name: "Toán",
    icon: Calculator,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  literature: {
    name: "Văn",
    icon: BookOpen,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  english: {
    name: "Anh",
    icon: Globe,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
};

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
    label: "Hoàn thành",
  },
  "in-progress": {
    icon: PlayCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    label: "Đang học",
  },
  "not-started": {
    icon: Circle,
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    label: "Chưa bắt đầu",
  },
};

type Lesson = {
  id: number;
  subject: string;
  title: string;
  duration: string;
  status: string;
  day?: string;
  time?: string;
  week?: string;
  videoUrl?: string;
  pdfUrl?: string;
};

type PlanVersion = {
  id: string;
  createdAt: string;
  version: number;
  goal: any;
  plan: { phases: { title: string; lessons: Lesson[]; milestone?: string }[] };
};

export default function StudyPlan() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState("midterm");
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreatePlanDialog, setShowCreatePlanDialog] = useState(false);
  const [showPracticeDialog, setShowPracticeDialog] = useState(false);
  const [showEntranceTestDialog, setShowEntranceTestDialog] = useState(false);
  const [showProposedPlanDialog, setShowProposedPlanDialog] = useState(false);

  const [goalData, setGoalData] = useState({
    name: "",
    duration: "",
    startDate: "",
    priority: "medium",
  });

  const [createPlanData, setCreatePlanData] = useState({
    goalId: "midterm",
    subjects: Object.keys(subjectConfig),
    startDate: "",
    desiredResult: "",
    scope: "",
    scheduleConstraints: {
      unavailableDays: [] as string[],
      maxMinutesPerDay: 60,
    },
  });

  const [lessonList, setLessonList] = useState<Lesson[]>(
    weeklyPlan.flatMap((week) =>
      week.lessons.map((lesson) => ({ ...lesson, week: week.week })),
    ),
  );

  // mark every 3rd lesson across the flattened lesson list as review
  const reviewLessonIds = useMemo(() => {
    const s = new Set<number>();
    lessonList.forEach((l, i) => {
      if ((i + 1) % 3 === 0) s.add(l.id);
    });
    return s;
  }, [lessonList]);

  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfSrc, setPdfSrc] = useState("");

  const [practiceForm, setPracticeForm] = useState({
    subject: "math",
    topic: "",
    numQuestions: 5,
    difficulty: "medium",
    goalId: "midterm",
  });
  const [practiceQuestions, setPracticeQuestions] = useState<
    { id: number; text: string; difficulty: string }[]
  >([]);
  const [practiceSelectedLessonIds, setPracticeSelectedLessonIds] = useState<
    number[]
  >([]);

  const [entranceQuestions, setEntranceQuestions] = useState([
    { id: 1, q: "2 + 2 = ?", choices: ["3", "4", "5"], answer: 1 },
    { id: 2, q: "5 * 3 = ?", choices: ["15", "10", "20"], answer: 0 },
    {
      id: 3,
      q: "Present of 'go' is?",
      choices: ["goes", "go", "gone"],
      answer: 1,
    },
    {
      id: 4,
      q: "Từ đồng nghĩa của 'happy'",
      choices: ["sad", "joyful", "angry"],
      answer: 1,
    },
    { id: 5, q: "What is 10 / 2?", choices: ["2", "5", "10"], answer: 1 },
  ]);
  const [entranceAnswers, setEntranceAnswers] = useState<
    Record<number, number>
  >({});
  const [entranceResult, setEntranceResult] = useState<{
    score: number;
    strengths: string[];
    weaknesses: string[];
  } | null>(null);

  const [proposedPlan, setProposedPlan] = useState<PlanVersion | null>(null);

  useEffect(() => {}, []);

  const openVideo = (url?: string) => {
    if (!url) return;
    setVideoSrc(url);
    setShowVideoDialog(true);
  };

  const openPdf = (url?: string) => {
    if (!url) return;
    setPdfSrc(url);
    setShowPdfDialog(true);
  };

  // Lesson player state & handlers
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoMarkers, setVideoMarkers] = useState<number[]>([]);
  const [maxAllowedTime, setMaxAllowedTime] = useState(0);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(
    null,
  );
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(
    null,
  );
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // mock quiz bank per lesson id
  const quizBank: Record<
    number,
    { q: string; choices: string[]; answer: number }[]
  > = {
    3: [
      {
        q: "What is the third person singular of 'go'?",
        choices: ["go", "goes", "gone"],
        answer: 1,
      },
    ],
    4: [{ q: "Simplify 1/2 + 1/3", choices: ["5/6", "2/5", "3/4"], answer: 0 }],
  };

  const openLessonPlayer = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    // derive markers: use lesson.quizMarkers if present, else leave empty and generate after metadata loads
    const markers: number[] = (lesson as any).quizMarkers || [];
    setVideoMarkers(markers);
    setMaxAllowedTime(0);
    setVideoCurrentTime(0);
    setVideoDuration(0);
    setSelectedQuizAnswer(null);
    setCurrentMarkerIndex(null);
    // choose a playable source: prefer lesson.videoUrl if it's a direct mp4, else fallback to a longer sample mp4
    const sampleMp4 =
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const src =
      typeof (lesson as any).videoUrl === "string" &&
      (lesson as any).videoUrl.endsWith(".mp4")
        ? (lesson as any).videoUrl
        : sampleMp4;
    setVideoSrc(src);
    setShowVideoDialog(true);
    // mark lesson as in-progress if not completed
    if (lesson.status !== "completed") {
      setLessonList((prev) =>
        prev.map((l) =>
          l.id === lesson.id ? { ...l, status: "in-progress" } : l,
        ),
      );
    }
  };

  const onVideoLoaded = () => {
    const v = videoRef.current;
    if (!v) return;
    const dur = v.duration || 0;
    setVideoDuration(dur);
    // if no markers provided by lesson, generate markers at 25%, 50%, 75% for sufficiently long videos
    if ((currentLesson && !(currentLesson as any).quizMarkers) || videoMarkers.length === 0) {
      if (dur > 30) {
        const generated = [0.25, 0.5, 0.75].map((p) => Math.floor(dur * p));
        setVideoMarkers(generated);
      } else if (dur > 5) {
        // short video: split into two markers
        const generated = [Math.floor(dur / 3), Math.floor((2 * dur) / 3)];
        setVideoMarkers(generated);
      }
    }
  };

  const onVideoTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const t = v.currentTime;
    setVideoCurrentTime(t);
    // if current time beyond maxAllowedTime, restrict
    if (t > maxAllowedTime + 0.5) {
      // allow while playing forward until next marker; nothing here
    }
    // check markers
    for (let i = 0; i < videoMarkers.length; i++) {
      const mark = videoMarkers[i];
      if (t >= mark && maxAllowedTime < mark) {
        // reached a marker that hasn't been cleared
        v.pause();
        setCurrentMarkerIndex(i);
        setShowQuizDialog(true);
        return;
      }
    }
  };

  const onVideoSeeking = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime > maxAllowedTime + 0.5) {
      // prevent seeking beyond allowed
      v.currentTime = maxAllowedTime;
    }
  };

  const submitQuizAnswer = () => {
    if (currentLesson == null || currentMarkerIndex == null) return;
    const qSet = quizBank[currentLesson.id] || [];
    const q = qSet[currentMarkerIndex];
    const correct = q && selectedQuizAnswer === q.answer;
    if (correct) {
      // unlock marker
      const mark = videoMarkers[currentMarkerIndex];
      setMaxAllowedTime(Math.max(maxAllowedTime, mark + 1));
      setQuizFeedback('correct');
      // keep dialog open until user explicitly continues
    } else {
      // provide suggestion: let student replay last 10s and allow retry
      const backTo = Math.max(0, (videoMarkers[currentMarkerIndex] || 0) - 10);
      if (videoRef.current) {
        videoRef.current.currentTime = backTo;
        setVideoCurrentTime(backTo);
      }
      setQuizFeedback('incorrect');
      // keep dialog open for user to review and try again
    }
  };

  // when video ends
  const onVideoEnded = () => {
    if (!currentLesson) return;
    setLessonList((prev) =>
      prev.map((l) =>
        l.id === currentLesson.id ? { ...l, status: "completed" } : l,
      ),
    );
    // record completion in localStorage progress (mock)
    const key = `lessonViewed-${currentLesson.id}`;
    localStorage.setItem(
      key,
      JSON.stringify({ viewedAt: new Date().toISOString(), progress: 100 }),
    );
    setShowVideoDialog(false);
    setCurrentLesson(null);
    setVideoSrc("");
  };

  // helper: remove common emoji characters for cleaner titles
  const stripEmojis = (s?: string) => {
    if (!s) return "";
    return s.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u26FF\u2700-\u27BF])/g, "").trim();
  };

  // End of lesson player block

  // Entrance test validity: valid if within 90 days
  const isEntranceTestValid = () => {
    const raw = localStorage.getItem("entranceTest");
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      const date = new Date(parsed.date);
      const diffDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 90;
    } catch (e) {
      return false;
    }
  };

  const startCreatePlan = () => {
    // open create dialog; on submit we'll check entrance test
    setShowCreatePlanDialog(true);
  };

  const submitCreatePlan = () => {
    // save createPlanData to goalData briefly
    setGoalData((prev) => ({
      ...prev,
      name: createPlanData.desiredResult || prev.name,
    }));
    // Check entrance test
    if (!isEntranceTestValid()) {
      setShowCreatePlanDialog(false);
      setShowEntranceTestDialog(true);
      return;
    }
    // otherwise generate plan
    const testRaw = localStorage.getItem("entranceTest");
    const test = testRaw ? JSON.parse(testRaw) : null;
    const generated = aiGeneratePlan(createPlanData, test);
    setProposedPlan(generated);
    setShowCreatePlanDialog(false);
    setShowProposedPlanDialog(true);
  };

  const submitEntranceTest = () => {
    // grade
    let correct = 0;
    entranceQuestions.forEach((q) => {
      if (entranceAnswers[q.id] === q.answer) correct++;
    });
    const score = Math.round((correct / entranceQuestions.length) * 100);
    // mock strengths/weaknesses
    const strengths = score >= 60 ? ["Reading"] : ["Listening"];
    const weaknesses = score < 60 ? ["Math basics"] : [];
    const result = { score, strengths, weaknesses };
    setEntranceResult(result);
    localStorage.setItem(
      "entranceTest",
      JSON.stringify({ ...result, date: new Date().toISOString() }),
    );

    // auto-generate plan after grading
    const test = { ...result };
    const generated = aiGeneratePlan(createPlanData, test);
    setProposedPlan(generated);
    setShowEntranceTestDialog(false);
    setShowProposedPlanDialog(true);
  };

  const aiGeneratePlan = (createData: typeof createPlanData, test: any) => {
    // Mock AI planner: create phases based on duration and subjects
    const phases = createData.subjects.map((s, idx) => {
      const lessons: Lesson[] = [];
      for (let i = 0; i < 3; i++) {
        lessons.push({
          id: Date.now() + idx * 100 + i,
          subject: s,
          title: `${subjectConfig[s as keyof typeof subjectConfig].name} - Chủ đề ${i + 1}`,
          duration: `${30 + i * 15} phút`,
          status: "not-started",
          week: `Giai đoạn ${idx + 1}`,
          day: "Thứ 2",
          time: "16:00",
        });
      }
      return {
        title: `${subjectConfig[s as keyof typeof subjectConfig].name} - Giai đoạn ${idx + 1}`,
        lessons,
        milestone: `Đánh giá sau giai đoạn ${idx + 1}`,
      };
    });

    const versionListRaw = localStorage.getItem("studyPlanVersions");
    const versionList: PlanVersion[] = versionListRaw
      ? JSON.parse(versionListRaw)
      : [];
    const version = (versionList[versionList.length - 1]?.version || 0) + 1;
    const planVersion: PlanVersion = {
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      version,
      goal: { ...createData },
      plan: { phases },
    };
    return planVersion;
  };

  const saveProposedPlan = (p: PlanVersion) => {
    const raw = localStorage.getItem("studyPlanVersions");
    const list: PlanVersion[] = raw ? JSON.parse(raw) : [];
    list.push(p);
    localStorage.setItem("studyPlanVersions", JSON.stringify(list));
    localStorage.setItem("currentStudyPlan", JSON.stringify(p));

    // create simple reminders (mock): store in localStorage
    const reminders = p.plan.phases.flatMap((ph, phIdx) =>
      ph.lessons.map((ls, i) => ({
        lessonId: ls.id,
        title: ls.title,
        scheduled: new Date(
          Date.now() + (phIdx * 7 + i) * 24 * 60 * 60 * 1000,
        ).toISOString(),
      })),
    );
    localStorage.setItem("studyPlanReminders", JSON.stringify(reminders));

    setProposedPlan(null);
    setShowProposedPlanDialog(false);
    // refresh lessonList to show plan as current
    const allLessons = p.plan.phases.flatMap((ph) =>
      ph.lessons.map((l) => ({ ...l })),
    );
    setLessonList(allLessons as Lesson[]);
  };

  const generatePractice = () => {
    const { subject, topic, numQuestions, difficulty } = practiceForm;

    const selectedLessons = lessonList.filter((l) =>
      practiceSelectedLessonIds.includes(l.id),
    );

    if (selectedLessons.length > 0) {
      const perLesson = Math.max(
        1,
        Math.floor(Number(numQuestions) / selectedLessons.length),
      );
      const questions: { id: number; text: string; difficulty: string }[] = [];
      selectedLessons.forEach((lesson, idx) => {
        const count =
          idx === selectedLessons.length - 1
            ? Number(numQuestions) - questions.length
            : perLesson;
        for (let i = 0; i < count; i++) {
          questions.push({
            id: Date.now() + Math.random() * 100000 + i,
            text: `${lesson.title} — Ôn tập: ${topic || "N���i dung"} — Câu ${i + 1}`,
            difficulty,
          });
        }
      });
      setPracticeQuestions(questions);
      return;
    }

    const questions = Array.from({ length: Number(numQuestions) }).map(
      (_, i) => ({
        id: Date.now() + i,
        text: `${subjectConfig[subject as keyof typeof subjectConfig].name} - ${topic || "Bài ôn"} - Câu hỏi ${i + 1}`,
        difficulty,
      }),
    );
    setPracticeQuestions(questions);
  };

  const addQuestion = () => {
    setPracticeQuestions([
      ...practiceQuestions,
      { id: Date.now(), text: "Câu hỏi mới", difficulty: "medium" },
    ]);
  };

  const updateQuestion = (
    id: number,
    data: Partial<{ text: string; difficulty: string }>,
  ) => {
    setPracticeQuestions(
      practiceQuestions.map((q) => (q.id === id ? { ...q, ...data } : q)),
    );
  };

  const deleteQuestion = (id: number) =>
    setPracticeQuestions(practiceQuestions.filter((q) => q.id !== id));
  const moveQuestion = (index: number, direction: "up" | "down") => {
    const newList = [...practiceQuestions];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newList.length) return;
    [newList[index], newList[swapIndex]] = [newList[swapIndex], newList[index]];
    setPracticeQuestions(newList);
  };

  const togglePracticeLesson = (id: number) => {
    setPracticeSelectedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-3">
              Lộ trình học tập
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </h1>
            <p className="text-gray-600 text-base md:text-lg mt-2">
              Kế hoạch học t���p được cá nhân hóa cho bé
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                localStorage.removeItem("studyGoalSet");
                localStorage.removeItem("studyGoal");
                setShowGoalDialog(true);
              }}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50 font-bold rounded-xl"
            >
              🔄 Reset lộ trình học
            </Button>
            <Button
              onClick={startCreatePlan}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 font-bold rounded-xl"
            >
              🛠️ Tạo lộ trình
            </Button>
            <Button
              onClick={() => setShowEditDialog(true)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-bold rounded-xl shadow-lg"
            >
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa lộ trình
            </Button>
            <Button
              onClick={() => setShowPracticeDialog(true)}
              className="bg-gradient-to-r from-secondary to-accent/70 hover:from-secondary/80 hover:to-accent/80 text-white font-bold rounded-xl shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài ôn cá nhân hóa
            </Button>
          </div>
        </div>

        {/* Goal Selection & Progress */}
        <div className="grid gap-6 lg:grid-cols-2">

        </div>

        {/* Timeline */}
        <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
              <Calendar className="h-6 w-6 text-secondary" />
              <span>📝 Lịch trình học tập</span>
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              Timeline chi tiết các bài học theo tuần
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {[...new Set(lessonList.map((l) => l.week))].map((w, weekIndex) => {
              const weekObj = {
                week: w,
                lessons: lessonList.filter((l) => l.week === w),
              };
              return (
                <div key={weekObj.week} className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg">
                      {weekIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-primary">
                        {weekObj.week}
                      </h3>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-primary/20 pl-6 space-y-4">
                    {weekObj.lessons.map((lesson) => {
                      const subject =
                        subjectConfig[
                          lesson.subject as keyof typeof subjectConfig
                        ];
                      const status =
                        statusConfig[
                          lesson.status as keyof typeof statusConfig
                        ];
                      const SubjectIcon = subject.icon;
                      const StatusIcon = status.icon;
                      const isReview = reviewLessonIds.has(lesson.id);
                      const isAvailable = lesson.status === 'in-progress' || lesson.status === 'completed';
                      return (
                        <div
                          key={lesson.id}
                          className="relative flex items-start gap-4 p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-2xl flex items-center justify-center`}>
                                  <div className={`h-6 w-6 rounded-md ${subject.color}`} />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg md:text-xl">
                                    {stripEmojis(lesson.title)}
                                  </h4>
                                  <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground mt-1">
                                    <span className="font-medium">{subject.name}</span>
                                    <span>{lesson.day}</span>
                                    <span className="flex items-center gap-2">⏰ {lesson.time}</span>
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`${status.bgColor} border-0 px-3 py-1 text-sm rounded-full`}
                                >
                                  <StatusIcon
                                    className={`h-4 w-4 mr-2 ${status.color}`}
                                  />
                                  {status.label}
                                </Badge>
                              </div>
                            </div>

                            {lesson.status === "in-progress" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-primary to-accent text-white rounded-lg"
                                onClick={() => openLessonPlayer(lesson)}
                              >
                                <PlayCircle className="h-5 w-5 mr-2" />
                                Tiếp tục học
                              </Button>
                            )}
                            {lesson.status === "not-started" && (
                              <Button
                                variant="outline"
                                size="sm"
                                disabled
                                className="border-primary text-primary opacity-60 cursor-not-allowed rounded-lg"
                                title="Chưa tới - không thể bắt đầu"
                              >
                                <Circle className="h-4 w-4 mr-1" />
                                Chưa tới
                              </Button>
                            )}
                            {isReview && (
                              <span className="ml-3 inline-flex items-center px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Ôn tập</span>
                            )}
                            {lesson.pdfUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 underline text-sm"
                                onClick={() => navigate(`/lesson/${lesson.id}/exercise/1`)}
                              >
                                Làm bài tập
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Video / Lesson Player Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-3xl max-w-full">
          <DialogHeader>
            <DialogTitle>Phát bài học</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Xem nội dung bài học và hoàn thành các mốc quiz
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="w-full bg-black rounded-md overflow-hidden">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-[480px] md:h-[520px] lg:h-[560px] bg-black"
                controls
                onLoadedMetadata={onVideoLoaded}
                onTimeUpdate={onVideoTimeUpdate}
                onSeeking={onVideoSeeking}
                onEnded={onVideoEnded}
              />
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full relative">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{
                      width: `${(videoCurrentTime / Math.max(1, videoDuration)) * 100}%`,
                    }}
                  />
                  {/* markers */}
                  {videoMarkers.map((m, idx) => (
                    <div
                      key={idx}
                      className="absolute top-0 h-2 w-0.5 bg-red-500"
                      style={{
                        left: `${(m / Math.max(1, videoDuration)) * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.floor(videoCurrentTime)}s / {Math.floor(videoDuration)}s
                </div>
              </div>

              <div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowVideoDialog(false);
                    if (videoRef.current) videoRef.current.pause();
                  }}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>

          {/* Quiz Dialog triggered at markers */}
          <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">
                  Câu hỏi kiểm tra
                </DialogTitle>
                <DialogDescription>Trả lời để tiếp tục video</DialogDescription>
              </DialogHeader>
              <div className="py-2">
                {currentLesson &&
                (quizBank[currentLesson.id] || [])[
                  currentMarkerIndex as number
                ] ? (
                  (() => {
                    const q = (quizBank[currentLesson.id] || [])[
                      currentMarkerIndex as number
                    ];
                    return (
                      <div>
                        <div className="font-medium">{q.q}</div>
                        <div className="mt-2 space-y-2">
                          {q.choices.map((c, i) => (
                            <label key={i} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="quiz"
                                checked={selectedQuizAnswer === i}
                                onChange={() => setSelectedQuizAnswer(i)}
                              />
                              <span>{c}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Không có câu hỏi ở mốc này. Hệ thống sẽ tiếp tục phát video.
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowQuizDialog(false);
                        setCurrentMarkerIndex(null);
                        if (videoRef.current) videoRef.current.play();
                      }}
                    >
                      Bỏ qua
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-primary to-accent text-white"
                      onClick={submitQuizAnswer}
                    >
                      Nộp
                    </Button>
                    <Button
                      size="sm"
                      disabled={!quizFeedback}
                      onClick={() => {
                        // only when user explicitly continues do we close the dialog
                        if (quizFeedback === 'correct') {
                          setShowQuizDialog(false);
                          setCurrentMarkerIndex(null);
                          setSelectedQuizAnswer(null);
                          setQuizFeedback(null);
                          setTimeout(() => videoRef.current?.play(), 200);
                        } else {
                          // for incorrect, clear selection so user can try again
                          setSelectedQuizAnswer(null);
                          setQuizFeedback(null);
                        }
                      }}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                  {quizFeedback === 'correct' && (
                    <div className="text-sm text-green-600">Đáp án đúng! Nhấn "Tiếp tục" để tiếp tục phát video.</div>
                  )}
                  {quizFeedback === 'incorrect' && (
                    <div className="text-sm text-red-600">Chưa đúng. Hệ thống đã tua lại 10s để ôn lại. Bạn có thể thử lại.</div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>

      {/* PDF Dialog */}
      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="sm:max-w-4xl max-w-full">
          <DialogHeader>
            <DialogTitle>Tài liệu / Bài tập (PDF)</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Xem tài liệu PDF đính kèm với bài học
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[80vh]">
            {pdfSrc ? (
              <iframe src={pdfSrc} className="w-full h-full" />
            ) : (
              <div className="p-8 text-center">PDF không khả dụng</div>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowPdfDialog(false)} variant="outline">
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Goal Dialog (unchanged) */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              🎯 Thêm mục tiêu học tập
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin mục tiêu h����c tập để tạo lộ trình phù hợp
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Tên mục tiêu</Label>
              <Input
                id="goalName"
                placeholder="Ví dụ: ��n tập thi giữa kỳ"
                value={goalData.name}
                onChange={(e) =>
                  setGoalData({ ...goalData, name: e.target.value })
                }
                className="border-primary/20 focus:border-primary rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Khoảng thời gian</Label>
              <Select
                value={goalData.duration}
                onValueChange={(value) =>
                  setGoalData({ ...goalData, duration: value })
                }
              >
                <SelectTrigger className="border-primary/20 focus:border-primary rounded-xl">
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-week">1 tuần</SelectItem>
                  <SelectItem value="2-weeks">2 tuần</SelectItem>
                  <SelectItem value="3-weeks">3 tuần</SelectItem>
                  <SelectItem value="1-month">1 tháng</SelectItem>
                  <SelectItem value="2-months">2 th��ng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Ngày bắt đầu</Label>
              <Input
                id="startDate"
                type="date"
                value={goalData.startDate}
                onChange={(e) =>
                  setGoalData({ ...goalData, startDate: e.target.value })
                }
                className="border-primary/20 focus:border-primary rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Độ ưu tiên</Label>
              <Select
                value={goalData.priority}
                onValueChange={(value) =>
                  setGoalData({ ...goalData, priority: value })
                }
              >
                <SelectTrigger className="border-primary/20 focus:border-primary rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 Cao</SelectItem>
                  <SelectItem value="medium">🟠 Trung bình</SelectItem>
                  <SelectItem value="low">🟢 Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowGoalDialog(false)}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("studyGoalSet", "true");
                localStorage.setItem("studyGoal", JSON.stringify(goalData));
                setShowGoalDialog(false);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl"
            >
              <Save className="h-4 w-4 mr-2" />
              Lưu m���c tiêu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Plan Dialog */}
      <Dialog
        open={showCreatePlanDialog}
        onOpenChange={setShowCreatePlanDialog}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              🛠️ Tạo lộ trình
            </DialogTitle>
            <DialogDescription>
              Tùy chỉnh và tạo lộ trình học mới
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Chọn mục tiêu</Label>
              <Select
                value={createPlanData.goalId}
                onValueChange={(v) =>
                  setCreatePlanData({ ...createPlanData, goalId: v })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {studyGoals.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chọn môn (tùy chọn)</Label>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(subjectConfig).map((k) => (
                  <label
                    key={k}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${createPlanData.subjects.includes(k) ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200 text-gray-700"}`}
                  >
                    <input
                      type="checkbox"
                      checked={createPlanData.subjects.includes(k)}
                      onChange={() =>
                        setCreatePlanData((prev) => ({
                          ...prev,
                          subjects: prev.subjects.includes(k)
                            ? prev.subjects.filter((s) => s !== k)
                            : [...prev.subjects, k],
                        }))
                      }
                    />
                    <span>{(subjectConfig as any)[k].name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ngày bắt đầu (tùy chọn)</Label>
              <Input
                type="date"
                value={createPlanData.startDate}
                onChange={(e) =>
                  setCreatePlanData({
                    ...createPlanData,
                    startDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Kết quả mong muốn</Label>
              <Input
                value={createPlanData.desiredResult}
                onChange={(e) =>
                  setCreatePlanData({
                    ...createPlanData,
                    desiredResult: e.target.value,
                  })
                }
                placeholder="Ví dụ: Đạt 8 điểm kiểm tra giữa kỳ"
              />
            </div>

            <div className="space-y-2">
              <Label>Phạm vi kiến thức trọng t��m (tùy chọn)</Label>
              <Textarea
                value={createPlanData.scope}
                onChange={(e) =>
                  setCreatePlanData({
                    ...createPlanData,
                    scope: e.target.value,
                  })
                }
                placeholder="Ví dụ: Phân số, hình học cơ bản"
              />
            </div>

            <div className="space-y-2">
              <Label>Ràng buộc lịch học (tùy chọn)</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={String(
                    createPlanData.scheduleConstraints.maxMinutesPerDay,
                  )}
                  onChange={(e) =>
                    setCreatePlanData({
                      ...createPlanData,
                      scheduleConstraints: {
                        ...createPlanData.scheduleConstraints,
                        maxMinutesPerDay: Number(e.target.value),
                      },
                    })
                  }
                  className="w-36"
                />
                <span className="text-sm text-muted-foreground">
                  phút/ngày tối đa
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowCreatePlanDialog(false)}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              Hủy
            </Button>
            <Button
              onClick={submitCreatePlan}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl"
            >
              Tiếp tục
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Entrance Test Dialog */}
      <Dialog
        open={showEntranceTestDialog}
        onOpenChange={setShowEntranceTestDialog}
      >
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              🧪 Bài kiểm tra đầu vào
            </DialogTitle>
            <DialogDescription>
              Hoàn thành bài kiểm tra để hệ thống đánh giá trình độ hi���n tại
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {entranceQuestions.map((q) => (
              <div
                key={q.id}
                className="p-3 border border-gray-200 rounded-lg bg-white"
              >
                <div className="font-medium">{q.q}</div>
                <div className="mt-2 space-y-2">
                  {q.choices.map((c: string, idx: number) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={entranceAnswers[q.id] === idx}
                        onChange={() =>
                          setEntranceAnswers((prev) => ({
                            ...prev,
                            [q.id]: idx,
                          }))
                        }
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setShowEntranceTestDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                onClick={submitEntranceTest}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
              >
                Nộp bài và chấm điểm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Proposed Plan Dialog */}
      <Dialog
        open={showProposedPlanDialog}
        onOpenChange={setShowProposedPlanDialog}
      >
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              📋 Lộ trình đề xuất
            </DialogTitle>
            <DialogDescription>
              AI Planner đã tạo lộ trình; bạn có thể điều chỉnh nhẹ trước khi
              lưu
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {proposedPlan?.plan.phases.map((ph, phIdx) => (
              <div
                key={phIdx}
                className="p-4 border border-gray-200 rounded-lg bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{ph.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {ph.milestone}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {ph.lessons.map((ls, i) => (
                    <div
                      key={ls.id}
                      className="flex items-center gap-3 p-2 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{ls.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {ls.week} • {ls.day}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          value={ls.duration}
                          onChange={(e) => {
                            const updated = {
                              ...(proposedPlan as PlanVersion),
                            };
                            updated.plan.phases[phIdx].lessons[i].duration =
                              e.target.value;
                            setProposedPlan(updated);
                          }}
                          className="w-36"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const updated = {
                              ...(proposedPlan as PlanVersion),
                            };
                            updated.plan.phases[phIdx].lessons.splice(i, 1);
                            setProposedPlan(updated);
                          }}
                          variant="outline"
                          className="text-red-600"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-sm text-muted-foreground">
              Lưu ý: ��ây là lộ trình đề xuất dựa trên mục tiêu và kết quả bài
              kiểm tra. Bạn có thể điều chỉnh thời lượng/ngày học cho từng bài.
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowProposedPlanDialog(false)}
              variant="outline"
              className="flex-1"
            >
              Huỷ
            </Button>
            <Button
              onClick={() => {
                if (proposedPlan) saveProposedPlan(proposedPlan);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
            >
              Lưu lộ trình (tạo version mới)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Roadmap Dialog (existing) */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              ✏️ Chỉnh sửa lộ trình
            </DialogTitle>
            <DialogDescription>
              Quản lý danh sách bài học trong lộ trình của b�����n
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Danh sách bài học</h3>
              <Button
                onClick={() => {
                  const newLesson = {
                    id: Date.now(),
                    subject: "math",
                    title: "Bài học mới",
                    duration: "45 phút",
                    status: "not-started",
                    day: "Thứ 2",
                    time: "14:00",
                    week: "Tuần mới",
                  };
                  setLessonList([...lessonList, newLesson]);
                }}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm bài học
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lessonList.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">
                        {lesson.week}
                      </span>
                      <Input
                        value={lesson.title}
                        onChange={(e) =>
                          setLessonList(
                            lessonList.map((ls) =>
                              ls.id === lesson.id
                                ? { ...ls, title: e.target.value }
                                : ls,
                            ),
                          )
                        }
                        className="bg-transparent border-0 p-0 text-base font-semibold"
                      />
                      <span className="text-sm text-gray-500">
                        ({lesson.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value={lesson.day}
                        onChange={(e) =>
                          setLessonList(
                            lessonList.map((ls) =>
                              ls.id === lesson.id
                                ? { ...ls, day: e.target.value }
                                : ls,
                            ),
                          )
                        }
                        className="w-28 text-sm"
                      />
                      <Input
                        value={lesson.time}
                        onChange={(e) =>
                          setLessonList(
                            lessonList.map((ls) =>
                              ls.id === lesson.id
                                ? { ...ls, time: e.target.value }
                                : ls,
                            ),
                          )
                        }
                        className="w-20 text-sm"
                        type="time"
                      />
                      <Select
                        value={lesson.subject}
                        onValueChange={(v) =>
                          setLessonList(
                            lessonList.map((ls) =>
                              ls.id === lesson.id ? { ...ls, subject: v } : ls,
                            ),
                          )
                        }
                        className="w-32"
                      >
                        <SelectTrigger className="w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(subjectConfig).map((k) => (
                            <SelectItem key={k} value={k}>
                              {(subjectConfig as any)[k].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={lesson.status}
                      onValueChange={(v) =>
                        setLessonList(
                          lessonList.map((ls) =>
                            ls.id === lesson.id ? { ...ls, status: v } : ls,
                          ),
                        )
                      }
                    >
                      <SelectTrigger className="w-40 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Chưa học</SelectItem>
                        <SelectItem value="in-progress">Đang học</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() =>
                        setLessonList(
                          lessonList.filter((ls) => ls.id !== lesson.id),
                        )
                      }
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowEditDialog(false)}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              Đóng
            </Button>
            <Button
              onClick={() => {
                setShowEditDialog(false);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl"
            >
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Practice Dialog (existing + selection) */}
      <Dialog open={showPracticeDialog} onOpenChange={setShowPracticeDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              📝 Tạo bài ôn cá nhân h��a
            </DialogTitle>
            <DialogDescription>
              Tạo nhanh một bài ôn theo yêu cầu của học sinh
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Chọn môn</Label>
                <Select
                  value={practiceForm.subject}
                  onValueChange={(v) =>
                    setPracticeForm({ ...practiceForm, subject: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(subjectConfig).map((k) => (
                      <SelectItem key={k} value={k}>
                        {(subjectConfig as any)[k].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Chủ đề / Kỹ năng</Label>
                <Input
                  value={practiceForm.topic}
                  onChange={(e) =>
                    setPracticeForm({ ...practiceForm, topic: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Số câu hỏi</Label>
                <Input
                  type="number"
                  value={String(practiceForm.numQuestions)}
                  onChange={(e) =>
                    setPracticeForm({
                      ...practiceForm,
                      numQuestions: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Độ khó</Label>
                <Select
                  value={practiceForm.difficulty}
                  onValueChange={(v) =>
                    setPracticeForm({ ...practiceForm, difficulty: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Dễ</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="hard">Khó</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Liên kết với mục tiêu</Label>
                <Select
                  value={practiceForm.goalId}
                  onValueChange={(v) =>
                    setPracticeForm({ ...practiceForm, goalId: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {studyGoals.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4">
              <Label className="mb-2">Chọn bài học từ lộ trình</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto p-2">
                {lessonList.map((l) => (
                  <label
                    key={l.id}
                    className={`flex items-center gap-3 p-2 rounded-lg border ${practiceSelectedLessonIds.includes(l.id) ? "bg-primary/10 border-primary" : "bg-white border-gray-100"}`}
                  >
                    <input
                      type="checkbox"
                      checked={practiceSelectedLessonIds.includes(l.id)}
                      onChange={() => togglePracticeLesson(l.id)}
                    />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{l.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {l.week} • {l.day} • {l.time}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {
                        subjectConfig[l.subject as keyof typeof subjectConfig]
                          .name
                      }
                    </div>
                  </label>
                ))}
                {lessonList.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Không có bài học trong lộ trình. Tạo lộ trình trước khi
                    chọn.
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={generatePractice}
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                Tạo bài ôn
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPracticeQuestions([]);
                  setPracticeSelectedLessonIds([]);
                }}
              >
                Xóa kết quả
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Danh sách câu hỏi</h4>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={addQuestion}
                    className="bg-green-600 text-white"
                  >
                    Thêm câu hỏi
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {practiceQuestions.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Chưa có câu hỏi. Nhấn "Tạo bài ôn" để sinh câu hỏi mẫu.
                  </div>
                )}
                {practiceQuestions.map((q, i) => (
                  <div
                    key={q.id}
                    className="p-3 border border-gray-200 rounded-lg bg-white flex items-start gap-3"
                  >
                    <div className="flex-1">
                      <Input
                        value={q.text}
                        onChange={(e) =>
                          updateQuestion(q.id, { text: e.target.value })
                        }
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <Select
                          value={q.difficulty}
                          onValueChange={(v) =>
                            updateQuestion(q.id, { difficulty: v })
                          }
                        >
                          <SelectTrigger className="w-36 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Dễ</SelectItem>
                            <SelectItem value="medium">Trung bình</SelectItem>
                            <SelectItem value="hard">Khó</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => moveQuestion(i, "up")}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => moveQuestion(i, "down")}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteQuestion(q.id)}
                        className="text-red-600"
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowPracticeDialog(false)}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 rounded-xl"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                setShowPracticeDialog(false);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white rounded-xl"
            >
              Lưu bài ôn
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
