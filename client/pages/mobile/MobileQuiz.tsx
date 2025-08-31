import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QUESTIONS = [
  { q: "2 + 3 = ?", options: ["4", "5", "6"], answer: 1 },
  { q: "5 - 1 = ?", options: ["3", "4", "5"], answer: 1 },
];

export default function MobileQuiz() {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const navigate = useNavigate();
  const { id } = useParams();

  function submit() {
    const score = answers.reduce((s, a, i) => (a === QUESTIONS[i].answer ? s + 1 : s), 0);
    navigate("/m/results", { state: { score, total: QUESTIONS.length, id } });
  }

  return (
    <div className="space-y-4 p-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Làm bài: {id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {QUESTIONS.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-primary/10 p-3">
              <p className="font-medium">Câu {idx + 1}: {item.q}</p>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {item.options.map((opt, j) => (
                  <button
                    key={j}
                    onClick={() => setAnswers((a) => a.map((v, i2) => (i2 === idx ? j : v)))}
                    className={`rounded-lg border px-3 py-2 text-left ${answers[idx] === j ? "border-primary bg-primary/10" : "border-primary/20 hover:bg-accent/10"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Button className="w-full" onClick={submit}>Nộp bài</Button>
        </CardContent>
      </Card>
    </div>
  );
}
