import React, { useState } from "react";
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
} from "lucide-react";

// Mock data
const mockPrompts = [
  {
    id: 1,
    name: "Prompt tạo bài tập toán",
    content:
      "Hãy tạo một bài tập toán học phù hợp với học sinh lớp {grade} về chủ đề {topic}. Bài tập cần có {difficulty} độ khó và bao gồm {questions} câu hỏi.",
    module: "Bài tập",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Prompt sinh lộ trình học",
    content:
      "Dựa trên mục tiêu học tập '{goal}' trong thời gian {duration}, hãy tạo một lộ trình học chi tiết cho học sinh có trình độ {level}.",
    module: "Lộ trình",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Prompt chatbot hỗ trợ",
    content:
      "Bạn là một trợ lý AI thân thiện giúp học sinh tiểu học. Hãy trả lời câu hỏi '{question}' một cách đơn giản, dễ hiểu và khuyến khích.",
    module: "Chatbot",
    createdAt: "2024-01-10",
  },
];

const mockAILogs = [
  {
    id: 1,
    timestamp: "2024-01-28 14:30:25",
    user: "Nguyễn Minh Đức",
    module: "Bài tập",
    tokensUsed: 150,
    status: "Thành công",
    cost: "0.003$",
  },
  {
    id: 2,
    timestamp: "2024-01-28 14:25:12",
    user: "Trần Thị Mai",
    module: "Chatbot",
    tokensUsed: 85,
    status: "Thành công",
    cost: "0.002$",
  },
  {
    id: 3,
    timestamp: "2024-01-28 14:20:45",
    user: "Admin AI",
    module: "Lộ trình",
    tokensUsed: 320,
    status: "Lỗi",
    cost: "0.000$",
  },
];

