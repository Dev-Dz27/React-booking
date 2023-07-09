import React, { FC } from "react";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import convertNumbThousand from "utils/convertNumbThousand";

export interface CardCategoryBox1Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategoryBox1: FC<CardCategoryBox1Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, thumbnail, href = "/" } = taxonomy;
  return (
    <Link
      to={href}
      className={`nc-CardCategoryBox1 relative flex items-center p-3 sm:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
      data-nc-id="CardCategoryBox1"
    >
      <Badge
        className="absolute right-2 top-2"
        color="gray"
        name={convertNumbThousand(count)}
      />

      <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
        <NcImage src={thumbnail} containerClassName="absolute inset-0" />
      </div>
      <div className="ml-4 flex-grow overflow-hidden">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          19 minutes drive
        </span>
      </div>
    </Link>
  );
};

export default CardCategoryBox1;
