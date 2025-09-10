import React, { useState } from "react";
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
  Users,
  BookOpen,
  Star,
  Eye,
  EyeOff,
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
  subject: "Toán học",
  experience: "5-10",
  qualification: "Thạc sĩ",
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

  // Teaching Preferences
  preferredAgeGroups: ["6-8 tuổi", "8-10 tu��i"],
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
  const [teacherData, setTeacherData] = useState(mockTeacherData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(mockTeacherData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...teacherData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...teacherData });
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setTeacherData({ ...editedData });
      setIsEditing(false);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleArrayChange = (
    field: string,
    value: string,
    action: "add" | "remove",
  ) => {
    const currentArray = (editedData as any)[field] || [];
    if (action === "add" && value && !currentArray.includes(value)) {
      setEditedData({ ...editedData, [field]: [...currentArray, value] });
    } else if (action === "remove") {
      setEditedData({
        ...editedData,
        [field]: currentArray.filter((item: string) => item !== value),
      });
    }
  };

  const currentData = isEditing ? editedData : teacherData;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <User className="h-8 w-8 text-green-600" />
              Thông tin cá nhân
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý hồ sơ và thông tin giảng dạy của bạn
            </p>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Lưu thay đổi
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
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

        {/* Profile Overview Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={currentData.avatar}
                    alt={currentData.fullName}
                  />
                  <AvatarFallback className="text-2xl">
                    {currentData.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentData.fullName}
                </h2>
                <p className="text-gray-600">
                  {currentData.position} - {currentData.subject}
                </p>
                <p className="text-sm text-gray-500">{currentData.school}</p>

                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-green-100 text-green-800">
                    {
                      experiences.find(
                        (e) => e.value === currentData.experience,
                      )?.label
                    }
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    {
                      qualifications.find(
                        (q) => q.value === currentData.qualification,
                      )?.label
                    }
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    {currentData.teachingLevel}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentData.totalCourses}
                    </div>
                    <div className="text-xs text-gray-600">Khóa học</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentData.totalStudents}
                    </div>
                    <div className="text-xs text-gray-600">Học sinh</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {currentData.averageRating}
                    </div>
                    <div className="text-xs text-gray-600">Đánh giá</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {currentData.totalLessons}
                    </div>
                    <div className="text-xs text-gray-600">Bài học</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="professional">
              Thông tin nghề nghiệp
            </TabsTrigger>
            <TabsTrigger value="bio">Giới thiệu</TabsTrigger>
            <TabsTrigger value="achievements">Thành tích</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    {isEditing ? (
                      <Input
                        id="fullName"
                        value={currentData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.fullName}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={currentData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {new Date(currentData.dateOfBirth).toLocaleDateString(
                          "vi-VN",
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    {isEditing ? (
                      <Select
                        value={currentData.gender}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {
                          genders.find((g) => g.value === currentData.gender)
                            ?.label
                        }
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">CCCD/CMND</Label>
                    {isEditing ? (
                      <Input
                        id="idNumber"
                        value={currentData.idNumber}
                        onChange={(e) =>
                          handleInputChange("idNumber", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.idNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={currentData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      rows={2}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">
                      {currentData.address}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Thông tin liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={currentData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={currentData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.phone}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">
                      Người liên hệ khẩn cấp
                    </Label>
                    {isEditing ? (
                      <Input
                        id="emergencyContactName"
                        value={currentData.emergencyContactName}
                        onChange={(e) =>
                          handleInputChange(
                            "emergencyContactName",
                            e.target.value,
                          )
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.emergencyContactName}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">SĐT khẩn cấp</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyContact"
                        value={currentData.emergencyContact}
                        onChange={(e) =>
                          handleInputChange("emergencyContact", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.emergencyContact}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Thông tin công việc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="school">Trường học hiện tại *</Label>
                    {isEditing ? (
                      <Input
                        id="school"
                        value={currentData.school}
                        onChange={(e) =>
                          handleInputChange("school", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.school}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Chức vụ</Label>
                    {isEditing ? (
                      <Input
                        id="position"
                        value={currentData.position}
                        onChange={(e) =>
                          handleInputChange("position", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.position}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Môn học chuyên môn *</Label>
                    {isEditing ? (
                      <Select
                        value={currentData.subject}
                        onValueChange={(value) =>
                          handleInputChange("subject", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.subject}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teachingLevel">Cấp học giảng dạy</Label>
                    {isEditing ? (
                      <Select
                        value={currentData.teachingLevel}
                        onValueChange={(value) =>
                          handleInputChange("teachingLevel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {teachingLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {currentData.teachingLevel}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Số năm kinh nghiệm *</Label>
                    {isEditing ? (
                      <Select
                        value={currentData.experience}
                        onValueChange={(value) =>
                          handleInputChange("experience", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {experiences.map((exp) => (
                            <SelectItem key={exp.value} value={exp.value}>
                              {exp.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {
                          experiences.find(
                            (e) => e.value === currentData.experience,
                          )?.label
                        }
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Trình độ học vấn *</Label>
                    {isEditing ? (
                      <Select
                        value={currentData.qualification}
                        onValueChange={(value) =>
                          handleInputChange("qualification", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {qualifications.map((qual) => (
                            <SelectItem key={qual.value} value={qual.value}>
                              {qual.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {
                          qualifications.find(
                            (q) => q.value === currentData.qualification,
                          )?.label
                        }
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableHours">Giờ giảng dạy</Label>
                  {isEditing ? (
                    <Input
                      id="availableHours"
                      value={currentData.availableHours}
                      onChange={(e) =>
                        handleInputChange("availableHours", e.target.value)
                      }
                      placeholder="VD: 7:00-17:00"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">
                      {currentData.availableHours}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Chuyên môn và sở thích
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Chuyên môn</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentData.specializations.map((spec, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {spec}
                        {isEditing && (
                          <button
                            onClick={() =>
                              handleArrayChange(
                                "specializations",
                                spec,
                                "remove",
                              )
                            }
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nhóm tuổi ưa thích</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentData.preferredAgeGroups.map((age, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {age}
                        {isEditing && (
                          <button
                            onClick={() =>
                              handleArrayChange(
                                "preferredAgeGroups",
                                age,
                                "remove",
                              )
                            }
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phương pháp giảng dạy</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentData.teachingMethods.map((method, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {method}
                        {isEditing && (
                          <button
                            onClick={() =>
                              handleArrayChange(
                                "teachingMethods",
                                method,
                                "remove",
                              )
                            }
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bio Tab */}
          <TabsContent value="bio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Giới thiệu bản thân
                </CardTitle>
                <CardDescription>
                  Chia sẻ về phong cách giảng dạy và kinh nghiệm của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Mô tả ngắn về bản thân</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={currentData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={6}
                      placeholder="Chia sẻ về phương pháp giảng dạy, kinh nghiệm và đam mê của bạn..."
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-line">
                      {currentData.bio}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Thành tích và giải thưởng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {currentData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="flex-1">{achievement}</span>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleArrayChange(
                              "achievements",
                              achievement,
                              "remove",
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Thông tin tài khoản
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Ngày tham gia:</span>
                    <span className="font-medium">
                      {new Date(currentData.joinDate).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tổng khóa học:</span>
                    <span className="font-medium">
                      {currentData.totalCourses}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tổng học sinh:</span>
                    <span className="font-medium">
                      {currentData.totalStudents}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Đánh giá trung bình:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {currentData.averageRating}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt quyền riêng tư</CardTitle>
                <CardDescription>
                  Quản lý ai có thể xem hồ sơ và liên hệ với bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hiển thị hồ sơ công khai</Label>
                    <p className="text-sm text-gray-600">
                      Cho phép học sinh và phụ huynh xem hồ sơ của bạn
                    </p>
                  </div>
                  <Switch
                    checked={currentData.profileVisibility === "public"}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "profileVisibility",
                        checked ? "public" : "private",
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cho phép nhận tin nhắn</Label>
                    <p className="text-sm text-gray-600">
                      Học sinh và phụ huynh có thể gửi tin nhắn cho bạn
                    </p>
                  </div>
                  <Switch
                    checked={currentData.allowMessages}
                    onCheckedChange={(checked) =>
                      handleInputChange("allowMessages", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>
                  Chọn cách bạn muốn nhận thông báo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo qua email</Label>
                    <p className="text-sm text-gray-600">
                      Nhận thông báo về hoạt động của học sinh qua email
                    </p>
                  </div>
                  <Switch
                    checked={currentData.notificationEmail}
                    onCheckedChange={(checked) =>
                      handleInputChange("notificationEmail", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo đẩy</Label>
                    <p className="text-sm text-gray-600">
                      Nhận thông báo đẩy trên trình duyệt
                    </p>
                  </div>
                  <Switch
                    checked={currentData.notificationPush}
                    onCheckedChange={(checked) =>
                      handleInputChange("notificationPush", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
