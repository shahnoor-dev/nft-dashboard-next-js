"use client"

import { useState, useRef, useEffect } from "react"
import NotificationModal from "@/components/notification-modal"
import ProfileModal from "@/components/profile-modal"
import SearchModal from "@/components/search-modal";
// FIX: This import will now work correctly
import type { SearchableItem } from "@/components/search-modal";
import {
  Search,
  PanelLeftClose,
  PanelRightClose,
  Menu,
  Bell,
  ChevronDown
} from "lucide-react";

interface HeaderProps {
  setIsShowOnMobile?: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  pageTitle: string;
}

// FIX: Add the website data constant here
const websiteData: SearchableItem[] = [
  { type: "Page", title: "Dashboard", path: "/dashboard" },
  { type: "Page", title: "Inbox", path: "/inbox" },
  { type: "Page", title: "Analytics", path: "/analytics" },
  { type: "User", title: "Alice Johnson", path: "/users/alice" },
  { type: "Collection", title: "Modern Art NFT", path: "/collections/modern-art" },
];

export function Header({ setIsShowOnMobile, isCollapsed, toggleSidebar, pageTitle }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close modals when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-border-offwhite px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-3">
        <button
          className="hidden sm:flex p-2 rounded-md text-default-black border border-border-offwhite hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>

        <div className="flex items-center flex-1 gap-3">
          <button
            onClick={setIsShowOnMobile}
            className="sm:hidden p-2 rounded-md text-default-black border  border-border-offwhite hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-medium text-2xl text-gray-800">{pageTitle}</h1>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-default-black border  border-border-offwhite hover:bg-gray-100 rounded-lg"
            >
              <Search className="!w-5 !h-5" />
            </button>
            {isSearchOpen && <SearchModal data={websiteData} onClose={() => setIsSearchOpen(false)} />}
          </div>

          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 text-default-black border  border-border-offwhite hover:bg-gray-100 rounded-lg relative"
            >
              <Bell className="!w-5 !h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
            {isNotificationOpen && <NotificationModal onClose={() => setIsNotificationOpen(false)} />}
          </div>

          {/* User */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2"
            >
              <img src="https://images.unsplash.com/photo-1644945584589-c13b856ea51b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="w-9.5 h-9.5 rounded-full object-cover" />
            </button>
            {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}
          </div>

          {/* Coin Status */}
          <div className="hidden sm:flex items-center border border-border-offwhite h-9.5 p-2 gap-2 rounded-lg font-jet-brains-mono">
            <div className="w-7 h-7 bg-default-brand/10 rounded-lg p-1 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.9 9.10012L11.67 6.98012C11.88 6.89012 12.12 6.89012 12.32 6.98012L17.09 9.10012C17.51 9.29012 17.9 8.78012 17.61 8.42012L12.61 2.31012C12.27 1.89012 11.71 1.89012 11.37 2.31012L6.36997 8.42012C6.08997 8.78012 6.48 9.29012 6.9 9.10012Z" fill="#88D40E" />
                  <path d="M6.90001 14.9L11.68 17.02C11.89 17.11 12.13 17.11 12.33 17.02L17.11 14.9C17.53 14.71 17.92 15.22 17.63 15.58L12.63 21.69C12.29 22.11 11.73 22.11 11.39 21.69L6.39 15.58C6.09 15.22 6.47001 14.71 6.90001 14.9Z" fill="#88D40E" />
                  <path d="M11.78 9.49L7.65 11.55C7.28 11.73 7.28 12.26 7.65 12.44L11.78 14.5C11.92 14.57 12.09 14.57 12.23 14.5L16.36 12.44C16.73 12.26 16.73 11.73 16.36 11.55L12.23 9.49C12.08 9.42 11.92 9.42 11.78 9.49Z" fill="#88D40E" />
                </svg>
            </div>
            <span>3,421 ETH</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;