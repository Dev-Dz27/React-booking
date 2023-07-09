import React, { useEffect, useState } from "react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import useOutsideAlerter from "hooks/useOutsideAlerter";
import { PathName } from "routers/types";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";

export interface GuestsInputProps {
  defaultValue: GuestsObject;
  onChange?: (data: GuestsObject) => void;
  className?: string;
  fieldClassName?: string;
  autoFocus?: boolean;
  submitLink: PathName;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "[ nc-hero-field-padding--small ]",
  className = "",
  autoFocus = false,
  submitLink,
}) => {
  const refContainer = React.createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(refContainer, () => setIsOpen(false));

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    defaultValue.guestAdults || 0
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    defaultValue.guestChildren || 0
  );
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(
    defaultValue.guestInfants || 0
  );
  //

  useEffect(() => {
    setIsOpen(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    setGuestAdultsInputValue(defaultValue.guestAdults || 0);
    setGuestChildrenInputValue(defaultValue.guestChildren || 0);
    setGuestInfantsInputValue(defaultValue.guestInfants || 0);
  }, [defaultValue]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
    onChange && onChange(newValue);
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  return (
    <div className={`flex relative ${className}`} ref={refContainer}>
      <div
        className={`flex flex-1 text-left justify-between items-center focus:outline-none cursor-pointer ${
          isOpen ? "nc-hero-field-focused--2" : ""
        }`}
      >
        <div
          className={`${fieldClassName} flex-1`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="flex-1 text-left">
            <span className="block font-semibold">
              {totalGuests || ""} Guests
            </span>
            <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
              {totalGuests ? "Guests" : "Add guests"}
            </span>
          </div>
        </div>
        <div className="relative">
          {!!totalGuests && isOpen && (
            <ClearDataButton
              onClick={() => {
                setGuestAdultsInputValue(0);
                setGuestChildrenInputValue(0);
                setGuestInfantsInputValue(0);
              }}
            />
          )}
        </div>
        <div className="pr-2">
          <ButtonSubmit href={submitLink} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-30 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
          <NcInputNumber
            className="w-full"
            defaultValue={guestAdultsInputValue}
            onChange={(value) => handleChangeData(value, "guestAdults")}
            max={10}
            min={1}
            label="Adults"
            desc="Ages 13 or above"
          />
          <NcInputNumber
            className="w-full mt-6"
            defaultValue={guestChildrenInputValue}
            onChange={(value) => handleChangeData(value, "guestChildren")}
            max={4}
            label="Children"
            desc="Ages 2–12"
          />

          <NcInputNumber
            className="w-full mt-6"
            defaultValue={guestInfantsInputValue}
            onChange={(value) => handleChangeData(value, "guestInfants")}
            max={4}
            label="Infants"
            desc="Ages 0–2"
          />
        </div>
      )}
    </div>
  );
};

export default GuestsInput;
