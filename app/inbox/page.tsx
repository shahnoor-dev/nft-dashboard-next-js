"use client"

import { useState, useEffect } from "react"
import MessageHeader from "@/components/message-header"
import MessageList from "@/components/message-list"
import ChatArea from "@/components/chat-area"
import { supabase } from "@/lib/supabaseClient"

export interface Conversation {
  id: string
  name: string
  avatar: string
  last_message: string
  last_message_time: string
  unread_count: number
  is_online: boolean
}

export interface Message {
  id: string
  created_at: string
  content: string
  conversation_id: string
  user_id: string
  attachment_url?: string
}

const CURRENT_USER_ID = "my-user-id"
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export default function MessagePage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  // --- NEW: State to manage mobile view ---
  const [isMessageListVisible, setMessageListVisible] = useState(true)

  // When a chat is selected on mobile, hide the list and show the chat area
  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
    setMessageListVisible(false)
  }

  // When the back button is clicked on mobile, show the list
  const handleBackToList = () => {
    setSelectedChat(null)
    setMessageListVisible(true)
  }

  // Auto-select first chat on desktop but not mobile
  useEffect(() => {
    if (conversations.length > 0 && !selectedChat && window.innerWidth >= 768) {
      setSelectedChat(conversations[0].id)
    }
  }, [conversations])

  // Hide message list on initial mobile load if a chat is selected
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMessageListVisible(false)
    }
  }, [selectedChat])


  const getGeminiReply = async (inputText: string) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: inputText }] }] }),
      })
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
      const data = await response.json()
      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error("🔥 Gemini API error:", error)
      return "Sorry, I'm having trouble connecting right now."
    }
  }

  useEffect(() => {
    const fetchConversations = async () => {
      const { data } = await supabase.from("conversations").select("*")
      if (data) {
        setConversations(data)
      }
    }
    fetchConversations()
  }, [])

  useEffect(() => {
    if (!selectedChat) return
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedChat)
        .order("created_at", { ascending: true })
      setMessages(data || [])
    }
    fetchMessages()
  }, [selectedChat])

  useEffect(() => {
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMessage = payload.new as Message
          if (newMessage.conversation_id === selectedChat) {
            setMessages((currentMessages) => [...currentMessages, newMessage])
          }
          await supabase
            .from("conversations")
            .update({ last_message: newMessage.content, last_message_time: newMessage.created_at })
            .eq("id", newMessage.conversation_id)
          setConversations((currentConvos) =>
            currentConvos.map((convo) =>
              convo.id === newMessage.conversation_id
                ? { ...convo, last_message: newMessage.content }
                : convo
            )
          )
          if (newMessage.user_id === CURRENT_USER_ID && selectedChat) {
            const replyText = await getGeminiReply(newMessage.content)
            await supabase.from("messages").insert({
              content: replyText,
              conversation_id: selectedChat,
              user_id: selectedChat,
            })
          }
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedChat])

  const handleSendMessage = async (text: string, files?: File[]) => {
    if (!selectedChat) return
    if (!text.trim() && (!files || files.length === 0)) return
    let attachmentUrl: string | undefined = undefined
    if (files && files.length > 0) {
      const file = files[0]
      const filePath = `${selectedChat}/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage.from("attachments").upload(filePath, file)
      if (uploadError) {
        console.error("🔥 Supabase upload error:", uploadError)
        return
      }
      const { data: urlData } = supabase.storage.from("attachments").getPublicUrl(filePath)
      attachmentUrl = urlData.publicUrl
    }
    await supabase.from("messages").insert({
      content: text,
      conversation_id: selectedChat,
      user_id: CURRENT_USER_ID,
      attachment_url: attachmentUrl,
    })
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentChat = conversations.find((conv) => conv.id === selectedChat)

  return (
    <div className="h-screen flex flex-col font-sans">
      <div className="flex-1 flex overflow-hidden">
        {/* Message List */}
        <div
          className={`
            w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col
            transition-transform duration-300 ease-in-out
            ${isMessageListVisible ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >
          <MessageList
            conversations={filteredConversations}
            selectedChat={selectedChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onChatSelect={handleChatSelect}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <MessageHeader currentChat={currentChat} onBack={handleBackToList} />
          {selectedChat && currentChat ? (
            <ChatArea
              key={selectedChat}
              currentChat={currentChat}
              messages={messages}
              onSendMessage={handleSendMessage}
              currentUserId={CURRENT_USER_ID}
            />
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
                <p className="text-gray-500">Choose from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}