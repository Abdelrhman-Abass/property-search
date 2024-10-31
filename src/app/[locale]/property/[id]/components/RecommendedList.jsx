import { useTranslations } from "next-intl";
import React from "react";
import Recommended from "../@Recommendes/page";

const RecommendedList = ({ areaId, price }) => {
  const h = useTranslations("home");
  const maxPrice = Number(price) * 1.15; // 15%
  const minPrice = Number(price) * 0.85;

  return (
    <section className="pt50 pb15">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title">{h("recommended")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="feature-listing-slider">
              <Recommended
                areaId={areaId}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedList;
