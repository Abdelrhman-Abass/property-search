"use client"
import { blogFormatDate } from "@/services";
import { MapContext } from "@react-google-maps/api";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function BlogHead({ blog }) {
  const locale = useLocale();
  const blogDate = blogFormatDate(blog?.createdDateUtc, locale);
  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_IMAGE}/${blog?.image}`;
  const [openIndex, setOpenIndex] = useState(null); // Tracks which collapsible is open

  const toggleCollapse = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if already open
    } else {
      setOpenIndex(index); // Open the clicked collapsible
    }
  };

  const fakeData = [
    { id: 1, title: "Unit 1", content: { line1: "Detail 1A", line2: "Detail 1B" } },
    { id: 2, title: "Unit 2", content: { line1: "Detail 2A", line2: "Detail 2B" } },
    { id: 3, title: "Unit 3", content: { line1: "Detail 3A", line2: "Detail 3B" } },
  ];


  return (
    <>
      <div className="container custom-mr-0 ">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12">
            <h2 className="blog-title">
              {locale == "ar" ? blog?.titleAR : blog?.titleEN}
            </h2>
            {/* <p className="m--1 ff-heading">
              {locale == "ar"
                ? blog?.shortDescriptionAR
                : blog?.shortDescriptionEN}
            </p> */}
            <div className="blog-single-meta">
              <div className="post-author d-sm-flex align-items-center">
                <Link href="#" className="ml15">{blogDate?.fullDate}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container mx-auto maxw1600 mt20"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="row">
          {blog.propertyTypes?.length != 0 ? (
            <div className="col-lg-9">
              <div className="large-thumb">
                <Image
                  width={400}
                  height={400}
                  priority
                  loading="eager"
                  style={{ borderRadius: 10 }}
                  className="w-100 con"
                  src={imagePath}
                  alt={blog?.titleAR}
                />
              </div>
            </div>

          ) :
            (
              <div className="col-lg-12">
                <div className="large-thumb">
                  <Image
                    width={400}
                    height={400}
                    priority
                    loading="eager"
                    style={{ borderRadius: 10 }}
                    className="w-100 con"
                    src={imagePath}
                    alt={blog?.titleAR}
                  />
                </div>
              </div>
            )}
          {blog.propertyTypes?.length != 0 && (
            <div className="col-lg-3 mt20-sm">
              <div className="price-component">
                <div className="package">
                  {blog.priceStartsFrom !== null && (
                    <>
                      <span className="price-subtext"> {locale == "ar" ? "أسعار تبدأ من  " : "Prices Starts from"}</span>
                      <h1 className="price">
                         <span className="price-value ">{Intl.NumberFormat('fr-FR').format(blog.priceStartsFrom)}</span> جنيه
                      </h1>
                    </>
                  )}
                  {blog.downPaymentPercentage !== null && blog.installmentYears !== null ? (
                    <div className="info-boxes">
                      <div className="info-box">
                        <p className="info-label"> {locale == "ar" ? "دفعة مبدئية " : " Deposit"}</p>
                        <p>{blog.downPaymentPercentage}%</p>
                      </div>
                      <div className="info-box">
                        <p className="info-label"> {locale == "ar" ? " تقسيط" : "Installment"}</p>
                        <p>{blog.installmentYears} {locale == "ar" ? " سنوات" : " Years"}</p>
                      </div>
                    </div>

                  ) :
                    null}
                </div>

                <h2 className="section-title">  {locale == "ar" ? "أنواع الوحدات" : "Units Kind"}</h2>

                <div>
                  {blog.propertyTypes.map((item, index) => (
                    <div key={item.id} className="collapsible-button">
                      {/* Toggle Button */}
                      <div
                        style={{
                          textAlign: locale == "ar" ? "right" : "left",
                        }}
                        className="collapse-toggle"
                        onClick={() => toggleCollapse(index)}
                      >
                        {openIndex === index ? <i className="fa fa-sm fa-caret-down"></i> :

                          locale === "ar" ? <i class="fa fa-sm fa-caret-left" aria-hidden="true"></i> : <i class="fa fa-sm fa-caret-right" aria-hidden="true"></i>

                        } {locale == "ar" ? item.typeNameAR : item.typeNameEN}
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className="collapse-content"
                        style={{
                          display: openIndex === index ? "block" : "none", // Toggles visibility
                          maxHeight: openIndex === index ? "200px" : "0", // Animates height
                          overflow: "hidden",
                          transition: "max-height 0.6s ease-in-out, padding 0.3s ease-in-out",
                          padding: openIndex === index ? "10px" : "0",
                          textAlign: locale == "ar" ? "right" : "left",
                        }}
                      >
                        <p style={{ textAlign: locale == "ar" ? "right" : "left" }}><i class="fa fa-sm fa-minus" aria-hidden="true"></i>{locale == "ar" ? "  السعر : " : "  Price : "} {Intl.NumberFormat('fr-FR').format(item.price)}</p>
                        <p style={{ textAlign: locale == "ar" ? "right" : "left" }}><i class="fa fa-sm fa-minus" aria-hidden="true"></i>{locale == "ar" ? "  المساحه : " : "  Space : "} {Intl.NumberFormat('fr-FR').format(item.area)} {locale == "ar" ? " م" : "m"}</p>
                        {/* <p><i class="fa fa-sm fa-minus" aria-hidden="true"></i> {item.content.line2}</p> */}
                      </div>
                    </div>
                  ))}
                </div>


              </div>
            </div>

          )}
        </div>

      </div>
    </>
  );
}


function UnitCollapsible({ title, content }) {
  const [isOpen, setIsOpen] = useState(false); // Ensure React is imported

  const toggleCollapse = () => {
    // console.log("Previous isOpen state:", isOpen); // Debug log
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button className="collapse-toggle" onClick={toggleCollapse} aria-label="Toggle Title">
        {title} ▾
      </button>
      {isOpen && (
        <div className="collapse-content">
          <p>{content.line1}</p>
          <p>{content.line2}</p>
        </div>
      )}
    </div>
  );
}