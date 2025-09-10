import { RequestHandler } from "express";
import {
  GetLessonResponse,
  Lesson,
  LessonProgress,
  SaveLessonProgressRequest,
  SaveLessonProgressResponse,
  SubmitQuizAnswerRequest,
  SubmitQuizAnswerResponse,
} from "@shared/api";

// In-memory stores (demo)
const lessonStore: Record<string, Lesson> = {
  "1": {
    id: "1",
    title: "Phép cộng và phép trừ trong phạm vi 100",
    isPublic: true,
    // Demo mp4. In production, store and serve from a CDN.
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    durationSec: 30,
    quizCues: [
      {
        timeSec: 5,
        question: {
          id: "q1",
          type: "multiple_choice",
          text: "25 + 34 = ?",
          options: ["59", "69", "58", "61"],
          correctOptionIndex: 0,
          required: true,
        },
      },
      {
        timeSec: 12,
        question: {
          id: "q2",
          type: "short_answer",
          text: "Giải thích ngắn gọn vì sao phép trừ 67 - 39 cần mượn",
          required: true,
        },
      },
    ],
  },
};

// progressStore[userId][lessonId] => LessonProgress
const progressStore: Record<string, Record<string, LessonProgress>> = {};
// answeredStore[userId][lessonId] => Set of answered quiz ids
const answeredStore: Record<string, Record<string, Set<string>>> = {};

function getUserId(req: any): string {
  // In production integrate auth; here use header or fallback demo
  return (req.headers["x-user-id"] as string) || "demo-user";
}

export const getLesson: RequestHandler = (req, res) => {
  const { id } = req.params as { id: string };
  const lesson = lessonStore[id];
  if (!lesson) return res.status(404).json({ error: "Không tìm thấy bài học" });
  if (!lesson.isPublic)
    return res.status(403).json({ error: "Bài học chưa sẵn sàng" });
  const response: GetLessonResponse = { lesson };
  res.json(response);
};

export const saveLessonProgress: RequestHandler = (req, res) => {
  const { id } = req.params as { id: string };
  const lesson = lessonStore[id];
  if (!lesson) return res.status(404).json({ error: "Không tìm thấy bài học" });

  const body = req.body as SaveLessonProgressRequest;
  const userId = getUserId(req);
  progressStore[userId] ||= {};
  const existing = progressStore[userId][id];

  const next: LessonProgress = {
    positionSec: Math.max(0, Math.min(body.positionSec ?? 0, lesson.durationSec)),
    completed: Boolean(body.completed) || existing?.completed || false,
    lastUpdatedIso: new Date().toISOString(),
    views: existing ? existing.views : 0,
  };

  // Increment views if this is the first progress save for this lesson
  if (!existing) {
    next.views = 1;
  } else {
    next.views = existing.views;
  }

  progressStore[userId][id] = next;
  const response: SaveLessonProgressResponse = { ok: true, progress: next };
  res.json(response);
};

export const submitQuizAnswer: RequestHandler = (req, res) => {
  const { id, qid } = req.params as { id: string; qid: string };
  const lesson = lessonStore[id];
  if (!lesson) return res.status(404).json({ error: "Không tìm thấy bài học" });

  const cue = lesson.quizCues.find((c) => c.question.id === qid);
  if (!cue) return res.status(404).json({ error: "Không tìm thấy câu hỏi" });

  const body = req.body as SubmitQuizAnswerRequest;
  let correct = true;
  if (cue.question.type === "multiple_choice") {
    if (typeof body.answer !== "number") correct = false;
    else correct = body.answer === cue.question.correctOptionIndex;
  } else {
    // short answer: accept if non-empty length >= 5 chars, demo logic
    if (typeof body.answer !== "string") correct = false;
    else correct = body.answer.trim().length >= 5;
  }

  const userId = getUserId(req);
  answeredStore[userId] ||= {};
  answeredStore[userId][id] ||= new Set<string>();
  if (correct) answeredStore[userId][id].add(qid);

  const response: SubmitQuizAnswerResponse = { correct };
  res.json(response);
};

export const getAnsweredForLesson = (userId: string, lessonId: string) => {
  return answeredStore[userId]?.[lessonId] || new Set<string>();
};
