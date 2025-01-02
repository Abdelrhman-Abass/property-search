"use client";
import React, { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

const FilterBar = ({ setOrderBy, setSearchTerm, searchTerm, onSearch }) => {
  const t = useTranslations("home");
  const locale = useLocale();
  const searchInputRef = useRef();

  const filterData = [
    { value: "Latest", lable: locale == "ar" ? "الاحدث" : "Latest" },
    {
      value: "LowestPrice",
      lable: locale == "ar" ? "أدنى سعر" : "Lowest Price",
    },
    {
      value: "HighestPrice",
      lable: locale == "ar" ? "أعلى سعر" : "Highest Price",
    },
  ];
  const handleSubmitSearch = () => {
    if (!searchTerm) {
      searchInputRef.current.focus();
      return;
    }
    onSearch();
  };
  return (
    <>
      <div className="col-xl-8 d-flex align-items-center justify-content-between mb30 mt40">
        <div className="row gap-3">
          <div
            // style={{ width: "fit-content", padding: 0 }}
            className="advance-search-field position-relative text-start width-fit-content p-0"
          >
            <div className="form-search position-relative">
              <div className="box-search">
                <span className="icon flaticon-home-1"></span>
                <input
                  className="form-control bgc-f7 bdrs12"
                  placeholder={t("placeholder")}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  ref={searchInputRef}
                  type="text"
                  name="search"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearch();
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <button
          aria-label="Filter modal"
            // style={{
            //   width: "fit-content",
            //   display: "flex",
            //   alignItems: "center",
            //   gap: 4,
            //   backgroundColor: "transparent",
            //   border: "none",
            // }}
            className="d-flex align-items-center gap-4 bg-transparent border-0 width-fit-content" 
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <span className="flaticon-settings d-flex" />
            {t("advanced")}
          </button>
          <button
            aria-label="Filter modal"

            // style={{ width: "fit-content" }}
            className="advance-search-icon ud-btn btn-thm width-fit-content"
            type="button"
            onClick={handleSubmitSearch}
          >
            <span className="flaticon-search d-flex items-center justify-content-center"></span>
          </button>
        </div>
      </div>
      <div className="col-xl-4 d-flex align-items-center justify-content-center mb30 mt40">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span  className="min80width">
              {locale == "ar" ? "ترتيب حسب" : "Order by"}
            </span>
            <select
              className="form-select"
              onChange={(e) => setOrderBy(e.target.value)}
            >
              {filterData.map(({ value, lable }, idx) => {
                return (
                  <option key={idx} value={value}>
                    {lable}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
