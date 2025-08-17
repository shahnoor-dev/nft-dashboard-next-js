"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import SearchModal from "@/components/search-modal";
import { websiteData } from "@/data/website-data";

export default function SearchContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full hover:bg-gray-200">
        <Search className="w-6 h-6 text-gray-700" />
      </button>
      {isModalOpen && <SearchModal data={websiteData} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
