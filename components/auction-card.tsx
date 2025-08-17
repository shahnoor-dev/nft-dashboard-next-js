"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface AuctionCardProps {
  id: string
  image: string
  title: string
  creator: string
  currentBid: number
  auctionEndTime: string
  saved?: boolean
  onSaveToggle?: (id: string) => void
  showStatus?: boolean
}

export function AuctionCard({
  id,
  image,
  title,
  creator,
  currentBid,
  auctionEndTime,
  saved = false,
  onSaveToggle,
  showStatus = false,
}: AuctionCardProps) {
  const [isLiked, setIsLiked] = useState(saved)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = new Date(auctionEndTime).getTime()
      const diff = end - now

      if (diff <= 0) {
        setTimeLeft("Ended")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [auctionEndTime])

  const handleLike = () => {
    setIsLiked(!isLiked)
    onSaveToggle?.(id)
  }

  const handlePlaceBid = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`[v0] Place bid clicked for NFT ${id}`)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Timer Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
            timeLeft === "Ended" ? "bg-gray-500/90 text-white" : "bg-black/70 text-white"
          }`}
        >
          {timeLeft}
        </div>

        {/* Status Badge for Profile Pages */}
        {showStatus && timeLeft === "Ended" && (
          <div className="absolute top-4 right-16 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            Ended
          </div>
        )}

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleLike()
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200"
        >
          <svg
            className={`w-5 h-5 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`}
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">By {creator}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Current Bid</p>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              </svg>
              <p className="font-semibold text-gray-900">{currentBid} ETH</p>
            </div>
          </div>

          <button
            onClick={handlePlaceBid}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Place a Bid
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuctionCard
