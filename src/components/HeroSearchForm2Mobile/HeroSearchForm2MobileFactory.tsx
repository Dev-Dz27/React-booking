import React from "react";
import { useLocation } from "react-router-dom";
import { PathName } from "routers/types";
import HeroSearchForm2Mobile from "./HeroSearchForm2Mobile";
import HeroSearchForm2RealEstateMobile from "./HeroSearchForm2RealEstateMobile";

const PAGES_REAL_ESTATE: PathName[] = [
  "/home-2",
  "/listing-real-estate",
  "/listing-real-estate-detail",
  "/listing-real-estate-map",
];

const HeroSearchForm2MobileFactory = () => {
  const location = useLocation();
  if (PAGES_REAL_ESTATE.includes(location.pathname as PathName)) {
    return <HeroSearchForm2RealEstateMobile />;
  }
  return <HeroSearchForm2Mobile />;
};

export default HeroSearchForm2MobileFactory;
