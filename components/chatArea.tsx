"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { fetchMessages, delay, ApiMessage } from "@/services/api";
import Skeleton, { SkeletonText } from "@/components/skeleton-loader";
import { ApiContact } from "@/services/api";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

interface ChatAreaProps {
  selectedContact?: ApiContact;
}

// Generate random time
const getRandomTime = (id: number): string => {
  const times = ["23:08", "23:16", "23:17", "23:20", "23:23"];
  return times[id % times.length];
};

const ChatArea = ({ selectedContact }: ChatAreaProps) => {
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<ApiMessage[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        // Add artificial delay for skeleton effect
        await delay(2500);
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [selectedContact?.id]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Skeleton for messages
  const MessageSkeleton = ({ isSent }: { isSent: boolean }) => (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[70%] ${isSent ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 mb-1">
          <SkeletonText width={40} />
        </div>
        <Skeleton
          variant="rectangular"
          width={isSent ? 200 : 280}
          height={isSent ? 60 : 80}
          className={`rounded-2xl ${isSent ? "rounded-br-md" : "rounded-bl-md"}`}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`${roboto.className} flex-1 bg-white flex flex-col h-full min-w-0`}
    >
      {/* Chat Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {selectedContact
            ? `${selectedContact.firstName} ${selectedContact.lastName}`
            : "Olivia Mckinsey"}
        </h2>
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
            >
              <circle cx="9" cy="4" r="1.5" fill="#6B7280" />
              <circle cx="9" cy="9" r="1.5" fill="#6B7280" />
              <circle cx="9" cy="14" r="1.5" fill="#6B7280" />
            </svg>
          </button>
          <button className="p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors hidden sm:block">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C2 9 4.5 4 9 4C13.5 4 16 9 16 9C16 9 13.5 14 9 14C4.5 14 2 9 2 9Z"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="9"
                r="2.5"
                stroke="#6B7280"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button className="p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors hidden sm:block">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="12"
                height="12"
                rx="2"
                stroke="#6B7280"
                strokeWidth="1.5"
              />
              <path
                d="M6 9H12M9 6V12"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#FAFAFA]">
        {isLoading ? (
          // Skeleton loading state
          <div className="space-y-4">
            {/* Date header skeleton */}
            <div className="flex justify-center mb-4">
              <Skeleton
                variant="rectangular"
                width={120}
                height={28}
                className="rounded-full"
              />
            </div>

            <MessageSkeleton isSent={false} />
            <MessageSkeleton isSent={true} />
            <MessageSkeleton isSent={false} />
            <MessageSkeleton isSent={true} />
            <MessageSkeleton isSent={false} />
            <MessageSkeleton isSent={false} />
            <MessageSkeleton isSent={true} />
            <MessageSkeleton isSent={false} />
          </div>
        ) : (
          // Loaded messages
          <div className="space-y-3 sm:space-y-4 animate-fadeIn">
            {/* Date Header */}
            <div className="flex justify-center">
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F5F5F5] text-gray-600 text-[10px] sm:text-xs font-medium rounded-full">
                28 August 2025
              </span>
            </div>

            {messages.map((message, index) => {
              const isSent = index % 2 === 1;
              return (
                <div
                  key={message.id}
                  className={`flex ${isSent ? "justify-end" : "justify-start"} animate-fadeIn`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
                    {/* Time stamp */}
                    <div
                      className={`flex items-center ${isSent ? "justify-end" : ""} gap-1 mb-1`}
                    >
                      <span className="text-[10px] sm:text-xs text-gray-400">
                        {getRandomTime(message.id)}
                      </span>
                    </div>

                    <div className="flex items-end gap-1">
                      <div
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed ${
                          isSent
                            ? "bg-[#FFF9C4] text-gray-800 rounded-2xl rounded-br-md"
                            : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100"
                        }`}
                      >
                        {message.body}
                      </div>
                    </div>

                    {/* Read receipt */}
                    {isSent && (
                      <div className="flex justify-end mt-0.5">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 sm:w-4 sm:h-4"
                        >
                          <path
                            d="M1 8L5 12L11 4"
                            stroke="#4CAF50"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 8L9 12L15 4"
                            stroke="#4CAF50"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-2 sm:p-4 border-t border-gray-200 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Type something...."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-16 sm:pr-24 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
          />
        </div>

        {/* Input Actions */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <div className="flex items-center gap-0 sm:gap-1">
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              >
                <rect
                  x="2"
                  y="2"
                  width="14"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
                <path
                  d="M2 12L6 8L10 12L14 8L16 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hidden sm:block">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 5V9L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hidden sm:block">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="2"
                  width="12"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 6H12M6 9H12M6 12H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="6.5" cy="7.5" r="1" fill="currentColor" />
                <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
                <path
                  d="M6 11C6.5 12.5 7.5 13 9 13C10.5 13 11.5 12.5 12 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hidden md:block">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L8 4V7C8 7 15 7 15 14C15 14 13 10 8 10V13L3 9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-0 sm:gap-1">
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              >
                <path
                  d="M9 2L11 7H16L12 10L14 16L9 12L4 16L6 10L2 7H7L9 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              >
                <path
                  d="M9 2V16M9 2C6.5 2 4 4 4 7C4 10 6.5 10 9 10M9 2C11.5 2 14 4 14 7C14 10 11.5 10 9 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
