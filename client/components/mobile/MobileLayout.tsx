import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export default function MobileLayout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-screen-sm flex-col bg-background">
      <main className="flex-1 overflow-y-auto pb-20 pt-2">{/* space for bottom nav */}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
