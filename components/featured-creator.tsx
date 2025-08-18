"use client"

import { useState } from "react"

interface FeaturedCreatorProps {
  id: string
  name: string
  username: string
  avatar: string
  coverImage: string
  description: string
  isVerified?: boolean
  isFollowing?: boolean
  onFollow?: (id: string) => void
}

export default function FeaturedCreator({
  id,
  name,
  username,
  avatar,
  coverImage,
  description,
  isVerified = false,
  isFollowing = false,
  onFollow,
}: FeaturedCreatorProps) {
  const [following, setFollowing] = useState(isFollowing)

  const handleFollow = () => {
    setFollowing(!following)
    onFollow?.(id)
  }

  return (
    <div className="relative w-80 bg-gradient-to- rounded-3xl flex flex-col gap-4 p-4 bg-cover bg-left-top font-jet-brains-mono" style={{ backgroundImage: `url(${coverImage})` }}>
      {/* Profile Header */}
      <div className="bg-white absolute rounded-xl left-0 top-0">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="w-18 h-18 rounded-xl object-cover"
        />
      </div>
      <div className="relative left-22">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          {isVerified && (
            <svg
              className="w-5 h-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <p className="text-sm text-gray-600">{username}</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mt-4 leading-relaxed">
        {description}
      </p>

      {/* Follow Button */}
      <button
        onClick={handleFollow}
        className={`w-full py-3 rounded-full font-semibold transition-colors duration-300 ${following
          ? "bg-default-brand border-2 border-default-brand text-white"
          : "bg-default-black border-2 border-default-black text-default-brand hover:bg-transparent hover:text-default-black"
          }`}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  )
}