export default function AdminAIConfig() {
  const [apiConfig, setApiConfig] = useState({
    apiKey: "sk-************************************",
    model: "gpt-4",
    temperature: [0.7],
    maxTokens: 1000,
  });

  const [aiFeatures, setAiFeatures] = useState({
    autoGrading: true,
    pathGeneration: true,
    exerciseCreation: false,
    progressReporting: true,
  });

  const [prompts, setPrompts] = useState(mockPrompts);
  const [isAddPromptDialogOpen, setIsAddPromptDialogOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    name: "",
    module: "",
    content: "",
  });

  const handleSaveApiConfig = () => {
    // In a real app, this would save to backend
    alert("Cấu hình API đã được lưu thành công!");
  };

  const handleAddPrompt = () => {
    if (newPrompt.name && newPrompt.module && newPrompt.content) {
      const prompt = {
        id: prompts.length + 1,
        ...newPrompt,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPrompts([...prompts, prompt]);
      setNewPrompt({ name: "", module: "", content: "" });
      setIsAddPromptDialogOpen(false);
    }
  };

  const handleDeletePrompt = (id: number) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id));
  };

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setAiFeatures((prev) => ({ ...prev, [feature]: enabled }));
  };

  const exportLogs = () => {
    // In a real app, this would generate and download CSV
    alert("Đang xuất báo cáo CSV...");
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-600" />
              Cấu hình AI (Chỉ Quản trị viên)
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý cấu hình và tham số của hệ thống AI - Chỉ có quản trị viên mới có quyền điều chỉnh
            </p>
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Quan trọng:</strong> Tất cả tính năng AI (chấm bài, tạo lộ trình, sinh bài tập) được điều khiển hoàn toàn bởi quản trị viên thông qua các prompt và cấu hình này.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="api-config" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-50">
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
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Log AI
            </TabsTrigger>
          </TabsList>

          {/* API Configuration Tab */}
          <TabsContent value="api-config">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Settings className="h-5 w-5" />
                  Cấu hình API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={apiConfig.apiKey}
                          onChange={(e) =>
                            setApiConfig({
                              ...apiConfig,
                              apiKey: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="model">Model AI</Label>
                      <Select
                        value={apiConfig.model}
                        onValueChange={(value) =>
                          setApiConfig({ ...apiConfig, model: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-4-turbo">
                            GPT-4 Turbo
                          </SelectItem>
                          <SelectItem value="gpt-3.5-turbo">
                            GPT-3.5 Turbo
                          </SelectItem>
                          <SelectItem value="claude-3">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="temperature">
                        Temperature: {apiConfig.temperature[0]}
                      </Label>
                      <Slider
                        id="temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={apiConfig.temperature}
                        onValueChange={(value) =>
                          setApiConfig({ ...apiConfig, temperature: value })
                        }
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Chính xác (0)</span>
                        <span>Sáng tạo (1)</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        value={apiConfig.maxTokens}
                        onChange={(e) =>
                          setApiConfig({
                            ...apiConfig,
                            maxTokens: parseInt(e.target.value),
                          })
                        }
                        min={1}
                        max={4000}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveApiConfig}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu cấu hình
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prompts Management Tab */}
          <TabsContent value="prompts">
            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <MessageSquare className="h-5 w-5" />
                    Quản lý Prompt mẫu
                  </CardTitle>
                  <Dialog
                    open={isAddPromptDialogOpen}
                    onOpenChange={setIsAddPromptDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Thêm Prompt mới (Quản trị viên)</DialogTitle>
                        <DialogDescription>
                          Tạo prompt mẫu cho các module AI - Chỉ quản trị viên có quyền thêm/sửa prompt
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="promptName">Tên prompt</Label>
                          <Input
                            id="promptName"
                            value={newPrompt.name}
                            onChange={(e) =>
                              setNewPrompt({
                                ...newPrompt,
                                name: e.target.value,
                              })
                            }
                            placeholder="Nhập tên prompt"
                          />
                        </div>
                        <div>
                          <Label htmlFor="promptModule">Module áp dụng</Label>
                          <Select
                            value={newPrompt.module}
                            onValueChange={(value) =>
                              setNewPrompt({ ...newPrompt, module: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn module" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bài tập">Bài tập</SelectItem>
                              <SelectItem value="Lộ trình">Lộ trình</SelectItem>
                              <SelectItem value="Chatbot">Chatbot</SelectItem>
                              <SelectItem value="Báo cáo">Báo cáo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="promptContent">Nội dung prompt</Label>
                          <Textarea
                            id="promptContent"
                            value={newPrompt.content}
                            onChange={(e) =>
                              setNewPrompt({
                                ...newPrompt,
                                content: e.target.value,
                              })
                            }
                            placeholder="Nhập nội dung prompt chi tiết..."
                            rows={6}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddPrompt}>Lưu</Button>
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
                      <TableHead>Module</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prompts.map((prompt) => (
                      <TableRow key={prompt.id}>
                        <TableCell className="font-medium">
                          {prompt.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {prompt.name}
                        </TableCell>
                        <TableCell>
                          <div
                            className="max-w-xs truncate"
                            title={prompt.content}
                          >
                            {prompt.content}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getModuleColor(prompt.module)}>
                            {prompt.module}
                          </Badge>
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeletePrompt(prompt.id)}
                              >
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
                            Tự động chấm điểm bài tập thông qua prompt do admin thiết lập
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={aiFeatures.autoGrading}
                        onCheckedChange={(checked) =>
                          handleFeatureToggle("autoGrading", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI sinh lộ trình (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Tạo lộ trình học tập theo mẫu prompt admin thiết lập
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={aiFeatures.pathGeneration}
                        onCheckedChange={(checked) =>
                          handleFeatureToggle("pathGeneration", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Edit className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI tạo bài tập (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Sinh bài tập theo template và prompt do admin quản lý
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={aiFeatures.exerciseCreation}
                        onCheckedChange={(checked) =>
                          handleFeatureToggle("exerciseCreation", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI báo cáo tiến độ (Quản trị viên)</h3>
                          <p className="text-sm text-gray-600">
                            Phân tích dữ liệu theo cấu hình admin thiết lập
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={aiFeatures.progressReporting}
                        onCheckedChange={(checked) =>
                          handleFeatureToggle("progressReporting", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Thống kê sử dụng tính năng AI (Do quản trị viên kiểm soát)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          245
                        </div>
                        <div className="text-blue-600">Bài chấm tự động</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          18
                        </div>
                        <div className="text-green-600">Lộ trình đã tạo</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          67
                        </div>
                        <div className="text-orange-600">Bài tập AI sinh</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          152
                        </div>
                        <div className="text-purple-600">Báo cáo đã tạo</div>
                      </div>
                    </div>
                  </div>
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
                    Theo dõi Log AI
                  </CardTitle>
                  <Button onClick={exportLogs} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Xuất CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Token tiêu thụ</TableHead>
                      <TableHead>Chi phí</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAILogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>
                          <Badge className={getModuleColor(log.module)}>
                            {log.module}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">
                          {log.tokensUsed}
                        </TableCell>
                        <TableCell className="font-mono text-green-600">
                          {log.cost}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      1,245
                    </div>
                    <div className="text-sm text-blue-600">
                      Tổng request hôm nay
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      98.5%
                    </div>
                    <div className="text-sm text-green-600">
                      Tỉ lệ thành công
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">
                      45,678
                    </div>
                    <div className="text-sm text-orange-600">Token sử dụng</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">
                      $12.45
                    </div>
                    <div className="text-sm text-purple-600">
                      Chi phí hôm nay
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
