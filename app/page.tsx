"use client"
import DashboardBanner from "@/components/dashboard-banner"
import AuctionCard from "@/components/auction-card"
import FeaturedCreator from "@/components/featured-creator"
import CollectionRow from "@/components/collection-row"
import ActivityItem from "@/components/activity-item"

export default function HomePage() {
  // Sample data for trending auctions
  const trendingAuctions = [
    {
      id: "1",
      image: "/placeholder.svg?height=300&width=300",
      title: "The Unfortable Facer",
      artist: "Bane Riccardo",
      currentBid: "18,99 ETH",
      timeLeft: "2h 4m 32s",
    },
    {
      id: "2",
      image: "/placeholder.svg?height=300&width=300",
      title: "Mad Ballot Holder",
      artist: "Angelina Cruzz",
      currentBid: "4,32 ETH",
      timeLeft: "2h 4m 32s",
    },
    {
      id: "3",
      image: "/placeholder.svg?height=300&width=300",
      title: "Pile of Many Plates",
      artist: "Ralphi Arness",
      currentBid: "4,32 ETH",
      timeLeft: "2h 4m 32s",
    },
  ]

  // Sample data for featured creator
  const featuredCreator = {
    id: "creator-1",
    name: "Murakami Flowers",
    username: "@mfmkkus",
    avatar: "/placeholder.svg?height=48&width=48",
    coverImage: "/placeholder.svg?height=200&width=400",
    description: "Murakami Flowers is a work in which artist Takashi Murakami's representative artwork...",
    isVerified: true,
  }

  // Sample data for top collections
  const topCollections = [
    {
      id: "col-1",
      name: "Doodle Lucu",
      creator: "Doodles",
      avatar: "/placeholder.svg?height=48&width=48",
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
      avatar: "/placeholder.svg?height=48&width=48",
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
      collection: "Ragnarok Meta",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "2.15 ETH",
    },
    {
      id: "act-2",
      name: "Doodles #3486",
      collection: "Doodles",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "4.42 ETH",
    },
    {
      id: "act-3",
      name: "Murakami #2766",
      collection: "Murakami",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "1.08 ETH",
    },
    {
      id: "act-4",
      name: "Doodles #2761",
      collection: "Murakami",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "4.4 ETH",
    },
    {
      id: "act-5",
      name: "Peachy Puch#22",
      collection: "Mindblowonstudio",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "5.62 ETH",
    },
    {
      id: "act-6",
      name: "Gemmy #3723",
      collection: "GemmySolana",
      avatar: "/placeholder.svg?height=40&width=40",
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
    <div className="min-h-screen bg-gray-50">
      {/* Removed sidebar, header, and mobile overlay since they're in layout */}
      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Banner */}
          <DashboardBanner onExploreMore={handleExploreMore} onSellArtwork={handleSellArtwork} />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Trending Auctions */}
            <div className="xl:col-span-3 space-y-8">
              {/* Trending Auction Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Trending Auction</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingAuctions.map((auction) => (
                    <AuctionCard key={auction.id} {...auction} onLike={handleLike} onPlaceBid={handlePlaceBid} />
                  ))}
                </div>
              </section>

              {/* Top Collection Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Top Collection</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  {/* Table Header */}
                  <div className="flex items-center py-4 px-6 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                    <div className="flex-1">Collection</div>
                    <div className="hidden sm:block w-20 text-right">Volume</div>
                    <div className="hidden md:block w-20 text-right">24h %</div>
                    <div className="hidden lg:block w-24 text-right">Floor Price</div>
                    <div className="hidden xl:block w-20 text-right">Owners</div>
                    <div className="w-16 text-right">Items</div>
                  </div>

                  {/* Collection Rows */}
                  <div className="divide-y divide-gray-100">
                    {topCollections.map((collection) => (
                      <CollectionRow key={collection.id} {...collection} onClick={handleCollectionClick} />
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Featured Creator & Recent Activity */}
            <div className="xl:col-span-1 space-y-8">
              {/* Featured Creator */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Featured Creators</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">See All</button>
                </div>

                <FeaturedCreator {...featuredCreator} onFollow={handleFollow} />
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">See All</button>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 space-y-1">
                    {recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} {...activity} onClick={handleActivityClick} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
