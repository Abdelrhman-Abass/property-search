"use client";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ErrorMessage from "@/components/Error/ErrorMessage";
import { isHTML } from "@/services";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

const Content = ({ data }) => {
  // if (!data) return null;

  const locale = useLocale();
  const t = useTranslations("aboutUs");
  const content =
    locale == "ar" ? data?.data?.contentAR : data?.data?.contentEN;
  return (
    <section className="our-about pb90">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-6">
            <h2>
              {locale == "ar"
                ? data?.data?.shortDescriptionAR
                : data?.data?.shortDescriptionEN}
            </h2>
          </div>
          <div className="col-lg-6 ">
            {data?.success ? (
              isHTML(content) ? (
                <div
                  className="text list-pollets"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              ) : (
                <div className="text">{content}</div>
              )
            ) : (
              <ErrorMessage
                networkError={data === null}
                error={t("contentError")}
              />
            )}
          </div>
        </div>
        <WhatsAppButton/>

      </div>
    </section>
  );
};

export default Content;
