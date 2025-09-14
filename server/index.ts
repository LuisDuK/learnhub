import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  listTeacherApplications,
  approveTeacherApplication,
  rejectTeacherApplication,
  createTeacherApplication,
} from "./routes/teachers";
import { getLesson, saveLessonProgress, submitQuizAnswer } from "./routes/lessons";
import { getExercise, saveExerciseProgress, submitExercise } from "./routes/exercises";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Teacher approval routes
  app.get("/api/teachers/applications", listTeacherApplications);
  app.post("/api/teachers/applications", createTeacherApplication);
  app.post("/api/teachers/applications/:id/approve", approveTeacherApplication);
  app.post("/api/teachers/applications/:id/reject", rejectTeacherApplication);

  // Lesson routes (UC-03.1)
  app.get("/api/lessons/:id", getLesson);
  app.post("/api/lessons/:id/progress", saveLessonProgress);
  app.post("/api/lessons/:id/quiz/:qid/answer", submitQuizAnswer);

  // Exercises routes (UC-04)
  app.get("/api/exercises/:id", getExercise);
  app.post("/api/exercises/:id/progress", saveExerciseProgress);
  app.post("/api/exercises/:id/submit", submitExercise);

  return app;
}
