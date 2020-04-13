import Slider from "rc-slider";
import { MouseEvent, useRef, useState } from "react";

import { HeadMatter } from "../components/HeadMatter";
import { Marker } from "../components/Marker";
import { Markers } from "../lib/types";
import { LockBody } from '../components/LockBody'

export default () => {
  const [markers, setMarkers] = useState<Markers>([]);
  const [active, setActive] = useState<string>();
  const [size, setSize] = useState(24);


  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();

    if (rect) {
      const key = Math.random().toString(36).substring(7);
      const x = (e.clientX - rect.left) / (rect.width);
      const y = (e.clientY - rect.top) / (rect.height);
      const color = 'red'

      setMarkers([...markers, { key, x, y, color, size }]);
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

  return (
    <LockBody>
      <HeadMatter />
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="bg-gray-200 p-8">
          <Slider
            value={getActiveMarker() ? getActiveMarker()?.size : size}
            onChange={handleChangeSlider}
          />
          <p>{JSON.stringify(markers)}</p>
        </div>
        <div className="relative flex-1 h-full bg-gray-100">
          <img
            alt=""
            ref={imageRef}
            onClick={handleClick}
            className="h-full w-auto mx-auto bg-cover bg-no-repeat bg-center"
            src="https://images.unsplash.com/photo-1520156557489-31c63271fcd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.key}
              marker={marker}
              imageRef={imageRef}
              active={active}
              setActive={setActive}
              markers={markers}
              setMarkers={setMarkers}
            />
          ))}
        </div>
      </div>
    </LockBody>
  );
};
