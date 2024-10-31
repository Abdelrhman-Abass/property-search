import { blogFormatDate } from "@/services";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

export default function BlogHead({ blog }) {
  const locale = useLocale();
  const blogDate = blogFormatDate(blog?.createdDateUtc, locale);
  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_IMAGE}/${blog?.image}`;

  return (
    <>
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12">
            <h2 className="blog-title">
              {locale == "ar" ? blog?.titleAR : blog?.titleEN}
            </h2>
            <p className="m--1 ff-heading">
              {locale == "ar"
                ? blog?.shortDescriptionAR
                : blog?.shortDescriptionEN}
            </p>
            <div className="blog-single-meta">
              <div className="post-author d-sm-flex align-items-center">
                <a className="ml15">{blogDate?.fullDate}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-auto maxw1600 mt20"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="large-thumb">
              <Image
                width={796}
                height={600}
                priority
                className="cover w-100"
                src={imagePath}
                alt={blog?.titleAR}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
