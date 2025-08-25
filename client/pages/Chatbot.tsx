import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Plus,
  MessageCircle,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Calculator,
  Globe,
  Lightbulb,
  FileText,
  HelpCircle,
} from "lucide-react";

// Mock conversation data
const conversations = [
  {
    id: 1,
    title: "🔢 Bài tập Toán",
    lastMessage: "Giải phương trình bậc nhất",
    timestamp: "10 phút trước",
    isActive: true,
  },
  {
    id: 2,
    title: "📚 Ngữ pháp tiếng Anh",
    lastMessage: "Cách sử dụng Present Perfect",
    timestamp: "2 giờ trước",
    isActive: false,
  },
  {
    id: 3,
    title: "📝 Viết văn miêu tả",
    lastMessage: "Hướng dẫn viết đoạn văn",
    timestamp: "1 ngày trước",
    isActive: false,
  },
  {
    id: 4,
    title: "🌍 Từ vựng tiếng Anh",
    lastMessage: "Học từ vựng về động vật",
    timestamp: "2 ngày trước",
    isActive: false,
  },
];

// Mock messages for active conversation
const messages = [
  {
    id: 1,
    type: "ai",
    content:
      "Chào bé! 👋 Tôi là trợ lý học tập thông minh. Hôm nay bé muốn học gì nào?",
    timestamp: "14:30",
  },
  {
    id: 2,
    type: "user",
    content: "Em muốn học giải phương trình bậc nhất ạ",
    timestamp: "14:32",
  },
  {
    id: 3,
    type: "ai",
    content:
      "Tuyệt vời! 🎉 Phương trình bậc nhất có dạng ax + b = 0 (với a ≠ 0). Em có muốn tôi giải thích từng bước không?",
    timestamp: "14:32",
  },
  {
    id: 4,
    type: "user",
    content: "Có ạ, em muốn xem ví dụ cụ thể",
    timestamp: "14:33",
  },
  {
    id: 5,
    type: "ai",
    content:
      "Tốt lắm! 📚 Hãy cùng giải phương trình: 2x + 6 = 0\n\nBước 1: Chuyển số hạng tự do sang vế phải\n2x = -6\n\nBước 2: Chia cả hai vế cho hệ số của x\nx = -6 ÷ 2 = -3\n\nVậy nghiệm của phương trình là x = -3 ✨",
    timestamp: "14:34",
    hasChart: true,
  },
];

// Quick prompt suggestions
const quickPrompts = [
  {
    icon: FileText,
    text: "📝 Tạo bài ôn tập",
    prompt: "Tạo bài ôn tập cho em về",
  },
  {
    icon: HelpCircle,
    text: "❓ Giải thích khái niệm",
    prompt: "Giải thích khái niệm",
  },
  {
    icon: Lightbulb,
    text: "💡 Sinh flashcard",
    prompt: "Tạo flashcard học tập về",
  },
  {
    icon: BookOpen,
    text: "📖 Hướng dẫn bài tập",
    prompt: "Hướng dẫn em làm bài tập",
  },
];

export default function Chatbot() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
      setNewMessage("");
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setNewMessage(prompt + " ");
  };

  return (
    <DashboardLayout>
      <div className="flex h-full bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Conversation List */}
        <div className="w-80 border-r border-primary/20 bg-white shadow-lg">
          <div className="p-4 border-b border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                💬 Cuộc trò chuyện
              </h2>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent text-white rounded-lg"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full bg-gradient-to-r from-accent to-secondary text-white rounded-xl">
              <MessageCircle className="h-4 w-4 mr-2" />
              🆕 Trò chuyện mới
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-2 space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
                    conversation.isActive
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {conversation.title}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {conversation.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-primary/20 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-pulse">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-primary">
                  🤖 Trợ lý học tập thông minh
                </h3>
                <p className="text-sm text-muted-foreground">
                  Luôn sẵn sàng giúp bé học tập! ✨
                </p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  🟢 Đang hoạt động
                </Badge>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-accent to-secondary"
                          : "bg-gradient-to-br from-primary to-accent"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl p-4 shadow-sm ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-accent to-secondary text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>

                      {/* Chart placeholder for AI messages */}
                      {message.hasChart && message.type === "ai" && (
                        <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Calculator className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium text-primary">
                              Biểu đồ minh họa
                            </span>
                          </div>
                          <div className="bg-white rounded-lg p-4 border">
                            <div className="text-center text-sm text-muted-foreground">
                              📊 [Biểu đồ thể hiện nghiệm x = -3 trên trục số]
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Đang suy nghĩ...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-primary/20 bg-white">
            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt.prompt)}
                  className="border-primary/20 hover:bg-primary/5 rounded-xl text-xs"
                >
                  <prompt.icon className="h-3 w-3 mr-1" />
                  {prompt.text}
                </Button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="💬 Nhập tin nhắn của bé..."
                  className="pr-12 border-primary/20 focus:border-primary rounded-xl"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-2 text-center">
              💡 Mẹo: Bé có thể hỏi về Toán, Văn, Anh và nhiều chủ đề khác!
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
