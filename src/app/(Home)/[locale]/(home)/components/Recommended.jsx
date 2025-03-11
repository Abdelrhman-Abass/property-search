"use client"
import React from "react";
import { useTranslations } from "next-intl";
import RecommendedWrapper from "./RecommendedWrapper";
import ErrorMessage from "@/components/Error/ErrorMessage";

const Recommended = ({ data , compunds }) => {
  const t = useTranslations("home");

  return (
    <section className="pb0 pt20 bgc-white">
      <div className="container">
        <div className="row align-items-center" data-aos="fade-up">
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title">{!compunds ? t("recommended") : t("prop-recommended")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
            {data ? (
              <div className="feature-listing-slider">
                <RecommendedWrapper data={compunds ? data?.data?.items : data?.data} type={compunds ? `property` :`compound`}/>
              </div>
            ) : (
              <ErrorMessage
                networkError={data === null}
                error={t("recommendedError")}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommended;
