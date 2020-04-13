import React, { MouseEvent, CSSProperties } from "react";

export const Marker = ({
  className,
  color,
  active,
  size,
  variant,
  onClick,
}: {
  active?: boolean;
  className?: string;
  color: string;
  size: number;
  variant?: string;
  onClick?: any;
}) => {

  const circle = (size: number, color: string, shrink = -1) => (
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2 + shrink}
      style={{
        stroke: color,
        strokeWidth: 2,
        fill: 'transparent'
      }}
    />
  )

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${active && "rounded-full shadow-outline"} ${className}`}
    >
      <svg width={size} height={size}>
        {circle(size, color)}
        {variant === 'double' && circle(size, color, -5)}
      </svg>
    </div>
  );
};
