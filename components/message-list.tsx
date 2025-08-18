"use client"

import { Conversation } from "@/app/inbox/page"

interface MessageListProps {
  conversations: Conversation[]
  selectedChat: string | null
  searchQuery: string
  onSearchChange: (query: string) => void
  onChatSelect: (chatId: string) => void
}

export default function MessageList({
  conversations,
  selectedChat,
  searchQuery,
  onSearchChange,
  onChatSelect,
}: MessageListProps) {
  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      {/* Search Bar Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
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
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onChatSelect(conversation.id)}
            className={`w-full p-4 flex items-center space-x-3 text-left hover:bg-gray-50 transition-colors ${
              selectedChat === conversation.id ? "bg-blue-50 border-r-4 border-blue-500" : ""
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={conversation.avatar || "/placeholder.svg"}
                alt={conversation.name}
                className="w-12 h-12 rounded-full"
              />
              {conversation.is_online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {conversation.last_message_time
                    ? new Date(conversation.last_message_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate">{conversation.last_message}</p>
                {conversation.unread_count > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {conversation.unread_count}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}