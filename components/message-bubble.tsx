"use client"

import { Message } from "@/app/inbox/page"

interface MessageBubbleProps {
  message: Message
  isSent: boolean
  isTyping?: boolean
}

function TypingIndicator() {
  return (
    <div className="flex space-x-1 items-center bg-gray-200 text-gray-600 px-3 py-2 rounded-2xl w-fit">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
    </div>
  )
}

export default function MessageBubble({ message, isSent, isTyping }: MessageBubbleProps) {
  if (isTyping) {
    return (
      <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
        <TypingIndicator />
      </div>
    )
  }

  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const isImage =
    message.attachment_url &&
    /\.(jpg|jpeg|png|gif|webp)/i.test(message.attachment_url)

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isSent
              ? "bg-default-brand text-white"
              : "bg-white text-default-black border border-gray-200"
          } ${!message.content && message.attachment_url ? "p-1" : ""}`}
        >
          {isImage && (
            <img
              src={message.attachment_url}
              alt="Shared attachment"
              className="rounded-lg mb-2 max-w-full h-auto cursor-pointer"
              onClick={() => window.open(message.attachment_url, "_blank")}
            />
          )}

          {message.attachment_url && !isImage && (
            <a
              href={message.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block mb-2 underline ${
                isSent ? "text-blue-100" : "text-blue-600"
              }`}
            >
              View Attachment
            </a>
          )}

          {message.content && (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>

        <div
          className={`flex items-center mt-1 space-x-1 ${
            isSent ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
      </div>
    </div>
  )
}
