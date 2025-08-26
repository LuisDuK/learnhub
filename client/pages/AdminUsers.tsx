import React, { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  RotateCcw,
  Filter,
} from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Trần Thị Mai",
    email: "mai.tran@example.com",
    role: "Học sinh",
    status: "Hoạt động",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Phạm Thị Hoa",
    email: "hoa.pham@example.com",
    role: "Quản trị viên",
    status: "Hoạt động",
    createdAt: "2024-01-05",
  },
  {
    id: 3,
    name: "Lê Văn An",
    email: "an.le@example.com",
    role: "Học sinh",
    status: "Tạm khóa",
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    name: "Nguyễn Văn Bình",
    email: "binh.nguyen@example.com",
    role: "Quản trị viên",
    status: "Ho��t động",
    createdAt: "2024-01-15",
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user = {
        id: users.length + 1,
        ...newUser,
        status: "Hoạt động",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, user]);
      setNewUser({ name: "", email: "", role: "", password: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleResetPassword = (id: number) => {
    // In a real app, this would trigger a password reset
    alert(`Đã gửi email reset mật khẩu cho người dùng ID: ${id}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Học sinh":
        return "bg-green-100 text-green-800";
      case "Quản trị viên":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoạt động":
        return "bg-green-100 text-green-800";
      case "Tạm khóa":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              👥 Quản lý người dùng
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý giáo viên và quản trị viên hệ thống
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Thêm người dùng mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
                <DialogDescription>
                  Tạo tài khoản mới cho giáo viên hoặc quản trị viên
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Họ tên
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Vai trò
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, role: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Giáo viên">Giáo viên</SelectItem>
                      <SelectItem value="Quản trị viên">
                        Quản trị viên
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Mật khẩu
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Lọc theo vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="Giáo viên">Giáo viên</SelectItem>
              <SelectItem value="Quản trị viên">Quản trị viên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Họ tên</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Vai trò</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold">Ngày tạo</TableHead>
                <TableHead className="font-semibold text-center">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {user.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleResetPassword(user.id)}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.role === "Giáo viên").length}
            </div>
            <div className="text-sm text-green-600">Giáo viên</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "Quản trị viên").length}
            </div>
            <div className="text-sm text-purple-600">Quản trị viên</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">
              {users.length}
            </div>
            <div className="text-sm text-blue-600">Tổng người dùng</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
