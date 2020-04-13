import Slider from "rc-slider";
import { MouseEvent, useRef, useState } from "react";

import { Markers as MarkersTypes } from "../lib/types";
import { HeadMatter } from "../components/HeadMatter";
import { DraggableMarker } from "../components/DraggableMarker";
import { Marker } from "../components/Marker";
import { LockBody } from '../components/LockBody'

export default () => {
  const [markers, setMarkers] = useState<MarkersTypes>([]);
  const [active, setActive] = useState<string>();
  const [size, setSize] = useState(24);
  const [variant, setVariant] = useState("single");


  const imageRef = useRef<HTMLImageElement>(null);

  const handleClickImg = (e: MouseEvent<HTMLImageElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();

    if (rect) {
      const key = Math.random().toString(36).substring(7);
      const x = (e.clientX - rect.left) / (rect.width);
      const y = (e.clientY - rect.top) / (rect.height);
      const color = 'red'

      setMarkers([...markers, { key, x, y, color, size, variant }]);
      setActive(key);
    }
  };

  const getActiveMarker = () => {
    if (active) {
      return markers.find((marker) => marker.key === active);
    }
  };

  const handleChangeSlider = (value: number) => {
    setSize(value);

    if (active) {
      const newMarkers = markers.map((marker) => {
        return marker.key == active ? { ...marker, size: value } : marker;
      });
      setMarkers(newMarkers);
    }
  };

  function handleClickShape(event: MouseEvent<HTMLDivElement>, value: string) {
    event.stopPropagation()
    setVariant(value);

    if (active) {
      const newMarkers = markers.map((marker) => {
        return marker.key == active ? { ...marker, shape: value } : marker;
      });
      setMarkers(newMarkers);
    }
  };

  return (
    <LockBody>
      <HeadMatter />
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="bg-gray-200 p-8">
          <Slider
            value={getActiveMarker() ? getActiveMarker()?.size : size}
            onChange={handleChangeSlider}
          />
          <Marker
            size={25}
            color="#3f51b5"
            onClick={(event: any) => handleClickShape(event, "single")}
            active={variant === "single"}
            style={{
              marginRight: 10,
              display: "inline-block",
            }}
          />
          <Marker
            size={25}
            color="#3f51b5"
            onClick={(event: any) => handleClickShape(event, "double")}
            variant="double"
            active={variant === "double"}
            style={{
              display: "inline-block",
            }}
          />
        </div>
        <div className="relative flex-1 h-full bg-gray-100">
          <img
            alt=""
            ref={imageRef}
            onClick={handleClickImg}
            className="h-full w-auto mx-auto bg-cover bg-no-repeat bg-center"
            src="https://images.unsplash.com/photo-1520156557489-31c63271fcd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          />
          {markers.map((marker) => (
            <DraggableMarker
              key={marker.key}
              marker={marker}
              imageRef={imageRef}
              active={active}
              onClick={setActive}
              markers={markers}
              setMarkers={setMarkers}
              size={marker.size}
              color={marker.color}
              variant={marker.variant}
            />
          ))}
        </div>
      </div>
    </LockBody>
  );
};
