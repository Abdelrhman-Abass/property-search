"use client";
import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { formatPrice } from "@/services";
import { useLocale, useTranslations } from "next-intl";

const PriceRange = ({ price, setPrice }) => {
  const locale = useLocale();
  const g = useTranslations("global");
  const handleOnChange = (value) => {
    setPrice(value);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          min={0}
          max={100000000}
          value={price}
          onChange={(value) => handleOnChange(value)}
          id="slider"
          reverse={locale == "ar"}
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">
            {formatPrice(price[0])} {g("egp")}
          </span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">
            {formatPrice(price[1])} {g("egp")}
          </span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
