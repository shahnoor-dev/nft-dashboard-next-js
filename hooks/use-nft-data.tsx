"use client"

import { useState, useEffect, useCallback } from "react"

export interface NFT {
  id: string
  title: string
  description: string
  image: string
  trending: boolean
  creator: {
    id: string
    name: string
    username: string
    avatar: string
    bio?: string
    website?: string
    joinedDate?: string
  }
  owner: {
    id: string
    name: string
    username: string
    avatar: string
  }
  currentBid: number
  auctionEndTime: string
  category: string
  collection: string
  saved: boolean
  ownedByUser: boolean
  bidHistory: Array<{
    id: string
    bidder: {
      name: string
      avatar: string
    }
    amount: number
    timestamp: string
  }>
}

export interface NFTData {
  nfts: NFT[]
  categories: string[]
  collections: string[]
  priceRanges: Array<{
    label: string
    min: number
    max: number
  }>
}

const STORAGE_KEY = "nft-marketplace-data"

export function useNFTData() {
  const [data, setData] = useState<NFTData | null>(null)
  const [loading, setLoading] = useState(true)

  // Load data from localStorage or fallback to JSON file
  useEffect(() => {
    const loadData = async () => {
      try {
        // First try to load from localStorage
        const storedData = localStorage.getItem(STORAGE_KEY)
        if (storedData) {
          setData(JSON.parse(storedData))
          setLoading(false)
          return
        }

        // Fallback to loading from JSON file
        const response = await fetch("/data/unified-nfts.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json()
        setData(jsonData)

        // Save to localStorage for future use
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData))
      } catch (error) {
        console.error("Error loading NFT data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Save data to localStorage whenever it changes
  const saveData = useCallback((newData: NFTData) => {
    setData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }, [])

  // Toggle save status of an NFT
  const toggleSave = useCallback(
    (nftId: string) => {
      if (!data) return

      const updatedData = {
        ...data,
        nfts: data.nfts.map((nft) => (nft.id === nftId ? { ...nft, saved: !nft.saved } : nft)),
      }
      saveData(updatedData)
    },
    [data, saveData],
  )

  // Place a bid on an NFT
  const placeBid = useCallback(
    (nftId: string, bidAmount: number) => {
      if (!data) return

      const updatedData = {
        ...data,
        nfts: data.nfts.map((nft) =>
          nft.id === nftId
            ? {
                ...nft,
                currentBid: bidAmount,
                bidHistory: [
                  {
                    id: `bid-${Date.now()}`,
                    bidder: {
                      name: "Kevin Cranel",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    amount: bidAmount,
                    timestamp: new Date().toISOString(),
                  },
                  ...nft.bidHistory,
                ],
              }
            : nft,
        ),
      }
      saveData(updatedData)
    },
    [data, saveData],
  )

  // Get NFT by ID
  const getNFTById = useCallback(
    (id: string): NFT | undefined => {
      return data?.nfts.find((nft) => nft.id === id)
    },
    [data],
  )

  // Get NFTs by creator
  const getNFTsByCreator = useCallback(
    (creatorId: string): NFT[] => {
      return data?.nfts.filter((nft) => nft.creator.id === creatorId) || []
    },
    [data],
  )

  // Get trending NFTs
  const getTrendingNFTs = useCallback((): NFT[] => {
    return data?.nfts.filter((nft) => nft.trending) || []
  }, [data])

  // Get saved NFTs
  const getSavedNFTs = useCallback((): NFT[] => {
    return data?.nfts.filter((nft) => nft.saved) || []
  }, [data])

  // Get user's collection (owned NFTs)
  const getUserCollection = useCallback((): NFT[] => {
    return data?.nfts.filter((nft) => nft.ownedByUser) || []
  }, [data])

  // Get marketplace NFTs (not owned by user)
  const getMarketplaceNFTs = useCallback((): NFT[] => {
    return data?.nfts.filter((nft) => !nft.ownedByUser) || []
  }, [data])

  return {
    data,
    loading,
    toggleSave,
    placeBid,
    getNFTById,
    getNFTsByCreator,
    getTrendingNFTs,
    getSavedNFTs,
    getUserCollection,
    getMarketplaceNFTs,
    saveData,
  }
}
