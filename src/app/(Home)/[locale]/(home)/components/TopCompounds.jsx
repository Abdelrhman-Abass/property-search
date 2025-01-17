"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import TopCompoundsList from "./TopCompoundsList";
import ErrorMessage from "@/components/Error/ErrorMessage";
import { GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";

const TopCompounds = ({ data }) => {
  const t = useTranslations("home");
  const local = useLocale();
  return (
    <section className="pb40 pt70">
      <div className="container">
        <div className="row  justify-content-between align-items-center">
          <div className="col-auto">
            <div className="main-title" data-aos="fade-up" data-aos-delay="100">
              <h2 className="title">{t("topCompounds")}</h2>
            </div>
          </div>
          {/* End header */}
          {data?.success && data?.data?.length ? (
            <div className="col-auto mb-30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button
                    aria-label="Top Compunds Right"
                    className={`${
                      local == "en" ? "rotate180" : ""
                    } apartment-type2-next__active swiper_button `}
                  >
                    <GoArrowUpRight className="fs22" />          

                  </button>
                </div>
                {/* End Next */}
                <div className="col-auto">
                  <div className="pagination swiper--pagination apartment-type2_pagination__active" />
                </div>
                {/* End pagination */}
                <div className="col-auto">
                  <button
                  aria-label="Top Compunds Swiper button"
                    className={`${
                      local == "en" ? "rotate180" : ""
                    } apartment-type2-prev__active swiper_button`}
                  >
                    <GoArrowUpLeft className="fs22" />          

                  </button>
                </div>
                {/* End prev */}
              </div>
            </div>
          ) : null}
        </div>
        {/* End .row */}
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
            {data?.success && data?.data?.length ? (
              <div className="property-city-slider">
                <TopCompoundsList data={data?.data} />
              </div>
            ) : (
              <ErrorMessage
                networkError={data === null}
                error={t("topCompoundsError")}
              />
            )}
          </div>
        </div>
        {/* End .row */}
      </div>
    </section>
  );
};

export default TopCompounds;
