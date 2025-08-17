"use client"

import type React from "react"

interface ProfileModalProps {
  onClose: () => void
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "danger"
  hasToggle?: boolean
  isToggled?: boolean
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const menuItems: MenuItem[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
      href: "/",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "Profile",
      href: "/profile", // Updated to link to user profile page
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      label: "Dark Mode",
      hasToggle: true,
      isToggled: false,
      onClick: () => {
        // Toggle dark mode logic here
        console.log("Toggle dark mode")
      },
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Settings",
      href: "/settings",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      label: "Logout",
      variant: "danger",
      onClick: () => {
        // Logout logic here
        console.log("Logout")
      },
    },
  ]

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl border border-border-offwhite z-50">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-border-offwhite">
        <div className="flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1644945584589-c13b856ea51b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="w-9.5 h-9.5 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900">Kevin Cranel</h3>
            <p className="text-sm text-gray-500">@kecrane</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.href ? (
              <a
                href={item.href}
                className={`
                  flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors
                  ${item.variant === "danger" ? "text-red-600 hover:bg-red-50" : "text-gray-700"}
                `}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </a>
            ) : (
              <button
                onClick={item.onClick}
                className={`
                  w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-left
                  ${item.variant === "danger" ? "text-red-600 hover:bg-red-50" : "text-gray-700"}
                `}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.hasToggle && (
                  <div
                    className={`
                    relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                    ${item.isToggled ? "bg-blue-600" : "bg-gray-300"}
                  `}
                  >
                    <span
                      className={`
                      inline-block h-3 w-3 transform rounded-full bg-white transition-transform
                      ${item.isToggled ? "translate-x-5" : "translate-x-1"}
                    `}
                    />
                  </div>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
