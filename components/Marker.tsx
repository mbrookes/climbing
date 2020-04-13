import React, { MouseEvent, CSSProperties } from "react";

export const Marker = ({
  color,
  active,
  size,
  variant,
  onClick,
  style
}: {
  active?: boolean;
  color: string;
  size: number;
  variant?: string;
  onClick?: any
  style?: CSSProperties
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
    <div onClick={onClick} style={style}
      className={`${active && "rounded-full shadow-outline cursor-move"}`}>
      <svg width={size} height={size}>
        {circle(size, color)}
        {variant === 'double' && circle(size, color, -5)}
      </svg>
    </div>
  );
};
