import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MobileLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/m");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 rounded-2xl border border-primary/20 bg-card p-6 shadow-lg">
        <h1 className="text-xl font-bold">Đăng nhập</h1>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input placeholder="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">Tiếp tục</Button>
        <p className="text-center text-sm text-muted-foreground">
          Chưa có tài khoản? <Link to="/m/register" className="text-primary underline">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
}
