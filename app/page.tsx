"use client"

import { useMemo } from "react"
import DashboardBanner from "@/components/dashboard-banner"
import { useNFTData } from "@/hooks/use-nft-data"
import AuctionCard from "@/components/auction-card"
import FeaturedCreator from "@/components/featured-creator"
import CollectionRow from "@/components/collection-row"
import ActivityItem from "@/components/activity-item"
import Link from "next/link"

export default function HomePage() {
  const { loading, getTrendingNFTs } = useNFTData()
  const trendingNFTs = getTrendingNFTs()

  if (loading) {
    return <div className="flex-1 p-6">Loading...</div>
  }

  // Sample data for featured creator
  const featuredCreator = {
    id: "creator-1",
    name: "Murakami",
    username: "@mfmkkus",
    avatar: "https://images.unsplash.com/photo-1613163755693-3df66f1a0e11?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coverImage: "/img/dashboard/feature-bg.png",
    description: "Murakami Flowers is a work in which artist Takashi Murakami's representative artwork...",
    isVerified: true,
  }

  // Sample data for top collections
  const topCollections = [
    {
      id: "col-1",
      name: "Doodle Lucu",
      creator: "Doodles",
      avatar: "https://images.unsplash.com/photo-1647538044240-ab6ed1b8056a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      volume: "14,32",
      change24h: "20,4%",
      floorPrice: "2,3",
      owners: "2,2K",
      items: "18",
      isPositiveChange: true,
    },
    {
      id: "col-2",
      name: "Kimawi Genesis",
      creator: "Kimawi - Japan",
      avatar: "https://images.unsplash.com/photo-1748416100946-3703ba688db8?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      volume: "6,11",
      change24h: "18,2%",
      floorPrice: "12,52",
      owners: "1,9K",
      items: "21",
      isPositiveChange: false,
    },
    {
      id: "col-3",
      name: "Kimawi Genesis",
      creator: "Kimawi - Japan",
      avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      volume: "6,11",
      change24h: "22,2%",
      floorPrice: "12,52",
      owners: "1,9K",
      items: "21",
      isPositiveChange: true,
    },
    {
      id: "col-4",
      name: "Kimawi Genesis",
      creator: "Kimawi - Japan",
      avatar: "https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      volume: "6,11",
      change24h: "18,2%",
      floorPrice: "12,52",
      owners: "1,9K",
      items: "21",
      isPositiveChange: false,
    },
  ]

  // Sample data for recent activity
  const recentActivity = [
    {
      id: "act-1",
      name: "Uzachi #4390",
      collection: "Ragnarok",
      avatar: "https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "2.15 ETH",
    },
    {
      id: "act-2",
      name: "Doodles #3486",
      collection: "Doodles",
      avatar: "https://images.unsplash.com/photo-1647538044240-ab6ed1b8056a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "4.42 ETH",
    },
    {
      id: "act-3",
      name: "Murakami #2766",
      collection: "Murakami",
      avatar: "https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "1.08 ETH",
    },
    {
      id: "act-4",
      name: "Doodles #2761",
      collection: "Murakami",
      avatar: "https://images.unsplash.com/photo-1647538044240-ab6ed1b8056a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "4.4 ETH",
    },
    {
      id: "act-5",
      name: "Peachy Puch#22",
      collection: "Mindblow",
      avatar: "https://images.unsplash.com/photo-1748416100946-3703ba688db8?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "5.62 ETH",
    },
    {
      id: "act-6",
      name: "Gemmy #3723",
      collection: "GemmySolana",
      avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "5.32 ETH",
    },
  ]

  // Event handlers
  const handleLike = (id: string) => {
    console.log("[v0] Liked auction:", id)
  }

  const handlePlaceBid = (id: string) => {
    console.log("[v0] Place bid for:", id)
  }

  const handleFollow = (id: string) => {
    console.log("[v0] Follow creator:", id)
  }

  const handleCollectionClick = (id: string) => {
    console.log("[v0] View collection:", id)
  }

  const handleActivityClick = (id: string) => {
    console.log("[v0] View activity:", id)
  }

  const handleExploreMore = () => {
    console.log("[v0] Explore more clicked")
  }

  const handleSellArtwork = () => {
    console.log("[v0] Sell artwork clicked")
  }

  return (
    <div className="min-h-screen">
      {/* Removed sidebar, header, and mobile overlay since they're in layout */}
      <main>
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Main Grid Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Trending Auctions */}
            <div className="lg:w-[calc(100%-332px)] space-y-8">
              {/* Dashboard Banner */}
              <DashboardBanner onExploreMore={handleExploreMore} onSellArtwork={handleSellArtwork} />
              {/* Trending Auction Section */}
              <section>
                <div className="flex items-center justify-between font-jet-brains-mono mb-6">
                  <h2 className="title">Trending Auction</h2>
                  <Link href={"/marketplace/market"} className="text-default-brand font-medium">View All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {trendingNFTs.map((nft) => (
                    <AuctionCard key={nft.id} nft={nft} />
                  ))}
                </div>
              </section>

              {/* Top Collection Section */}
              <section>
                <div className="flex items-center justify-between font-jet-brains-mono mb-6">
                  <h2 className="title">Top Collection</h2>
                  <Link href={"/profile/collection"} className="text-default-brand font-medium">View All</Link>
                </div>

                {/* Use a table for semantic and accessible data display */}
                <div className="relative overflow-x-auto no-scrollbar border border-border-offwhite rounded-[24px]">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-jet-brains-mono">

                    {/* Table Head */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="p-4 text-left text-sm font-medium text-gray-500">Collection</th>
                        <th className="p-4 w-28 text-right text-sm font-medium text-gray-500">Volume</th>
                        <th className="p-4 w-28 text-right text-sm font-medium text-gray-500">24h %</th>
                        <th className="p-4 w-32 text-right text-sm font-medium text-gray-500">Floor Price</th>
                        <th className="p-4 w-28 text-right text-sm font-medium text-gray-500">Owners</th>
                        <th className="p-4 w-24 text-right text-sm font-medium text-gray-500">Items</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {topCollections.map((collection) => (
                        <CollectionRow key={collection.id} {...collection} onClick={handleCollectionClick} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column - Featured Creator & Recent Activity */}
            <div className="lg:w-75 flex flex-col gap-8">
              {/* Featured Creator */}
              <section className="order-2 lg:order-1">
                <div className="flex items-center justify-between font-jet-brains-mono mb-6">
                  <h2 className="sub-title">Featured Creators</h2>
                  <Link href={"/profile/history"} className="text-default-brand text-sm font-medium">View All</Link>
                </div>

                <FeaturedCreator {...featuredCreator} onFollow={handleFollow} />
              </section>

              {/* Recent Activity */}
              <section className="order-1 lg:order-2">
                <div className="flex items-center justify-between font-jet-brains-mono mb-6">
                  <h2 className="sub-title">Recent Activity</h2>
                  <Link href={"/profile/history"} className="text-default-brand text-sm font-medium">View All</Link>
                </div>

                <div className="relative overflow-x-auto no-scrollbar border border-border-offwhite rounded-[24px]">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-jet-brains-mono">
                    {recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} {...activity} onClick={handleActivityClick} />
                    ))}
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
