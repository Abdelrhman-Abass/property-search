"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { isHTML } from "@/services";

const About = ({ data, isCompound }) => {
  const t = useTranslations("global");
  const d = useTranslations("details");
  const locale = useLocale();
  const [showAll, setShowAll] = useState(false);

  const content = isCompound
    ? locale == "ar"
      ? data?.compoundDescriptionAR
      : data?.compoundDescriptionEN
    : locale == "ar"
    ? data?.descriptionAR
    : data?.descriptionEN;
  const title = isCompound
    ? locale == "ar"
      ? data?.compoundNameAR
      : data?.compoundNameEN
    : locale == "ar"
    ? data?.titleAR
    : data?.titleEN;

  const amenitiesToShow = showAll
    ? data?.amenities
    : data?.amenities?.slice(0, 12);

  return (
    <>
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <h4 className="title fz17 mb15">
          {d("about")} {title}
        </h4>
        {isHTML(content) ? (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        ) : (
          <div className="text">{content}</div>
        )}
      </div>
      <section className="pt30 pb40 facilities">
        <h3>{t("facilities")}</h3>
        <div className="mt30 listing-style14">
          <div className={`list-meta ${showAll ? "expanded" : ""}`}>
            {amenitiesToShow?.map(
              ({ id, nameAR, nameEN, iconName, fontName }) => {
                return (
                  <p
                    key={id}
                    className="d-flex align-items-center  gap-2"
                    href="#"
                  >
                    <span className={iconName} />
                    <p>{locale == "ar" ? nameAR : nameEN}</p>
                  </p>
                );
              }
            )}
          </div>
          {data?.amenities?.length > 12 && (
            <button
              className="expanded"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? t("showLess") : t("showMore")}
            </button>
          )}
        </div>
      </section>
      {isCompound && (
        <section className="pt30 pb40">
          <h3>{t("plans")}</h3>
          <div className="cards mt30">
            {data?.paymentPlans.map(
              ({
                nameAr,
                nameEn,
                downPaymentPercentage,
                receiptPaymentPercentage,
                yearsToReceive,
                id,
              }) => {
                return (
                  <div key={id} className="card bronze">
                    <h4>{locale == "ar" ? nameAr : nameEn}</h4>
                    <div>
                      <h5>{receiptPaymentPercentage} %</h5>
                      <span>
                        {locale == "ar"
                          ? "نسبة دفع الاستلام"
                          : "Receipt Payment"}
                      </span>
                    </div>
                    <div>
                      <h5>{downPaymentPercentage} %</h5>
                      <span>
                        {locale == "ar"
                          ? "نسبة الدفعة المقدمة"
                          : "Down Payment"}
                      </span>
                    </div>
                    <p>
                      {yearsToReceive} {locale == "ar" ? "سنوات" : "Years"}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default About;
