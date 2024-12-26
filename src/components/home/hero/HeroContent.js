"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HeroContent = () => {
  const local = useLocale();
  const router = useRouter();
  const t = useTranslations("home");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="advance-search-tab mt50 mt30-md mx-auto animate-up-3">
      <div className="tab-content">
        <div className="active tab-pane">
          <div className="advance-content-style1">
            <div className="row">
              <div className="col-md-8 col-lg-9">
                <div className="advance-search-field position-relative text-start">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      router.push(`/${local}/search?SearchTerm=${searchTerm}`);
                    }}
                    className="form-search position-relative"
                  >
                    <div className="box-search">
                      <span className="icon flaticon-home-1" />
                      <input
                        className="form-control bgc-f7 bdrs12"
                        type="text"
                        name="search"
                        placeholder={t("placeholder")}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0 gap-3">
                  <button
                  aria-label="Advanced"
                    className="advance-search-btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModal"
                  >
                    <span className="flaticon-settings d-flex" />{" "}
                    {t("advanced")}
                  </button>
                  <button
                  aria-label="Search"
                    className="advance-search-icon ud-btn btn-thm"
                    onClick={() =>
                      router.push(`/${local}/search?SearchTerm=${searchTerm}`)
                    }
                    type="button"
                  >
                    <span className="flaticon-search d-flex items-center justify-content-center" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
