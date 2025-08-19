"use client"

import type React from "react"
import { useState, useRef } from "react"
import { SendHorizontal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, files?: File[]) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Allow sending if there's text OR a file
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message.trim(), selectedFiles)
      setMessage("")
      setSelectedFiles([])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="bg-white pt-4">
      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="mb-3 flex items-center flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative bg-gray-100 rounded-lg p-2 flex items-center space-x-2">
              <span className="text-sm text-gray-700 truncate max-w-32">{file.name}</span>
              <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 p-2 text-white bg-default-brand h-12 w-12 flex items-center justify-center hover:bg-default-brand/90 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>

        {/* Message Textarea */}
        <div className="w-full flex  bg-gray-100 rounded-lg p-3 gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write message"
              rows={1}
              className="w-full rounded-lg resize-none focus:outline-none"
            />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() && selectedFiles.length === 0}
            className="flex-shrink-0 text-default-brand"
          >
            <SendHorizontal />
          </button>
        </div>
      </form>
    </div>
  )
}