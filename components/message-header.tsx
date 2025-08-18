"use client"

import { Conversation } from "@/app/inbox/page"

interface MessageHeaderProps {
  currentChat?: Conversation | null
  onBack: () => void // New prop for the back button
}

export default function MessageHeader({ currentChat, onBack }: MessageHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* --- NEW: Back Button for Mobile --- */}
          <button
            onClick={onBack}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Chat User Info */}
          {currentChat && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={currentChat.avatar || "/placeholder.svg"}
                  alt={currentChat.name}
                  className="w-10 h-10 rounded-full"
                />
                {currentChat.is_online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentChat.name}</h2>
                <p className="text-sm text-gray-500">{currentChat.is_online ? "Online" : "Offline"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        {currentChat && (
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}