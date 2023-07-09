import React, { FC, useEffect, useRef, useState } from "react";
import Logo from "shared/Logo/Logo";
import useOutsideAlerter from "hooks/useOutsideAlerter";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm2/HeroSearchForm";
import { Link, useLocation } from "react-router-dom";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "shared/MenuBar/MenuBar";
import { StaySearchFormFields } from "components/HeroSearchForm2/StaySearchForm";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";

interface Header3Props {
  className?: string;
}

let WIN_PREV_POSITION = window.pageYOffset;

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const headerInnerRef = useRef<HTMLDivElement>(null);
  //
  const [showHeroSearch, setShowHeroSearch] =
    useState<StaySearchFormFields | null>();
  //
  const [currentTab, setCurrentTab] = useState<SearchTab>("Stays");

  //
  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null);
    setCurrentTab("Stays");
  });

  let location = useLocation();
  //

  useEffect(() => {
    setShowHeroSearch(null);
  }, [location]);

  // HIDDEN WHEN SCROLL EVENT
  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
    return () => {
      window.removeEventListener("scroll", handleEvent);
    };
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm);
  };

  const handleHideSearchForm = () => {
    if (!document.querySelector("#nc-Header-3-anchor")) {
      return;
    }
    //
    let currentScrollPos = window.pageYOffset;
    if (
      WIN_PREV_POSITION - currentScrollPos > 100 ||
      WIN_PREV_POSITION - currentScrollPos < -100
    ) {
      setShowHeroSearch(null);
    } else {
      return;
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  //
  const renderHeroSearch = () => {
    return (
      <div
        className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${
          showHeroSearch
            ? "visible"
            : "-translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className={`w-full max-w-4xl mx-auto pb-6`}>
          <HeroSearchForm
            defaultFieldFocus={showHeroSearch || undefined}
            onTabChange={setCurrentTab}
            defaultTab={currentTab}
          />
        </div>
      </div>
    );
  };

  const renderButtonOpenHeroSearch = () => {
    return (
      <div
        className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${
          showHeroSearch
            ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0 pointer-events-none invisible"
            : "visible"
        }`}
      >
        <div className="flex items-center font-medium text-sm">
          <span
            onClick={() => setShowHeroSearch("location")}
            className="block pl-5 pr-4 cursor-pointer py-3"
          >
            Location
          </span>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <span
            onClick={() => setShowHeroSearch("dates")}
            className="block px-4 cursor-pointer py-3 "
          >
            Check In
          </span>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <span
            onClick={() => {
              setShowHeroSearch("guests");
            }}
            className="block px-4 cursor-pointer font-normal py-3"
          >
            Add guests
          </span>
        </div>

        <div
          className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
          onClick={() => setShowHeroSearch("location")}
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000  text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] ${
          showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
        }`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 ${className}`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          ${showHeroSearch ? "duration-75" : ""} 
          ${
            showHeroSearch
              ? currentTab === "Cars" || currentTab === "Flights"
                ? "scale-y-[4.4]"
                : "scale-y-[3.4]"
              : ""
          }`}
        ></div>
        <div className="relative px-4 lg:container h-[88px] flex">
          <div className="flex-1 flex items-center justify-between">
            {/* Logo (lg+) */}
            <div className="relative z-10 hidden md:flex flex-1">
              <Logo />
            </div>

            <div className="flex-[2] lg:flex-none mx-auto">
              <div className="hidden lg:block">
                {renderButtonOpenHeroSearch()}
              </div>
              <div className="lg:hidden w-full max-w-lg mx-auto">
                <HeroSearchForm2MobileFactory />
              </div>
              {renderHeroSearch()}
            </div>

            {/* NAV */}
            <div className="hidden md:flex relative z-10 flex-1 items-center justify-end text-neutral-700 dark:text-neutral-100">
              <div className="items-center flex space-x-1">
                <Link
                  to="/add-listing-1"
                  className="
                hidden xl:inline-flex text-opacity-90
                group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  List your property
                </Link>

                <div></div>
                <SwitchDarkMode />
                <div className="pr-1.5">
                  <NotifyDropdown className="-ml-2 xl:-ml-1" />
                </div>
                <AvatarDropdown />
                <div className="hidden md:block">
                  <MenuBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
