import "./global.css";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Courses from "./pages/Courses";
import StudyPlan from "./pages/StudyPlan";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Lesson from "./pages/Lesson";
import Learn from "./pages/Learn";
import Exercise from "./pages/Exercise";
import ExerciseResults from "./pages/ExerciseResults";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCourses from "./pages/AdminCourses";
import AdminAIConfig from "./pages/AdminAIConfig";
import AdminTeacherApproval from "./pages/AdminTeacherApproval";
// Teacher pages
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherAIGenerator from "./pages/TeacherAIGenerator";
import TeacherSecurity from "./pages/TeacherSecurity";
import TeacherLessons from "./pages/TeacherLessons";
import TeacherLessonCreate from "./pages/TeacherLessonCreate";
import StudentProfile from "./pages/StudentProfile";
import { PlaceholderPage } from "./components/PlaceholderPage";
// Mobile layout & pages
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHome from "@/pages/mobile/MobileHome";
import MobileCourses from "@/pages/mobile/MobileCourses";
import MobileAssignments from "@/pages/mobile/MobileAssignments";
import MobileProgress from "@/pages/mobile/MobileProgress";
import MobileProfile from "@/pages/mobile/MobileProfile";
import MobileLogin from "@/pages/mobile/MobileLogin";
import MobileRegister from "@/pages/mobile/MobileRegister";
import MobileCourseDetail from "@/pages/mobile/MobileCourseDetail";
import MobileQuiz from "@/pages/mobile/MobileQuiz";
import MobileResults from "@/pages/mobile/MobileResults";
import MobileProgressDetail from "@/pages/mobile/MobileProgressDetail";
import MobileLearningPath from "@/pages/mobile/MobileLearningPath";
import MobileLesson from "@/pages/mobile/MobileLesson";
import MobileMaterial from "@/pages/mobile/MobileMaterial";
import MobileLearningPathCreate from "@/pages/mobile/MobileLearningPathCreate";

const queryClient = new QueryClient();

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route path="/subjects" element={<Courses />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/lesson/:lessonId/exercise/:id" element={<Exercise />} />
        <Route
          path="/lesson/:lessonId/exercise/:id/results"
          element={<ExerciseResults />}
        />
        <Route path="/lesson/:lessonId/quiz/:id" element={<Quiz />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/subjects" element={<AdminCourses />} />
        <Route path="/admin/ai-config" element={<AdminAIConfig />} />
        <Route
          path="/admin/teacher-approvals"
          element={<Navigate to="/admin/users?tab=approvals" replace />}
        />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/ai-generator" element={<TeacherAIGenerator />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/security" element={<TeacherSecurity />} />
        <Route path="/teacher/lessons" element={<TeacherLessons />} />
        <Route path="/teacher/lessons/new" element={<TeacherLessonCreate />} />

        {/* Mobile App Routes */}
        <Route path="/m/login" element={<MobileLogin />} />
        <Route path="/m/register" element={<MobileRegister />} />
        <Route path="/m" element={<MobileLayout />}>
          <Route index element={<MobileHome />} />
          <Route path="subjects" element={<MobileCourses />} />
          <Route path="assignments" element={<MobileAssignments />} />
          <Route path="progress" element={<MobileProgress />} />
          <Route path="progress/detail" element={<MobileProgressDetail />} />
          <Route path="plan" element={<MobileLearningPath />} />
          <Route path="plan/create" element={<MobileLearningPathCreate />} />
          <Route path="profile" element={<MobileProfile />} />
          <Route path="course/:id" element={<MobileCourseDetail />} />
          <Route
            path="course/:id/lesson/:lessonId"
            element={<MobileLesson />}
          />
          <Route
            path="course/:id/material/:materialId"
            element={<MobileMaterial />}
          />
          <Route path="quiz/:id" element={<MobileQuiz />} />
          <Route path="results" element={<MobileResults />} />
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <StrictMode>
      <AppProviders>
        <AppRoutes />
        <Toaster />
        <Sonner />
      </AppProviders>
    </StrictMode>
  );
}

// Get or create root instance to handle HMR properly
const container = document.getElementById("root")!;
let root = (globalThis as any).__react_root__;

if (!root) {
  root = createRoot(container);
  (globalThis as any).__react_root__ = root;
}

root.render(<App />);
