import React from "react";
import { useTranslations } from "next-intl";

const Overview = ({ data }) => {
  const t = useTranslations("global");

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "bedroom",
      value: data?.bedrooms,
    },
    {
      icon: "flaticon-shower",
      label: "bath",
      value: data?.bathrooms,
    },
    {
      icon: "flaticon-event",
      label: "delivery",
      value: data?.deliveryYear,
    },
    {
      icon: "flaticon-expand",
      label: "theArea",
      value: data?.builtUpArea,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "finishing",
      value: data?.finishingStatus == 1 ? t("finished") : t("notFinished"),
    },
  ];

  // Filter out items where value is 0 or undefined
  const filteredOverviewData = overviewData.filter(
    (item) => item.value !== 0 && item.value !== undefined
  );

  return (
    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">{t("overview")}</h4>
      <div className="row">
        {filteredOverviewData.map((item, index) => (
          <div
            key={index}
            className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
          >
            <div className="overview-element d-flex align-items-center">
              <span className={`icon ${item.icon}`} />
              <div className="ml15 mr15">
                <h6 className="mb-0">{t(item.label)}</h6>
                <p className="text mb-0 fz15">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;