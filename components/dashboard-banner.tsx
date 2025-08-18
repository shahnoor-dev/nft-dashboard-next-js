"use client"

interface DashboardBannerProps {
  onExploreMore?: () => void
  onSellArtwork?: () => void
}

export default function DashboardBanner({ onExploreMore, onSellArtwork }: DashboardBannerProps) {
  return (
    <div className="relative bg-[url('/img/dashboard/banner.png')] font-jet-brains-mono bg-cover bg-right-bottom rounded-4xl p-6 sm:p-7.5" >
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-default-black mb-4 leading-tight">
          Create and Sell Extraordinary NFTs
        </h1>
        <p className="text-gray-600 max-w-sm text-sm mb-8 leading-relaxed">
          The world's first and largest digital marketplace for crypto NFTs
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onExploreMore}
            className="px-6 py-3 bg-default-black text-default-brand border-2 border-default-black hover:text-default-black hover:bg-transparent font-semibold rounded-lg transition-colors duration-200"
          >
            Explore More
          </button>
          <button
            onClick={onSellArtwork}
            className="px-6 py-3 bg-transparent border-2 border-default-black text-default-black hover:bg-default-black hover:text-default-brand font-semibold rounded-lg transition-all duration-200"
          >
            Sell Artwork
          </button>
        </div>
      </div>
    </div>
  )
}
