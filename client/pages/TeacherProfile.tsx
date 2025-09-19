import React, { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Edit,
  Save,
  Camera,
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  Star,
} from "lucide-react";

// Mock teacher data
const mockTeacherData = {
  id: 1,
  fullName: "Nguyễn Thị Lan",
  email: "nguyenthilan@email.com",
  phone: "0123456789",
  avatar: "/placeholder.svg",

  // Professional Information
  school: "Trường Tiểu học Chu Văn An",
  subject: "Toán",
  experience: "5-10",
  qualification: "thac-si",
  position: "Giáo viên chính",
  teachingLevel: "Tiểu học",

  // Personal Information
  dateOfBirth: "1990-05-15",
  gender: "female",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  emergencyContact: "0987654321",
  emergencyContactName: "Nguyễn Văn Nam",
  idNumber: "123456789012",

  // Bio and Description
  bio: "Tôi là giáo viên Toán với 8 năm kinh nghiệm giảng dạy. Tôi luôn tìm cách làm cho môn Toán trở nên thú vị và dễ hiểu cho các em học sinh.",
  specializations: ["Toán tư duy", "Toán nâng cao", "Bồi dưỡng học sinh giỏi"],
  achievements: [
    "Giáo viên giỏi cấp thành phố 2023",
    "Hướng dẫn học sinh đạt giải Nhất Olympic Toán 2022",
    "Chứng chỉ Intel Teach 2021",
  ],

  // Certificates / Documents
  documents: [
    {
      id: 1,
      name: "Chứng chỉ Sư phạm Toán - Bộ GDĐT",
      type: "certificate",
      issuedBy: "Bộ Giáo dục và Đào tạo",
      issueDate: "2020-09-01",
      url: "/placeholder.svg",
    },
    {
      id: 2,
      name: "IELTS Academic 7.0",
      type: "certificate",
      issuedBy: "British Council",
      issueDate: "2021-06-15",
      url: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Bằng Thạc sĩ Sư phạm Toán",
      type: "diploma",
      issuedBy: "ĐH Sư phạm TP.HCM",
      issueDate: "2018-08-20",
      url: "/placeholder.svg",
    },
  ],

  // Teaching Preferences
  preferredAgeGroups: ["6-8 tuổi", "8-10 tuổi"],
  teachingMethods: ["Trực quan", "Tương tác", "Trò chơi"],
  availableHours: "7:00-17:00",

  // Statistics
  joinDate: "2022-01-15",
  totalCourses: 5,
  totalStudents: 58,
  averageRating: 4.8,
  totalLessons: 35,

  // Settings
  profileVisibility: "public",
  allowMessages: true,
  notificationEmail: true,
  notificationPush: true,

  // Security (for UI only)
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

// Mock student data
const mockStudentData = {
  id: 2,
  fullName: "Trần Văn An",
  avatar: "/placeholder.svg",
  dateOfBirth: "2010-03-12",
  className: "Lớp 5A",
  school: "Trường Tiểu học Nguyễn Trãi",
  learningGoals: [
    "Nâng cao kỹ năng tính toán",
    "Chuẩn bị cho kỳ thi học sinh giỏi cấp trường",
  ],
  parentName: "Trần Thị B",
  parentPhone: "0912345678",
  address: "45 Phố XYZ, Quận 3, TP.HCM",
};

const subjects = ["Toán", "Văn", "Anh"];

const experiences = [
  { value: "moi", label: "Mới tốt nghiệp" },
  { value: "1-3", label: "1-3 năm" },
  { value: "3-5", label: "3-5 năm" },
  { value: "5-10", label: "5-10 năm" },
  { value: "10+", label: "Trên 10 năm" },
];

const qualifications = [
  { value: "cao-dang", label: "Cao đẳng sư phạm" },
  { value: "dai-hoc", label: "Đại học sư phạm" },
  { value: "thac-si", label: "Thạc sĩ" },
  { value: "tien-si", label: "Tiến sĩ" },
];

const teachingLevels = [
  "Mầm non",
  "Tiểu học",
  "Trung học cơ sở",
  "Trung học phổ thông",
];

const genders = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];

