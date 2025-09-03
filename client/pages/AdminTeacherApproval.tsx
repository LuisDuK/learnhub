import React, { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  TeacherApplication,
  TeacherApplicationStatus,
  TeacherApplicationsListResponse,
} from "@shared/api";
import { Check, Filter, Loader2, Search, ShieldX } from "lucide-react";

export default function AdminTeacherApproval() {
  const { toast } = useToast();
  const [items, setItems] = useState<TeacherApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<TeacherApplicationStatus | "all">(
    "pending",
  );
  const [search, setSearch] = useState("");
  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    id: number | null;
    reason: string;
  }>({ open: false, id: null, reason: "" });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const qs =
        status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
      const res = await fetch(`/api/teachers/applications${qs}`);
      const data: TeacherApplicationsListResponse = await res.json();
      setItems(data.items);
    } catch (e) {
      toast({
        title: "Lỗi",
        description: "Không tải được danh sách hồ sơ.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (i) =>
        i.fullName.toLowerCase().includes(s) ||
        i.email.toLowerCase().includes(s) ||
        i.subject.toLowerCase().includes(s),
    );
  }, [items, search]);

  const approve = async (id: number) => {
    try {
      const res = await fetch(`/api/teachers/applications/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      await fetchItems();
      toast({ title: "Đã duyệt", description: `Hồ sơ #${id} đã được duyệt.` });
    } catch (e) {
      toast({
        title: "Lỗi",
        description: "Không duyệt được hồ sơ.",
        variant: "destructive",
      });
    }
  };

  const openReject = (id: number) =>
    setRejectDialog({ open: true, id, reason: "" });

  const reject = async () => {
    if (!rejectDialog.id) return;
    try {
      const res = await fetch(
        `/api/teachers/applications/${rejectDialog.id}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason: rejectDialog.reason }),
        },
      );
      if (!res.ok) throw new Error();
      setRejectDialog({ open: false, id: null, reason: "" });
      await fetchItems();
      toast({
        title: "Đã từ chối",
        description: `Hồ sơ #${rejectDialog.id} đã bị từ chối.`,
      });
    } catch (e) {
      toast({
        title: "Lỗi",
        description: "Không từ chối được hồ sơ.",
        variant: "destructive",
      });
    }
  };

  const statusBadge = (s: TeacherApplicationStatus) => {
    switch (s) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🛡️ Duyệt giáo viên
            </h1>
            <p className="text-gray-600 mt-1">
              Xem xét và phê duyệt hồ sơ đăng ký giáo viên
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm theo tên, email, môn học..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger className="w-56">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchItems} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang tải
              </>
            ) : (
              "Làm mới"
            )}
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Họ tên</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Môn dạy</TableHead>
                <TableHead className="font-semibold">Kinh nghiệm</TableHead>
                <TableHead className="font-semibold">Ngày nộp</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold text-center">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => (
                <TableRow key={i.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{i.id}</TableCell>
                  <TableCell className="font-medium">{i.fullName}</TableCell>
                  <TableCell className="text-gray-600">{i.email}</TableCell>
                  <TableCell>{i.subject}</TableCell>
                  <TableCell>{i.experienceYears} năm</TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(i.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusBadge(i.status)}>
                      {i.status === "pending"
                        ? "Chờ duyệt"
                        : i.status === "approved"
                          ? "Đã duyệt"
                          : "Từ chối"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {i.status === "pending" ? (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => approve(i.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" /> Duyệt
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openReject(i.id)}
                        >
                          <ShieldX className="h-4 w-4 mr-1" /> Từ chối
                        </Button>
                      </div>
                    ) : (
                      <div className="text-right text-sm text-gray-500">
                        {i.status === "approved"
                          ? "Đã duyệt"
                          : `Đã từ chối: ${i.rejectionReason || ""}`}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog
          open={rejectDialog.open}
          onOpenChange={(o) => setRejectDialog((s) => ({ ...s, open: o }))}
        >
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Từ chối hồ sơ giáo viên</DialogTitle>
              <DialogDescription>
                Vui lòng nhập lý do từ chối để thông báo cho ứng viên.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">
                  Lý do
                </Label>
                <Input
                  id="reason"
                  value={rejectDialog.reason}
                  onChange={(e) =>
                    setRejectDialog((s) => ({ ...s, reason: e.target.value }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setRejectDialog({ open: false, id: null, reason: "" })
                }
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={reject}
                disabled={!rejectDialog.reason.trim()}
              >
                Từ chối
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
