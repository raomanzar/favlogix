"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import {
  fetchUserDetails,
  fetchPosts,
  delay,
  ApiContact,
} from "@/services/api";
import Skeleton, {
  SkeletonText,
  SkeletonAvatar,
} from "@/components/skeleton-loader";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

interface DetailsPanelProps {
  selectedContactId?: number;
}

const DetailsPanel = ({ selectedContactId }: DetailsPanelProps) => {
  const [isChatDataOpen, setIsChatDataOpen] = useState(true);
  const [isContactDataOpen, setIsContactDataOpen] = useState(true);
  const [isContactLabelsOpen, setIsContactLabelsOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(true);
  const [isOtherChatsOpen, setIsOtherChatsOpen] = useState(true);

  // Loading and data states
  const [isLoading, setIsLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState<ApiContact | null>(null);
  const [otherChats, setOtherChats] = useState<ApiContact[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Add artificial delay for skeleton effect
        await delay(3000);

        const [userDetails, posts] = await Promise.all([
          fetchUserDetails(selectedContactId || 1),
          fetchPosts(),
        ]);

        setContactDetails(userDetails);
        setOtherChats(posts);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedContactId]);

  // Skeleton components
  const ChatDataSkeleton = () => (
    <div className="px-4 pb-4 space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonText width={60} />
        <div className="flex items-center gap-2">
          <SkeletonAvatar size={24} />
          <SkeletonText width={80} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <SkeletonText width={40} />
        <div className="flex items-center gap-2">
          <SkeletonAvatar size={24} />
          <SkeletonText width={70} />
        </div>
      </div>
    </div>
  );

  const ContactDataSkeleton = () => (
    <div className="px-4 pb-4 space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <SkeletonText width={70} />
          <SkeletonText width={100} />
        </div>
      ))}
      <SkeletonText width={50} />
    </div>
  );

  const LabelsSkeleton = () => (
    <div className="px-4 pb-4 flex items-center gap-2">
      <Skeleton
        variant="rectangular"
        width={90}
        height={28}
        className="rounded-full"
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={28}
        className="rounded-full"
      />
      <Skeleton variant="circular" width={28} height={28} />
    </div>
  );

  const NotesSkeleton = () => (
    <div className="px-4 pb-4 space-y-2">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        className="rounded-md"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={50}
        className="rounded-md"
      />
    </div>
  );

  const OtherChatsSkeleton = () => (
    <div className="px-4 pb-4 space-y-2">
      <div className="flex items-center gap-3 p-2">
        <SkeletonAvatar size={32} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <SkeletonText width={60} />
            <SkeletonText width={50} />
          </div>
          <SkeletonText width={80} />
        </div>
      </div>
    </div>
  );

  const contactLabels = [
    { id: "1", label: "Closed Won", color: "#F44336" },
    { id: "2", label: "Chicago", color: "#FFC107" },
  ];

  const notes = [
    { id: "1", content: "Add a note", color: "transparent" },
    {
      id: "2",
      content: "Strong potential for future upgrades",
      color: "#4CAF50",
    },
  ];

  return (
    <aside
      className={`${roboto.className} w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[300px] bg-white border-l border-gray-200 h-full flex-col hidden md:flex transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800">
          Details
        </h2>
        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
          >
            <rect
              x="2"
              y="2"
              width="5"
              height="12"
              rx="1"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="2"
              width="5"
              height="12"
              rx="1"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Chat Data Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setIsChatDataOpen(!isChatDataOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="text-sm font-medium text-gray-700">Chat Data</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isChatDataOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isChatDataOpen &&
            (isLoading ? (
              <ChatDataSkeleton />
            ) : (
              <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Assignee</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#3F51B5] flex items-center justify-center text-white text-xs">
                      J
                    </div>
                    <span className="text-sm text-gray-800">James West</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Team</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FFC107] flex items-center justify-center">
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
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8"
                          cy="4"
                          r="2"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M1 10C1 8.5 2.5 7 4 7"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 7C9.5 7 11 8.5 11 10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-800">Sales Team</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Contact Data Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setIsContactDataOpen(!isContactDataOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="text-sm font-medium text-gray-700">Contact Data</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isContactDataOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isContactDataOpen &&
            (isLoading ? (
              <ContactDataSkeleton />
            ) : (
              <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">First Name</span>
                  <span className="text-sm text-gray-800">
                    {contactDetails?.firstName || "Olivia"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Name</span>
                  <span className="text-sm text-gray-800">
                    {contactDetails?.lastName || "Mckinsey"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Phone number</span>
                  <span className="text-sm text-gray-800">
                    {contactDetails?.phone || "+1 (312) 555-0134"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm text-gray-800 truncate max-w-[150px]">
                    {contactDetails?.email || "olivia@gmail.com"}
                  </span>
                </div>
                <button className="text-sm text-[#1976D2] hover:underline">
                  See all
                </button>
              </div>
            ))}
        </div>

        {/* Contact Labels Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setIsContactLabelsOpen(!isContactLabelsOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="text-sm font-medium text-gray-700">
              Contact Labels
            </h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isContactLabelsOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isContactLabelsOpen &&
            (isLoading ? (
              <LabelsSkeleton />
            ) : (
              <div className="px-4 pb-4 animate-fadeIn">
                <div className="flex items-center gap-2 flex-wrap">
                  {contactLabels.map((label) => (
                    <span
                      key={label.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: label.color }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M4 6L5.5 7.5L8 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {label.label}
                    </span>
                  ))}
                  <button className="w-7 h-7 rounded-full border-2 border-dashed border-[#1976D2] flex items-center justify-center text-[#1976D2] hover:bg-[#E3F2FD] transition-colors">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3V9M3 6H9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Notes Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="text-sm font-medium text-gray-700">Notes</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isNotesOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isNotesOpen &&
            (isLoading ? (
              <NotesSkeleton />
            ) : (
              <div className="px-4 pb-4 space-y-2 animate-fadeIn">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-md text-sm ${
                      note.color === "transparent"
                        ? "bg-gray-50 text-gray-500 border border-gray-200"
                        : "text-white"
                    }`}
                    style={
                      note.color !== "transparent"
                        ? { backgroundColor: note.color }
                        : {}
                    }
                  >
                    {note.content}
                  </div>
                ))}
              </div>
            ))}
        </div>

        {/* Other Chats Section */}
        <div>
          <button
            onClick={() => setIsOtherChatsOpen(!isOtherChatsOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="text-sm font-medium text-gray-700">Other Chats</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isOtherChatsOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isOtherChatsOpen &&
            (isLoading ? (
              <OtherChatsSkeleton />
            ) : (
              <div className="px-4 pb-4 space-y-2 animate-fadeIn">
                {otherChats.slice(0, 1).map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E1306C] flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="12"
                          height="12"
                          rx="3"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="2.5"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <circle cx="11.5" cy="4.5" r="0.75" fill="white" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">
                          Fit4Life
                        </span>
                        <span className="text-xs text-gray-500">08/08/25</span>
                      </div>
                      <p className="text-xs text-gray-500">On my way!</p>
                    </div>
                  </button>
                ))}
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default DetailsPanel;
