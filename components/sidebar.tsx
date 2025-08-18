"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Popover from '@radix-ui/react-popover';

import {
    LayoutDashboard,
    MessageCircleMore,
    Settings,
    Store,
    User,
    BadgeQuestionMark,
    Spotlight,
    BadgeDollarSign,
    Heart,
    LayoutGrid,
    Wallet,
    History,
    X
} from "lucide-react"

// No changes to types
interface SimpleLink {
    type: 'link'
    icon: React.ReactNode
    label: string
    href: string
}

interface MenuWithSubItems {
    type: 'menu'
    icon: React.ReactNode
    label: string
    subMenuItems: {
        label: string
        icon: React.ReactNode
        href: string
    }[]
}

type MenuItem = SimpleLink | MenuWithSubItems;

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    isShowOnMobile: boolean;
    setIsShowOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ isCollapsed, setIsCollapsed, isShowOnMobile, setIsShowOnMobile }: SidebarProps) {
    const pathname = usePathname()

    const menuConfig: MenuItem[] = [
        {
            type: 'link',
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            href: "/",
        },
        {
            type: 'link',
            icon: <MessageCircleMore size={20} />,
            label: "Inbox",
            href: "/inbox",
        },
        {
            type: 'link',
            icon: <Settings size={20} />,
            label: "Settings",
            href: "/settings",
        },
        {
            type: 'menu',
            icon: <Store size={20} />,
            label: "Marketplace",
            subMenuItems: [
                { label: "Market", icon: <BadgeDollarSign size={20} />, href: "/marketplace/market" },
                { label: "Active Bid", icon: <Spotlight size={20} />, href: "/marketplace/active-bid" },
                { label: "Saves", icon: <Heart size={20} />, href: "/marketplace/saves" },
            ],
        },
        {
            type: 'menu',
            icon: <User size={20} />,
            label: "My Profile",
            subMenuItems: [
                { label: "Collection", icon: <LayoutGrid size={20} />, href: "/profile/collection" },
                { label: "Wallet", icon: <Wallet size={20} />, href: "/profile/wallet" },
                { label: "History", icon: <History size={20} />, href: "/profile/history" },
            ],
        },
    ]
    const handleShowMobileMenu = () => {
        setIsShowOnMobile(() => false);
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setIsCollapsed(false);
            } else if (width < 1280) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsCollapsed]);

    return (
        <>
            {/* Overlay for mobile view */}
            <div
                className={`fixed inset-0 bg-default-black/90 bg-opacity-30 z-30 transition-opacity md:hidden ${isShowOnMobile ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleShowMobileMenu}
                aria-hidden="true"
            >
                <button
                    className="absolute right-4 top-4 flex p-2 rounded-md border !border-border-offwhite bg-gray-100 hover:bg-gray-100"
                ><X className="!h-5 !w-5" />
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white z-40 transform transition-transform duration-300 ease-in-out border-r border-border-offwhite sm:relative sm:translate-x-0 ${isCollapsed ? "w-[77px]" : "w-72"} ${isShowOnMobile ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className={`p-4 pb-6 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="w-11 h-11 bg-lime-400 rounded-lg flex-shrink-0" />
                        {!isCollapsed && (
                            <h1 className="text-xl font-bold text-gray-800 ml-3">Tasketeh</h1>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 px-4 py-2">
                        <ul className="space-y-2">
                            {menuConfig.map((item) => {
                                // Check if a submenu item is active to highlight the parent
                                const isActiveParent =
                                    item.type === 'menu' &&
                                    item.subMenuItems.some(sub => pathname === sub.href);

                                return (
                                    <li key={item.label}>
                                        {isCollapsed ? (
                                            // --- RENDER COLLAPSED VIEW ---
                                            item.type === 'link' ? (
                                                <Tooltip.Provider delayDuration={100}>
                                                    <Tooltip.Root>
                                                        <Tooltip.Trigger asChild>
                                                            <Link
                                                                href={item.href}
                                                                className={`flex items-center justify-center p-3 font-medium rounded-lg transition-colors ${pathname === item.href
                                                                    ? "bg-default-black text-white"
                                                                    : "text-default-black hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                <span className={`${pathname === item.href ? "text-default-brand" : ""}`}>{item.icon}</span>
                                                            </Link>
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content
                                                                side="right"
                                                                align="center"
                                                                sideOffset={5}
                                                                className="bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 shadow-lg z-50"
                                                            >
                                                                {item.label}
                                                                <Tooltip.Arrow className="fill-gray-800" />
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>
                                                    </Tooltip.Root>
                                                </Tooltip.Provider>
                                            ) : (
                                                <Popover.Root>
                                                    <Popover.Trigger asChild>
                                                        <div
                                                            className={`flex items-center justify-center p-3 font-medium rounded-lg transition-colors cursor-pointer ${isActiveParent
                                                                ? "bg-default-black text-default-brand" // Active parent style
                                                                : "text-default-black hover:bg-gray-100" // Default style
                                                                }`}
                                                        >
                                                            {item.icon}
                                                        </div>
                                                    </Popover.Trigger>
                                                    <Popover.Portal>
                                                        <Popover.Content
                                                            side="right"
                                                            align="start"
                                                            sideOffset={5}
                                                            className="bg-white rounded-lg shadow-xl border border-gray-100 w-56 p-2 z-50"
                                                        >
                                                            <div className="p-2 font-bold text-gray-800">{item.label}</div>
                                                            <ul className="space-y-1">
                                                                {item.subMenuItems.map((subItem) => (
                                                                    <li key={subItem.label}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className={`flex items-center p-3 text-sm font-medium rounded-lg transition-colors ${pathname === subItem.href
                                                                                ? "bg-default-black text-white"
                                                                                : "text-default-black hover:bg-gray-100"
                                                                                }`}
                                                                        >
                                                                            <span className={`w-5 h-5 mr-3 ${pathname === subItem.href ? "text-default-brand" : ""}`}>{subItem.icon}</span>
                                                                            {subItem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </Popover.Content>
                                                    </Popover.Portal>
                                                </Popover.Root>
                                            )
                                        ) : (
                                            // --- RENDER EXPANDED VIEW (No changes here) ---
                                            item.type === 'link' ? (
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center p-3 h-11 font-medium rounded-lg transition-colors ${pathname === item.href
                                                        ? "bg-default-black text-white"
                                                        : "text-default-black hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <span className={`w-5 h-5 mr-3 ${pathname === item.href ? "text-default-brand" : ""}`}>{item.icon}</span>
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <div>
                                                    <div className="flex items-center p-3 text-sm font-medium text-gray-600">
                                                        <span className="w-5 h-5 mr-3">{item.icon}</span>
                                                        {item.label}
                                                    </div>
                                                    <ul className="mt-1 pl-4 ml-4 space-y-1">
                                                        {item.subMenuItems.map((subItem) => (
                                                            <li key={subItem.label} className="relative before:h-[1px] before:w-2.5 before:bg-default-black before:absolute before:-left-[11px] before:top-[50%] before:-translate-y-[50%] after:h-9 after:w-[1px] after:bg-default-black after:absolute after:-left-[11px] after:bottom-[50%] -after:translate-y-[50%] [&:not(:last-child)]:after:h-13 [&:not(:last-child)]:after:bottom-[calc(50%-16px)] ">
                                                                <Link
                                                                    href={subItem.href}
                                                                    className={`flex items-center p-3 font-medium rounded-lg transition-colors ${pathname === subItem.href
                                                                        ? "bg-default-black text-white"
                                                                        : "text-default-black hover:bg-gray-100"
                                                                        }`}
                                                                >
                                                                    <span className={`w-5 h-5 mr-3 ${pathname === subItem.href ? "text-default-brand" : ""}`}>{subItem.icon}</span>
                                                                    {subItem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Help Center Section */}
                    <div className="p-4 mt-auto">
                        <div className={`rounded-lg text-center ${isCollapsed ? '' : 'bg-gray-100 p-4'}`}>
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full mx-auto ${isCollapsed ? 'bg-gray-100' : 'bg-gray-200 mb-4'}`}>
                                <BadgeQuestionMark size={20} />
                            </div>
                            {!isCollapsed && (
                                <>
                                    <h4 className="font-semibold text-gray-800 mb-1">Help Center</h4>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Having trouble in Enefit? Please contact us for more question
                                    </p>
                                    <button className="w-full bg-white text-gray-800 font-medium py-2 px-4 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                                        Go To Help Center
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}