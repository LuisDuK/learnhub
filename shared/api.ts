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

// ------- Exercises (UC-04) -------
export type ExerciseQuestionType = "multiple_choice" | "essay";

export interface ExerciseQuestion {
  id: number;
  type: ExerciseQuestionType;
  question: string;
  options?: string[];
  correctAnswer?: number;
  points: number;
  hint?: string;
}

export interface Exercise {
  id: number;
  lessonId?: string | number;
  title: string;
  description: string;
  timeLimit: number; // minutes
  totalPoints: number;
  questions: ExerciseQuestion[];
}

export interface ExerciseAnswerDTO {
  questionId: number;
  type: ExerciseQuestionType;
  content?: string;
  selectedOption?: number;
  hasImage?: boolean;
}

export interface SaveExerciseProgressRequest {
  answers: ExerciseAnswerDTO[];
  timeRemainingSec: number;
  currentQuestionIndex: number;
}

export interface SaveExerciseProgressResponse {
  ok: boolean;
  lastSavedIso: string;
}

export interface SubmitExerciseRequest {
  answers: ExerciseAnswerDTO[];
  timeSpentSec: number;
}

export interface SubmitExerciseResponse {
  ok: boolean;
  score: number;
  maxScore: number;
  percentage: number;
}

// ------- AI Config (UC-07.x) -------
export type AiFeatureModule = "Chatbot" | "Bài tập" | "Chấm bài" | "Lộ trình" | "Báo cáo";

export interface AiPromptVariable {
  name: string; // e.g., grade
  type: "text" | "textarea" | "number" | "select";
  description?: string;
  options?: string[]; // for select
  min?: number; // for number
  max?: number; // for number
}

export interface AiPromptVersion {
  version: number; // 1..n
  name: string;
  module: AiFeatureModule;
  content: string;
  variables: AiPromptVariable[];
  createdAt: string; // ISO
  createdBy?: string;
}

export interface AiPromptTemplate {
  id: number;
  name: string; // unique
  module: AiFeatureModule;
  content: string;
  variables: AiPromptVariable[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
  deletedAt?: string | null;
  versions: AiPromptVersion[];
}

export interface ListPromptsResponse { items: AiPromptTemplate[] }
export interface CreatePromptRequest {
  name: string;
  module: AiFeatureModule;
  content: string;
  variables: AiPromptVariable[];
}
export interface UpdatePromptRequest extends CreatePromptRequest {}
export interface CreatePromptResponse { item: AiPromptTemplate }

export interface CopyPromptResponse { item: AiPromptTemplate }
export interface PromptVersionsResponse { versions: AiPromptVersion[] }

export interface RollbackPromptResponse { item: AiPromptTemplate }

export interface DeletePromptResponse { success: boolean }

export interface AiModelParams {
  provider?: "openai" | "anthropic" | "other";
  model: string;
  temperature: number; // 0..2
  maxTokens: number; // >0
  top_p?: number; // 0..1
  frequency_penalty?: number; // -2..2
  presence_penalty?: number; // -2..2
  stop?: string[];
  apiKeyMasked?: string; // masked for UI
}

export interface GetModelParamsResponse { params: AiModelParams }
export interface SaveModelParamsRequest extends AiModelParams { apiKey?: string }
export interface SaveModelParamsResponse { ok: boolean; params: AiModelParams }

// ------- Survey (UC-07.2) -------
export type SurveyQuestionType = "likert" | "text";

export interface SurveyQuestion {
  id: string; // stable id within survey
  type: SurveyQuestionType;
  text: string;
  min?: number; // for likert, default 1
  max?: number; // for likert, default 5
  required?: boolean;
}

export interface Survey {
  id: number;
  title: string;
  description?: string;
  questions: SurveyQuestion[]; // <= 5
  isActive: boolean;
  createdAt: string; // ISO
}

export interface ListSurveysResponse { items: Survey[] }
export interface CreateSurveyRequest {
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  isActive?: boolean;
}
export interface CreateSurveyResponse { item: Survey }

export interface SurveyAnswer {
  questionId: string;
  value: number | string; // number for likert
}

export interface SubmitSurveyResponseRequest {
  surveyId: number;
  userId?: string; // optional, will be anonymized if present
  answers: SurveyAnswer[];
}

export interface SurveyResponseItem {
  id: number;
  surveyId: number;
  createdAt: string;
  anonymizedUser?: string; // hashed id
  answers: SurveyAnswer[];
}

export interface SubmitSurveyResponseResponse { ok: boolean }
export interface ListSurveyResponsesResponse { items: SurveyResponseItem[] }
