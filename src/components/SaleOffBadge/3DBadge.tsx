import { CubeIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

export interface ThreeDBadgeProps {
  className?: string;
  desc?: string;
  onClick?: () => void; 
}

const ThreeDBadge: FC<ThreeDBadgeProps> = ({
  className = "",
  desc = "3D Tour",
  onClick,
}) => {
  return (

    <div
      className={`flex items-center gap-1 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full px-2 py-1 text-white font-semibold text-xs cursor-pointer ${className}`}
      data-nc-id="ThreeDBadge"
      onClick={onClick}
    >
      <CubeIcon className="w-5 h-5" />
      {desc}
    </div>
  );
};

export default ThreeDBadge;
