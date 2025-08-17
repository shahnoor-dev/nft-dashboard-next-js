import type { SearchableItem } from "@/types/search";

export const websiteData: SearchableItem[] = [
  { type: "Page", title: "Dashboard", path: "/dashboard" },
  { type: "Page", title: "Inbox", path: "/inbox" },
  { type: "Page", title: "Analytics", path: "/analytics" },
  { type: "Page", title: "Settings", path: "/settings" },
  { type: "User", title: "Alice Johnson", path: "/users/alice" },
  { type: "User", title: "Bob Williams", path: "/users/bob" },
  { type: "Collection", title: "Modern Art NFT", path: "/collections/modern-art" },
  { type: "Collection", title: "Classic Cars", path: "/collections/classic-cars" },
];
