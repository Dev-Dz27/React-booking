import React, { FC } from "react";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  return (
    <CommonLayout
      index="06"
      backtHref="/add-listing-5"
      nextHref="/add-listing-7"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Your place description for client
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Mention the best features of your accommodation, any special
            amenities like fast Wi-Fi or parking, as well as things you like
            about the neighborhood.
          </span>
        </div>

        <Textarea placeholder="..." rows={14} />
      </>
    </CommonLayout>
  );
};

export default PageAddListing6;
