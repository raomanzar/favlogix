"use client";

import { useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const navItems = [
  { label: "Inbox", icon: "inbox", isActive: true },
  { label: "Contacts", icon: "contacts" },
  { label: "AI Employees", icon: "ai" },
  { label: "Workflows", icon: "workflows" },
  { label: "Campaigns", icon: "campaigns" },
];

const TopNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`${roboto.className} flex items-center justify-between px-2 sm:px-4 py-2 bg-[#F8F9FA] border-b border-gray-200 h-12 sm:h-14 relative`}
    >
      {/* Left Section - Logo & Nav Items */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Logo */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F43F5E] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              {/* Left vertical line of H */}
              <path
                d="M7 6V18"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Right part - curved like a hook/y shape */}
              <path
                d="M7 12H12C14.5 12 16 13.5 16 16V18"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 6V9C16 11 14.5 12 12 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[#F43F5E] hidden xs:block">
            heyy
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Nav Items - Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-default ${
                item.isActive
                  ? "bg-white text-gray-800 shadow-sm border border-gray-200"
                  : "text-gray-500"
              }`}
            >
              {/* Inbox Icon */}
              {item.icon === "inbox" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="3"
                    width="12"
                    height="10"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 6H6L7 8H9L10 6H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {/* Contacts Icon */}
              {item.icon === "contacts" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6"
                    cy="5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="11"
                    cy="5"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M1 14C1 11.5 3 9.5 6 9.5C7 9.5 7.8 9.7 8.5 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 9.5C13 9.5 15 11 15 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* AI Employees Icon */}
              {item.icon === "ai" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2L9 4.5L12 5L9.5 7L10.5 10L8 8.5L5.5 10L6.5 7L4 5L7 4.5L8 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 11L3.5 12L5 12.5L3.5 13L3 14L2.5 13L1 12.5L2.5 12L3 11Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11L12.5 12L14 12.5L12.5 13L12 14L11.5 13L10 12.5L11.5 12L12 11Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {/* Workflows Icon */}
              {item.icon === "workflows" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="4"
                    cy="4"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="4"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="4"
                    cy="12"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 4H10M4 6V10M12 6V10M6 12H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* Campaigns Icon */}
              {item.icon === "campaigns" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 4V8L11 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Settings & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Settings Icon */}
        <div className="p-1 sm:p-2 cursor-default hidden sm:block">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
            <path
              d="M16.1667 10C16.1667 10.3333 16.1333 10.6667 16.1 11L17.8333 12.4C18 12.5333 18.0333 12.7667 17.9333 12.9667L16.3 15.7C16.2 15.9 15.9667 15.9667 15.7667 15.9L13.7333 15.0667C13.2667 15.4333 12.7667 15.7333 12.2 15.9667L11.9 18.1C11.8667 18.3333 11.6667 18.5 11.4333 18.5H8.16667C7.93333 18.5 7.73333 18.3333 7.7 18.1L7.4 15.9667C6.83333 15.7333 6.33333 15.4333 5.86667 15.0667L3.83333 15.9C3.63333 15.9667 3.4 15.9 3.3 15.7L1.66667 12.9667C1.56667 12.7667 1.6 12.5333 1.76667 12.4L3.5 11C3.46667 10.6667 3.43333 10.3333 3.43333 10C3.43333 9.66667 3.46667 9.33333 3.5 9L1.76667 7.6C1.6 7.46667 1.56667 7.23333 1.66667 7.03333L3.3 4.3C3.4 4.1 3.63333 4.03333 3.83333 4.1L5.86667 4.93333C6.33333 4.56667 6.83333 4.26667 7.4 4.03333L7.7 1.9C7.73333 1.66667 7.93333 1.5 8.16667 1.5H11.4333C11.6667 1.5 11.8667 1.66667 11.9 1.9L12.2 4.03333C12.7667 4.26667 13.2667 4.56667 13.7333 4.93333L15.7667 4.1C15.9667 4.03333 16.2 4.1 16.3 4.3L17.9333 7.03333C18.0333 7.23333 18 7.46667 17.8333 7.6L16.1 9C16.1333 9.33333 16.1667 9.66667 16.1667 10Z"
              stroke="#6B7280"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-default">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E91E63] flex items-center justify-center text-white text-xs sm:text-sm font-medium">
            M
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-700 hidden md:block">
            Michael Johnson
          </span>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-50">
          <div className="p-2 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-default ${
                  item.isActive ? "bg-gray-100 text-gray-800" : "text-gray-500"
                }`}
              >
                {/* Inbox Icon */}
                {item.icon === "inbox" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="12"
                      height="10"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 6H6L7 8H9L10 6H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {item.icon === "contacts" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="5"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="11"
                      cy="5"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M1 14C1 11.5 3 9.5 6 9.5C7 9.5 7.8 9.7 8.5 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 9.5C13 9.5 15 11 15 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {item.icon === "ai" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2L9 4.5L12 5L9.5 7L10.5 10L8 8.5L5.5 10L6.5 7L4 5L7 4.5L8 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {item.icon === "workflows" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="4"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="4"
                      cy="12"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 4H10M4 6V10M12 6V10M6 12H10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {item.icon === "campaigns" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 4V8L11 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
