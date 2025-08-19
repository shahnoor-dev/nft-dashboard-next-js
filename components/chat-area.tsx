"use client"

import { useEffect, useRef } from "react"
import MessageBubble from "@/components/message-bubble"
import MessageInput from "@/components/message-input"
import { Message, Conversation } from "@/app/inbox/page" // Import types from the main page

interface ChatAreaProps {
    currentChat: Conversation | null
    messages: Message[]
    onSendMessage: (text: string, files?: File[]) => void
    currentUserId: string
}

export default function ChatArea({ currentChat, messages, onSendMessage, currentUserId }: ChatAreaProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="flex flex-col h-[calc(100vh-162px)] md:h-[calc(100%-60px)] bg-gray-50">
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isSent={message.user_id === currentUserId} // Determine if the message is sent by the current user
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    )
}