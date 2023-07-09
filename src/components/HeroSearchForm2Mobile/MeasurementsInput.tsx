import React, { FC, useEffect, useRef, useState } from "react";
import { RadioGroup, Tab } from "@headlessui/react";
import NcInputNumber from "../NcInputNumber/NcInputNumber";

interface Props {
  fieldClassName?: string;
  onChange?: (value: object) => void;
  defaultMeasurementType: string;
  defaultWeightPlan?: number;
  defaultLength?: number;
  defaultWidth?: number;
  defaultHeight?: number;
}

const MeasurementsInput: FC<Props> = ({
  onChange = (value) => {},

  defaultMeasurementType = "Imperial",
  defaultWeightPlan = 1,
  defaultLength = 0,
  defaultWidth = 0,
  defaultHeight = 0,
}) => {
  //
  let [measurementType, setMeasurementType] = useState("Imperial"); // Imperial or Metric
  let [weightPlan, setWeightPlan] = useState(1); // 1, 5 or 10 ... lbs or kg
  let [length, setLength] = useState(0); // in or cm
  let [width, setWidth] = useState(0); // in or cm
  let [height, setHeight] = useState(0); // in or cm

  //
  const inputRef = useRef<HTMLInputElement>(null);
  //
  useEffect(() => {
    setWeightPlan(defaultWeightPlan);
  }, [defaultWeightPlan]);
  useEffect(() => {
    setMeasurementType(defaultMeasurementType);
  }, [defaultMeasurementType]);
  useEffect(() => {
    setLength(defaultLength);
  }, [defaultLength]);
  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth]);
  useEffect(() => {
    setHeight(defaultHeight);
  }, [defaultHeight]);

  const renderTabPanelCommon = () => {
    return (
      <div>
        <RadioGroup
          value={weightPlan}
          onChange={(e: number) => {
            setWeightPlan(e);
            onChange({ measurementType, weightPlan: e, length, width, height });
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
          className="grid grid-cols-3 gap-2.5 mt-11"
        >
          {[1, 5, 10].map((item, index) => {
            return (
              <RadioGroup.Option key={item} value={item}>
                {({ checked }) => (
                  <span
                    className={`inline-flex items-center justify-center h-11 w-full rounded-full cursor-pointer select-none ${
                      checked
                        ? "border-black border-2"
                        : "border border-neutral-300"
                    }`}
                  >
                    {`${item} ${measurementType === "Imperial" ? "lbs" : "kg"}`}
                  </span>
                )}
              </RadioGroup.Option>
            );
          })}
        </RadioGroup>

        <div className="mt-11 divide-y space-y-3">
          <NcInputNumber
            className="w-full"
            defaultValue={length}
            onChange={(value) => {
              setLength(value);
              onChange({
                measurementType,
                weightPlan,
                length: value,
                width,
                height,
              });
            }}
            max={10}
            min={1}
          />
          <NcInputNumber
            className="w-full pt-7"
            defaultValue={width}
            onChange={(value) => {
              setWidth(value);
              onChange({
                measurementType,
                weightPlan,
                length,
                width: value,
                height,
              });
            }}
            max={10}
            min={1}
          />
          <NcInputNumber
            className="w-full pt-7"
            defaultValue={height}
            onChange={(value) => {
              setHeight(value);
              onChange({
                measurementType,
                weightPlan,
                length,
                width,
                height: value,
              });
            }}
            max={10}
            min={1}
          />
        </div>
      </div>
    );
  };

  const renderPanelContent = () => {
    return (
      <div className=" w-full bg-white p-4 py-5 rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] ">
        <div className="mb-8">
          <span className="block text-2xl text-black font-semibold">
            Measurements
          </span>
          <input
            type={"number"}
            className="inputNumberHiddenArrows block mt-1 text-neutral-400 leading-none font-light border-none outline-none p-0 m-0 focus:outline-none ring-0 focus:ring-0 hover:bg-transparent"
            placeholder={"Type weight here"}
            ref={inputRef}
          />
        </div>
        <Tab.Group
          defaultIndex={measurementType === "Metric" ? 1 : 0}
          onChange={(index) => {
            index
              ? setMeasurementType("Metric")
              : setMeasurementType("Imperial");

            onChange({
              measurementType: index ? "Metric" : "Imperial",
              weightPlan,
              length,
              width,
              height,
            });
          }}
        >
          <Tab.List className="bg-neutral-100 rounded-full h-11 px-1.5 py-1 flex font-medium text-base text-black">
            <Tab
              className={({ selected }) =>
                `${
                  selected ? "bg-white shadow-md rounded-full flex-1" : ""
                } px-3.5 leading-none flex-shrink-0 flex items-center justify-center select-none`
              }
            >
              {({ selected }) => (
                <span>Imperial {selected && "(lb, in)"} </span>
              )}
            </Tab>
            <Tab
              className={({ selected }) =>
                `${
                  selected ? "bg-white shadow-md rounded-full flex-1" : ""
                } px-3.5 leading-none flex items-center justify-center select-none`
              }
            >
              {({ selected }) => <span>Metric {selected && "(kg, cm)"}</span>}
            </Tab>
          </Tab.List>

          <Tab.Panel>{renderTabPanelCommon()}</Tab.Panel>
          <Tab.Panel>{renderTabPanelCommon()}</Tab.Panel>
        </Tab.Group>
      </div>
    );
  };

  return <div className="relative flex">{renderPanelContent()}</div>;
};

export default MeasurementsInput;
