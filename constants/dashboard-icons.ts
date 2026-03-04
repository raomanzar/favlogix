import { CSSProperties } from "react";

interface IconConfig {
  icon: string;
  style: CSSProperties;
}

export const leftIcons: IconConfig[] = [
  {
    icon: "/svgs/vector1.svg",
    style: {
      top: "25%",
      right: "35%",
      height: "clamp(2.8125rem, 2.2073rem + 2.8481vw, 5.625rem)",
      width: "clamp(2.8125rem, 2.2073rem + 2.8481vw, 5.625rem)",
    },
  },
  {
    icon: "/svgs/vector2.svg",
    style: {
      top: "47.5%",
      right: "62.5%",
      height: "clamp(2.5rem, 1.962rem + 2.5316vw, 5rem)",
      width: "clamp(2.5rem, 1.962rem + 2.5316vw, 5rem)",
    },
  },
  {
    icon: "/svgs/vector3.svg",
    style: {
      top: "62.5%",
      right: "30%",
      height: "clamp(2.5rem, 1.962rem + 2.5316vw, 5rem)",
      width: "clamp(2.5rem, 1.962rem + 2.5316vw, 5rem)",
    },
  },
];

export const rightIcons: IconConfig[] = [
  {
    icon: "/svgs/vector3.svg",
    style: {
      top: "20%",
      right: "30%",
      height: "clamp(2.5rem, 1.962rem + 2.5316vw, 5rem)",
      width: "clamp(2.5rem, 1.962rem + 2.5316vw, 5rem)",
    },
  },
  {
    icon: "/svgs/vector4.svg",
    style: {
      top: "45%",
      right: "65%",
      height: "clamp(2.8125rem, 2.2073rem + 2.8481vw, 5.625rem)",
      width: "clamp(2.8125rem, 2.2073rem + 2.8481vw, 5.625rem)",
    },
  },
  {
    icon: "/svgs/vector5.svg",
    style: {
      top: "60%",
      right: "27.5%",
      height: "clamp(1.875rem, 1.4715rem + 1.8987vw, 3.75rem)",
      width: "clamp(1.875rem, 1.4715rem + 1.8987vw, 3.75rem)",
    },
  },
];

export const backgrounds = [
  { src: "/svgs/background2.svg", width: "61%", position: "left" },
  { src: "/svgs/background1.svg", width: "50%", position: "right" },
] as const;

// Optional: export the type if needed elsewhere
export type { IconConfig };
