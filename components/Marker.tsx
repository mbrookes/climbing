import { motion } from "framer-motion";
import { Dispatch, RefObject, SetStateAction } from "react";

import { Marker as MarkerProps , Markers} from "../lib/types";

export const Marker = ({
  marker,
  imageRef,
  active,
  setActive,
  markers,
  setMarkers
}: {
  marker: MarkerProps;
  imageRef: RefObject<HTMLImageElement>;
  active: string | undefined;
  setActive: Dispatch<SetStateAction<string | undefined>>;
  markers: Markers
  setMarkers: Dispatch<SetStateAction<Markers>>
}) => {

const handleDrag = (e: any) => {
  const rect = imageRef.current?.getBoundingClientRect();

  if (rect) {
    const x = (e.clientX - rect.left) / (rect.width);
    const y = (e.clientY - rect.top) / (rect.height);  

    const newMarkers = markers.map((marker) => marker.key == active ? { ...marker, x, y } : marker);
    setMarkers(newMarkers);
  }
}

  const getMarkerXPos = (x: number) => {
    const rect = imageRef.current?.getBoundingClientRect();

    if (rect) {
      const px = x * rect.width + rect.left;
      return px - marker.size / 2;
    }
  };

  const getMarkerYPos = (y: number) => {
    const rect = imageRef.current?.getBoundingClientRect();

    if (rect) {
      const px = y * rect.height;
      return px - marker.size / 2;
    }
  };

  return (
    <motion.div
      onClick={() => setActive(marker.key)}
      drag={true}
      dragMomentum={false}
      onDrag={handleDrag}
      className={`no-transform absolute cursor-pointer ${
        active === marker.key && "shadow-outline rounded-full cursor-move"
      }`}
      style={{
        width: marker.size,
        height: marker.size,
        left: getMarkerXPos(marker.x),
        top: getMarkerYPos(marker.y),
      }}
    >
      <svg width={marker.size} height={marker.size}>
        <circle
          cx={marker.size / 2}
          cy={marker.size / 2}
          r={marker.size / 2 - 1}
          style={{
            stroke: marker.color,
            strokeWidth: 2,
            fill: "transparent",
          }}
        />
      </svg>
    </motion.div>
  );
};
