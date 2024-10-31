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
                    className="text"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                ) : (
                  <div className="text">{content}</div>
                )}
                {/* <div className="agent-single-accordion">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body p-0">
                          <p className="text">
                            أبرز مشروعات شركة سيراك للتطوير العقاري طرحت شركة
                            SERAC Developments العديد من المشروعات التي لاقت
                            اقبالًا كبيرًا من قبل المستثمرين ومن بينها
                          </p>
                        </div>
                      </div>
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button p-0 collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          Show more
                        </button>
                      </h2>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="sidebar-widget mb30 mt30 pb20">
            <h6 className="widget-title">مناطق مجاورة</h6>
            <div className="tag-list mt20">
              {tags.map((tag, index) => (
                <Link
                  href={`/${locale}/area/${tag}`}
                  key={index}
                  className="tags"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div> */}
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
