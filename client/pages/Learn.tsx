import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ZoomIn, ZoomOut, Clock } from "lucide-react";

interface LearnState {
  type: "video" | "document";
  title: string;
  description?: string;
  src: string;
  estimatedDurationSec?: number; // for documents
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Learn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const learn = (state || {}) as LearnState;

  const [videoPos, setVideoPos] = useState(0);
  const [videoDur, setVideoDur] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const estimated = learn.estimatedDurationSec || 600; // default 10min

  useEffect(() => {
    if (learn.type !== "document") return;
    const iv = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(iv);
  }, [learn.type]);

  const progress = useMemo(() => {
    if (learn.type === "video") {
      if (videoDur <= 0) return 0;
      return Math.max(0, Math.min(100, (videoPos / videoDur) * 100));
    }
    return Math.max(0, Math.min(100, (elapsed / Math.max(1, estimated)) * 100));
  }, [learn.type, videoPos, videoDur, elapsed, estimated]);

  if (!learn || !learn.src || !learn.type) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
              <div className="text-5xl">🤔</div>
              <div>Thiếu thông tin bài học.</div>
              <Button onClick={() => navigate("/study-plan")}>Quay lại lộ trình</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {learn.title}
              </h1>
              {learn.description && (
                <div className="text-sm text-muted-foreground mt-1">{learn.description}</div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {learn.type === "video" ? "📹 Video" : "📄 Tài liệu"}
          </Badge>
        </div>

        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến độ</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {learn.type === "video" ? (
          <Card className="border-primary/20 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={learn.src}
                  controls
                  className="w-full h-full"
                  onLoadedMetadata={() => setVideoDur(videoRef.current?.duration || 0)}
                  onTimeUpdate={() => setVideoPos(videoRef.current?.currentTime || 0)}
                />
              </div>
              <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(videoPos)} / {formatTime(videoDur)}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-accent/30 overflow-hidden shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-base">Tài liệu</CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>
                  <ZoomOut className="h-4 w-4" /> Thu nhỏ
                </Button>
                <Button size="sm" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}>
                  <ZoomIn className="h-4 w-4" /> Phóng to
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[75vh] overflow-auto bg-white">
                <div
                  className="w-full h-full"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <iframe src={learn.src} className="w-[100%] h-[75vh]" />
                </div>
              </div>
              <div className="p-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(elapsed)} / {formatTime(estimated)} (ước tính)
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
