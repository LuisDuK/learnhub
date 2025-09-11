import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";

export default function StudyPlanLayout(props: any) {
  const {
    lessonList,
    currentLesson,
    videoSrc,
    startCreatePlan,
    setShowGoalDialog,
    setShowEditDialog,
    setShowPracticeDialog,
    openLessonPlayer,
    setLessonList,
    setPracticeQuestions,
    setPracticeSelectedLessonIds,
  } = props;

  const versions: any[] = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("studyPlanVersions")) || "[]",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="w-full bg-black rounded-md overflow-hidden">
                {videoSrc ? (
                  <img
                    src={videoSrc.includes(".mp4") ? "/placeholder.svg" : videoSrc}
                    alt="preview"
                    className="w-full h-64 md:h-80 object-cover rounded"
                  />
                ) : (
                  <img src="/placeholder.svg" alt="preview" className="w-full h-64 md:h-80 object-cover rounded" />
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold">{currentLesson?.title || "Bài học mẫu"}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentLesson ? `${currentLesson.week} • ${currentLesson.day} • ${currentLesson.time}` : "Chọn một bài để bắt đầu"}
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <Button
                    onClick={() => (currentLesson ? openLessonPlayer(currentLesson) : lessonList[0] && openLessonPlayer(lessonList[0]))}
                    className="bg-gradient-to-r from-primary to-accent text-white"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Phát bài học
                  </Button>
                  <Button variant="outline" onClick={startCreatePlan}>
                    🛠️ Tạo lộ trình
                  </Button>
                  <Button variant="ghost" onClick={() => { localStorage.removeItem('studyGoalSet'); setShowGoalDialog(true); }}>
                    🔄 Đặt lại lộ trình
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="text-sm text-muted-foreground">Tiến độ tổng thể</div>
              <div className="text-3xl font-bold text-primary mt-2">
                {Math.round((lessonList.filter((l: any) => l.status === "completed").length / (lessonList.length || 1)) * 100)}%
              </div>
              <Progress
                value={Math.round((lessonList.filter((l: any) => l.status === "completed").length / (lessonList.length || 1)) * 100)}
                className="h-3 mt-3"
              />

              <div className="mt-4 space-y-2">
                <Button onClick={() => setShowEditDialog(true)} className="w-full">
                  ✏️ Chỉnh sửa lộ trình
                </Button>
                <Button onClick={() => setShowPracticeDialog(true)} variant="outline" className="w-full">
                  ➕ Tạo bài ôn
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Lịch trình</h4>
          <div className="space-y-4">
            {[...new Set(lessonList.map((l: any) => l.week))].map((w: any, weekIndex: number) => {
              const weekObj = {
                week: w,
                lessons: lessonList.filter((l: any) => l.week === w),
              };
              return (
                <div key={weekObj.week} className="p-4 rounded-lg bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                        {weekIndex + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{weekObj.week}</div>
                        <div className="text-xs text-muted-foreground">{weekObj.lessons.length} bài</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-2">
                    {weekObj.lessons.map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center justify-between p-2 rounded-md border">
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground">{lesson.day} • {lesson.time}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => openLessonPlayer(lesson)}>
                            <PlayCircle className="h-4 w-4 mr-1" />
                            Phát
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h4 className="text-lg font-semibold mb-3">Hành động nhanh</h4>
          <div className="flex flex-col gap-3">
            <Button onClick={startCreatePlan} className="w-full bg-primary text-white">Tạo lộ trình mới</Button>
            <Button variant="outline" onClick={() => { localStorage.removeItem('studyGoalSet'); localStorage.removeItem('studyGoal'); setShowGoalDialog(true); }} className="w-full">Đặt lại mục tiêu</Button>
            <Button onClick={() => setShowEditDialog(true)} className="w-full">Chỉnh sửa lộ trình</Button>
            <Button variant="ghost" onClick={() => { setPracticeQuestions([]); setPracticeSelectedLessonIds([]); }} className="w-full">Xóa bài ôn</Button>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h4 className="text-lg font-semibold mb-3">Phiên lộ trình</h4>
          <div className="space-y-2">
            {versions.slice(-3).reverse().map((v: any) => (
              <div key={v.id} className="p-2 border rounded-md flex items-center justify-between">
                <div>
                  <div className="font-medium">Phiên #{v.version}</div>
                  <div className="text-xs text-muted-foreground">{new Date(v.createdAt).toLocaleString()}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => { setLessonList(v.plan.phases.flatMap((p: any) => p.lessons)); }}>Áp dụng</Button>
              </div>
            ))}
            {versions.length === 0 && (
              <div className="text-sm text-muted-foreground">Chưa có phiên lộ trình nào.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
