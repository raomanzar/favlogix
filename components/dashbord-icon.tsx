import Image from "next/image";
import { CSSProperties } from "react";

interface DashboardIconsProps {
  icon: string;
  externalStyling?: CSSProperties;
  handleClick?: () => void;
  className?: string;
}

const DashboardIcons = ({
  icon,
  externalStyling,
  handleClick,
  className,
}: DashboardIconsProps) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 78 86"
      xmlns="http://www.w3.org/2000/svg"
      className={`group cursor-pointer ${className || ""}`}
      style={externalStyling}
      onClick={handleClick}
    >
      {/* Gradient definition with rotating animation */}
      <defs>
        <linearGradient
          id="gradient-shimmer"
          x1="0"
          x2="78"
          y1="0"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            from="0 39 43"
            to="360 39 43"
            dur="2s"
            repeatCount="indefinite"
          />
          <stop stopColor="#007aec" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#007aec" />
          <stop offset="1" stopColor="#007aec" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Hexagon background fill */}
      <path
        className="fill-black/20"
        d="M31.988 1.871a13.97 13.97 0 0 1 13.966 0l25.006 14.437a13.97 13.97 0 0 1 6.983 12.095v28.873a13.97 13.97 0 0 1-6.983 12.095L45.954 83.808a13.97 13.97 0 0 1-13.966 0L6.983 69.371A13.97 13.97 0 0 1 0 57.276V28.403a13.97 13.97 0 0 1 6.983-12.095L31.988 1.871z"
      />

      {/* Default border (visible, fades on hover) */}
      <path
        strokeWidth="1.5"
        fill="none"
        className="stroke-white/20 transition-opacity duration-300 group-hover:opacity-0"
        d="M32.363 2.521a13.22 13.22 0 0 1 13.217 0l25.004 14.436a13.22 13.22 0 0 1 6.608 11.446v28.873a13.22 13.22 0 0 1-6.608 11.445L45.58 83.158a13.22 13.22 0 0 1-13.217 0L7.358 68.72a13.22 13.22 0 0 1-6.608-11.445V28.403a13.22 13.22 0 0 1 6.608-11.446L32.363 2.521z"
      />

      {/* Animated gradient border (hidden, appears on hover) */}
      <path
        strokeWidth="1.5"
        fill="none"
        stroke="url(#gradient-shimmer)"
        className="transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        d="M32.363 2.521a13.22 13.22 0 0 1 13.217 0l25.004 14.436a13.22 13.22 0 0 1 6.608 11.446v28.873a13.22 13.22 0 0 1-6.608 11.445L45.58 83.158a13.22 13.22 0 0 1-13.217 0L7.358 68.72a13.22 13.22 0 0 1-6.608-11.445V28.403a13.22 13.22 0 0 1 6.608-11.446L32.363 2.521z"
      />

      {/* Icon centered inside - full foreignObject, 60% image */}
      <foreignObject x="0" y="0" width="78" height="86">
        <div className="flex size-full items-center justify-center">
          <Image
            src={icon}
            alt="icon"
            width={0}
            height={0}
            className="transition-transform duration-300 group-hover:scale-110"
            style={{ width: "30%", height: "30%", objectFit: "contain" }}
          />
        </div>
      </foreignObject>
    </svg>
  );
};

export default DashboardIcons;
