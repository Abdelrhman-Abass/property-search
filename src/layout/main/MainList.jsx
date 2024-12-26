"use client";
import React, { useEffect, useState } from "react";
import MainCard from "./MainCard";
import CardLoading from "../CardLoading";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ErrorMessage from "@/components/Error/ErrorMessage";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function MainList({
  data,
  type,
  title,
  colstyle = false,
  isCompoundDetails = false,
  dev=false,
  searchParams = {},
  networkError = false,
}) {
  const locale = useLocale();
  const isLoading = false;
  const g = useTranslations("global");
  const router = useRouter();
  const pathname = usePathname();
  // if user in Compound Details
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

  const [orderBy, setOrderBy] = useState(filterData[0].value);

  useEffect(() => {
    if (isCompoundDetails) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("OrderBy", orderBy);
      router.push(`${window.location.pathname}?${currentParams.toString()}`, {
        shallow: true,
        scroll: false,
      });
    }
  }, [orderBy]);

  const params = new URLSearchParams(searchParams);
  const onResetFetch = () => {
    let keys = Object.keys(searchParams);
    keys = keys.filter((key) => key !== "page");
    keys.forEach((key) => params.delete(key));
    router.replace(pathname + "?" + params.toString());
  };

  return (
    <>
      <section className={`breadcumb-section pb5 pt30 ${dev && "about-ar"}`}>
        <div className="container">
          <div className="row mt25 mb20 justify-content-between gap-3">
            <div className="col-lg-08 w-fit">
              <div className="breadcumb-style1">
                {title && data?.length > 0 && (
                  <h2 className="title ">
                    {type == "compound" ? g("discover") : g("discoverPro")}{" "}
                    {title}
                  </h2>
                )}
              </div>
            </div>
            {isCompoundDetails && (
              <div className="col-lg-03 w-fit d-flex align-items-center justify-content-center">
                <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                  <div className="pcs_dropdown pr10 d-flex align-items-center">
                    <span style={{ minWidth: "80px" }}>
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
            )}
          </div>
          {/* <WhatsAppButton data={title}/> */}
        </div>
      </section>
      <section className="pt0 pb40">
        <div className="container">
          <div className="row" style={{ rowGap: 32 }}>
            {!isLoading ? (
              data?.length ? (
                data?.map((compound) => (
                  <div
                    className={` ${
                      colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
                    }`}
                    key={compound.id}
                  >
                    <MainCard type={type} colstyle={colstyle} data={compound} />
                  </div>
                ))
              ) : type === "property" &&
                Object.keys(searchParams)?.filter((k) => k !== "page")
                  .length ? (
                <div className="d-flex align-items-center gap-2">
                  <ErrorMessage
                    error={g("NotFoundItemsError")}
                    networkError={networkError}
                  />
                  {!networkError ? (
                    <button
                    aria-label=" Reset "
                      style={{ width: "fit-content", marginTop: "-7px" }}
                      className="advance-search-icon ud-btn btn-thm p-1 px-3"
                      type="button"
                      onClick={onResetFetch}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#fff"
                        className="bi bi-arrow-clockwise"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                        />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                      </svg>
                    </button>
                  ) : null}
                </div>
              ) : null
            ) : (
              [{}, {}, {}].map((_, idx) => {
                return (
                  <div
                    key={idx}
                    className={` ${
                      colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
                    }`}
                  >
                    <CardLoading />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
