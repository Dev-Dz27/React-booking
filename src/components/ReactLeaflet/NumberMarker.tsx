import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useState, Fragment, FC } from "react";
import "leaflet/dist/leaflet.css";
import StayCard from "../StayCard/StayCard";
import { Transition } from "@headlessui/react";
import { CarDataType, ExperiencesDataType, StayDataType } from "data/types";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";

export interface NumberMarkerProps {
  className?: string;
  key?: string | number;
  position?: any;
  number?: number | string;
  isHovered?: boolean;
  isSelected?: boolean;
  listing?: StayDataType;
  experiences?: ExperiencesDataType;
  car?: CarDataType;
  id?: string | number;
  children?: React.ReactNode;
}

const NumberMarker: FC<NumberMarkerProps> = ({
  className = "",
  position,
  number,
  isHovered,
  isSelected,
  listing,
  experiences,
  car,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const icon = L.divIcon({
    html: `
      <span 
        class="
        flex px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 text-sm font-semibold items-center justify-center min-w-max shadow-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors          
          ${
            isSelected
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : ""
          }
        "
      >
        ${number}
      </span>
    `,
    // iconSize: [30, 30], // Adjust the size of the marker here
    // iconAnchor: [15, 15], // Center the marker on the provided position
  });

  return (
    <div
      className={`nc-AnyReactComponent relative  ${className}`}
      data-nc-id="AnyReactComponent"
    >
      <Marker position={position} icon={icon}>
        <Popup closeButton={false}>
          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute z-50 bottom-full pb-3 -left-12 w-[260px] aspect-w-1">
              {listing && (
                <StayCard size="small" data={listing} className="shadow-2xl" />
              )}
              {experiences && (
            <ExperiencesCard
              size="small"
              data={experiences}
              className="shadow-2xl bg-white dark:bg-neutral-900 pt-3 px-3 rounded-3xl"
            />
          )}
               {car && <CarCard size="small" data={car} className="shadow-2xl " />}
            </div>
          </Transition>
        </Popup>
      </Marker>
    </div>
  );
};

export default NumberMarker;
