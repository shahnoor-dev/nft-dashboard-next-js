"use client"

interface CollectionRowProps {
  id: string
  name: string
  creator: string
  avatar: string
  volume: string
  change24h: string
  floorPrice: string
  owners: string
  items: string
  isPositiveChange?: boolean
  onClick?: (id: string) => void
}

export default function CollectionRow({
  id,
  name,
  creator,
  avatar,
  volume,
  change24h,
  floorPrice,
  owners,
  items,
  isPositiveChange = true,
  onClick,
}: CollectionRowProps) {
  const handleClick = () => {
    onClick?.(id)
  }

  return (
    <div
      className="flex items-center py-4 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
      onClick={handleClick}
    >
      {/* Collection Info */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <img src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          <p className="text-gray-500 text-sm truncate">By {creator}</p>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden sm:block w-20 text-right">
        <p className="font-semibold text-gray-900">{volume}</p>
      </div>

      {/* 24h Change */}
      <div className="hidden md:block w-20 text-right">
        <p className={`font-semibold ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
          {isPositiveChange ? "+" : ""}
          {change24h}
        </p>
      </div>

      {/* Floor Price */}
      <div className="hidden lg:block w-24 text-right">
        <p className="font-semibold text-gray-900">{floorPrice}</p>
      </div>

      {/* Owners */}
      <div className="hidden xl:block w-20 text-right">
        <p className="text-gray-600">{owners}</p>
      </div>

      {/* Items */}
      <div className="w-16 text-right">
        <p className="text-gray-600">{items}</p>
      </div>
    </div>
  )
}
