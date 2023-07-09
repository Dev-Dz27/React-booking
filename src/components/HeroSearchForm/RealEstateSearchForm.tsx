import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FC } from "react";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PriceRangeInput from "./PriceRangeInput";
import { PropertyType } from "components/HeroSearchForm2Mobile/PropertyTypeSelect";

export interface RealEstateSearchFormProps {
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultPropertyType: PropertyType[] = [
  {
    name: "Duplex House",
    description: "Have a place to yourself",
    checked: true,
  },
  {
    name: "Ferme House",
    description: "Have your own room and share some common spaces",
    checked: false,
  },
  {
    name: "Chalet House",
    description:
      "Have a private or shared room in a boutique hotel, hostel, and more",
    checked: false,
  },
  {
    name: "Maison House",
    description: "Stay in a shared space, like a common room",
    checked: false,
  },
];

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const [locationInputValue, setLocationInputValue] = useState("");
  const [typeOfProperty, setTypeOfProperty] =
    useState<PropertyType[]>(defaultPropertyType);
  //
  useEffect(() => {
    if (haveDefaultValue) {
      setLocationInputValue(defaultLocationValue);
    }
  }, []);
  //

  const renderForm = () => {
    return (
      <form className="w-full relative xl:mt-8 flex flex-col lg:flex-row lg:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          className="flex-[1.5]"
        />

        <PropertyTypeSelect
          defaultValue={typeOfProperty}
          onChange={setTypeOfProperty}
        />
        <PriceRangeInput />
      </form>
    );
  };

  return renderForm();
};

export default RealEstateSearchForm;
