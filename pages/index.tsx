import { MouseEvent, useRef, useState } from "react";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Markers as MarkersTypes } from "../lib/types";
import { HeadMatter } from "../components/HeadMatter";
import { DraggableMarker } from "../components/DraggableMarker";
import { Marker } from "../components/Marker";
import { LockBody } from '../components/LockBody'

export default () => {
  const [markers, setMarkers] = useState<MarkersTypes>([]);
  const [active, setActive] = useState<string>();
  const [size, setSize] = useState(35);
  const [variant, setVariant] = useState("single");

  const imageRef = useRef<HTMLImageElement>(null);

  const getActiveMarker = () => {
    if (active) {
      return markers.find((marker) => marker.key === active);
    }
  };

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

  const handleChangeSlider = (event: any, newValue: number | number[]) => {
    const value = newValue as number
    setSize(value);

    if (active) {
      const newMarkers = markers.map((marker) => {
        return marker.key == active ? { ...marker, size: value } : marker;
      });
      setMarkers(newMarkers);
    }
  };

  function handleClickShape(event: MouseEvent<HTMLDivElement>, value: string) {
    setVariant(value);

    if (active) {
      const newMarkers = markers.map((marker) => {
        return marker.key == active ? { ...marker, variant: value } : marker;
      });
      setMarkers(newMarkers);
    }
  };

  function handleClickDelete(event: any) {
    if (active) {
      const newMarkers = markers.filter((marker) => {
        return marker.key !== active;
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
            min={20}
            max={50}
            onChange={handleChangeSlider}
          />
          <div className="flex justify-center">
            <Marker
              size={25}
              color="#3f51b5"
              onClick={(event: any) => handleClickShape(event, "single")}
              active={variant === "single"}
            />
            <Marker
              size={25}
              color="#3f51b5"
              onClick={(event: any) => handleClickShape(event, "double")}
              variant="double"
              active={variant === "double"}
            />
          </div>
          <IconButton onClick={handleClickDelete}><DeleteIcon /></IconButton>
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
