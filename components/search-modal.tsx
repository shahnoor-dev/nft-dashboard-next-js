"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, FileText, User, Layers } from "lucide-react";
import { useRouter } from 'next/navigation';

// FIX: Define and export the type here. This makes this file the source of truth.
export interface SearchableItem {
    type: "Page" | "User" | "Collection";
    title: string;
    path: string;
}

interface SearchModalProps {
    onClose: () => void;
    data: SearchableItem[];
}

// Helper to get an icon based on the item type
const getIcon = (type: SearchableItem["type"]) => {
    switch (type) {
        case "Page":
            return <FileText className="w-5 h-5 text-gray-400" />;
        case "User":
            return <User className="w-5 h-5 text-gray-400" />;
        case "Collection":
            return <Layers className="w-5 h-5 text-gray-400" />;
        default:
            return null;
    }
};

export default function SearchModal({ onClose, data }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchableItem[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Focus input when modal opens
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Close modal on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, onClose]);

    // Filter dynamic data based on the query
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
        } else {
            setResults(
                data.filter((item) =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    }, [query, data]);

    const handleResultClick = (path: string) => {
        router.push(path);
        onClose();
    };

    return (
        <div
            ref={modalRef}
            className="absolute top-full right-0 mt-2 w-full max-w-lg bg-white rounded-lg shadow-2xl border border-border-offwhite z-50"
            style={{ minWidth: '336px' }}
        >
            <div className="p-4">
                {/* Search Input */}
                <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:border focus-within:border-border-offwhite">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search items, collections, and users..."
                        className="ml-1.5 w-full bg-transparent outline-none"
                    />
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 pl-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results */}
                <div className="mt-2 max-h-80 overflow-y-auto">
                    {results.length > 0 && (
                        <ul>
                            {results.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleResultClick(item.path)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                >
                                    {getIcon(item.type)}
                                    <span className="flex-grow">{item.title}</span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                        {item.type}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {query && results.length === 0 && (
                        <p className="py-10 text-center text-gray-500">No results found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    );
}