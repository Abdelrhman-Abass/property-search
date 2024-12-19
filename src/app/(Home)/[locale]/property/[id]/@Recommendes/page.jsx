"use server";
import React from "react";
import { ApiGetter } from "@/services/ApiGetter";
import RecommendedWrapper from "@/app/(Home)/[locale]/(home)/components/RecommendedWrapper";
import RecommendedError from "../components/RecommendedError";

const Recommended = async ({ areaId, minPrice, maxPrice }) => {
  let data = await ApiGetter({
    url: `/api/RelatedProperties?areaId=${areaId}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
  });

  return (
    <div className="row">
      <div className="col-lg-12">
        {data?.success && data?.data?.length ? (
          <div className="feature-listing-slider">
            <RecommendedWrapper type="property" data={data?.data} />
          </div>
        ) : (
          <RecommendedError data={data} />
        )}
      </div>
    </div>
  );
};

export default Recommended;
