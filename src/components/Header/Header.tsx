import React, { FC } from "react";
import MainNav1 from "./MainNav1";
import MainNav2 from "./MainNav2";
import {  useSelector } from "react-redux";
import { RootState } from "features/store";

export interface HeaderProps {
  navType?: "MainNav1" | "MainNav2";
  className?: string;
}

const Header: FC<HeaderProps> = ({ navType = "MainNav1", className = "" }) => {
  const renderNav = () => {
    switch (navType) {
      case "MainNav1":
        return <MainNav1 />;
      case "MainNav2":
        return <MainNav2 />;
      default:
        return <MainNav1 />;
    }
  };

  const bookingState = useSelector((state: RootState) => state.booking);

  const showModal = bookingState.showModal;


  return (
    <div
             className={`
             nc-Header sticky top-0 w-full left-0 right-0 

            z-${showModal ? "10" : "40"}
             nc-header-bg ${className}`}
    >
      {renderNav()}
    </div>
  );
};

export default Header;
