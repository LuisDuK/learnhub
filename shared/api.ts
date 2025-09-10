/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Teacher approval types
export type TeacherApplicationStatus = "pending" | "approved" | "rejected";

export interface TeacherApplication {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  experienceYears: number;
  portfolioUrl?: string;
  createdAt: string; // ISO date
  status: TeacherApplicationStatus;
  rejectionReason?: string;
}

export interface TeacherApplicationsListResponse {
  items: TeacherApplication[];
}

export interface ApproveTeacherResponse {
  success: boolean;
  item: TeacherApplication;
}

export interface RejectTeacherRequest {
  reason: string;
}

// ------- Lessons & Quiz (UC-03.1) -------
export type QuizQuestionType = "multiple_choice" | "short_answer";

export interface LessonQuizQuestion {
  id: string;
  type: QuizQuestionType;
  text: string;
  options?: string[]; // for multiple_choice
  correctOptionIndex?: number; // for multiple_choice
  required: boolean;
}

export interface LessonQuizCue {
  timeSec: number; // timestamp in the video when quiz should appear
  question: LessonQuizQuestion;
}

export interface Lesson {
  id: string;
  title: string;
  isPublic: boolean;
  videoUrl: string;
  durationSec: number;
  quizCues: LessonQuizCue[];
}

export interface GetLessonResponse {
  lesson: Lesson;
}

export interface LessonProgress {
  positionSec: number;
  completed: boolean;
  lastUpdatedIso: string;
  views: number;
}

export interface SaveLessonProgressRequest {
  positionSec: number;
  completed?: boolean;
}

export interface SaveLessonProgressResponse {
  ok: boolean;
  progress: LessonProgress;
}

export interface SubmitQuizAnswerRequest {
  answer: number | string;
}

export interface SubmitQuizAnswerResponse {
  correct: boolean;
}
