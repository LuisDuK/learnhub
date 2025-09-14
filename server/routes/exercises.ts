import { RequestHandler } from "express";
import {
  Exercise,
  ExerciseAnswerDTO,
  SaveExerciseProgressRequest,
  SaveExerciseProgressResponse,
  SubmitExerciseRequest,
  SubmitExerciseResponse,
} from "@shared/api";

function getUserId(req: any): string {
  return (req.headers["x-user-id"] as string) || "demo-user";
}

const exerciseStore: Record<string, Exercise> = {
  "1": {
    id: 1,
    lessonId: 1,
    title: "🔢 Bài tập phép cộng và trừ",
    description:
      "Hoàn thành các bài tập sau để củng cố kiến thức về phép cộng và phép trừ trong phạm vi 100.",
    timeLimit: 30,
    totalPoints: 100,
    questions: [
      { id: 1, type: "multiple_choice", question: "25 + 34 = ?", options: ["59", "69", "58", "61"], correctAnswer: 0, points: 10 },
      { id: 2, type: "multiple_choice", question: "78 - 29 = ?", options: ["49", "51", "48", "50"], correctAnswer: 0, points: 10 },
      { id: 3, type: "multiple_choice", question: "42 + 18 = ?", options: ["58", "60", "62", "59"], correctAnswer: 1, points: 10 },
      { id: 4, type: "multiple_choice", question: "95 - 37 = ?", options: ["58", "59", "57", "56"], correctAnswer: 0, points: 10 },
      { id: 5, type: "multiple_choice", question: "Lan có 56 viên kẹo, cho bạn 18 viên. Hỏi Lan còn lại bao nhiêu viên?", options: ["38 viên", "36 viên", "40 viên", "42 viên"], correctAnswer: 0, points: 15 },
      { id: 6, type: "essay", question: "Giải thích cách tính 45 + 23 theo từng bước", points: 20, hint: "Hãy viết từng bước một cách chi tiết" },
      { id: 7, type: "essay", question: "Tính 67 - 39 và giải thích tại sao phải mượn khi thực hiện phép trừ này", points: 15, hint: "Chú ý đến việc mượn từ hàng chục" },
    ],
  },
};

interface ExerciseProgress {
  answers: ExerciseAnswerDTO[];
  timeRemainingSec: number;
  currentQuestionIndex: number;
  lastSavedIso: string;
  submitted?: boolean;
  score?: number;
  maxScore?: number;
  percentage?: number;
}

const progressStore: Record<string, Record<string, ExerciseProgress>> = {};

export const getExercise: RequestHandler = (req, res) => {
  const { id } = req.params as { id: string };
  const ex = exerciseStore[id];
  if (!ex) return res.status(404).json({ error: "Không tìm thấy bài tập" });
  res.json({ exercise: ex });
};

export const saveExerciseProgress: RequestHandler = (req, res) => {
  const { id } = req.params as { id: string };
  const ex = exerciseStore[id];
  if (!ex) return res.status(404).json({ error: "Không tìm thấy bài tập" });

  const body = req.body as SaveExerciseProgressRequest;
  const userId = getUserId(req);
  progressStore[userId] ||= {};

  const now = new Date().toISOString();
  progressStore[userId][id] = {
    answers: Array.isArray(body.answers) ? body.answers : [],
    timeRemainingSec: Math.max(0, Math.min(body.timeRemainingSec ?? ex.timeLimit * 60, ex.timeLimit * 60)),
    currentQuestionIndex: Math.max(0, Math.min(body.currentQuestionIndex ?? 0, ex.questions.length - 1)),
    lastSavedIso: now,
    submitted: progressStore[userId][id]?.submitted || false,
    score: progressStore[userId][id]?.score,
    maxScore: progressStore[userId][id]?.maxScore,
    percentage: progressStore[userId][id]?.percentage,
  };

  const response: SaveExerciseProgressResponse = { ok: true, lastSavedIso: now };
  res.json(response);
};

export const submitExercise: RequestHandler = (req, res) => {
  const { id } = req.params as { id: string };
  const ex = exerciseStore[id];
  if (!ex) return res.status(404).json({ error: "Không tìm thấy bài tập" });

  const body = req.body as SubmitExerciseRequest;
  const userId = getUserId(req);
  progressStore[userId] ||= {};

  // Simple grading similar to client logic
  let score = 0;
  let maxScore = 0;
  ex.questions.forEach((q) => {
    maxScore += q.points;
    const ans = body.answers.find((a) => a.questionId === q.id);
    if (!ans) return;
    if (q.type === "multiple_choice") {
      if (ans.selectedOption === q.correctAnswer) score += q.points;
    } else {
      const len = (ans.content || "").trim().length;
      if (len >= 50) score += Math.floor(q.points * 0.9);
      else if (len >= 20) score += Math.floor(q.points * 0.6);
      else if (len > 0 || ans.hasImage) score += Math.floor(q.points * 0.3);
    }
  });
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  const now = new Date().toISOString();
  progressStore[userId][id] = {
    answers: Array.isArray(body.answers) ? body.answers : [],
    timeRemainingSec: Math.max(0, progressStore[userId][id]?.timeRemainingSec ?? ex.timeLimit * 60),
    currentQuestionIndex: progressStore[userId][id]?.currentQuestionIndex ?? 0,
    lastSavedIso: now,
    submitted: true,
    score,
    maxScore,
    percentage,
  };

  const response: SubmitExerciseResponse = { ok: true, score, maxScore, percentage };
  res.json(response);
};
