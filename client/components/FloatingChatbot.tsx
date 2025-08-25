import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  X,
  Minimize2,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  BookOpen,
  Calculator,
  Globe,
} from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: string;
}

const quickSuggestions = [
  { text: "🔢 Giải bài toán", icon: Calculator },
  { text: "📚 Hỏi về văn học", icon: BookOpen },
  { text: "🌍 Học tiếng Anh", icon: Globe },
  { text: "❓ Câu hỏi khác", icon: HelpCircle },
];

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content:
      "Xin chào bé! 👋 Tôi là trợ lý học tập của bé. Tôi có thể giúp bé học Toán, Văn, Anh và trả lời nhiều câu hỏi khác nữa! Bé muốn hỏi gì nào? 😊",
    timestamp: new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: getBotResponse(newMessage),
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (
      input.includes("toán") ||
      input.includes("tính") ||
      input.includes("số")
    ) {
      return "🔢 Tôi có thể giúp bé học toán! Bé có thể hỏi về phép tính, phân số, hình học, hoặc bài toán nào cần giải. Hãy cho tôi biết bài toán cụ thể nhé! 📊";
    }

    if (
      input.includes("văn") ||
      input.includes("thơ") ||
      input.includes("viết")
    ) {
      return "📚 Tuyệt vời! Tôi sẽ giúp bé học văn. Bé muốn học về thơ, truyện, cách viết văn hay đọc hiểu? Tôi có thể giải thích ý nghĩa bài thơ hoặc hướng dẫn viết văn cho bé! ✍️";
    }

    if (
      input.includes("anh") ||
      input.includes("english") ||
      input.includes("từ vựng")
    ) {
      return "🌍 Great! Tôi có thể dạy bé tiếng Anh. Bé muốn học từ vựng mới, ngữ pháp, hay luyện hội thoại? I can help you with vocabulary, grammar, or conversation practice! 🗣️";
    }

    if (
      input.includes("chào") ||
      input.includes("hello") ||
      input.includes("hi")
    ) {
      return "👋 Chào bé! Rất vui được gặp bé! Tôi luôn sẵn sàng giúp bé học tập. Bé có câu hỏi gì không? 😊";
    }

    if (input.includes("cảm ơn") || input.includes("thanks")) {
      return "🥰 Không có gì! Tôi rất vui khi được giúp đỡ bé. Nếu có câu hỏi gì khác, bé cứ hỏi tôi nhé! Chúc bé học tập vui vẻ! 🌟";
    }

    return "🤔 Đó là câu hỏi thú vị! Tôi có thể giúp bé về Toán, Văn, Anh và nhiều chủ đề học tập khác. Bé có thể hỏi cụ thể hơn để tôi hỗ trợ tốt nhất nhé! 💡";
  };

  const handleQuickSuggestion = (text: string) => {
    setNewMessage(text);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-2xl border-4 border-white animate-bounce"
        >
          <div className="relative">
            <Bot className="h-8 w-8 text-white" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-2 w-2 text-white" />
            </div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`fixed right-6 z-50 transition-all duration-300 ${isMinimized ? "bottom-2" : "bottom-20"}`}
    >
      <Card
        className={`w-96 shadow-2xl border-primary/20 transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[480px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="relative">
                <Bot className="h-6 w-6 animate-pulse" />
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-400 rounded-full"></div>
              </div>
              🤖 Trợ lý thông minh
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <div className="flex items-center gap-2 text-sm opacity-90">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Đang hoạt động • Sẵn sàng giúp bé!</span>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}
                      >
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

                        <div
                          className={`rounded-2xl p-3 text-sm shadow-sm ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-accent to-secondary text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-line">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex gap-2 max-w-[85%]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
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
                            <span className="text-xs text-gray-500">
                              Đang suy nghĩ...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-50">
              {/* Quick Suggestions */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSuggestion(suggestion.text)}
                      className="text-xs border-primary/20 hover:bg-primary/5 rounded-lg"
                    >
                      <suggestion.icon className="h-3 w-3 mr-1" />
                      {suggestion.text}
                    </Button>
                  ))}
                </div>
              )}

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="💬 Hỏi trợ lý..."
                  className="flex-1 border-primary/20 focus:border-primary rounded-xl text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isTyping}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-xl px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
