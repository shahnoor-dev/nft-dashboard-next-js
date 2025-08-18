"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isShowOnMobile, setIsShowOnMobile] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const pathname = usePathname();

  // Map routes to page titles
  useEffect(() => {
    switch (pathname) {
      case "/":
        setPageTitle("Dashboard");
        break;
      case "/inbox":
        setPageTitle("Inbox");
        break;
      case "/settings":
        setPageTitle("Settings");
        break;
      case "/profile":
        setPageTitle("Profile");
        break;
      default:
        // Capitalize route name automatically if no mapping exists
        setPageTitle(
          pathname
            ?.split("/")
            .filter(Boolean)
            .pop()
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()) || "Dashboard"
        );
    }
  }, [pathname]);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem("sidebar-collapsed", String(newCollapsedState));
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isShowOnMobile={isShowOnMobile}
        setIsShowOnMobile={setIsShowOnMobile}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          setIsShowOnMobile={() => setIsShowOnMobile(true)}
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
        />
        <main className="flex-1 overflow-y-auto lg:p-4 xl:p-6">{children}</main>
      </div>
    </div>
  );
}
