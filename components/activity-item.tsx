"use client"

interface ActivityItemProps {
  id: string
  name: string
  collection: string
  avatar: string
  price: string
  onClick?: (id: string) => void
}

export default function ActivityItem({ id, name, collection, avatar, price, onClick }: ActivityItemProps) {
  const handleClick = () => {
    onClick?.(id)
  }

  return (
    <div
      className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <img src={avatar || "/placeholder.svg"} alt={name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          <p className="text-gray-500 text-sm truncate">From {collection}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900">{price}</p>
      </div>
    </div>
  )
}
