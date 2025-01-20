import { formatPrice } from "@/services";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ colorWhite = true, data = {} }) => {
  const locale = useLocale();
  const d = useTranslations("details");
  const logo = `${process.env.NEXT_PUBLIC_DEVELOPER_IMAGE}/${data?.logo}`;
  const global = useTranslations("global");

  return (
    <>
      <div
        // style={{ minHeight: 172 }}
        className="agent-single d-sm-flex align-items-center gap-4 min172-height"
      >
        <div className="single-img mb30-sm">
          <Image
            width={172}
            height={172}
            src={logo}
            quality={100}
            // style={{ borderRadius: "50%", objectFit: "cover" }}
            className="breadcrumb-border"
            alt={`${locale == "ar" ? data?.developerNameAR : data?.developerNameEN}-logo`}

          />
        </div>
        <div className="single-contant ml0-xs">
          <div className="d-flex align-items-center gap-3 mb-2">
            <h2 className={`${colorWhite && "text-white"} title mb-0 `}>
              {locale == "ar" ? data?.developerNameAR : data?.developerNameEN}
            </h2>
            <span className="badge bg-secondary d-flex align-items-center">
              {d("developer")}
            </span>
          </div>
          <div className="agent-meta mb15 gap-3 d-md-flex align-items-center">
            <Link
              className={`${colorWhite && "text-white"} text fz15 pe-2 bdrr1 `}
              href="#"
            >
              {data?.propertiesCount} {d("availablePro")}
            </Link>
            <Link
              className={`${colorWhite && "text-white"} text fz15 pe-2 bdrr1 `}
              href="#"
            >
              {data?.compoundsCount} {d("compounds")}
            </Link>
            <Link
              className={`${
                colorWhite && "text-white"
              } text fz15 pe-2 ps-2 bdrr1 `}
              href="#"
            >
              <span>{d("priceStart")}</span>{" "}
              <span>
                {formatPrice(data?.minPrice)} {global("egp")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
