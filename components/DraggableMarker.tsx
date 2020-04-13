import { motion } from "framer-motion";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Marker as MarkerProps, Markers } from "../lib/types";
import { Marker } from './Marker';

export const DraggableMarker = ({
  active,
  color,
  imageRef,
  marker,
  markers,
  onClick: handleClick,
  setMarkers,
  size,
  variant,
}: {
  active: string | undefined;
  color: string;
  imageRef: RefObject<HTMLImageElement>;
  marker: MarkerProps;
  markers: Markers
  onClick: Dispatch<SetStateAction<string | undefined>>;
  setMarkers: Dispatch<SetStateAction<Markers>>;
  size: number;
  variant?: string;
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
      return px - size / 2;
    }
  };

  const getMarkerYPos = (y: number) => {
    const rect = imageRef.current?.getBoundingClientRect();

    if (rect) {
      const px = y * rect.height;
      return px - size / 2;
    }
  };

  return (
    <motion.div
      onClick={() => handleClick(marker.key)}
      drag={true}
      dragMomentum={false}
      onDrag={handleDrag}
      className="no-transform absolute cursor-pointer"
      style={{
        left: getMarkerXPos(marker.x),
        top: getMarkerYPos(marker.y),
      }}
    >
      <Marker color={color} size={size} variant={variant} active={active === marker.key} />
    </motion.div>
  );
};
