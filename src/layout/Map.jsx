"use client";
import React from "react";
import { useTranslations } from "next-intl";

const Map = ({ title, lat, lng }) => {
  const t = useTranslations("global");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=14`;

  return (
    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
      <h4 className="title fz17 mb-0">{t("viewMap")}</h4>
      <div className="row">
        <div className="col-md-12">
          <iframe
            className="position-relative bdrs12 mt30 h250 w-100"
            loading="lazy"
            src={mapSrc}
            title={title}
            aria-label={title}
            allowFullScreen
            name={title}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
