import React, { FC, useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import { CarDataType, DateRage } from "data/types";
import StartRating from "components/StartRating/StartRating";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import {
  DayPickerRangeController,
  FocusedInputShape,
  isInclusivelyAfterDay,
} from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import carUtilities1 from "images/carUtilities/1.png";
import carUtilities2 from "images/carUtilities/2.png";
import carUtilities3 from "images/carUtilities/3.png";
import carUtilities4 from "images/carUtilities/4.png";
import carUtilities5 from "images/carUtilities/5.png";
import carUtilities6 from "images/carUtilities/6.png";
import carUtilities7 from "images/carUtilities/7.png";
import carUtilities8 from "images/carUtilities/8.png";
import RentalCarDatesRangeInput from "components/HeroSearchForm/RentalCarDatesRangeInput";
import { TimeRage } from "components/HeroSearchForm/RentalCarSearchForm";
import MobileFooterSticky from "./MobileFooterSticky";
import { useParams } from "react-router-dom";
import { DEMO_CAR_LISTINGS } from "data/listings";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal, setDateRange, setSelectedCar } from "features/bookingSlice";
import CustomMarker from "components/ReactLeaflet/CustomMarker";
import { MapContainer, TileLayer } from "react-leaflet";
import calculateTotal from "utils/calculateTotal";
import { RootState } from "features/store";
import { calculateNumberOfDays, formatDate } from "utils/dateUtils";

export interface ListingCarDetailPageProps {
  className?: string;
}

const PHOTOS: string[] = [
  "https://images.pexels.com/photos/381292/pexels-photo-381292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2827753/pexels-photo-2827753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/257851/pexels-photo-257851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/189454/pexels-photo-189454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/193995/pexels-photo-193995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/575386/pexels-photo-575386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

const includes_demo = [
  { name: "Free cancellation up to 48 hours before pick-up" },
  { name: "Collision Damage Waiver with $214 deductible" },
  { name: "Theft Protection with $19,999 excess" },
  { name: "Unlimited mileage" },
  {
    name: "Car interiors and exteriors cleaned with disinfectant before pick-up",
  },
  { name: "Masks are required at the pick-up location" },
];

const Amenities_demos = [
  { name: "59 MPG Combined, 58 City/60 Hwy", icon: carUtilities1 },
  {
    name: "Forward Collision-Avoidance Assist with Pedestrian Detection (FCA-Ped)",
    icon: carUtilities2,
  },
  { name: "139-hp gas/electric combined", icon: carUtilities3 },
  { name: "Proximity Key with push button start", icon: carUtilities4 },
  { name: "8-inch color touchscreen display audio", icon: carUtilities5 },
  { name: "Smart Cruise Control with Stop & Go (SCC)", icon: carUtilities6 },
  { name: "LED Daytime Running Lights (DRL)", icon: carUtilities7 },
  { name: "Blind-Spot Collision Warning (BCW)", icon: carUtilities8 },
];

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({
  className = "",
}) => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<CarDataType | undefined | null>(null);

  useEffect(() => {
    // Simulate data retrieval from JSON file using the carId
    const fetchedCar = DEMO_CAR_LISTINGS.find(
      (car) => car.id === carId // Removed Number() conversion
    );

    setCar(fetchedCar);
  }, [carId]);

  const {
    address,
    author,
    title,
    reviewCount,
    reviewStart,
    date,
    price,
    featuredImage,
    seats,
    gearshift,
    map,
  } = car ?? {};

  const position: LatLngTuple = [map?.lat ?? 0, map?.lng ?? 0];
  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  // USE STATE
  
  const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
    useState<FocusedInputShape>("startDate");

  
  const bookingState = useSelector((state: any) => state.booking);
  const selectedDate = bookingState.dateRange;

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>(
    bookingState.dateRange
  );
  // Calculate the timeRangeValue based on bookingState.dateRange
  const startDate = bookingState.dateRange.startDate;
  const endDate = bookingState.dateRange.endDate;
  const startTime = startDate ? moment(startDate).format("hh:mm A") : "";
  const endTime = endDate ? moment(endDate).format("hh:mm A") : "";
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime, endTime 
  });

  const numberOfDays = calculateNumberOfDays(selectedDate.startDate, selectedDate.endDate);

    // Format the selected start and end dates
