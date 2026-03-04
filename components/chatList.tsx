"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { fetchContacts, delay, ApiContact } from "@/services/api";
import Skeleton, {
  SkeletonText,
  SkeletonAvatar,
} from "@/components/skeleton-loader";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

interface ChatListProps {
  onSelectChat?: (contact: ApiContact) => void;
  selectedChatId?: number;
}

// Generate random color for avatar
const getAvatarColor = (id: number): string => {
  const colors = [
    "#FF9800",
    "#4CAF50",
    "#2196F3",
    "#8BC34A",
    "#9C27B0",
    "#E91E63",
    "#607D8B",
    "#795548",
    "#00BCD4",
  ];
  return colors[id % colors.length];
};

// Generate random time
const getRandomTime = (id: number): string => {
  const times = [
    "23:23",
    "23:16",
    "22:28",
    "20:43",
    "17:37",
    "16:01",
    "13:44",
    "09:02",
    "Yesterday",
  ];
  return times[id % times.length];
};

const ChatList = ({ onSelectChat, selectedChatId }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Open");
  const [sortFilter, setSortFilter] = useState("Newest");

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<ApiContact[]>([]);
  const [internalSelectedId, setInternalSelectedId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const loadContacts = async () => {
      try {
        // Add artificial delay for skeleton effect
        await delay(2000);
        const fetchedContacts = await fetchContacts();
        setContacts(fetchedContacts);
        // Set first contact as selected
        if (fetchedContacts.length > 0) {
          setInternalSelectedId(fetchedContacts[0].id);
          onSelectChat?.(fetchedContacts[0]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleSelectChat = (contact: ApiContact) => {
    setInternalSelectedId(contact.id);
    onSelectChat?.(contact);
  };

  // Skeleton for chat items
  const ChatItemSkeleton = () => (
    <div className="flex items-start gap-3 p-3 border-b border-gray-100">
      <SkeletonAvatar size={40} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <SkeletonText width={120} />
          <SkeletonText width={40} />
        </div>
        <SkeletonText width="90%" />
      </div>
    </div>
  );

  return (
    <div
      className={`${roboto.className} w-[200px] sm:w-[240px] md:w-[260px] lg:w-[280px] min-w-[200px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-2 sm:p-3 md:p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 hidden sm:block"
          >
            <rect
              x="2"
              y="2"
              width="5"
              height="5"
              rx="1"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="2"
              width="5"
              height="5"
              rx="1"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
            <rect
              x="2"
              y="9"
              width="5"
              height="5"
              rx="1"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="9"
              width="5"
              height="5"
              rx="1"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
          </svg>
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 truncate">
            Michael Johnson
          </h2>
        </div>
        <button className="p-1 rounded hover:bg-gray-100 transition-colors flex-shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2L2 14M14 2H6M14 2V10"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="p-2 sm:p-3 border-b border-gray-100">
        <div className="relative">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M11 11L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 sm:pl-9 pr-7 sm:pr-9 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
          />
          <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4H14M4 8H12M6 12H10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      {isLoading ? (
        <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
          <SkeletonText width={50} />
          <SkeletonText width={60} />
        </div>
      ) : (
        <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between animate-fadeIn">
          <button
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900"
            onClick={() =>
              setStatusFilter(statusFilter === "Open" ? "Closed" : "Open")
            }
          >
            <span>{statusFilter}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5L6 8L9 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900"
            onClick={() =>
              setSortFilter(sortFilter === "Newest" ? "Oldest" : "Newest")
            }
          >
            <span>{sortFilter}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5L6 8L9 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          // Skeleton loading state
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <ChatItemSkeleton key={i} />
            ))}
          </>
        ) : (
          // Loaded contacts
          filteredContacts.map((contact, index) => (
            <button
              key={contact.id}
              onClick={() => handleSelectChat(contact)}
              className={`w-full flex items-start gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 transition-all border-b border-gray-100 animate-fadeIn ${
                (selectedChatId || internalSelectedId) === contact.id
                  ? "bg-[#FFF8E1]"
                  : ""
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: getAvatarColor(contact.id) }}
              >
                {contact.image ? (
                  <img
                    src={contact.image}
                    alt={contact.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  contact.firstName.charAt(0)
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                    {contact.firstName} {contact.lastName}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0 ml-1">
                    {getRandomTime(contact.id)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate mt-0.5">
                  {contact.email}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
