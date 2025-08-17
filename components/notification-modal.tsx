"use client"

import type React from "react"

interface NotificationModalProps {
  onClose: () => void
}

interface Notification {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  time: string
  isNew?: boolean
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const notifications: Notification[] = [
    {
      id: "1",
      icon: (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      ),
      title: "Your bid is placed",
      description: "waiting for auction ended",
      time: "24 Minutes ago",
      isNew: true,
    },
    {
      id: "2",
      icon: (
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      ),
      title: "You have new message",
      description: "2 unread messages",
      time: "1 Hours ago",
    },
    {
      id: "3",
      icon: (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      ),
      title: "New collection created",
      description: "in nft art category",
      time: "4 Days ago",
    },
  ]

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Notification</h3>
        <p className="text-sm text-gray-500">You have 0 unread messages</p>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {/* New Section */}
        <div className="px-4 py-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">New</h4>

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2"
            >
              {notification.icon}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title} <span className="font-normal text-gray-600">{notification.description}</span>
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {notification.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