export default function TeacherProfile() {
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');

  const [teacherData, setTeacherData] = useState(mockTeacherData);
  const [studentData, setStudentData] = useState(mockStudentData);

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(mockTeacherData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [openDocId, setOpenDocId] = useState<number | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [documentForm, setDocumentForm] = useState({
    name: "",
    type: "certificate",
    issuedBy: "",
    issueDate: "",
    url: "",
  });

  useEffect(() => {
    // When role changes, reset editing and active tab
    setIsEditing(false);
    setEditedData(role === 'teacher' ? teacherData : studentData);
    setActiveTab('personal');
  }, [role]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...(role === 'teacher' ? teacherData : studentData), currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(role === 'teacher' ? teacherData : studentData);
    setSaveSuccess(false);
    setPasswordError(null);
  };

  const handleSave = async () => {
    setPasswordError(null);
    // Password validation if any field filled
    const cp = (editedData as any).currentPassword as string;
    const np = (editedData as any).newPassword as string;
    const rp = (editedData as any).confirmPassword as string;
    if (cp || np || rp) {
      if (!cp) {
        setPasswordError("Vui lòng nhập mật khẩu hiện tại");
        return;
      }
      if (!np || np.length < 8) {
        setPasswordError("Mật khẩu mới tối thiểu 8 ký tự");
        return;
      }
      if (np !== rp) {
        setPasswordError("Xác nhận mật khẩu không khớp");
        return;
      }
    }

    setIsSaving(true);
    setTimeout(() => {
      const { currentPassword, newPassword, confirmPassword, ...rest } = editedData as any;
      if (role === 'teacher') {
        setTeacherData({ ...rest });
      } else {
        setStudentData({ ...rest });
      }
      setEditedData({ ...rest });
      setIsEditing(false);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedData({ ...editedData, [field]: value } as any);
  };

  const handleArrayChange = (
    field: string,
    value: string,
    action: 'add' | 'remove',
  ) => {
    const currentArray = (editedData as any)[field] || [];
    if (action === 'add' && value && !currentArray.includes(value)) {
      setEditedData({ ...editedData, [field]: [...currentArray, value] } as any);
    } else if (action === 'remove') {
      setEditedData({
        ...editedData,
        [field]: currentArray.filter((item: string) => item !== value),
      } as any);
    }
  };

  const handleAddDocument = () => {
    if (!documentForm.name || !documentForm.issuedBy || !documentForm.issueDate || !documentForm.url) return;
    const nextId = Math.max(0, ...(((editedData.documents || []) as any[]).map((d: any) => d.id))) + 1;
    const newDoc = { id: nextId, ...documentForm } as any;
    setEditedData({
      ...editedData,
      documents: [...(editedData.documents || []), newDoc],
    } as any);
    setDocumentForm({ name: "", type: "certificate", issuedBy: "", issueDate: "", url: "" });
  };

  const handleRemoveDocument = (id: number) => {
    setEditedData({
      ...editedData,
      documents: (editedData.documents || []).filter((d: any) => d.id !== id),
    } as any);
  };

  const currentData: any = isEditing ? editedData : (role === 'teacher' ? teacherData : studentData);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Chế độ hiển thị:</div>
            <Select value={role} onValueChange={(v) => setRole(v as 'teacher' | 'student')}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">Giáo viên</SelectItem>
                <SelectItem value="student">Học sinh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>Hủy</Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />Lưu thay đổi
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />Chỉnh sửa
              </Button>
            )}
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Thông tin của bạn đã được cập nhật thành công!
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {passwordError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{passwordError}</AlertDescription>
          </Alert>
        )}

        {/* Profile Overview Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={currentData.avatar} alt={currentData.fullName} />
                  <AvatarFallback className="text-2xl">
                    {currentData.fullName.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{currentData.fullName}</h2>
                <p className="text-gray-600">{role === 'teacher' ? (currentData.position + ' - ' + currentData.subject) : currentData.className}</p>
                <p className="text-sm text-gray-500">{currentData.school}</p>

                <div className="flex items-center gap-4 mt-3">
                  {role === 'teacher' ? (
                    <>
                      <Badge className="bg-green-100 text-green-800">{(experiences.find((e) => e.value === currentData.experience) || {}).label}</Badge>
                      <Badge className="bg-blue-100 text-blue-800">{(qualifications.find((q) => q.value === currentData.qualification) || {}).label}</Badge>
                      <Badge className="bg-purple-100 text-purple-800">{currentData.teachingLevel}</Badge>
                    </>
                  ) : (
                    <Badge className="bg-purple-100 text-purple-800">{currentData.className}</Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                {role === 'teacher' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{currentData.totalCourses}</div>
                      <div className="text-xs text-gray-600">Môn học</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentData.totalStudents}</div>
                      <div className="text-xs text-gray-600">Học sinh</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{currentData.averageRating}</div>
                      <div className="text-xs text-gray-600">Đánh giá</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{currentData.totalLessons}</div>
                      <div className="text-xs text-gray-600">Bài học</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">-</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
            {role === 'teacher' ? (
              <>
                <TabsTrigger value="professional">Thông tin nghề nghiệp</TabsTrigger>
                <TabsTrigger value="bio">Giới thiệu</TabsTrigger>
                <TabsTrigger value="achievements">Thành tích</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                <TabsTrigger value="documents">Tài liệu chứng chỉ</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="learningGoals">Mục tiêu học tập</TabsTrigger>
                <TabsTrigger value="parent">Thông tin phụ huynh</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                <TabsTrigger value="documents">Tài liệu (nếu có)</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    {isEditing ? (
                      <Input id="fullName" value={currentData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{currentData.fullName}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    {isEditing ? (
                      <Input id="dateOfBirth" type="date" value={currentData.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{new Date(currentData.dateOfBirth).toLocaleDateString("vi-VN")}</div>
                    )}
                  </div>

                  {role === 'student' && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="className">Lớp</Label>
                      {isEditing ? (
                        <Input id="className" value={currentData.className} onChange={(e) => handleInputChange("className", e.target.value)} />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.className}</div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="avatar">Ảnh đại diện (URL)</Label>
                    {isEditing ? (
                      <Input id="avatar" value={currentData.avatar} onChange={(e) => handleInputChange("avatar", e.target.value)} />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded break-all">{currentData.avatar}</div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="school">Trường</Label>
                    {isEditing ? (
                      <Input id="school" value={currentData.school} onChange={(e) => handleInputChange("school", e.target.value)} />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{currentData.school}</div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    {isEditing ? (
                      <Textarea id="address" value={currentData.address} onChange={(e) => handleInputChange("address", e.target.value)} rows={2} />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{currentData.address}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info - for teacher show email/phone, for student show parent info + phone maybe */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" />Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {role === 'teacher' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        {isEditing ? (
                          <Input id="email" type="email" value={currentData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.email}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        {isEditing ? (
                          <Input id="phone" value={currentData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.phone}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Người liên hệ khẩn cấp</Label>
                        {isEditing ? (
                          <Input id="emergencyContactName" value={currentData.emergencyContactName} onChange={(e) => handleInputChange("emergencyContactName", e.target.value)} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.emergencyContactName}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">SĐT khẩn cấp</Label>
                        {isEditing ? (
                          <Input id="emergencyContact" value={currentData.emergencyContact} onChange={(e) => handleInputChange("emergencyContact", e.target.value)} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.emergencyContact}</div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Tên phụ huynh</Label>
                        {isEditing ? (
                          <Input id="parentName" value={currentData.parentName} onChange={(e) => handleInputChange("parentName", e.target.value)} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.parentName}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Số điện thoại phụ huynh</Label>
                        {isEditing ? (
                          <Input id="parentPhone" value={currentData.parentPhone} onChange={(e) => handleInputChange("parentPhone", e.target.value)} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.parentPhone}</div>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Địa chỉ</Label>
                        {isEditing ? (
                          <Textarea id="address" value={currentData.address} onChange={(e) => handleInputChange("address", e.target.value)} rows={2} />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">{currentData.address}</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teacher-only Professional Tab */}
          {role === 'teacher' && (
            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Thông tin công việc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school">Trường học hiện tại *</Label>
                      {isEditing ? (
                        <Input id="school" value={currentData.school} onChange={(e) => handleInputChange("school", e.target.value)} />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.school}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Chức vụ</Label>
                      {isEditing ? (
                        <Input id="position" value={currentData.position} onChange={(e) => handleInputChange("position", e.target.value)} />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.position}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Môn học chuyên môn *</Label>
                      {isEditing ? (
                        <Select value={currentData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.subject}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teachingLevel">Cấp học giảng dạy</Label>
                      {isEditing ? (
                        <Select value={currentData.teachingLevel} onValueChange={(value) => handleInputChange("teachingLevel", value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {teachingLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.teachingLevel}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Số năm kinh nghiệm *</Label>
                      {isEditing ? (
                        <Select value={currentData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {experiences.map((exp) => (
                              <SelectItem key={exp.value} value={exp.value}>{exp.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{(experiences.find((e) => e.value === currentData.experience) || {}).label}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualification">Trình độ học vấn *</Label>
                      {isEditing ? (
                        <Select value={currentData.qualification} onValueChange={(value) => handleInputChange("qualification", value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {qualifications.map((qual) => (
                              <SelectItem key={qual.value} value={qual.value}>{qual.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{(qualifications.find((q) => q.value === currentData.qualification) || {}).label}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availableHours">Giờ giảng dạy</Label>
                    {isEditing ? (
                      <Input id="availableHours" value={currentData.availableHours} onChange={(e) => handleInputChange("availableHours", e.target.value)} placeholder="VD: 7:00-17:00" />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{currentData.availableHours}</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" />Chuyên môn và sở thích</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Chuyên môn</Label>
                    <div className="flex flex-wrap gap-2">
                      {currentData.specializations?.map((spec: string, index: number) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {spec}
                          {isEditing && (
                            <button onClick={() => handleArrayChange("specializations", spec, "remove")} className="ml-1 text-red-500 hover:text-red-700">×</button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nhóm tuổi ưa thích</Label>
                    <div className="flex flex-wrap gap-2">
                      {currentData.preferredAgeGroups?.map((age: string, index: number) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {age}
                          {isEditing && (
                            <button onClick={() => handleArrayChange("preferredAgeGroups", age, "remove")} className="ml-1 text-red-500 hover:text-red-700">×</button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phương pháp gi��ng dạy</Label>
                    <div className="flex flex-wrap gap-2">
                      {currentData.teachingMethods?.map((method: string, index: number) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {method}
                          {isEditing && (
                            <button onClick={() => handleArrayChange("teachingMethods", method, "remove")} className="ml-1 text-red-500 hover:text-red-700">×</button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Learning Goals - student only */}
          {role === 'student' && (
            <TabsContent value="learningGoals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5" />Mục tiêu học tập</CardTitle>
                  <CardDescription>Những mục tiêu và kỳ vọng học tập của học sinh</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(currentData.learningGoals || []).map((goal: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">{goal}</div>
                        {isEditing && (
                          <Button size="sm" variant="ghost" onClick={() => handleArrayChange('learningGoals', goal, 'remove')} className="text-red-500">×</Button>
                        )}
                      </div>
                    ))}

                    {isEditing && (
                      <div className="flex gap-2">
                        <Input placeholder="Thêm mục tiêu mới" onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const v = (e.target as HTMLInputElement).value.trim();
                            if (v) { handleArrayChange('learningGoals', v, 'add'); (e.target as HTMLInputElement).value = ''; }
                          }
                        }} />
                        <div className="text-sm text-gray-500">Nhấn Enter để thêm</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Parent Info - student only */}
          {role === 'student' && (
            <TabsContent value="parent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" />Thông tin phụ huynh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Tên phụ huynh</Label>
                      {isEditing ? (
                        <Input id="parentName" value={currentData.parentName} onChange={(e) => handleInputChange('parentName', e.target.value)} />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.parentName}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Số điện thoại phụ huynh</Label>
                      {isEditing ? (
                        <Input id="parentPhone" value={currentData.parentPhone} onChange={(e) => handleInputChange('parentPhone', e.target.value)} />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">{currentData.parentPhone}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Bio Tab - teacher only */}
          {role === 'teacher' && (
            <TabsContent value="bio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Giới thiệu bản thân</CardTitle>
                  <CardDescription>Chia sẻ về phong cách giảng dạy và kinh nghiệm của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Mô tả ngắn về bản thân</Label>
                    {isEditing ? (
                      <Textarea id="bio" value={currentData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} rows={6} placeholder="Chia sẻ về phương pháp giảng dạy, kinh nghiệm và đam mê của bạn..." />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-line">{currentData.bio}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Achievements Tab - teacher only */}
          {role === 'teacher' && (
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Thành tích và giải thưởng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {currentData.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="flex-1">{achievement}</span>
                        {isEditing && (
                          <Button size="sm" variant="ghost" onClick={() => handleArrayChange("achievements", achievement, "remove")} className="text-red-500 hover:text-red-700">×</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Thông tin tài khoản</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2"><span className="text-gray-600">Ngày tham gia:</span><span className="font-medium">{new Date(currentData.joinDate).toLocaleDateString("vi-VN")}</span></div>
                    <div className="flex justify-between py-2"><span className="text-gray-600">Tổng môn học:</span><span className="font-medium">{currentData.totalCourses}</span></div>
                    <div className="flex justify-between py-2"><span className="text-gray-600">Tổng học sinh:</span><span className="font-medium">{currentData.totalStudents}</span></div>
                    <div className="flex justify-between py-2"><span className="text-gray-600">Đánh giá trung bình:</span><span className="font-medium">{currentData.averageRating}</span></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Settings Tab - shared */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt quyền riêng tư</CardTitle>
                <CardDescription>Quản lý ai có thể xem hồ sơ và liên hệ với bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hiển thị hồ sơ công khai</Label>
                    <p className="text-sm text-gray-600">Cho phép người khác xem hồ sơ của bạn</p>
                  </div>
                  <Switch checked={currentData.profileVisibility === "public"} onCheckedChange={(checked) => handleInputChange("profileVisibility", checked ? "public" : "private")} disabled={!isEditing} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cho phép nhận tin nhắn</Label>
                    <p className="text-sm text-gray-600">Người dùng có thể gửi tin nhắn cho bạn</p>
                  </div>
                  <Switch checked={currentData.allowMessages} onCheckedChange={(checked) => handleInputChange("allowMessages", checked)} disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>

            {/* Security section only if teacher has password fields; for student keep basic placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật</CardTitle>
                <CardDescription>Đổi mật khẩu tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <Input id="currentPassword" type="password" value={currentData.currentPassword || ''} onChange={(e) => handleInputChange("currentPassword", e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input id="newPassword" type="password" value={currentData.newPassword || ''} onChange={(e) => handleInputChange("newPassword", e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <Input id="confirmPassword" type="password" value={currentData.confirmPassword || ''} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents / Certificates Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Tài liệu chứng chỉ</CardTitle>
                <CardDescription>Danh sách văn bằng, chứng chỉ và tài liệu (nếu có)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Only allow adding documents for teacher */}
                {role === 'teacher' && isEditing && (
                  <div className="space-y-3 border rounded-lg p-3">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      <Input placeholder="Tên tài liệu" value={documentForm.name} onChange={(e) => setDocumentForm({ ...documentForm, name: e.target.value })} />
                      <Select value={documentForm.type} onValueChange={(v) => setDocumentForm({ ...documentForm, type: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="certificate">certificate</SelectItem>
                          <SelectItem value="diploma">diploma</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Nơi cấp" value={documentForm.issuedBy} onChange={(e) => setDocumentForm({ ...documentForm, issuedBy: e.target.value })} />
                      <Input type="date" placeholder="Ngày cấp" value={documentForm.issueDate} onChange={(e) => setDocumentForm({ ...documentForm, issueDate: e.target.value })} />
                      <Input placeholder="URL hình ảnh" value={documentForm.url} onChange={(e) => setDocumentForm({ ...documentForm, url: e.target.value })} />
                    </div>
                    <div className="text-right">
                      <Button size="sm" onClick={handleAddDocument}>Thêm</Button>
                    </div>
                  </div>
                )}

                {(currentData.documents || []).length === 0 && (
                  <div className="text-sm text-gray-600">Không có tài liệu nào.</div>
                )}

                {(currentData.documents || []).map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">{doc.issuedBy} • {new Date(doc.issueDate).toLocaleDateString("vi-VN")}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={openDocId === doc.id} onOpenChange={(o) => setOpenDocId(o ? doc.id : null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Xem chi tiết</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{doc.name}</DialogTitle>
                            <DialogDescription>{doc.issuedBy} • {new Date(doc.issueDate).toLocaleDateString("vi-VN")}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2 text-sm">
                            <div>Loại: <span className="font-medium uppercase">{doc.type}</span></div>
                            <div className="rounded-lg border p-3 bg-muted/30">
                              <img src={doc.url} alt={doc.name} className="w-full h-auto rounded" />
                            </div>
                            <div className="flex gap-2">
                              <a href={doc.url} download className="underline text-primary">Tải xuống</a>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {isEditing && role === 'teacher' && (
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleRemoveDocument(doc.id)}>Xóa</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
