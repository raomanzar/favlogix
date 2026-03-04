"use client";

import Image from "next/image";
import { Roboto } from "next/font/google";
import { useState, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import DashboardIcons from "@/components/dashbord-icon";
import {
  leftIcons,
  rightIcons,
  backgrounds,
} from "@/constants/dashboard-icons";
import DashboardLoader from "@/components/dashboard-loader";

const roboto = Roboto({
  subsets: ["latin"],
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleIconClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard/inbox");
    }, 1500);
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--foreground)] relative p-[clamp(0.625rem,0.4905rem+0.6329vw,1.25rem)]">
      <div className="flex h-full w-full items-center justify-center bg-[var(--transparent-white)] z-10 border-2 border-[var(--white-border)] rounded-[clamp(0.625rem,0.4905rem+0.6329vw,1.25rem)] backdrop-blur-[60px]">
        <IconSection
          icons={leftIcons}
          onIconClick={handleIconClick}
          position="left"
        />
        <div className="relative flex items-center justify-center">
          {/* Loader */}
          <div
            className={`w-max absolute transition-all duration-500 ease-in-out ${
              isLoading
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <DashboardLoader />
          </div>
          {/* Title */}
          <h1
            className={`${roboto.className} text-center font-bold text-[clamp(0.6875rem,0.5396rem+0.6962vw,1.375rem)]  text-white m-0 border-2 border-[#007aec] rounded-[10px] p-4 transition-all duration-500 ease-in-out ${
              isLoading
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            Select Module
          </h1>
        </div>

        <IconSection
          icons={rightIcons}
          onIconClick={handleIconClick}
          position="right"
        />
      </div>

      {backgrounds?.map(({ src, width, position }) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={0}
          height={0}
          aria-hidden="true"
          className="absolute top-0 h-full z-[1] cursor-pointer"
          style={{
            width,
            [position]: 0,
          }}
        />
      ))}
    </div>
  );
}

function IconSection({
  icons,
  onIconClick,
  position,
}: {
  icons: { icon: string; style: CSSProperties }[];
  onIconClick: () => void;
  position: "left" | "right";
}) {
  return (
    <div
      className={`flex-1 flex items-center justify-between h-full relative
        max-[576px]:flex max-[576px]:flex-col max-[576px]:gap-1.5 max-[576px]:justify-center
        ${position === "left" ? "max-[576px]:center" : "max-[576px]:center"}`}
    >
      {icons?.map(({ icon, style }) => (
        <DashboardIcons
          key={`${icon}-${style.top || style.bottom}`}
          icon={icon}
          externalStyling={{
            position: "absolute",
            ...style,
          }}
          className="max-[576px]:!static"
          handleClick={onIconClick}
        />
      ))}
    </div>
  );
}
