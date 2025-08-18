"use client";

interface CollectionRowProps {
  id: string;
  name: string;
  creator: string;
  avatar: string;
  volume: string;
  change24h: string;
  floorPrice: string;
  owners: string;
  items: string;
  isPositiveChange?: boolean;
  onClick?: (id: string) => void;
}

export default function CollectionRow({
  id, name, creator, avatar, volume, change24h, floorPrice, owners, items, isPositiveChange = true, onClick,
}: CollectionRowProps) {
  
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <tr
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700 border-border-offwhite"
      onClick={handleClick}
    >
      {/* Collection Info */}
      <td className="p-3">
        <div className="flex items-center space-x-4">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 object-cover rounded-full flex-shrink-0" />
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
            <p className="text-gray-500 text-sm truncate">By {creator}</p>
          </div>
        </div>
      </td>

      {/* Volume */}
      <td className="p-3 text-right">
        <p className="font-semibold text-gray-900">{volume}</p>
      </td>

      {/* 24h Change */}
      <td className="p-3 text-right">
        <p className={`font-semibold ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
          {isPositiveChange ? "+" : ""}
          {change24h}
        </p>
      </td>

      {/* Floor Price */}
      <td className="p-3 text-right">
        <p className="font-semibold text-gray-900">{floorPrice}</p>
      </td>

      {/* Owners */}
      <td className="p-3 text-right">
        <p className="text-gray-600">{owners}</p>
      </td>

      {/* Items */}
      <td className="p-3 text-right">
        <p className="text-gray-600">{items}</p>
      </td>
    </tr>
  );
}