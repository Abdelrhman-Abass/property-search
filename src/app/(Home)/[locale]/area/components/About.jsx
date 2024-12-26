"use client";
import React from "react";
import ContactUs from "@/layout/contact/ContactUs";
import { useLocale, useTranslations } from "next-intl";
import { isHTML } from "@/services";

const About = ({ about, id }) => {
  const locale = useLocale();
  const d = useTranslations("details");

  const content = locale === "ar" ? about?.descriptionAR : about?.descriptionEN;

  return (
    <div className="container">
      <div className="row wow fadeInUp" data-aos-delay="300">
        <div className="col-lg-8 pr40 pr20-lg">
          <div className="row">
            <div className="col-lg-12">
              <div className="agent-single-details mt30 pb30 bdrb1">
                <h6 className="fz17 mb30">
                  {d("about")} {locale == "ar" ? about?.nameAr : about?.nameEn}
                </h6>
                {isHTML(content) ? (
                  <div
                    className="text list-pollets"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                ) : (
                  <div className="text">{content}</div>
                )}
                
              </div>
            </div>
          </div>
          
        </div>
        <div className="col-lg-4">
          <div className="agent-single-form home8-contact-form default-box-shadow1 mb30-md position-relative">
            <ContactUs id={id} type={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
