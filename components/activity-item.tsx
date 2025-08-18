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
        <tr
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700 border-border-offwhite"
            onClick={handleClick}
        >
            <td className="p-3">
                <div className="flex items-center space-x-4">
                    <img src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 object-cover rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
                        <p className="text-gray-500 text-sm truncate">By {collection}</p>
                    </div>
                </div>
            </td>

            {/* Items */}
            <td className="p-3 flex flex-col items-end gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.6 6.06667L7.77998 4.65334C7.91998 4.59334 8.07999 4.59334 8.21333 4.65334L11.3933 6.06667C11.6733 6.19334 11.9333 5.85334 11.74 5.61334L8.40664 1.54C8.17998 1.26 7.80665 1.26 7.57998 1.54L4.24665 5.61334C4.05998 5.85334 4.32 6.19334 4.6 6.06667Z" fill="#88D40E" />
                    <path d="M4.6 9.93334L7.78664 11.3467C7.92664 11.4067 8.08666 11.4067 8.21999 11.3467L11.4066 9.93334C11.6866 9.80667 11.9467 10.1467 11.7533 10.3867L8.41999 14.46C8.19332 14.74 7.81999 14.74 7.59333 14.46L4.25999 10.3867C4.05999 10.1467 4.31333 9.80667 4.6 9.93334Z" fill="#88D40E" />
                    <path d="M7.85333 6.32667L5.09999 7.7C4.85333 7.82 4.85333 8.17333 5.09999 8.29333L7.85333 9.66667C7.94666 9.71333 8.05996 9.71333 8.1533 9.66667L10.9066 8.29333C11.1533 8.17333 11.1533 7.82 10.9066 7.7L8.1533 6.32667C8.0533 6.28 7.94666 6.28 7.85333 6.32667Z" fill="#88D40E" />
                </svg>
                <p className="font-semibold text-gray-500">{price}</p>
            </td>
        </tr>
    )
}
