import React, { useState } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, FileText, Clock, Edit, Save, Camera, CheckCircle, AlertCircle } from "lucide-react";

// Teacher-specific mock data (only the fields requested)
const mockTeacherData = {
  id: 1,
  fullName: "Nguyễn Thị Lan",
  dateOfBirth: "1990-05-15",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  avatar: "/placeholder.svg",
  email: "nguyenthilan@email.com",
  phone: "0123456789",
  subject: "Toán",
  school: "Trường Tiểu học Chu Văn An",
  experience: "5-10",
  documents: [
    { id: 1, name: "Chứng chỉ Sư phạm Toán", issuedBy: "Bộ GDĐT", issueDate: "2020-09-01", url: "/placeholder.svg", type: "certificate" },
  ],
  bio: "Tôi là giáo viên Toán với nhiều năm kinh nghiệm.",
  // security/UI only
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function TeacherProfile() {
  const [teacherData, setTeacherData] = useState(mockTeacherData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(mockTeacherData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [openDocId, setOpenDocId] = useState<number | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [documentForm, setDocumentForm] = useState({ name: "", issuedBy: "", issueDate: "", url: "" });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...teacherData, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(teacherData);
    setSaveSuccess(false);
    setPasswordError(null);
  };

  const handleSave = () => {
    setPasswordError(null);
    const cp = (editedData as any).currentPassword as string;
    const np = (editedData as any).newPassword as string;
    const rp = (editedData as any).confirmPassword as string;

    if (cp || np || rp) {
      if (!cp) { setPasswordError('Vui lòng nhập mật khẩu hiện tại'); return; }
      if (!np || np.length < 8) { setPasswordError('Mật khẩu mới tối thiểu 8 ký tự'); return; }
      if (np !== rp) { setPasswordError('Xác nhận mật khẩu không khớp'); return; }
    }

    setIsSaving(true);
    setTimeout(() => {
      const { currentPassword, newPassword, confirmPassword, ...rest } = editedData as any;
      setTeacherData({ ...rest });
      setEditedData({ ...rest });
      setIsEditing(false);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleAddDocument = () => {
    if (!documentForm.name || !documentForm.issuedBy || !documentForm.issueDate || !documentForm.url) return;
    const nextId = Math.max(0, ...(((editedData.documents || []) as any[]).map((d: any) => d.id))) + 1;
    const newDoc = { id: nextId, ...documentForm, type: 'certificate' };
    setEditedData({ ...editedData, documents: [...(editedData.documents || []), newDoc] });
    setDocumentForm({ name: "", issuedBy: "", issueDate: "", url: "" });
  };

  const handleRemoveDocument = (id: number) => {
    setEditedData({ ...editedData, documents: (editedData.documents || []).filter((d: any) => d.id !== id) });
  };

  const currentData: any = isEditing ? editedData : teacherData;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>Hủy</Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (<><Clock className="h-4 w-4 mr-2 animate-spin" />Đang lưu...</>) : (<><Save className="h-4 w-4 mr-2" />Lưu thay đổi</>)}
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit}><Edit className="h-4 w-4 mr-2" />Chỉnh sửa</Button>
            )}
          </div>
        </div>

        {saveSuccess && (
          <Alert className="border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Thông tin đã được lưu.</AlertDescription></Alert>
        )}

        {passwordError && (
          <Alert className="border-red-200 bg-red-50"><AlertCircle className="h-4 w-4 text-red-600" /><AlertDescription className="text-red-800">{passwordError}</AlertDescription></Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24"><AvatarImage src={currentData.avatar} alt={currentData.fullName} /><AvatarFallback className="text-2xl">{currentData.fullName.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback></Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"><Camera className="h-4 w-4" /></Button>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{currentData.fullName}</h2>
                <p className="text-gray-600">{currentData.subject}</p>
                <p className="text-sm text-gray-500">{currentData.school}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Thông tin cơ bản</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Họ và tên</Label>
                    {isEditing ? <Input value={currentData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{currentData.fullName}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Ngày sinh</Label>
                    {isEditing ? <Input type="date" value={currentData.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{new Date(currentData.dateOfBirth).toLocaleDateString('vi-VN')}</div>}
                  </div>

                 

                  <div className="space-y-2 md:col-span-2">
                    <Label>Trường</Label>
                    {isEditing ? <Input value={currentData.school} onChange={(e) => handleInputChange('school', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{currentData.school}</div>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Địa chỉ</Label>
                    {isEditing ? <Textarea value={currentData.address} onChange={(e) => handleInputChange('address', e.target.value)} rows={2} /> : <div className="p-2 bg-gray-50 rounded">{currentData.address}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    {isEditing ? <Input type="email" value={currentData.email} onChange={(e) => handleInputChange('email', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{currentData.email}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    {isEditing ? <Input value={currentData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{currentData.phone}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Môn dạy</Label>
                    {isEditing ? <Input value={currentData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{currentData.subject}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Kinh nghiệm</Label>
                    {isEditing ? <Input value={currentData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} /> : <div className="p-2 bg-gray-50 rounded">{currentData.experience}</div>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Mô tả ngắn</Label>
                    {isEditing ? <Textarea value={currentData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} rows={4} /> : <div className="p-2 bg-gray-50 rounded whitespace-pre-line">{currentData.bio}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Tài liệu chứng chỉ</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {isEditing && (
                  <div className="space-y-3 border rounded-lg p-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <Input placeholder="Tên tài liệu" value={documentForm.name} onChange={(e) => setDocumentForm({ ...documentForm, name: e.target.value })} />
                      <Input placeholder="Nơi cấp" value={documentForm.issuedBy} onChange={(e) => setDocumentForm({ ...documentForm, issuedBy: e.target.value })} />
                      <Input type="date" value={documentForm.issueDate} onChange={(e) => setDocumentForm({ ...documentForm, issueDate: e.target.value })} />
                      <Input placeholder="URL hình ảnh" value={documentForm.url} onChange={(e) => setDocumentForm({ ...documentForm, url: e.target.value })} />
                    </div>
                    <div className="text-right"><Button size="sm" onClick={handleAddDocument}>Thêm</Button></div>
                  </div>
                )}

                {(currentData.documents || []).length === 0 && <div className="text-sm text-gray-600">Không có tài liệu nào.</div>}

                {(currentData.documents || []).map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">{doc.issuedBy} • {new Date(doc.issueDate).toLocaleDateString('vi-VN')}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={openDocId === doc.id} onOpenChange={(o) => setOpenDocId(o ? doc.id : null)}>
                        <DialogTrigger asChild><Button variant="outline" size="sm">Xem chi tiết</Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>{doc.name}</DialogTitle></DialogHeader>
                          <div className="p-3">
                            <img src={doc.url} alt={doc.name} className="w-full h-auto rounded" />
                          </div>
                        </DialogContent>
                      </Dialog>
                      {isEditing && <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleRemoveDocument(doc.id)}>Xóa</Button>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader><CardTitle>Bảo mật</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Mật khẩu hiện tại</Label>
                    <Input type="password" value={currentData.currentPassword || ''} onChange={(e) => handleInputChange('currentPassword', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Mật khẩu mới</Label>
                    <Input type="password" value={currentData.newPassword || ''} onChange={(e) => handleInputChange('newPassword', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Xác nhận mật khẩu mới</Label>
                    <Input type="password" value={currentData.confirmPassword || ''} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
