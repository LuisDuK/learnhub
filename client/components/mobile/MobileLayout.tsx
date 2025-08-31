import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export default function MobileLayout() {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-screen-sm flex-col bg-gradient-to-br from-background via-accent/10 to-primary/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
      <main className="flex-1 overflow-y-auto pb-28 pt-3">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