// const formattedStartDate = selectedDate.startDate
// ? moment(selectedDate.startDate).format("dddd, MMMM D ") 
// : "";
const formattedStartDate = formatDate(selectedDate.startDate);

// const formattedEndDate = selectedDate.endDate
// ? moment(selectedDate.endDate).format("dddd, MMMM D ")
// : "";
const formattedEndDate = formatDate(selectedDate.endDate);

  // Redux Toolkit

  const dispatch = useDispatch();
  // Redux Toolkit

  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);



  // When the user selects a car
  const handleReserveClick = () => {
    // Assuming you have the car data in the 'car' variable
    dispatch(setSelectedCar(car));
    // Redirect to the checkout page
  };


  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge color="pink" name="BMW car" />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {title && title}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating reviewCount={reviewCount} reviewStart={reviewStart} />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1"> {address && address}</span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar
            author={author}
            hasChecked
            sizeClass="h-10 w-10"
            radius="rounded-full"
          />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Car owner{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {author?.displayName}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">{seats && seats} seats</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-dharmachakra text-2xl"></i>
            <span className=""> {gearshift && gearshift}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-suitcase text-2xl"></i>
            <span className=""> 2 bags</span>
          </div>
        </div>
      </div>
    );
  };

  //
  const renderSectionTienIch = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">
            Vehicle parameters & utilities{" "}
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Questions are at the heart of making things great.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
          {/* TIEN ICH 1 */}
          {Amenities_demos.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 ">
              <div className="w-10 flex-shrink-0">
                <img src={item.icon} alt="" />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Car descriptions</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>
            Until the all-new TUCSON hits the dealer showrooms you can check it
            out in our Showroom Walkaround video. Watch the video and join our
            product specialist as he gives you an up-close look of our latest
            SUV
            <br />
            <br />
            Questions are at the heart of making things great. Watch our
            celebrity-filled TV ad and you’ll see that when we say “everything,”
            we mean everything.
          </p>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Include </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Included in the price
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {includes_demo
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <i className="las la-check-circle text-2xl"></i>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="listingSection__wrap__DayPickerRangeController flow-root">
          <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
            <DayPickerRangeController
              startDate={selectedDate.startDate}
              endDate={selectedDate.endDate}
              onDatesChange={(date) => dispatch(setDateRange(date))}
              focusedInput={focusedInputSectionCheckDate}
              onFocusChange={(focusedInput) =>
                setFocusedInputSectionCheckDate(focusedInput || "startDate")
              }
              initialVisibleMonth={null}
              numberOfMonths={windowSize.width < 1280 ? 1 : 2}
              daySize={getDaySize()}
              hideKeyboardShortcutsPanel={false}
              isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
            />
          </div>
        </div>

        {/*  */}
        {/* <div className="flex space-x-8">
          <div className="w-1/2 space-y-2">
            <label className="font-medium" htmlFor="startTime">
              Pick up time:
            </label>
            <Input
              defaultValue={timeRangeValue.startTime}
              rounded="rounded-xl"
              id="startTime"
              type="time"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="font-medium" htmlFor="endTime">
              Drop off time:
            </label>
            <Input
              defaultValue={timeRangeValue.endTime}
              rounded="rounded-xl"
              id="endTime"
              type="time"
              onChange={(e) => console.log(e)}
            />
          </div>
        </div> */}
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Car Owner</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            author={author}
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {author?.displayName}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating
                reviewCount={reviewCount}
                reviewStart={reviewStart}
              />
              <span className="mx-2">·</span>
              <span> {author?.count} places</span>{" "}
              {/* possibly: replace places with cars */}
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March {date && date}</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="##">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">
          Reviews ({reviewCount} reviews)
        </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more {reviewCount} reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    if (!map) {
      // Position data not available, render a loading state or something else
      return <p>Loading map...</p>;
    }
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {/* San Diego, CA, United States of America (SAN-San Diego Intl.) */}
            {address && address}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        {/* {!showModal && ( */}
          <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
            <div
              className="rounded-xl 
          overflow-hidden
          "
            >
              <MapContainer
                style={{ height: "100vh" }}
                center={position}
                zoom={9}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors '
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CustomMarker
                  key={car?.id}
                  position={position}
                  color="blue"
                ></CustomMarker>
              </MapContainer>
            </div>
          </div>
         {/* )} */}
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Lock in this fantastic price today, cancel free of charge anytime.
            Reserve now and pay at pick-up.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            We asked ourselves, “How can we make the dash not only look better,
            but also give the driver a better look outside?” The unexpected
            answer is having no hood above the available 10.25-inch digital
            instrument cluster...
          </span>
        </div>
      </div>
    );
  };

  const renderSidebarPrice = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            {price && price}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /day
            </span>
          </span>
          <StartRating reviewCount={reviewCount} reviewStart={reviewStart} />
        </div>

        {/* FORM */}
        <form className="flex border  border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <RentalCarDatesRangeInput
            defaultDateValue={dateRangeValue}
            defaultTimeValue={timeRangeValue}
            numberOfMonths={2}
            fieldClassName="p-3"
            wrapFieldClassName="flex flex-col w-full flex-shrink-0 relative divide-y divide-neutral-200 dark:divide-neutral-700"
            className="RentalCarDetailPageDatesRangeInput flex-1"
            onChange={(data) => {
              setDateRangeValue(data.stateDate);
              setTimeRangeValue(data.stateTimeRage);
            }}
            anchorDirection={"right"}
            hasButtonSubmit={false}
          />
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>    {price && price } x {numberOfDays && numberOfDays}</span>
            <span> {price ? `$${calculateTotal(price, numberOfDays)}` : "N/A"}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span> {price ? `$${calculateTotal(price, numberOfDays)}` : "N/A"}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary 
        href={`/book/cars/${carId}`} 
        onClick={handleReserveClick} >Reserve</ButtonPrimary>
      </div>
    );
  };

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">
        <span className="text-2xl font-semibold block">
          Pick up and drop off
        </span>
        <div className="mt-8 flex">
          <div className="flex-shrink-0 flex flex-col items-center py-2">
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          </div>
          <div className="ml-4 space-y-14 text-sm">
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                {/* Monday, August 12 · 10:00 */}
                {formattedStartDate && formattedStartDate}
              </span>
              <span className=" font-semibold">
                {/* Saint Petersburg City Center  */} {/* //TODO: add pickup location dynimacally */}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                {/* Monday, August 16 · 10:00 */}
                {formattedEndDate && formattedEndDate}

              </span>
              <span className=" font-semibold">
                {/* Saint Petersburg City Center */} {/* //TODO: add drop off location dynimacally */}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`ListingDetailPage nc-ListingCarDetailPage ${className}`}
      data-nc-id="ListingCarDetailPage"
    >
      {/* SINGLE HEADER */}
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                // src={galleryImgs?.[0]}
                src={featuredImage}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>

            {/*  */}
            {/* <div
              className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(1)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={PHOTOS[1]}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div> */}

            {/*  */}
            {PHOTOS.filter((_, i) => i >= 1 && i < 4).map(
              (
                item,
                index // Use galleryImgs instead of PHOTOS
              ) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                >
                <NcImage
                  containerClassName="aspect-w-4 aspect-h-3"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item || ""}
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleOpenModal(index + 2)}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ListingCarDetailPage__modalPhotos"
        />
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          <div className="block lg:hidden">{renderSidebarDetail()}</div>
          {renderSectionTienIch()}
          {renderSection2()}
          {renderSection3()}
          {renderSectionCheckIndate()}
          {renderSection5()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          {renderSidebarDetail()}
          <div className="hidden lg:block mt-10 sticky top-28">
            {renderSidebarPrice()}
          </div>
        </div>
      </main>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingCarDetailPage"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>
    </div>
  );
};

export default ListingCarDetailPage;
