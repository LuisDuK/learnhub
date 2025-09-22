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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import StudyPlanLayout from "@/components/StudyPlanLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock study plan data focusing on Math, Literature, English
const studyGoals = [
  { id: "midterm", label: "🎯 Ôn tập thi giữa kỳ", duration: "2 tuần" },
  { id: "grammar", label: "📚 Ôn tập ngữ pháp", duration: "3 tuần" },
  { id: "exam", label: "📝 Luyện thi cuối kỳ", duration: "4 tuần" },
  { id: "vocabulary", label: "📖 Mở rộng từ vựng", duration: "6 tuần" },
];

const ageGroups = [
  "5-6 tuổi",
  "6-7 tuổi",
  "7-8 tuổi",
  "8-9 tuổi",
  "9-10 tuổi",
  "10-12 tuổi",
];
const exerciseTypes = [
  { value: "multiple_choice", label: "Trắc nghiệm" },
  { value: "short_answer", label: "Trả lời ngắn" },
  { value: "essay", label: "Tự luận" },
  { value: "true_false", label: "Đúng/Sai" },
  { value: "fill_blank", label: "Điền từ" },
  { value: "matching", label: "Nối từ" },
];

const weeklyPlan = [
  {
    week: "Tuần 1",
    startDate: "20/01 - 26/01",
    lessons: [
      {
        id: 1,
        subject: "math",
        title: "Phân số và số thập phân",
        duration: "45 phút",
        status: "completed",
        day: "Thứ 2",
        time: "14:00",
      },
      
      {
        id: 3,
        subject: "english",
        title: "Present Simple Tense",
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
        title: "Phép tính với phân số",
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
        title: "Viết văn tả ng��ời",
        duration: "90 phút",
        status: "not-started",
        day: "Thứ 2",
        time: "15:00",
      },
      {
        id: 6,
        subject: "english",
        title: "Writing - My Family",
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
        title: "Biểu đồ và thống kê",
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
        title: "Speaking Practice",
        duration: "45 phút",
        status: "not-started",
        day: "Thứ 2",
        time: "16:00",
      },
      {
        id: 9,
        subject: "math",
        title: "Hình học cơ bản",
        duration: "60 phút",
        status: "not-started",
        day: "Thứ 4",
        time: "14:00",
      },
      {
        id: 10,
        subject: "literature",
        title: "Đọc hiểu văn bản",
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

type PracticeQuestion = { id: number; text: string; difficulty: string; type: "multiple_choice" | "essay"; options?: string[] };

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

  // mark every Nth lesson overall as a review session (occasional)
  const REVIEW_INTERVAL = 6;
  const reviewLessonIds = useMemo(() => {
    const s = new Set<number>();
    lessonList.forEach((l, idx) => {
      if ((idx + 1) % REVIEW_INTERVAL === 0) s.add(l.id);
    });
    return s;
  }, [lessonList]);

  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfSrc, setPdfSrc] = useState("");

  const { toast } = useToast();

  const [practiceForm, setPracticeForm] = useState({
    subject: "math",
    topic: "",
    numQuestions: 5,
    difficulty: "medium",
    goalId: "midterm",
    ageGroup: "",
    exerciseType: "multiple_choice",
    inputMode: "description",
    objective: "",
    objectiveImage: null as File | null,
    referenceDoc: null as File | null,
  });
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);
  const [practiceSelectedLessonIds, setPracticeSelectedLessonIds] = useState<
    number[]
  >([]);

  const [practiceHistory, setPracticeHistory] = useState<any[]>([]);
  const [showPracticePreviewDialog, setShowPracticePreviewDialog] = useState(false);
  const [showPracticeAttemptDialog, setShowPracticeAttemptDialog] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [showPracticeHistoryDetailDialog, setShowPracticeHistoryDetailDialog] = useState(false);
  const [practiceHistoryDetail, setPracticeHistoryDetail] = useState<any | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("practiceHistory");
      if (raw) setPracticeHistory(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

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

  const openVideo = (
    url?: string,
    title?: string,
    description?: string,
    estimatedMin?: number,
  ) => {
    if (!url) return;
    navigate("/learn", {
      state: {
        type: "video",
        title: title || "Bài học",
        description,
        src: url,
      },
    });
  };

  const openPdf = (
    url?: string,
    title?: string,
    description?: string,
    estimatedMin?: number,
  ) => {
    if (!url) return;
    navigate("/learn", {
      state: {
        type: "document",
        title: title || "Tài liệu",
        description,
        src: url,
        estimatedDurationSec: (estimatedMin || 10) * 60,
      },
    });
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
  const [quizFeedback, setQuizFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);

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
    const sampleMp4 =
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const src =
      typeof (lesson as any).videoUrl === "string" &&
      (lesson as any).videoUrl.endsWith(".mp4")
        ? (lesson as any).videoUrl
        : sampleMp4;
    const subject = subjectConfig[lesson.subject as keyof typeof subjectConfig];
    const descParts = [
      subject.name,
      lesson.duration,
      lesson.day && `${lesson.day} ${lesson.time}`,
    ].filter(Boolean);
    const conceptTags: string[] = [];
    const lowerTitle = stripEmojis(lesson.title).toLowerCase();
    if (/cộng/.test(lowerTitle)) conceptTags.push("addition");
    if (/trừ/.test(lowerTitle)) conceptTags.push("subtraction");
    if (
      subject.name.toLowerCase().includes("toán") &&
      conceptTags.length === 0
    ) {
      conceptTags.push("addition");
    }
    navigate("/learn", {
      state: {
        type: "video",
        title: stripEmojis(lesson.title),
        description: descParts.join(" • "),
        src,
        lessonId: String(lesson.id),
        conceptTags,
        promptTimesSec: [60, 120, 180],
      },
    });
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
    if (
      (currentLesson && !(currentLesson as any).quizMarkers) ||
      videoMarkers.length === 0
    ) {
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
      setQuizFeedback("correct");
      // keep dialog open until user explicitly continues
    } else {
      // provide suggestion: let student replay last 10s and allow retry
      const backTo = Math.max(0, (videoMarkers[currentMarkerIndex] || 0) - 10);
      if (videoRef.current) {
        videoRef.current.currentTime = backTo;
        setVideoCurrentTime(backTo);
      }
      setQuizFeedback("incorrect");
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
    return s
      .replace(
        /([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u26FF\u2700-\u27BF])/g,
        "",
      )
      .trim();
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
      const questions: PracticeQuestion[] = [];
      selectedLessons.forEach((lesson, idx) => {
        const count =
          idx === selectedLessons.length - 1
            ? Number(numQuestions) - questions.length
            : perLesson;
        for (let i = 0; i < count; i++) {
          const prefer = practiceForm.exerciseType;
          const isMCQ = prefer === "multiple_choice" ? true : prefer === "essay" ? false : ((idx + i) % 3) !== 2;
          let text = "";
          let options: string[] | undefined;
          if (lesson.subject === "math" && isMCQ) {
            const a = 10 + ((lesson.id + i) % 20);
            const b = 3 + ((lesson.id + idx) % 15);
            const correct = a + b;
            options = [String(correct), String(correct + 1), String(correct - 1), String(correct + 2)];
            text = `Tính: ${a} + ${b} = ?`;
          } else if (isMCQ) {
            const base = stripEmojis(lesson.title);
            options = [
              `Ý chính liên quan đến ${topic || base}`,
              "Chi tiết phụ trong bài",
              "Thông tin không đúng",
              "Ví dụ trái ngược",
            ];
            text = `${base} — ${topic || "chủ đề"}: Chọn phát biểu đúng`;
          } else {
            text = `Trình bày ngắn gọn: ${stripEmojis(lesson.title)} — ${topic || "chủ đề trọng tâm"}`;
          }
          questions.push({
            id: Math.floor(Date.now() + Math.random() * 100000 + i),
            text,
            difficulty,
            type: isMCQ ? "multiple_choice" : "essay",
            options,
          });
        }
      });
      setPracticeQuestions(questions);
      setShowPracticeDialog(false);
      setShowPracticePreviewDialog(true);
      return;
    }

    const questions: PracticeQuestion[] = Array.from({ length: Number(numQuestions) }).map((_, i) => {
      const prefer = practiceForm.exerciseType;
      const isMCQ = prefer === "multiple_choice" ? true : prefer === "essay" ? false : (i % 3) !== 2;
      if (subject === "math" && isMCQ) {
        const a = 8 + (i % 15);
        const b = 2 + ((i * 7) % 12);
        const correct = a + b;
        return {
          id: Math.floor(Date.now() + i),
          text: `Tính: ${a} + ${b} = ?`,
          difficulty,
          type: "multiple_choice",
          options: [String(correct), String(correct + 1), String(correct - 1), String(correct + 2)],
        };
      }
      if (isMCQ) {
        const subjName = subjectConfig[subject as keyof typeof subjectConfig].name;
        return {
          id: Math.floor(Date.now() + i),
          text: `${subjName} — ${topic || "chủ đề"}: Chọn phát biểu đúng`,
          difficulty,
          type: "multiple_choice",
          options: [
            `Ý đúng về ${topic || subjName}`,
            "Chi tiết không chính xác",
            "Thông tin ngoài phạm vi",
            "Ví dụ trái ngược",
          ],
        };
      }
      return {
        id: Math.floor(Date.now() + i),
        text: `Tự luận: Trình bày ${topic || "chủ đề trọng tâm"} trong môn ${subjectConfig[subject as keyof typeof subjectConfig].name}`,
        difficulty,
        type: "essay",
      };
    });
    setPracticeQuestions(questions);
    setShowPracticeDialog(false);
    setShowPracticePreviewDialog(true);
  };

  const addQuestion = () => {
    setPracticeQuestions([
      ...practiceQuestions,
      { id: Date.now(), text: "Trình bày quan điểm của em về chủ đề đã chọn.", difficulty: "medium", type: "essay" },
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

  // Helpers for stats
  const parseMinutes = (d?: string) => {
    if (!d) return 0;
    const n = Number(String(d).replace(/[^0-9]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };
  const getLessonScore = (id: number): number | null => {
    const raw = localStorage.getItem(`lessonScore-${id}`);
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) ? n : null;
  };
  const isLessonLate = (id: number, status: string) => {
    try {
      const raw = localStorage.getItem("studyPlanReminders");
      if (!raw) return false;
      const list = JSON.parse(raw) as { lessonId: number; scheduled: string }[];
      const item = list.find((r) => r.lessonId === id);
      if (!item) return false;
      const when = new Date(item.scheduled).getTime();
      return when < Date.now() && status !== "completed";
    } catch {
      return false;
    }
  };
  const totalLessons = lessonList.length;
  const completedLessons = lessonList.filter(
    (l) => l.status === "completed",
  ).length;
  const remainingLessons = totalLessons - completedLessons;
  const completionRate = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
  const totalPlannedMin = lessonList.reduce(
    (s, l) => s + parseMinutes(l.duration),
    0,
  );
  const timeSpentMin = lessonList.reduce((s, l) => {
    const dur = parseMinutes(l.duration);
    if (l.status === "completed") return s + dur;
    if (l.status === "in-progress") return s + Math.floor(dur * 0.5);
    return s;
  }, 0);
  const scores = lessonList
    .map((l) => getLessonScore(l.id))
    .filter((n): n is number => n != null);
  const averageScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;
  const lateLessons = lessonList.filter((l) =>
    isLessonLate(l.id, l.status),
  ).length;
  const formatMinutes = (m: number) => {
    if (m < 60) return `${m} phút`;
    const h = Math.floor(m / 60);
    const r = m % 60;
    return r ? `${h}g ${r}p` : `${h}g`;
  };

  // Seed demo scores for completed/in-progress lessons if missing
  const seededScore = (id: number, status: string) => {
    const base = (id * 37) % 21; // 0..20
    const min = status === "completed" ? 80 : 60;
    return Math.min(100, min + base);
  };
  useEffect(() => {
    lessonList.forEach((l) => {
      if (
        (l.status === "completed" || l.status === "in-progress") &&
        getLessonScore(l.id) == null
      ) {
        localStorage.setItem(
          `lessonScore-${l.id}`,
          String(seededScore(l.id, l.status)),
        );
      }
    });
  }, [lessonList]);

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
              Kế hoạch học tập được cá nhân hóa cho bé
            </p>
          </div>
          <div className="flex gap-3">
            
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
              Tạo bài ôn 
            </Button>
          </div>
        </div>

        {/* Tổng quan tiến độ */}
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              📊 Tổng quan tiến độ
            </CardTitle>
          
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span>Hoàn thành</span>
                <span className="font-semibold">{completionRate}%</span>
              </div>
              <Progress value={completionRate} />
              <div className="mt-2 text-xs text-muted-foreground">
                {completedLessons}/{totalLessons} bài học đã hoàn thành — còn{" "}
                {remainingLessons}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border bg-white">
                <div className="text-xs text-muted-foreground">
                  Số bài đã học
                </div>
                <div className="text-lg font-bold">{completedLessons} bài</div>
              </div>
              <div className="p-3 rounded-lg border bg-white">
                <div className="text-xs text-muted-foreground">
                  Tổng số bài (lộ trình)
                </div>
                <div className="text-lg font-bold">{totalLessons} bài</div>
              </div>
              <div className="p-3 rounded-lg border bg-white">
                <div className="text-xs text-muted-foreground">Bài trễ hạn</div>
                <div className="text-lg font-bold">{lateLessons}</div>
              </div>
              <div className="p-3 rounded-lg border bg-white">
                <div className="text-xs text-muted-foreground">
                  Điểm trung bình
                </div>
                <div className="text-lg font-bold">
                  {averageScore != null ? `${averageScore}%` : "—"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-secondary/20 shadow-lg bg-gradient-to-br from-white to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
              
              <span>📝 Lịch trình học tập</span>
            </CardTitle>
          
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
                      const isAvailable =
                        lesson.status === "in-progress" ||
                        lesson.status === "completed";
                      const score = getLessonScore(lesson.id);
                      const isLate = isLessonLate(lesson.id, lesson.status);
                      return (
                        <div
                          key={lesson.id}
                          className="relative flex items-start gap-4 p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-2xl flex items-center justify-center`}
                                >
                                  <div
                                    className={`h-6 w-6 rounded-md ${subject.color}`}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg md:text-xl">
                                    {stripEmojis(lesson.title)}
                                  </h4>
                                  <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground mt-1">
                                    <span className="font-medium">
                                      {subject.name}
                                    </span>
                                    <span>{lesson.day}</span>
                                    <span className="flex items-center gap-2">
                                      ⏰ {lesson.time}
                                    </span>
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
                                {isLate && (
                                  <Badge variant="destructive" className="ml-2">
                                    Trễ hạn
                                  </Badge>
                                )}
                                <Badge variant="secondary" className="ml-2">
                                  Điểm: {score != null ? `${score}%` : "—"}
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
                              <span className="ml-3 inline-flex items-center px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                Ôn tập
                              </span>
                            )}
                            {false && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 underline text-sm"
                                onClick={() =>
                                  openPdf(
                                    lesson.pdfUrl,
                                    stripEmojis(lesson.title),
                                    `${subject.name} • Tài liệu đính kèm`,
                                    Number(
                                      (lesson.duration || "").replace(
                                        /[^0-9]/g,
                                        "",
                                      ),
                                    ) || 10,
                                  )
                                }
                              >
                                Xem tài liệu
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
                <DialogDescription>
                  Trả lời để ti���p tục video
                </DialogDescription>
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
                        if (quizFeedback === "correct") {
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
                  {quizFeedback === "correct" && (
                    <div className="text-sm text-green-600">
                      Đáp án đúng! Nhấn "Tiếp tục" để tiếp tục phát video.
                    </div>
                  )}
                  {quizFeedback === "incorrect" && (
                    <div className="text-sm text-red-600">
                      Chưa đúng. Hệ thống đã tua lại 10s để ôn lại. Bạn có thể
                      thử lại.
                    </div>
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
                  <SelectItem value="2-months">2 th���ng</SelectItem>
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
                  <SelectItem value="medium">�� Trung bình</SelectItem>
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

      {/* Create Plan Panel */}
      <Sheet open={showCreatePlanDialog} onOpenChange={setShowCreatePlanDialog}>
        <SheetContent side="right" className="sm:max-w-lg w-full">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-primary">
              🛠️ Tạo lộ trình
            </SheetTitle>
            <SheetDescription>
              Tùy chỉnh và tạo lộ trình học mới
            </SheetDescription>
          </SheetHeader>

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
                placeholder="Ví dụ: Đạt 8 điểm kiểm tra gi���a kỳ"
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
        </SheetContent>
      </Sheet>

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
              Hoàn thành bài kiểm tra để hệ thống đánh giá trình độ hiện tại
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
              kiểm tra. Bạn có thể điều chỉnh thời lượng/ngày h���c cho từng
              bài.
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
              Quản lý danh sách bài học trong lộ trình của bạn
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Danh sách bài học</h3>
              <Button
                onClick={() => {
                  const order: Record<string, number> = { "not-started": 0, "in-progress": 1, "completed": 2 };
                  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];
                  const times = ["14:00", "15:00", "16:00"];
                  const sorted = [...lessonList].sort((a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99));
                  const mapped = sorted.map((l, idx) => ({
                    ...l,
                    week: `Tuần ${Math.floor(idx / 5) + 1}`,
                    day: days[idx % days.length],
                    time: times[idx % times.length],
                  }));
                  setLessonList(mapped);
                  toast({ title: "Đã tự động chỉnh sửa", description: "Lộ trình đã được sắp xếp lại theo trạng thái và phân lịch học tự động." });
                }}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Tự động chỉnh sửa
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
              📝 Tạo bài ôn 
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
                <Label>Số câu hỏi: {practiceForm.numQuestions}</Label>
                <Slider
                  value={[practiceForm.numQuestions]}
                  onValueChange={(v) => setPracticeForm({ ...practiceForm, numQuestions: v[0] })}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500"><span>1</span><span>20</span></div>
              </div>
              <div className="space-y-2">
                <Label>Độ tuổi</Label>
                <Select
                  value={practiceForm.ageGroup}
                  onValueChange={(v) => setPracticeForm({ ...practiceForm, ageGroup: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn độ tuổi" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map((age) => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Độ khó</Label>
                <Select
                  value={practiceForm.difficulty}
                  onValueChange={(v) => setPracticeForm({ ...practiceForm, difficulty: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn độ khó" />
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

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Loại câu hỏi</Label>
                <Select
                  value={practiceForm.exerciseType}
                  onValueChange={(v) => setPracticeForm({ ...practiceForm, exerciseType: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại câu hỏi" />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nguồn yêu cầu</Label>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="practiceInputMode" checked={practiceForm.inputMode === "description"} onChange={() => setPracticeForm({ ...practiceForm, inputMode: "description" })} />
                    <span>Mô tả yêu cầu</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="practiceInputMode" checked={practiceForm.inputMode === "reference"} onChange={() => setPracticeForm({ ...practiceForm, inputMode: "reference" })} />
                    <span>Tải tài liệu tham khảo</span>
                  </label>
                </div>
              </div>

              {practiceForm.inputMode === "description" ? (
                <>
                  <div className="space-y-2">
                    <Label>Mục tiêu bài ôn</Label>
                    <Input
                      value={practiceForm.objective}
                      onChange={(e) => setPracticeForm({ ...practiceForm, objective: e.target.value })}
                      placeholder="Ví dụ: củng cố phép cộng có nhớ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hoặc gửi ảnh yêu cầu</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPracticeForm({ ...practiceForm, objectiveImage: e.target.files?.[0] || null })}
                    />
                    {practiceForm.objectiveImage && (
                      <div className="mt-2">
                        <img src={URL.createObjectURL(practiceForm.objectiveImage)} alt="preview" className="h-24 object-contain border rounded" />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label>Tải tài liệu tham khảo</Label>
                  <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(e) => setPracticeForm({ ...practiceForm, referenceDoc: e.target.files?.[0] || null })} />
                  {practiceForm.referenceDoc && (
                    <div className="text-sm text-muted-foreground">Tệp đã chọn: {practiceForm.referenceDoc.name}</div>
                  )}
                  <div className="text-xs text-muted-foreground">Sau khi tải lên, hệ thống sẽ tạo bài ôn tương tự nội dung trong tài liệu.</div>
                </div>
              )}
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
                    Không có bài học trong lộ trình. Tạo l�� trình trước khi
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
              

              {/* Practice history */}
              <div className="mb-3">
                <Label className="text-sm">Lịch sử bài ôn đã tạo</Label>
                {practiceHistory.length === 0 ? (
                  <div className="text-sm text-muted-foreground mt-2">
                    Chưa có lịch sử.
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    {practiceHistory.map((h) => (
                      <div
                        key={h.id}
                        className="flex items-center justify-between p-2 border rounded bg-white"
                      >
                        <div>
                          <div className="font-medium">
                            {h.subject} — {h.topic || "(Không có chủ đề)"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(h.createdAt).toLocaleString()} •{" "}
                            {h.questions?.length || 0} câu
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setPracticeQuestions(h.questions || []);
                              setPracticeForm({
                                ...practiceForm,
                                subject: h.subject,
                                topic: h.topic,
                                difficulty: h.difficulty,
                                numQuestions: h.questions?.length || 0,
                              });
                              const data = { subject: h.subject, topic: h.topic, difficulty: h.difficulty, questions: h.questions || [], createdAt: h.createdAt };
                              localStorage.setItem("currentPractice", JSON.stringify(data));
                              navigate("/practice-quiz", { state: { practice: data } });
                            }}
                          >
                            Làm bài
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setPracticeHistoryDetail(h);
                              setShowPracticeHistoryDetailDialog(true);
                            }}
                          >
                            Xem chi tiết
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600"
                            onClick={() => {
                              const next = practiceHistory.filter(
                                (x) => x.id !== h.id,
                              );
                              setPracticeHistory(next);
                              localStorage.setItem(
                                "practiceHistory",
                                JSON.stringify(next),
                              );
                              toast({
                                title: "Đã xóa",
                                description: "Đã xóa m���c lịch sử.",
                              });
                            }}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                // save current practice to history
                if (practiceQuestions.length === 0) {
                  toast({
                    title: "Không có nội dung",
                    description: "Chưa có câu hỏi để lưu.",
                  });
                  return;
                }
                const item = {
                  id: `ph-${Date.now()}`,
                  createdAt: new Date().toISOString(),
                  subject: practiceForm.subject,
                  topic: practiceForm.topic,
                  difficulty: practiceForm.difficulty,
                  questions: practiceQuestions,
                };
                const next = [item, ...practiceHistory].slice(0, 50);
                setPracticeHistory(next);
                localStorage.setItem("practiceHistory", JSON.stringify(next));
                toast({
                  title: "Đã lưu",
                  description: "Bài ôn đã được lưu vào lịch sử.",
                });
                setShowPracticeDialog(false);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white rounded-xl"
            >
              Lưu bài ôn
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Practice Preview Dialog */}
      <Dialog open={showPracticePreviewDialog} onOpenChange={setShowPracticePreviewDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">📄 Đề bài ôn</DialogTitle>
            <DialogDescription>Xem đề trước khi bắt đầu làm bài</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {practiceQuestions.map((q, i) => (
              <div key={q.id} className="p-3 border rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Câu {i + 1}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {q.type === "multiple_choice" ? "📋 Trắc nghiệm" : "✍️ Tự luận"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{q.difficulty}</Badge>
                  </div>
                </div>
                <div className="mt-1 text-sm">{q.text}</div>
                {q.type === "multiple_choice" && q.options && (
                  <ul className="mt-2 space-y-1 text-sm list-disc pl-6">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>{String.fromCharCode(65 + idx)}. {opt}</li>
                    ))}
                  </ul>
                )}
                {q.type === "essay" && (
                  <div className="mt-2 text-xs text-muted-foreground">Dạng tự luận: học sinh sẽ nhập câu trả lời khi bắt đầu làm bài.</div>
                )}
              </div>
            ))}
            {practiceQuestions.length === 0 && (
              <div className="text-sm text-muted-foreground">Chưa có câu hỏi.</div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowPracticePreviewDialog(false)} className="flex-1">Đóng</Button>
            <Button onClick={() => { const data = { subject: practiceForm.subject, topic: practiceForm.topic, difficulty: practiceForm.difficulty, questions: practiceQuestions, createdAt: new Date().toISOString() }; localStorage.setItem("currentPractice", JSON.stringify(data)); setShowPracticePreviewDialog(false); setShowPracticeAttemptDialog(false); navigate("/practice-quiz", { state: { practice: data } }); }} className="flex-1 bg-gradient-to-r from-primary to-accent text-white">B��t đầu làm</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Practice Attempt Dialog */}
      <Dialog open={showPracticeAttemptDialog} onOpenChange={setShowPracticeAttemptDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">🧠 Làm bài ôn</DialogTitle>
            <DialogDescription>Nhập câu trả lời cho từng câu hỏi</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {practiceQuestions.map((q, i) => (
              <div key={q.id} className="p-3 border rounded-lg bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold">Câu {i + 1}</div>
                  <Badge variant="secondary" className="text-xs">
                    {q.type === "multiple_choice" ? "📋 Trắc nghiệm" : "✍️ Tự luận"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{q.difficulty}</Badge>
                </div>
                <div className="mb-2 text-sm">{q.text}</div>
                {q.type === "multiple_choice" && q.options ? (
                  <div className="space-y-2">
                    {q.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2 p-2 rounded border">
                        <input
                          type="radio"
                          name={`pq-${q.id}`}
                          checked={practiceAnswers[q.id] === opt}
                          onChange={() => setPracticeAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        />
                        <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <Textarea
                    placeholder="Nhập câu trả lời..."
                    value={practiceAnswers[q.id] || ""}
                    onChange={(e) => setPracticeAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    className="min-h-[90px]"
                  />
                )}
              </div>
            ))}
            {practiceQuestions.length === 0 && (
              <div className="text-sm text-muted-foreground">Chưa có câu hỏi.</div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowPracticeAttemptDialog(false)} className="flex-1">Hủy</Button>
            <Button
              onClick={() => {
                const attempt = {
                  id: `pa-${Date.now()}`,
                  createdAt: new Date().toISOString(),
                  subject: practiceForm.subject,
                  topic: practiceForm.topic,
                  difficulty: practiceForm.difficulty,
                  questions: practiceQuestions,
                  answers: practiceAnswers,
                };
                const attemptsRaw = localStorage.getItem("practiceAttempts");
                const attempts = attemptsRaw ? JSON.parse(attemptsRaw) : [];
                const next = [attempt, ...attempts].slice(0, 50);
                localStorage.setItem("practiceAttempts", JSON.stringify(next));
                toast({ title: "Đã nộp bài", description: "Bài ôn đã được lưu vào lịch sử." });
                setShowPracticeAttemptDialog(false);
                setPracticeAnswers({});
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
            >
              Nộp bài
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Practice History Detail Dialog */}
      <Dialog open={showPracticeHistoryDetailDialog} onOpenChange={setShowPracticeHistoryDetailDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">📚 Chi tiết bài ôn</DialogTitle>
            <DialogDescription>
              {(practiceHistoryDetail?.subject || "").toUpperCase()} — {practiceHistoryDetail?.topic || "(Không có chủ đề)"} • {practiceHistoryDetail?.questions?.length || 0} câu
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {(practiceHistoryDetail?.questions || []).map((q: any, i: number) => (
              <div key={q.id || i} className="p-3 border rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Câu {i + 1}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{q.type === "multiple_choice" ? "📋 Trắc nghiệm" : "✍️ Tự luận"}</Badge>
                    <Badge variant="outline" className="text-xs">{q.difficulty || "medium"}</Badge>
                  </div>
                </div>
                <div className="mt-1 text-sm">{q.text}</div>
                {q.type === "multiple_choice" && Array.isArray(q.options) && (
                  <ul className="mt-2 space-y-1 text-sm list-disc pl-6">
                    {q.options.map((opt: string, idx: number) => (
                      <li key={idx}>{String.fromCharCode(65 + idx)}. {opt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {(practiceHistoryDetail?.questions || []).length === 0 && (
              <div className="text-sm text-muted-foreground">Không có câu hỏi trong mục này.</div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowPracticeHistoryDetailDialog(false)} className="flex-1">Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
