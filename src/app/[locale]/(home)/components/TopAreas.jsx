"use client";
import React from "react";
import { useTranslations } from "next-intl";
import TopAreasList from "./TopAreasList";
import ErrorMessage from "@/components/Error/ErrorMessage";

const TopAreas = ({ data }) => {
  const t = useTranslations("home");
  return (
    <section id="top-area" className="pb40 pt70">
      <div className="container">
        <div
          className="row align-items-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title">{t("topAreas")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
            {data?.success && data?.data?.length ? (
              <div className="property-city-slider position-relative">
                <TopAreasList data={data?.data} />
              </div>
            ) : (
              <ErrorMessage
                networkError={data === null}
                error={t("topAreasError")}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopAreas;
