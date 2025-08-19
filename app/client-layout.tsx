"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ProfileProvider } from "@/context/profile-context";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // --- All hooks are called here, at the top ---
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isShowOnMobile, setIsShowOnMobile] = useState(false);
    const [pageTitle, setPageTitle] = useState("");
    const pathname = usePathname();

    // --- Logic for setting page title ---
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
        // Note: localStorage is only available in the browser.
        // This is fine in a "use client" component.
        localStorage.setItem("sidebar-collapsed", String(newCollapsedState));
    };

    // --- Conditional logic to determine which layout to show ---
    const isAuthPage =
        pathname.startsWith("/signin") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/reset-password");

    // --- A single return statement ---
    return (
        <ProfileProvider>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
            {isAuthPage ? (
                // Render only children for auth pages
                <>{children}</>
            ) : (
                // Render the full layout for all other pages
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
                        <main className="flex-1 p-4 xl:p-6">{children}</main>
                    </div>
                </div>
            )}
        </ProfileProvider>
    );
}