interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({
  className = "",
  variant = "text",
  width,
  height,
}: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-gray-200";

  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonText = ({
  width = "100%",
  className = "",
}: {
  width?: string | number;
  className?: string;
}) => (
  <Skeleton variant="text" width={width} height={12} className={className} />
);

export const SkeletonAvatar = ({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    className={className}
  />
);

export const SkeletonButton = ({
  width = 80,
  height = 32,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) => (
  <Skeleton
    variant="rectangular"
    width={width}
    height={height}
    className={className}
  />
);

export default Skeleton;
