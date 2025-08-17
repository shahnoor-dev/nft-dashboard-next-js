"use client"

import { useState, useRef, useEffect } from "react"
import NotificationModal from "@/components/notification-modal"
import ProfileModal from "@/components/profile-modal"
import {
  Search,
  Upload,
  PanelLeftClose,
  PanelRightClose,
  Menu
} from "lucide-react";

interface HeaderProps {
  setIsShowOnMobile?: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function Header({ setIsShowOnMobile, isCollapsed, toggleSidebar }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
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
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Toggle sidebar */}


        <button
          className="hidden sm:flex p-2 rounded-md text-default-black border border-border-offwhite hover:text-default-brand hover:bg-default-black mr-3"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <PanelRightClose className="!h-5 !w-5" /> : <PanelLeftClose className="!h-5 !w-5" />}
        </button>

        {/* Left Side - Mobile Menu + Search */}
        <div className="flex items-center flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={setIsShowOnMobile}
            className="sm:hidden p-2 rounded-md text-default-black border border-border-offwhite hover:text-default-brand hover:bg-default-black mr-3"
          >
            <Menu className="!h-5 !w-5" />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search items, collections, and users"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Center - ETH Balance */}
        <div className="hidden md:flex items-center mx-6">
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Ξ</span>
            </div>
            <span className="font-semibold text-gray-900">3,421 ETH</span>
          </div>
        </div>

        {/* Right Side - Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification dot */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>

            {isNotificationOpen && <NotificationModal onClose={() => setIsNotificationOpen(false)} />}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
            >
              <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-8 h-8 rounded-full" />
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}
          </div>
        </div>
      </div>
    </header>
  )
}

// Keep default export for backward compatibility
export default Header
