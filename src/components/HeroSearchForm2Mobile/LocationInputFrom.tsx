import React, { useState, useEffect, FC } from "react";

const data = [
  {
    id: 1,
    img: "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg",
    name: "New Jersey, USA",
  },
  {
    id: 2,
    img: "https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320",
    name: "Delaware, USA",
  },
  {
    id: 3,
    img: "https://a0.muscache.com/im/pictures/c193e77c-0b2b-4f76-8101-b869348d8fc4.jpg?im_w=320",
    name: "Turkey",
  },
];

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const LocationInputFrom: FC<Props> = ({
  onChange = (value) => {},
  className = "nc-flex-1.5",
  defaultValue = "United States",
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  //
  const renderPanelContent = () => {
    return (
      <div className="flex space-x-4 overflow-x-auto hiddenScrollbar">
        {data.map((item) => {
          const isActive = item.name === value;
          return (
            <div
              key={item.id}
              className="flex-1 min-w-[130px] group cursor-pointer"
              onClick={() => {
                setValue(item.name);
                onChange && onChange(item.name);
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                className={`rounded-xl group-hover:border-black  ${
                  isActive
                    ? "border-2 border-black"
                    : "border border-neutral-300"
                }`}
              />
              <span className="block mt-1.5 text-black">{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="w-full bg-white px-4 py-5">
        <p className="block text-[15px] text-[#251c1c]">
          Which of our warehouses will the package be shipping from?
        </p>
        {renderPanelContent()}
      </div>
    </div>
  );
};

export default LocationInputFrom;
