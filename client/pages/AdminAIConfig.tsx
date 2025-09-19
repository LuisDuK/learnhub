import React, { useEffect, useMemo, useRef, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Brain,
  MessageSquare,
  FileText,
  Plus,
  Save,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  EyeOff,
  Cpu,
  Activity,
  History,
  Copy,
  Undo2,
  ListChecks,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Types (frontend-only)
type AiFeatureModule = "Bài tập" | "Lộ trình" | "Chatbot" | "Chấm bài" | "Báo cáo";

type VariableType = "text" | "textarea" | "number" | "select";
interface AiPromptVariable {
  name: string;
  type: VariableType;
  description?: string;
  options?: string[];
  min?: number;
  max?: number;
}
interface AiPromptVersion {
  version: number;
  name: string;
  module: AiFeatureModule;
  content: string;
  variables: AiPromptVariable[];
  createdAt: string;
  createdBy?: string;
}
interface AiPromptTemplate {
  id: number;
  name: string;
  module: AiFeatureModule;
  content: string;
  variables: AiPromptVariable[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  versions: AiPromptVersion[];
}

interface SurveyQuestion {
  id: string;
  type: "likert" | "text";
  text: string;
  min?: number;
  max?: number;
  required?: boolean;
}
interface Survey {
  id: number;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  isActive: boolean;
  createdAt: string;
}
interface SurveyResponseItem {
  id: number;
  surveyId: number;
  createdAt: string;
  anonymizedUser?: string;
  answers: { questionId: string; value: number | string }[];
}

// Mock data with enhanced variables and versions
const nowIso = () => new Date().toISOString();
const withInitialVersion = (p: any, idx: number): AiPromptTemplate => ({
  id: p.id ?? idx + 1,
  name: p.name,
  module: p.module,
  content: p.content,
  variables: p.variables ?? [],
  createdAt: p.createdAt ?? nowIso(),
  updatedAt: p.createdAt ?? nowIso(),
  deletedAt: null,
  versions: [
    {
      version: 1,
      name: p.name,
      module: p.module,
      content: p.content,
      variables: p.variables ?? [],
      createdAt: p.createdAt ?? nowIso(),
      createdBy: "admin",
    },
  ],
});

const seedPrompts = [
  {
    id: 1,
    name: "Prompt tạo bài tập toán",
    content:
      "Hãy tạo một bài tập toán học phù hợp với học sinh lớp {{grade}} về chủ đề {{topic}}. Bài tập cần có {{difficulty}} độ khó và bao gồm {{questions}} câu hỏi. Định dạng: {{format}}. Thời gian làm bài: {{duration}} phút.",
    module: "Bài tập" as AiFeatureModule,
    variables: [
      { name: "grade", type: "select", options: ["1", "2", "3", "4", "5"], description: "Lớp học" },
      { name: "topic", type: "text", description: "Chủ đề bài học" },
      { name: "difficulty", type: "select", options: ["dễ", "trung bình", "khó"], description: "Độ khó" },
      { name: "questions", type: "number", min: 1, max: 20, description: "Số câu hỏi" },
      { name: "format", type: "select", options: ["trắc nghiệm", "tự luận", "hỗn hợp"], description: "Dạng bài tập" },
      { name: "duration", type: "number", min: 5, max: 60, description: "Thời gian làm bài (phút)" },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Prompt sinh lộ trình học",
    content:
      "Dựa trên mục tiêu học tập '{{goal}}' trong thời gian {{duration}}, hãy tạo một lộ trình học chi tiết cho học sinh {{age_group}} có trình độ {{level}}. Môn học: {{subject}}. Số buổi học: {{sessions}} buổi. Mỗi buổi {{session_duration}} phút.",
    module: "Lộ trình" as AiFeatureModule,
    variables: [
      { name: "goal", type: "text", description: "Mục tiêu học tập" },
      { name: "duration", type: "select", options: ["1 tuần", "2 tuần", "1 tháng", "2 tháng", "3 tháng"], description: "Thời gian học" },
      { name: "age_group", type: "select", options: ["5-7 tuổi", "6-8 tuổi", "7-9 tuổi", "8-10 tuổi"], description: "Độ tuổi" },
      { name: "level", type: "select", options: ["mới bắt đầu", "cơ bản", "trung bình", "nâng cao"], description: "Trình độ hiện tại" },
      { name: "subject", type: "select", options: ["Toán", "Văn", "Anh"], description: "Môn học" },
      { name: "sessions", type: "number", min: 3, max: 20, description: "Số buổi học" },
      { name: "session_duration", type: "number", min: 15, max: 60, description: "Thời lượng mỗi buổi (phút)" },
    ],
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Prompt chatbot hỗ trợ",
    content:
      "Bạn là một trợ lý AI thân thiện giúp học sinh tiểu học {{age}}. Hãy trả lời câu hỏi '{{question}}' về môn {{subject}} một cách {{tone}} và {{complexity}}. Sử dụng {{language}} để trả lời.",
    module: "Chatbot" as AiFeatureModule,
    variables: [
      { name: "age", type: "select", options: ["5-7 tuổi", "6-8 tuổi", "7-9 tuổi", "8-10 tuổi"], description: "Độ tuổi học sinh" },
      { name: "question", type: "text", description: "Câu hỏi của học sinh" },
      { name: "subject", type: "select", options: ["Toán", "Văn", "Anh", "tổng hợp"], description: "Môn học" },
      { name: "tone", type: "select", options: ["vui vẻ", "khuyến khích", "tự nhiên", "năng động"], description: "Giọng điệu" },
      { name: "complexity", type: "select", options: ["đơn giản", "dễ hiểu", "chi tiết hơn"], description: "Độ phức tạp" },
      { name: "language", type: "select", options: ["tiếng Việt", "tiếng Anh", "song ngữ"], description: "Ngôn ngữ trả lời" },
    ],
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    name: "Prompt chấm bài tự động",
    content:
      "Hãy chấm bài làm của học sinh về môn {{subject}}. Bài làm: {{student_answer}}. Đáp án đúng: {{correct_answer}}. Tiêu chí chấm: {{criteria}}. Hãy đưa ra điểm số ({{max_score}} điểm), nhận xét {{feedback_style}} và gợi ý cải thiện.",
    module: "Chấm bài" as AiFeatureModule,
    variables: [
      { name: "subject", type: "select", options: ["Toán", "Văn", "Anh"], description: "Môn học" },
      { name: "student_answer", type: "textarea", description: "Bài làm của học sinh" },
      { name: "correct_answer", type: "textarea", description: "Đáp án chính xác" },
      { name: "criteria", type: "textarea", description: "Tiêu chí chấm điểm" },
      { name: "max_score", type: "number", min: 1, max: 100, description: "Điểm tối đa" },
      { name: "feedback_style", type: "select", options: ["khuyến khích", "chi tiết", "tóm tắt", "xây dựng"], description: "Kiểu phản hồi" },
    ],
    createdAt: "2024-01-25",
  },
].map(withInitialVersion);

const mockAILogs = [
  {
    id: 1,
    timestamp: "2024-01-28 14:30:25",
    user: "Nguyễn Minh Đức",
    module: "Bài tập",
    tokensUsed: 150,
    status: "Thành công",
    cost: "0.003$",
    details: "Tạo bài tập toán lớp 3 về phép cộng và trừ",
    conversation: null,
  },
  {
    id: 2,
    timestamp: "2024-01-28 14:25:12",
    user: "Trần Thị Mai",
    module: "Chatbot",
    tokensUsed: 85,
    status: "Thành công",
    cost: "0.002$",
    details: "Hỗ trợ giải bài tập toán",
    conversation: [
      { role: "user", content: "Em không hiểu bài toán này: 25 + 17 = ?", time: "14:25:12" },
      {
        role: "assistant",
        content:
          "Chào em! Cô sẽ giúp em giải bài toán này nhé. 25 + 17 ta tính như sau:\n\n25 + 17\n= 20 + 5 + 10 + 7\n= 20 + 10 + 5 + 7\n= 30 + 12\n= 42\n\nVậy 25 + 17 = 42. Em hiểu chưa?",
        time: "14:25:15",
      },
      { role: "user", content: "Dạ em hiểu rồi! Cảm ơn cô ạ", time: "14:25:18" },
    ],
  },
  {
    id: 3,
    timestamp: "2024-01-28 14:20:45",
    user: "Admin AI",
    module: "Lộ trình",
    tokensUsed: 320,
    status: "Lỗi",
    cost: "0.000$",
    details: "Tạo lộ trình học toán cho học sinh lớp 2",
    conversation: null,
  },
  {
    id: 4,
    timestamp: "2024-01-28 14:15:33",
    user: "Lê Văn Hùng",
    module: "Chatbot",
    tokensUsed: 125,
    status: "Thành công",
    cost: "0.002$",
    details: "Hỗ trợ học từ vựng tiếng Anh",
    conversation: [
      { role: "user", content: "How do you say 'con chó' in English?", time: "14:15:33" },
      {
        role: "assistant",
        content:
          "Hello! 'Con chó' in English is 'dog' 🐕\n\nHere are some examples:\n- This is a dog. (Đây là một con chó)\n- I love dogs. (Tôi yêu những con chó)\n- The dog is cute. (Con chó này dễ thương)\n\nWould you like to learn more animal names?",
        time: "14:15:36",
      },
      { role: "user", content: "Yes! What about 'con mèo'?", time: "14:15:40" },
      {
        role: "assistant",
        content:
          "Great! 'Con mèo' in English is 'cat' 🐱\n\nExamples:\n- I have a cat. (Tôi có một con mèo)\n- The cat is sleeping. (Con mèo đang ngủ)\n- Cats are cute! (Mèo rất dễ thương!)",
        time: "14:15:42",
      },
    ],
  },
  {
    id: 5,
    timestamp: "2024-01-28 14:10:15",
    user: "Nguyễn Thị Hoa",
    module: "Chấm bài",
    tokensUsed: 200,
    status: "Thành công",
    cost: "0.004$",
    details: "Chấm bài tự luận môn Văn lớp 4",
    conversation: null,
  },
];

function extractTemplateVars(text: string) {
  const re = /\{\{\s*([a-zA-Z_][\w]*)\s*\}\}/g;
  const names: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) names.push(m[1]);
  return Array.from(new Set(names));
}

export default function AdminAIConfig() {
  const [apiConfig, setApiConfig] = useState({
    provider: "openai",
    apiKey: "sk-************************************",
    model: "gpt-4",
    temperature: [0.7],
    top_p: [1],
    maxTokens: 1000,
    frequency_penalty: [0],
    presence_penalty: [0],
    stop: "",
  });

  const [aiFeatures, setAiFeatures] = useState({
    autoGrading: true,
    pathGeneration: true,
    exerciseCreation: false,
    progressReporting: true,
  });

  const [prompts, setPrompts] = useState<AiPromptTemplate[]>(seedPrompts);
  const [isAddPromptDialogOpen, setIsAddPromptDialogOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [newPrompt, setNewPrompt] = useState<{
    name: string;
    module: AiFeatureModule | "";
    content: string;
    variables: AiPromptVariable[];
  }>({ name: "", module: "", content: "", variables: [] });

  const [currentVariable, setCurrentVariable] = useState<AiPromptVariable>({
    name: "",
    type: "text",
    description: "",
    options: [],
    min: 0,
    max: 100,
  });

  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState<number | null>(null);
  const [showVariableEditor, setShowVariableEditor] = useState(false);
  const [moduleFilter, setModuleFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isLogDetailDialogOpen, setIsLogDetailDialogOpen] = useState(false);
  const [versionsDialogFor, setVersionsDialogFor] = useState<AiPromptTemplate | null>(null);

  // Survey state (UC-07.2)
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 1,
      title: "Khảo sát mức độ hài lòng AI",
      description: "Khảo sát ngắn sau khi dùng AI",
      isActive: true,
      createdAt: nowIso(),
      questions: [
        { id: "q1", type: "likert", text: "Bạn hài lòng với câu trả lời?", min: 1, max: 5, required: true },
        { id: "q2", type: "text", text: "Góp ý chi tiết", required: false },
      ],
    },
  ]);
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponseItem[]>([]);
  const [surveyEditorOpen, setSurveyEditorOpen] = useState(false);
  const [editingSurveyId, setEditingSurveyId] = useState<number | null>(null);
  const [surveyDraft, setSurveyDraft] = useState<Survey>({
    id: 0,
    title: "",
    description: "",
    isActive: true,
    createdAt: nowIso(),
    questions: [],
  });

  // Autosave draft for prompt editor
  const autosaveTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!isAddPromptDialogOpen) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      localStorage.setItem("admin_ai_prompt_draft", JSON.stringify(newPrompt));
    }, 500);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [newPrompt, isAddPromptDialogOpen]);

  useEffect(() => {
    if (isAddPromptDialogOpen) {
      const saved = localStorage.getItem("admin_ai_prompt_draft");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setNewPrompt(parsed);
          }
        } catch {}
      }
    }
  }, [isAddPromptDialogOpen]);

  const handleSaveApiConfig = () => {
    const temp = apiConfig.temperature[0];
    const topP = apiConfig.top_p[0];
    const freq = apiConfig.frequency_penalty[0];
    const pres = apiConfig.presence_penalty[0];
    if (temp < 0 || temp > 2) return alert("Temperature phải trong [0,2]");
    if (topP < 0 || topP > 1) return alert("top_p phải trong [0,1]");
    if (freq < -2 || freq > 2) return alert("frequency_penalty phải trong [-2,2]");
    if (pres < -2 || pres > 2) return alert("presence_penalty phải trong [-2,2]");
    if (apiConfig.maxTokens < 1) return alert("max_tokens phải > 0");
    alert("Cấu hình API đã được lưu thành công!");
  };

  function validatePromptDraft(draft: typeof newPrompt, excludeId?: number): string | null {
    if (!draft.name.trim() || !draft.module || !draft.content.trim())
      return "Vui lòng nhập đầy đủ tên, module và nội dung";
    const nameClash = prompts.some((p) => p.name.trim() === draft.name.trim() && p.id !== excludeId);
    if (nameClash) return "Tên prompt phải là duy nhất (BR-U7.1-1)";
    const varNames = new Set(draft.variables.map((v) => v.name));
    if (varNames.size !== draft.variables.length) return "Tên biến trùng lặp";
    const invalidName = [...varNames].find((n) => !/^[a-zA-Z_][\w]*$/.test(n));
    if (invalidName) return `Tên biến không hợp lệ: ${invalidName}`;
    const used = extractTemplateVars(draft.content);
    const missing = used.filter((u) => !varNames.has(u));
    if (missing.length) return `Thiếu định nghĩa biến: ${missing.join(", ")}`;
    return null;
  }

  const handleAddPrompt = () => {
    const err = validatePromptDraft(newPrompt, isEditingPrompt ? editingPromptId ?? undefined : undefined);
    if (err) return alert(err);

    if (isEditingPrompt && editingPromptId != null) {
      const idx = prompts.findIndex((p) => p.id === editingPromptId);
      if (idx === -1) return;
      const prev = prompts[idx];
      const nextVersionNum = (prev.versions[prev.versions.length - 1]?.version ?? 0) + 1;
      const updated: AiPromptTemplate = {
        ...prev,
        name: newPrompt.name,
        module: newPrompt.module as AiFeatureModule,
        content: newPrompt.content,
        variables: newPrompt.variables,
        updatedAt: nowIso(),
        versions: [
          ...prev.versions,
          {
            version: nextVersionNum,
            name: newPrompt.name,
            module: newPrompt.module as AiFeatureModule,
            content: newPrompt.content,
            variables: newPrompt.variables,
            createdAt: nowIso(),
            createdBy: "admin",
          },
        ],
      };
      const copy = [...prompts];
      copy[idx] = updated;
      setPrompts(copy);
      setIsEditingPrompt(false);
      setEditingPromptId(null);
    } else {
      const newId = Math.max(0, ...prompts.map((p) => p.id)) + 1;
      const created: AiPromptTemplate = {
        id: newId,
        name: newPrompt.name,
        module: newPrompt.module as AiFeatureModule,
        content: newPrompt.content,
        variables: newPrompt.variables,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        deletedAt: null,
        versions: [
          {
            version: 1,
            name: newPrompt.name,
            module: newPrompt.module as AiFeatureModule,
            content: newPrompt.content,
            variables: newPrompt.variables,
            createdAt: nowIso(),
            createdBy: "admin",
          },
        ],
      };
      setPrompts([...prompts, created]);
    }
    setNewPrompt({ name: "", module: "", content: "", variables: [] });
    setIsAddPromptDialogOpen(false);
  };

  const handleEditPrompt = (prompt: AiPromptTemplate) => {
    setNewPrompt({
      name: prompt.name,
      module: prompt.module,
      content: prompt.content,
      variables: prompt.variables || [],
    });
    setIsEditingPrompt(true);
    setEditingPromptId(prompt.id);
    setIsAddPromptDialogOpen(true);
  };

  const handleCopyPrompt = (prompt: AiPromptTemplate) => {
    let base = `${prompt.name} (Copy)`;
    let candidate = base;
    let i = 1;
    const names = new Set(prompts.map((p) => p.name));
    while (names.has(candidate)) {
      i += 1;
      candidate = `${base} ${i}`;
    }
    const newId = Math.max(0, ...prompts.map((p) => p.id)) + 1;
    const copied: AiPromptTemplate = {
      ...prompt,
      id: newId,
      name: candidate,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      versions: [
        ...prompt.versions,
        {
          version: (prompt.versions[prompt.versions.length - 1]?.version ?? 0) + 1,
          name: candidate,
          module: prompt.module,
          content: prompt.content,
          variables: prompt.variables,
          createdAt: nowIso(),
          createdBy: "admin",
        },
      ],
    };
    setPrompts([...prompts, copied]);
  };

  const handleRemoveVariable = (index: number) => {
    const updatedVariables = newPrompt.variables.filter((_, i) => i !== index);
    setNewPrompt({ ...newPrompt, variables: updatedVariables });
  };

  const insertVariableIntoPrompt = (variableName: string) => {
    const textarea = document.getElementById("promptContent") as HTMLTextAreaElement | null;
    const cursorPosition = textarea?.selectionStart ?? newPrompt.content.length;
    const beforeCursor = newPrompt.content.slice(0, cursorPosition);
    const afterCursor = newPrompt.content.slice(cursorPosition);
    const newContent = beforeCursor + `{{${variableName}}}` + afterCursor;
    setNewPrompt({ ...newPrompt, content: newContent });
    textarea?.focus();
  };

  const handleDeletePrompt = (id: number) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id));
  };

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setAiFeatures((prev) => ({ ...prev, [feature]: enabled }));
  };

  const exportLogs = () => {
    alert("Đang xuất báo cáo CSV...");
  };

  const showLogDetail = (log: any) => {
    setSelectedLog(log);
    setIsLogDetailDialogOpen(true);
  };

  const getModuleColor = (module: string) => {
    switch (module) {
      case "Bài tập":
        return "bg-blue-100 text-blue-800";
      case "Lộ trình":
        return "bg-green-100 text-green-800";
      case "Chatbot":
        return "bg-purple-100 text-purple-800";
      case "Báo cáo":
        return "bg-orange-100 text-orange-800";
      case "Chấm bài":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Thành công":
        return "bg-green-100 text-green-800";
      case "Lỗi":
        return "bg-red-100 text-red-800";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const promptPreviewHtml = useMemo(() => {
    const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as any)[c]);
    const highlighted = newPrompt.content.replace(/\{\{\s*([a-zA-Z_][\w]*)\s*\}\}/g, (_m, p1) => `<span class=\"px-1 rounded bg-yellow-100 text-yellow-900 border border-yellow-300\">{{${p1}}}</span>`);
    return esc("") + highlighted;
  }, [newPrompt.content]);

  // Survey helpers
  const activeSurveyCount = surveys.filter((s) => s.isActive).length;
  const totalQuestions = surveys.reduce((a, s) => a + s.questions.length, 0);
  const avgLikert = useMemo(() => {
    const likertValues: number[] = [];
    for (const r of surveyResponses) {
      for (const ans of r.answers) if (typeof ans.value === "number") likertValues.push(ans.value);
    }
    if (!likertValues.length) return 0;
    return Math.round((likertValues.reduce((a, b) => a + b, 0) / likertValues.length) * 10) / 10;
  }, [surveyResponses]);

  const openSurveyEditor = (survey?: Survey) => {
    if (survey) {
      setEditingSurveyId(survey.id);
      setSurveyDraft(JSON.parse(JSON.stringify(survey)));
    } else {
      setEditingSurveyId(null);
      setSurveyDraft({ id: 0, title: "", description: "", isActive: true, createdAt: nowIso(), questions: [] });
    }
    setSurveyEditorOpen(true);
  };

  const saveSurveyDraft = () => {
    if (!surveyDraft.title.trim()) return alert("Vui lòng nhập tiêu đề khảo sát");
    if (surveyDraft.questions.length === 0) return alert("Khảo sát cần ít nhất 1 câu hỏi");
    if (surveyDraft.questions.length > 5) return alert("Khảo sát tối đa 5 câu hỏi (BR-U7.2-1)");
    const invalid = surveyDraft.questions.find((q) => !q.text.trim());
    if (invalid) return alert("Vui lòng nhập nội dung câu hỏi");
    if (editingSurveyId) {
      setSurveys((prev) => prev.map((s) => (s.id === editingSurveyId ? { ...surveyDraft, id: editingSurveyId } : s)));
    } else {
      const newId = Math.max(0, ...surveys.map((s) => s.id)) + 1;
      setSurveys([...surveys, { ...surveyDraft, id: newId, createdAt: nowIso() }]);
    }
    setSurveyEditorOpen(false);
  };

  const deleteSurvey = (id: number) => setSurveys((prev) => prev.filter((s) => s.id !== id));

  const simulateSubmitResponse = (survey: Survey) => {
    const likertQs = survey.questions.filter((q) => q.type === "likert") as SurveyQuestion[];
    const answers = survey.questions.map((q) => ({
      questionId: q.id,
      value: q.type === "likert" ? Math.floor(((q.min ?? 1) + (q.max ?? 5)) / 2) : "Ý kiến hay!",
    }));
    const item: SurveyResponseItem = {
      id: Math.max(0, ...surveyResponses.map((r) => r.id)) + 1,
      surveyId: survey.id,
      createdAt: nowIso(),
      anonymizedUser: `user_${Math.random().toString(36).slice(2, 8)}`,
      answers,
    };
    setSurveyResponses([item, ...surveyResponses]);
    alert(`Đã ghi nhận ${likertQs.length} câu likert, ${survey.questions.length - likertQs.length} câu tự do`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-600" />
              Cấu hình AI (Chỉ Quản trị viên)
            </h1>
            <p className="text-gray-600 mt-1">Quản lý cấu hình và tham số của hệ thống AI - Chỉ có quản trị viên mới có quyền điều chỉnh</p>
          </div>
        </div>

        <Tabs defaultValue="api-config" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-blue-50">
            <TabsTrigger value="api-config" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Cấu hình API
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Prompt mẫu
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Tính năng AI
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Khảo sát
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Log AI
            </TabsTrigger>
          </TabsList>

          {/* API Configuration Tab (UC-07.3) */}
          <TabsContent value="api-config">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Settings className="h-5 w-5" />
                  Cấu hình API & Tham số Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="provider">Nhà cung cấp</Label>
                      <Select
                        value={apiConfig.provider}
                        onValueChange={(value) => setApiConfig({ ...apiConfig, provider: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="anthropic">Anthropic</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={apiConfig.apiKey}
                          onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="model">Model AI</Label>
                      <Select value={apiConfig.model} onValueChange={(value) => setApiConfig({ ...apiConfig, model: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude-3">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="temperature">Temperature: {apiConfig.temperature[0]}</Label>
                      <Slider id="temperature" min={0} max={2} step={0.1} value={apiConfig.temperature} onValueChange={(value) => setApiConfig({ ...apiConfig, temperature: value })} className="mt-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Chính xác (0)</span>
                        <span>Sáng tạo (2)</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="top_p">top_p: {apiConfig.top_p[0]}</Label>
                      <Slider id="top_p" min={0} max={1} step={0.05} value={apiConfig.top_p} onValueChange={(value) => setApiConfig({ ...apiConfig, top_p: value })} className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input id="maxTokens" type="number" value={apiConfig.maxTokens} onChange={(e) => setApiConfig({ ...apiConfig, maxTokens: parseInt(e.target.value) })} min={1} max={400000} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>frequency_penalty: {apiConfig.frequency_penalty[0]}</Label>
                    <Slider min={-2} max={2} step={0.1} value={apiConfig.frequency_penalty} onValueChange={(v) => setApiConfig({ ...apiConfig, frequency_penalty: v })} className="mt-2" />
                  </div>
                  <div>
                    <Label>presence_penalty: {apiConfig.presence_penalty[0]}</Label>
                    <Slider min={-2} max={2} step={0.1} value={apiConfig.presence_penalty} onValueChange={(v) => setApiConfig({ ...apiConfig, presence_penalty: v })} className="mt-2" />
                  </div>
                  <div>
                    <Label>Stop sequences (phân tách dấu phẩy)</Label>
                    <Input value={apiConfig.stop} onChange={(e) => setApiConfig({ ...apiConfig, stop: e.target.value })} placeholder="VD: ###, END" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveApiConfig} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu cấu hình
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prompts Management Tab (UC-07.1) */}
          <TabsContent value="prompts">
            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <MessageSquare className="h-5 w-5" />
                    Quản lý Prompt mẫu
                  </CardTitle>
                  <Dialog open={isAddPromptDialogOpen} onOpenChange={setIsAddPromptDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{isEditingPrompt ? "Chỉnh sửa" : "Thêm"} Prompt (Quản trị viên)</DialogTitle>
                        <DialogDescription>
                          Tạo prompt mẫu với biến động cho các module AI - Lưu sẽ tạo version mới (BR-U7.1-2)
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="promptName">Tên prompt</Label>
                            <Input id="promptName" value={newPrompt.name} onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })} placeholder="Nhập tên prompt" />
                          </div>
                          <div>
                            <Label htmlFor="promptModule">Module áp dụng</Label>
                            <Select value={newPrompt.module} onValueChange={(value) => setNewPrompt({ ...newPrompt, module: value as any })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn module" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Bài tập">Bài tập</SelectItem>
                                <SelectItem value="Lộ trình">Lộ trình</SelectItem>
                                <SelectItem value="Chatbot">Chatbot</SelectItem>
                                <SelectItem value="Chấm bài">Chấm bài</SelectItem>
                                <SelectItem value="Báo cáo">Báo cáo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <Label className="text-lg font-semibold text-blue-700">Biến động (Variables)</Label>
                            <Button type="button" variant="outline" size="sm" onClick={() => setShowVariableEditor(!showVariableEditor)} className="border-blue-300 text-blue-600">
                              <Plus className="h-4 w-4 mr-1" />
                              Thêm biến
                            </Button>
                          </div>

                          {newPrompt.variables.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {newPrompt.variables.map((variable, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                                  <div className="flex-1">
                                    <div className="font-medium text-blue-900">{`{{${variable.name}}}`}</div>
                                    <div className="text-sm text-blue-600">{variable.description}</div>
                                    <div className="text-xs text-blue-500">Loại: {variable.type}</div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertVariableIntoPrompt(variable.name)} className="text-blue-600 hover:bg-blue-100">
                                      Chèn
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveVariable(index)} className="text-red-600 hover:bg-red-100">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {showVariableEditor && (
                            <div className="border-t border-blue-200 pt-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Tên biến</Label>
                                  <Input value={currentVariable.name} onChange={(e) => setCurrentVariable({ ...currentVariable, name: e.target.value })} placeholder="VD: grade, topic, difficulty" />
                                </div>
                                <div>
                                  <Label>Loại dữ liệu</Label>
                                  <Select value={currentVariable.type} onValueChange={(value) => setCurrentVariable({ ...currentVariable, type: value as VariableType })}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="text">Văn bản</SelectItem>
                                      <SelectItem value="textarea">Văn bản dài</SelectItem>
                                      <SelectItem value="number">Số</SelectItem>
                                      <SelectItem value="select">Lựa chọn</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label>Mô tả</Label>
                                <Input value={currentVariable.description} onChange={(e) => setCurrentVariable({ ...currentVariable, description: e.target.value })} placeholder="Mô tả mục đích của biến" />
                              </div>

                              {currentVariable.type === "select" && (
                                <div>
                                  <Label>Các lựa chọn (cách nhau bằng dấu phẩy)</Label>
                                  <Input
                                    value={Array.isArray(currentVariable.options) ? currentVariable.options.join(", ") : (currentVariable.options as any)}
                                    onChange={(e) => setCurrentVariable({ ...currentVariable, options: (e.target.value || "").split(",").map((s) => s.trim()).filter(Boolean) })}
                                    placeholder="VD: dễ, trung bình, khó"
                                  />
                                </div>
                              )}

                              {currentVariable.type === "number" && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Giá trị tối thiểu</Label>
                                    <Input type="number" value={currentVariable.min ?? 0} onChange={(e) => setCurrentVariable({ ...currentVariable, min: parseInt(e.target.value) })} />
                                  </div>
                                  <div>
                                    <Label>Giá trị tối đa</Label>
                                    <Input type="number" value={currentVariable.max ?? 100} onChange={(e) => setCurrentVariable({ ...currentVariable, max: parseInt(e.target.value) })} />
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  onClick={() => {
                                    if (!currentVariable.name.trim()) return alert("Vui lòng nhập tên biến");
                                    if (!currentVariable.description?.trim()) return alert("Vui lòng nhập mô tả biến");
                                    if (!/^[a-zA-Z_][\w]*$/.test(currentVariable.name)) return alert("Tên biến chỉ gồm chữ, số, _ và không bắt đầu bằng số");
                                    setNewPrompt({ ...newPrompt, variables: [...newPrompt.variables, { ...currentVariable }] });
                                    setCurrentVariable({ name: "", type: "text", description: "", options: [], min: 0, max: 100 });
                                    setShowVariableEditor(false);
                                  }}
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Lưu biến
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowVariableEditor(false)} size="sm">
                                  Hủy
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded">
                            <strong>💡 Hướng dẫn:</strong> Sử dụng cú pháp {"{{tên_biến}}"} trong nội dung prompt. VD: {"{{grade}}"}, {"{{topic}}"}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="promptContent">Nội dung prompt</Label>
                            <Textarea
                              id="promptContent"
                              value={newPrompt.content}
                              onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                              placeholder={`Nhập nội dung prompt. Sử dụng {{tên_biến}} để chèn biến động...`}
                              rows={10}
                              className="font-mono text-sm"
                            />
                          </div>
                          <div>
                            <Label>Xem trước & highlight biến</Label>
                            <div className="mt-2 p-3 bg-gray-50 border rounded text-sm font-mono leading-6" dangerouslySetInnerHTML={{ __html: promptPreviewHtml }} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsAddPromptDialogOpen(false);
                              setIsEditingPrompt(false);
                              setEditingPromptId(null);
                              setNewPrompt({ name: "", module: "", content: "", variables: [] });
                            }}
                          >
                            Hủy
                          </Button>
                          <Button onClick={handleAddPrompt} className="bg-green-600 hover:bg-green-700">
                            {isEditingPrompt ? "Cập nhật (tạo version)" : "Lưu Prompt"}
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tên prompt</TableHead>
                      <TableHead>Nội dung</TableHead>
                      <TableHead>Biến động</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prompts.map((prompt) => (
                      <TableRow key={prompt.id}>
                        <TableCell className="font-medium">{prompt.id}</TableCell>
                        <TableCell className="font-medium">{prompt.name}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate font-mono text-sm" title={prompt.content}>
                            {prompt.content}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {prompt.variables && prompt.variables.length > 0 ? (
                              prompt.variables.map((variable, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{`{{${variable.name}}}`}</Badge>
                              ))
                            ) : (
                              <span className="text-gray-400 text-xs italic">Không có biến</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getModuleColor(prompt.module)}>{prompt.module}</Badge>
                        </TableCell>
                        <TableCell>{prompt.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditPrompt(prompt)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCopyPrompt(prompt)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Sao chép
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setVersionsDialogFor(prompt)}>
                                <History className="mr-2 h-4 w-4" />
                                Phiên bản
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePrompt(prompt.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Versions Dialog */}
                <Dialog open={!!versionsDialogFor} onOpenChange={(o) => !o && setVersionsDialogFor(null)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" /> Lịch sử phiên bản: {versionsDialogFor?.name}
                      </DialogTitle>
                      <DialogDescription>
                        BR-U7.1-2: Hệ thống lưu phiên bản để rollback khi cần
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                      {versionsDialogFor?.versions.map((v) => (
                        <div key={v.version} className="p-3 border rounded bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Version {v.version} • {new Date(v.createdAt).toLocaleString("vi-VN")}</div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (!versionsDialogFor) return;
                                const idx = prompts.findIndex((p) => p.id === versionsDialogFor.id);
                                if (idx === -1) return;
                                const base = prompts[idx];
                                const nextNum = (base.versions[base.versions.length - 1]?.version ?? 0) + 1;
                                const rolled: AiPromptTemplate = {
                                  ...base,
                                  content: v.content,
                                  variables: v.variables,
                                  name: v.name,
                                  updatedAt: nowIso(),
                                  versions: [
                                    ...base.versions,
                                    {
                                      version: nextNum,
                                      name: v.name,
                                      module: v.module,
                                      content: v.content,
                                      variables: v.variables,
                                      createdAt: nowIso(),
                                      createdBy: "admin",
                                    },
                                  ],
                                };
                                const copy = [...prompts];
                                copy[idx] = rolled;
                                setPrompts(copy);
                                alert("Đã rollback và tạo phiên bản mới từ bản cũ");
                              }}
                            >
                              <Undo2 className="h-4 w-4 mr-1" /> Rollback
                            </Button>
                          </div>
                          <div className="mt-2 text-xs text-gray-700 font-mono whitespace-pre-wrap">{v.content}</div>
                          <div className="mt-2 flex gap-1 flex-wrap">
                            {v.variables.map((vv) => (
                              <Badge key={vv.name} variant="outline" className="text-[10px]">{`{{${vv.name}}}`}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setVersionsDialogFor(null)}>Đóng</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Features Tab */}
          <TabsContent value="features">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Brain className="h-5 w-5" />
                  Cấu hình Tính năng AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Settings className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI chấm bài (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Tự động chấm điểm - Cấu hình prompt với biến {"{{student_answer}}"}, {"{{correct_answer}}"}, {"{{criteria}}"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={aiFeatures.autoGrading} onCheckedChange={(checked) => handleFeatureToggle("autoGrading", checked)} />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI sinh lộ trình (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Tạo lộ trình cá nhân - Sử dụng biến {"{{goal}}"}, {"{{duration}}"}, {"{{level}}"}, {"{{subject}}"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={aiFeatures.pathGeneration} onCheckedChange={(checked) => handleFeatureToggle("pathGeneration", checked)} />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Edit className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI tạo bài tập (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Sinh bài tập động - Điều chỉnh biến {"{{grade}}"}, {"{{topic}}"}, {"{{difficulty}}"}, {"{{questions}}"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={aiFeatures.exerciseCreation} onCheckedChange={(checked) => handleFeatureToggle("exerciseCreation", checked)} />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI báo cáo tiến độ (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Phân tích thông minh - Tùy chỉnh biến {"{{time_period}}"}, {"{{metrics}}"}, {"{{student_group}}"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={aiFeatures.progressReporting} onCheckedChange={(checked) => handleFeatureToggle("progressReporting", checked)} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Surveys Tab (UC-07.2) */}
          <TabsContent value="surveys">
            <Card className="border-sky-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sky-700">
                    <ListChecks className="h-5 w-5" />
                    Khảo sát người dùng (≤ 5 câu hỏi)
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={() => openSurveyEditor()} className="bg-sky-600 hover:bg-sky-700">
                      <Plus className="h-4 w-4 mr-1" /> Tạo khảo sát
                    </Button>
                    <Button variant="outline" onClick={() => alert("Xuất CSV phản hồi (mô phỏng)")}> 
                      <Download className="h-4 w-4 mr-1" /> Xuất CSV 
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-sky-50 p-4 rounded border border-sky-200">
                    <div className="text-2xl font-bold text-sky-700">{surveys.length}</div>
                    <div className="text-sm text-sky-700">Khảo sát</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{activeSurveyCount}</div>
                    <div className="text-sm text-green-700">Đang kích hoạt</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded border border-orange-200">
                    <div className="text-2xl font-bold text-orange-700">{totalQuestions}</div>
                    <div className="text-sm text-orange-700">Tổng câu hỏi</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded border border-purple-200">
                    <div className="text-2xl font-bold text-purple-700">{avgLikert}</div>
                    <div className="text-sm text-purple-700">Điểm hài lòng TB</div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Câu hỏi</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surveys.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell className="font-medium">{s.title}</TableCell>
                        <TableCell>
                          <Badge className={s.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {s.isActive ? "Đang bật" : "Tắt"}
                          </Badge>
                        </TableCell>
                        <TableCell>{s.questions.length}</TableCell>
                        <TableCell>{new Date(s.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openSurveyEditor(s)}>
                            <Edit className="h-4 w-4 mr-1" /> Sửa
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setSurveys((prev) => prev.map((x) => (x.id === s.id ? { ...x, isActive: !x.isActive } : x)))}>
                            {s.isActive ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                            {s.isActive ? "Tắt" : "Bật"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => simulateSubmitResponse(s)}>Gửi thử</Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => deleteSurvey(s.id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Dialog open={surveyEditorOpen} onOpenChange={(o) => setSurveyEditorOpen(o)}>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingSurveyId ? "Chỉnh sửa" : "Tạo"} khảo sát</DialogTitle>
                      <DialogDescription>BR-U7.2-1: Khảo sát ngắn gọn (≤ 5 câu hỏi). BR-U7.2-2: Ẩn danh khi phân tích.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Tiêu đề</Label>
                          <Input value={surveyDraft.title} onChange={(e) => setSurveyDraft({ ...surveyDraft, title: e.target.value })} />
                        </div>
                        <div className="flex items-end justify-end gap-3">
                          <div className="flex items-center gap-2">
                            <Switch checked={surveyDraft.isActive} onCheckedChange={(v) => setSurveyDraft({ ...surveyDraft, isActive: v })} />
                            <span className="text-sm">Kích hoạt</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input value={surveyDraft.description} onChange={(e) => setSurveyDraft({ ...surveyDraft, description: e.target.value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-base">Câu hỏi</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (surveyDraft.questions.length >= 5) return alert("Tối đa 5 câu hỏi");
                            const id = `q${Math.random().toString(36).slice(2, 8)}`;
                            setSurveyDraft({
                              ...surveyDraft,
                              questions: [
                                ...surveyDraft.questions,
                                { id, type: "likert", text: "Câu hỏi mới", min: 1, max: 5, required: true },
                              ],
                            });
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Thêm câu hỏi
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {surveyDraft.questions.map((q, idx) => (
                          <div key={q.id} className="p-3 border rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                              <div className="md:col-span-6">
                                <Label className="text-xs">Nội dung</Label>
                                <Input value={q.text} onChange={(e) => setSurveyDraft({ ...surveyDraft, questions: surveyDraft.questions.map((x) => (x.id === q.id ? { ...x, text: e.target.value } : x)) })} />
                              </div>
                              <div className="md:col-span-3">
                                <Label className="text-xs">Loại</Label>
                                <Select value={q.type} onValueChange={(v) => setSurveyDraft({ ...surveyDraft, questions: surveyDraft.questions.map((x) => (x.id === q.id ? { ...x, type: v as any } : x)) })}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="likert">Thang điểm</SelectItem>
                                    <SelectItem value="text">Văn bản</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="md:col-span-2 flex items-center gap-2">
                                <Switch checked={!!q.required} onCheckedChange={(v) => setSurveyDraft({ ...surveyDraft, questions: surveyDraft.questions.map((x) => (x.id === q.id ? { ...x, required: v } : x)) })} />
                                <span className="text-xs">Bắt buộc</span>
                              </div>
                              <div className="md:col-span-1">
                                <Button variant="outline" size="sm" className="text-red-600" onClick={() => setSurveyDraft({ ...surveyDraft, questions: surveyDraft.questions.filter((x) => x.id !== q.id) })}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {q.type === "likert" && (
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                <div>
                                  <Label className="text-xs">Min</Label>
                                  <Input type="number" value={q.min ?? 1} onChange={(e) => setSurveyDraft({ ...surveyDraft, questions: surveyDraft.questions.map((x) => (x.id === q.id ? { ...x, min: parseInt(e.target.value) } : x)) })} />
                                </div>
                                <div>
                                  <Label className="text-xs">Max</Label>
                                  <Input type="number" value={q.max ?? 5} onChange={(e) => setSurveyDraft({ ...surveyDraft, questions: surveyDraft.questions.map((x) => (x.id === q.id ? { ...x, max: parseInt(e.target.value) } : x)) })} />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setSurveyEditorOpen(false)}>Hủy</Button>
                        <Button onClick={saveSurveyDraft} className="bg-sky-600 hover:bg-sky-700">Lưu khảo sát</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Simple responses list */}
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Phản hồi gần đây</h3>
                  {surveyResponses.length === 0 ? (
                    <div className="text-sm text-gray-500">Chưa có phản hồi. Dùng nút "Gửi thử" để mô phỏng.</div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {surveyResponses.map((r) => (
                        <div key={r.id} className="p-3 border rounded bg-gray-50 text-sm">
                          <div className="flex justify-between">
                            <div>Mã phản hồi: {r.id} • Khảo sát #{r.surveyId}</div>
                            <div className="opacity-60">{new Date(r.createdAt).toLocaleString("vi-VN")}</div>
                          </div>
                          <div className="opacity-70">Người dùng: {r.anonymizedUser}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Logs Tab */}
          <TabsContent value="logs">
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Activity className="h-5 w-5" />
                    Theo dõi Log AI - Tất cả hoạt động AI
                  </CardTitle>
                  <Button onClick={exportLogs} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Xuất CSV
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Label>Lọc theo Module:</Label>
                    <Select value={moduleFilter} onValueChange={setModuleFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tất cả">Tất cả</SelectItem>
                        <SelectItem value="Bài tập">Bài tập</SelectItem>
                        <SelectItem value="Lộ trình">Lộ trình</SelectItem>
                        <SelectItem value="Chatbot">Chatbot</SelectItem>
                        <SelectItem value="Chấm bài">Chấm bài</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Lọc theo Trạng thái:</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tất cả">Tất cả</SelectItem>
                        <SelectItem value="Thành công">Thành công</SelectItem>
                        <SelectItem value="Lỗi">Lỗi</SelectItem>
                        <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Nội dung</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Trạng thái & Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAILogs
                      .filter((log) => moduleFilter === "Tất cả" || log.module === moduleFilter)
                      .filter((log) => statusFilter === "Tất cả" || log.status === statusFilter)
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>
                            <Badge className={getModuleColor(log.module)}>{log.module}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="text-sm text-gray-700 truncate" title={log.details}>
                                {log.details || "Không có mô tả"}
                              </p>
                              {log.conversation && (
                                <Badge variant="outline" className="mt-1 text-xs">💬 {log.conversation.length} tin nhắn</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-blue-600">{log.tokensUsed}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                              <Button variant="ghost" size="sm" onClick={() => showLogDetail(log)} className="text-blue-600 hover:text-blue-800">
                                {log.conversation ? "💬 Xem hội thoại" : "🔍 Xem chi tiết"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">1,245</div>
                    <div className="text-sm text-blue-600">Tổng request hôm nay</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-green-600">Tỉ lệ thành công</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">45,678</div>
                    <div className="text-sm text-orange-600">Token sử dụng</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">45,678</div>
                    <div className="text-sm text-purple-600">Token hôm nay</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Log Detail Dialog */}
        <Dialog open={isLogDetailDialogOpen} onOpenChange={setIsLogDetailDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">📊 Chi tiết hoạt động AI</DialogTitle>
              <DialogDescription>Thông tin chi tiết về hoạt động AI và cuộc hội thoại</DialogDescription>
            </DialogHeader>

            {selectedLog && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">🕰️ Thời gian:</span>
                      <span className="text-sm font-mono">{selectedLog.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">👤 Người dùng:</span>
                      <span className="text-sm">{selectedLog.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">💻 Module:</span>
                      <Badge className={getModuleColor(selectedLog.module)}>{selectedLog.module}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">🎩 Token tiêu thụ:</span>
                      <span className="text-sm font-mono text-blue-600">{selectedLog.tokensUsed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">🎆 Hệ thống:</span>
                      <span className="text-sm text-green-600">Free (Không tính phí)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">✅ Trạng thái:</span>
                      <Badge className={getStatusColor(selectedLog.status)}>{selectedLog.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">📝 Mô tả:</h4>
                  <p className="text-sm text-blue-700">{selectedLog.details || "Không có mô tả"}</p>
                </div>

                {selectedLog.conversation && selectedLog.conversation.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2">💬 Cuộc hội thoại ({selectedLog.conversation.length} tin nhắn):</h4>
                    <div className="max-h-64 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg border">
                      {selectedLog.conversation.map((msg: any, index: number) => (
                        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">{msg.role === "user" ? "👤 Học sinh" : "🤖 AI Assistant"}</span>
                              <span className="text-xs opacity-70">{msg.time}</span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLogDetailDialogOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
