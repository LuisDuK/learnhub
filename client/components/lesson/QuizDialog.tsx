import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { LessonQuizCue } from "@shared/api";

interface Props {
  open: boolean;
  cue: LessonQuizCue | null;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (answer: number | string) => Promise<void> | void;
}

export function QuizDialog({ open, cue, submitting, onCancel, onSubmit }: Props) {
  const [choice, setChoice] = useState<string>("");
  const [text, setText] = useState<string>("");

  const reset = () => {
    setChoice("");
    setText("");
  };

  const handleSubmit = async () => {
    const val = cue?.question.type === "multiple_choice" ? (choice === "" ? null : Number(choice)) : text.trim();
    if (val === null || (typeof val === "string" && val.length === 0)) return;
    await onSubmit(val as any);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Câu hỏi nhanh</DialogTitle>
          <DialogDescription>
            {cue?.question.text}
          </DialogDescription>
        </DialogHeader>

        {cue?.question.type === "multiple_choice" ? (
          <RadioGroup value={choice} onValueChange={setChoice} className="space-y-3 mt-4">
            {cue.question.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 rounded-md border">
                <RadioGroupItem value={String(idx)} id={`opt-${idx}`} />
                <Label htmlFor={`opt-${idx}`} className="cursor-pointer flex-1">
                  {String.fromCharCode(65 + idx)}. {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="mt-4 space-y-2">
            <Input
              placeholder="Nhập câu trả lời ngắn..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Không thể bỏ qua câu hỏi bắt buộc.</p>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onCancel} disabled={submitting}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Đang nộp..." : "Nộp câu trả lời"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
