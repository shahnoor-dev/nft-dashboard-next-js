"use client"

interface DashboardBannerProps {
  onExploreMore?: () => void
  onSellArtwork?: () => void
}

export default function DashboardBanner({ onExploreMore, onSellArtwork }: DashboardBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 rounded-2xl p-8 md:p-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-8 right-16 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Create and Sell Extraordinary NFTs
        </h1>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
          The world's first and largest digital marketplace for crypto NFTs
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onExploreMore}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Explore More
          </button>
          <button
            onClick={onSellArtwork}
            className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
          >
            Sell Artwork
          </button>
        </div>
      </div>

      {/* 3D Crystal/Diamond Shape */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="w-48 h-48 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <polygon
              points="100,20 160,80 100,180 40,80"
              fill="url(#crystal-gradient)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <polygon
              points="100,20 160,80 100,100 40,80"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
