import "./global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Courses from "./pages/Courses";
import StudyPlan from "./pages/StudyPlan";
import Chatbot from "./pages/Chatbot";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Lesson from "./pages/Lesson";
import Exercise from "./pages/Exercise";
import ExerciseResults from "./pages/ExerciseResults";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCourses from "./pages/AdminCourses";
import AdminLearningPaths from "./pages/AdminLearningPaths";
import AdminExercises from "./pages/AdminExercises";
import AdminReports from "./pages/AdminReports";
import PlaceholderPage from "./components/PlaceholderPage";

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
        <Route path="/courses" element={<Courses />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/lesson/:lessonId/exercise/:id" element={<Exercise />} />
        <Route
          path="/lesson/:lessonId/exercise/:id/results"
          element={<ExerciseResults />}
        />
        <Route path="/lesson/:lessonId/quiz/:id" element={<Quiz />} />
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
        <FloatingChatbot />
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
