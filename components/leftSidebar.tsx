"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { inboxFilters, teams, channels } from "@/constants/inbox-data";
import { fetchUsers, delay, ApiUser } from "@/services/api";
import Skeleton, {
  SkeletonText,
  SkeletonAvatar,
} from "@/components/skeleton-loader";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Generate random color for avatar
const getAvatarColor = (id: number): string => {
  const colors = [
    "#9C27B0",
    "#E91E63",
    "#00BCD4",
    "#FF5722",
    "#8BC34A",
    "#3F51B5",
    "#009688",
    "#795548",
    "#607D8B",
  ];
  return colors[id % colors.length];
};

const LeftSidebar = () => {
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(true);
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState("My Inbox");

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Add artificial delay for skeleton effect
        await delay(1500);
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        // Set first user as active
        if (fetchedUsers.length > 0) {
          setActiveUserId(fetchedUsers[1]?.id || fetchedUsers[0]?.id);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Skeleton for filters
  const FiltersSkeleton = () => (
    <div className="space-y-1">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={16} height={16} />
            <SkeletonText width={80} />
          </div>
          <Skeleton
            variant="rectangular"
            width={24}
            height={16}
            className="rounded-full"
          />
        </div>
      ))}
    </div>
  );

  // Skeleton for users
  const UsersSkeleton = () => (
    <div className="mt-1 space-y-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div key={i} className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <SkeletonAvatar size={24} />
            <SkeletonText width={100} />
          </div>
          {i % 2 === 0 && (
            <Skeleton
              variant="rectangular"
              width={20}
              height={16}
              className="rounded-full"
            />
          )}
        </div>
      ))}
    </div>
  );

  // Skeleton for bottom section
  const BottomSkeleton = () => (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={32}
          className="rounded-md"
        />
      </div>
      <div className="space-y-2">
        <SkeletonText width="75%" />
        <SkeletonText width="50%" />
      </div>
    </div>
  );

  return (
    <aside
      className={`${roboto.className} w-[60px] sm:w-[80px] md:w-[180px] lg:w-[200px] min-w-[60px] sm:min-w-[80px] md:min-w-[180px] lg:min-w-[200px] bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-2 sm:p-3 md:p-4 border-b border-gray-100">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 text-center md:text-left truncate">
          <span className="hidden md:inline">Inbox</span>
          <span className="md:hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <rect
                x="2"
                y="4"
                width="16"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 8H7L8.5 10H11.5L13 8H18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-1 sm:p-2">
        {/* Inbox Filters */}
        {isLoading ? (
          <FiltersSkeleton />
        ) : (
          <div className="space-y-1 animate-fadeIn">
            {inboxFilters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`w-full flex items-center justify-center md:justify-between px-2 md:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                  activeFilter === filter.label
                    ? "bg-[#E3F2FD] text-[#1976D2]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title={filter.label}
              >
                <div className="flex items-center gap-1 md:gap-2">
                  {filter.icon === "user" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {filter.icon === "all" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M14 4H2V12H14V4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 4L8 9L14 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {filter.icon === "unassigned" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 5V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="11" r="0.5" fill="currentColor" />
                    </svg>
                  )}
                  <span className="hidden md:inline truncate">
                    {filter.label}
                  </span>
                </div>
                {filter.count !== undefined && (
                  <span className="hidden md:inline text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Teams Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsTeamsOpen(!isTeamsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span>Teams</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isTeamsOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isTeamsOpen && !isLoading && (
            <div className="mt-1 space-y-1 animate-fadeIn">
              {teams.map((team) => (
                <button
                  key={team.label}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center"
                      style={{ backgroundColor: team.color + "20" }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="4"
                          cy="4"
                          r="2"
                          stroke={team.color}
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8"
                          cy="4"
                          r="2"
                          stroke={team.color}
                          strokeWidth="1.5"
                        />
                        <path
                          d="M1 10C1 8.5 2.5 7 4 7C4.5 7 5 7.1 5.5 7.3"
                          stroke={team.color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 7C9.5 7 11 8.5 11 10"
                          stroke={team.color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span>{team.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {team.count}
                  </span>
                </button>
              ))}
            </div>
          )}

          {isTeamsOpen && isLoading && (
            <div className="mt-1 space-y-1">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton
                      variant="rectangular"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    <SkeletonText width={80} />
                  </div>
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={16}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span>Users</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isUsersOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isUsersOpen && isLoading && <UsersSkeleton />}

          {isUsersOpen && !isLoading && (
            <div className="mt-1 space-y-1 animate-fadeIn">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setActiveUserId(user.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    activeUserId === user.id
                      ? "bg-[#E3F2FD] text-[#1976D2]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium overflow-hidden"
                      style={{ backgroundColor: getAvatarColor(user.id) }}
                    >
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.firstName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.firstName.charAt(0)
                      )}
                    </div>
                    <span className="truncate max-w-[100px]">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  {user.id % 3 === 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {user.id}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Channels Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsChannelsOpen(!isChannelsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span>Channels</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isChannelsOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isChannelsOpen && isLoading && (
            <div className="mt-1 space-y-1">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2">
                  <SkeletonAvatar size={24} />
                  <SkeletonText width={60} />
                </div>
              ))}
            </div>
          )}

          {isChannelsOpen && !isLoading && (
            <div className="mt-1 space-y-1 animate-fadeIn">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: channel.color }}
                  >
                    {channel.icon === "whatsapp" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 1C3.68629 1 1 3.68629 1 7C1 8.1 1.3 9.1 1.8 10L1 13L4.1 12.2C4.9 12.7 5.9 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {channel.icon === "instagram" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="12"
                          height="12"
                          rx="3"
                          stroke="white"
                          strokeWidth="1.2"
                        />
                        <circle
                          cx="7"
                          cy="7"
                          r="2.5"
                          stroke="white"
                          strokeWidth="1.2"
                        />
                        <circle cx="10.5" cy="3.5" r="0.75" fill="white" />
                      </svg>
                    )}
                  </div>
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom placeholder */}
      {isLoading && <BottomSkeleton />}
    </aside>
  );
};

export default LeftSidebar;
