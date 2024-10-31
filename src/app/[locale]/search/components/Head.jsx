"use client";
import React, { useEffect, useState } from "react";
import AdvanceFilterModal from "@/layout/advance-search";
import FilterBar from "./FilterBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const Head = ({ headSearchTerm }) => {
  const searchParams = useSearchParams();
  const [orderBy, setOrderBy] = useState("Latest");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("OrderBy", orderBy);
    router.push(
      `${window.location.pathname}?${searchParams.toString()}`,
      undefined,
      { shallow: true }
    );
  }, [orderBy]);

  const onSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("SearchTerm", searchTerm);
    router.push(
      `${window.location.pathname}?${searchParams.toString()}`,
      undefined,
      { shallow: true }
    );
    setSearchTerm("");
  };

  return (
    <>
      <section className="pt0 pb45">
        <div className="container">
          <div className="advance-feature-modal">
            <div
              className="modal fade"
              id="searchModal"
              tabIndex={-1}
              aria-labelledby="searchModalLabel"
              aria-hidden="true"
            >
              <AdvanceFilterModal />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <FilterBar
                setOrderBy={setOrderBy}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                onSearch={onSearch}
              />
            </div>
          </div>
          {searchParams.get("SearchTerm") && (
            <div>
              <span>{locale == "ar" ? "بحث عن" : "Search about"}</span>
              <span> &apos;{searchParams.get("SearchTerm")}&apos;</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Head;
