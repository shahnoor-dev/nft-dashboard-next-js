"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useNFTData, type NFT } from "@/hooks/use-nft-data"

interface UnifiedAuctionCardProps {
    nft: NFT
    showStatus?: boolean
    className?: string
}

export function UnifiedAuctionCard({ nft, showStatus = true, className = "" }: UnifiedAuctionCardProps) {
    const { toggleSave } = useNFTData()
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const endTime = new Date(nft.auctionEndTime).getTime()
            const difference = endTime - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                if (days > 0) {
                    setTimeLeft(`${days}d ${hours}h ${minutes}m`)
                } else if (hours > 0) {
                    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
                } else {
                    setTimeLeft(`${minutes}m ${seconds}s`)
                }
            } else {
                setTimeLeft("Ended")
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [nft.auctionEndTime])

    const handleSaveToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleSave(nft.id)
    }

    const isEnded = timeLeft === "Ended"

    return (
        <Link href={`/market/${nft.id}`} className={`block ${className}`}>
            <div className="flex bg-white rounded-3xl shadow-lg hover:shadow-xl p-2 gap-4 h-full transition-shadow duration-300 w-full max-w-3xl mx-auto overflow-hidden font-jet-brains-mono">

                {/* Left Side: Image Container */}
                <div className="relative w-35">
                    <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.title}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    {/* Timer: Positioned at the bottom-left of the image */}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-xs font-medium px-2.5 py-1.5 rounded-full backdrop-blur-xl">
                        {timeLeft}
                    </div>
                </div>

                {/* Right Side: Content Area */}
                <div className="flex flex-1 flex-col justify-between gap-2.5">

                    {/* Top Section: Title and Author */}
                    <div>
                        <h3 className="font-semibold text-default-black leading-5 ">{nft.title}</h3>
                        <p className="text-sm text-gray-400 leading-4 mt-1">By {nft.creator.name}</p>
                    </div>

                    {/* Bottom Section: Bid Info and Actions */}
                    <div>
                        {/* Current Bid */}
                        <p className="text-xs leading-[13px] text-gray-400">Current Bid</p>
                        <div className="flex items-center gap-1 mt-1">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.6 6.06667L7.77998 4.65334C7.91998 4.59334 8.07999 4.59334 8.21333 4.65334L11.3933 6.06667C11.6733 6.19334 11.9333 5.85334 11.74 5.61334L8.40664 1.54C8.17998 1.26 7.80665 1.26 7.57998 1.54L4.24665 5.61334C4.05998 5.85334 4.32 6.19334 4.6 6.06667Z" fill="#88D40E" />
                                <path d="M4.6 9.93334L7.78664 11.3467C7.92664 11.4067 8.08666 11.4067 8.21999 11.3467L11.4066 9.93334C11.6866 9.80667 11.9467 10.1467 11.7533 10.3867L8.41999 14.46C8.19332 14.74 7.81999 14.74 7.59333 14.46L4.25999 10.3867C4.05999 10.1467 4.31333 9.80667 4.6 9.93334Z" fill="#88D40E" />
                                <path d="M7.85333 6.32667L5.09999 7.7C4.85333 7.82 4.85333 8.17333 5.09999 8.29333L7.85333 9.66667C7.94666 9.71333 8.05996 9.71333 8.1533 9.66667L10.9066 8.29333C11.1533 8.17333 11.1533 7.82 10.9066 7.7L8.1533 6.32667C8.0533 6.28 7.94666 6.28 7.85333 6.32667Z" fill="#88D40E" />
                            </svg>

                            <span className="text-sm">3,421 ETH</span>
                        </div>
                    </div>

                    {/* Actions: Button and Heart Icon */}
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={(e) => e.preventDefault()}
                            className="bg-default-brand text-xs text-default-black font-meidum py-2 px-3.5 rounded-xl hover:bg-default-brand"
                        >
                            Place a Bid
                        </button>
                        <button
                            onClick={handleSaveToggle}
                            className="p-2 group h-7.5 w-7.5 bg-gray-200 flex items-center justify-center rounded-full"
                        >
                            <svg
                                className={`w-4.5 h-4.5 transition-colors flex-none ${nft.saved
                                    ? "text-red-500 fill-current"
                                    : "text-white/80 group-hover:text-white/100"
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UnifiedAuctionCard
