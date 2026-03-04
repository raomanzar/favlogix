"use client";

import { useState } from "react";
import TopNavbar from "@/components/topNavbar";
import LeftSidebar from "@/components/leftSidebar";
import ChatList from "@/components/chatList";
import ChatArea from "@/components/chatArea";
import DetailsPanel from "@/components/detailsPanel";
import { ApiContact } from "@/services/api";

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState<ApiContact | undefined>();
  const [showChatArea, setShowChatArea] = useState(false);

  const handleSelectChat = (contact: ApiContact) => {
    setSelectedChat(contact);
    // On mobile, show chat area when a chat is selected
    setShowChatArea(true);
  };

  const handleBackToList = () => {
    setShowChatArea(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden">
      {/* Top Navigation */}
      <TopNavbar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Inbox Filters - Hidden on mobile */}
        <div className="hidden sm:block">
          <LeftSidebar />
        </div>

        {/* Chat List - Hidden on mobile when chat is open */}
        <div
          className={`${showChatArea ? "hidden sm:block" : "block"} flex-1 sm:flex-none`}
        >
          <ChatList
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat?.id}
          />
        </div>

        {/* Main Chat Area - Full width on mobile when chat is selected */}
        <div
          className={`${showChatArea ? "flex" : "hidden sm:flex"} flex-1 flex-col`}
        >
          {/* Mobile back button */}
          <button
            onClick={handleBackToList}
            className="sm:hidden flex items-center gap-2 p-2 bg-white border-b border-gray-200 text-gray-600"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L6 10L12 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm">Back</span>
          </button>
          <ChatArea selectedContact={selectedChat} />
        </div>

        {/* Right Details Panel - Hidden on tablet and below */}
        <DetailsPanel selectedContactId={selectedChat?.id} />
      </div>
    </div>
  );
}
