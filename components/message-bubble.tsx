"use client"

import { Message } from "@/app/inbox/page"

interface MessageBubbleProps {
  message: Message
  isSent: boolean
}

export default function MessageBubble({ message, isSent }: MessageBubbleProps) {
  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  // --- FIX: This check is now more flexible ---
  const isImage = message.attachment_url && /\.(jpg|jpeg|png|gif|webp)/i.test(message.attachment_url)

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isSent
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-900 border border-gray-200"
          } ${!message.content && message.attachment_url ? 'p-1' : ''}`}
        >
          {isImage && (
            <img
              src={message.attachment_url}
              alt="Shared attachment"
              className="rounded-lg mb-2 max-w-full h-auto cursor-pointer"
              onClick={() => window.open(message.attachment_url, '_blank')}
            />
          )}

          {message.attachment_url && !isImage && (
            <a
              href={message.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block mb-2 underline ${isSent ? 'text-blue-100' : 'text-blue-600'}`}
            >
              View Attachment
            </a>
          )}

          {message.content && <p className="text-sm leading-relaxed">{message.content}</p>}
        </div>

        <div className={`flex items-center mt-1 space-x-1 ${isSent ? "justify-end" : "justify-start"}`}>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
      </div>
    </div>
  )
}