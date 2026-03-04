import Image from "next/image";
import { Roboto } from "next/font/google";
import { CSSProperties } from "react";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

interface LoaderProps {
  title?: string;
  description?: string;
  gifSize?: {
    width: string;
    height: string;
  };
  className?: string;
}

const DashboardLoader = ({
  title = "Extracting Information...",
  description = "We are extracting information from the above honey combs to your system",
  gifSize = {
    width: "clamp(10rem, 7.8481rem + 10.1266vw, 20rem)",
    height: "clamp(7.8125rem, 6.1313rem + 7.9114vw, 15.625rem)",
  },
  className,
}: LoaderProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[10px] ${className || ""}`}
    >
      <Image
        src="/gifs/circle.gif"
        alt="Loading"
        width={0}
        height={0}
        // className="mb-1"
        style={{
          width: gifSize.width,
          height: gifSize.height,
        }}
        unoptimized
      />
      <h1
        className={`${roboto.className} tracking-[1.2px] font-bold text-[clamp(0.6875rem,0.5396rem+0.6962vw,1.375rem)] text-white m-0`}
      >
        {title}
      </h1>
      <p
        className={`${roboto.className}  tracking-[1px] text-center max-w-[clamp(7.1875rem,4.1614rem+14.2405vw,21.25rem)] text-[clamp(0.5rem,0.3924rem+0.5063vw,1rem)] text-white m-0`}
      >
        {description}
      </p>
    </div>
  );
};

export default DashboardLoader;
