"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
    const [isShowOnMobile, setIsShowOnMobile] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem("sidebar-collapsed", String(newCollapsedState));
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isShowOnMobile={isShowOnMobile} setIsShowOnMobile={setIsShowOnMobile} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsShowOnMobile={() => setIsShowOnMobile(true)} isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}