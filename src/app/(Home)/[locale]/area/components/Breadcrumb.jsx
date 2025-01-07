import { formatPrice } from "@/services";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ colorWhite = true, data = {} }) => {
  const locale = useLocale();
  const g = useTranslations("global");
  const d = useTranslations("details");
  const image = `${process.env.NEXT_PUBLIC_AREAS_IMAGE}/${data?.image}`;

  return (
    <div
      className="agent-single d-sm-flex align-items-center gap-4 min172-height"
    >
      <div className="single-img mb30-sm">
        <Image
          width={130}
          height={130}
          src={image}
          className="breadcrumb-border"
          alt={`agents ${locale == "ar" ? data?.nameAr : data?.nameEn}`}
          loading="lazy"
        />
      </div>
      <div className="single-contant ml0-xs   ">
        <div className="d-flex align-items-center gap-3 mb-2">
          <h2 className={`${colorWhite && "text-white"} title mb-0 `}>
            {locale == "ar" ? data?.nameAr : data?.nameEn}
          </h2>
          <span className="badge bg-secondary d-flex align-items-center">
            {d("area")}
          </span>
        </div>
        <div className="agent-meta mb15 gap-3 d-md-flex align-items-center">
          <Link
            className={`${colorWhite && "text-white"} text fz15 pe-2 bdrr1 `}
            href="#"
          >
            {data?.propertyCount} {d("availablePro")}
          </Link>
          <Link
            className={`${colorWhite && "text-white"} text fz15 pe-2 bdrr1 `}
            href="#"
          >
            {data?.compoundCount} {d("compounds")}
          </Link>
          <Link
            className={`${
              colorWhite && "text-white"
            } text fz15 pe-2 ps-2 bdrr1 `}
            href="#"
          >
            <span>{d("priceStart")}</span>{" "}
            <span>
              {formatPrice(data?.minPrice)} {g("egp")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
