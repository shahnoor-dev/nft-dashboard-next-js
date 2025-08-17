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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={coverImage || "/placeholder.svg"} alt={`${name} cover`} className="w-full h-full object-cover" />
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Avatar and Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={avatar || "/placeholder.svg"}
              alt={name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{name}</h3>
                {isVerified && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-gray-500 text-sm">{username}</p>
            </div>
          </div>

          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              following ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
