import { blogFormatDate } from "@/services";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog = ({ blog }) => {
  const locale = useLocale();
  const {
    id,
    titleAR,
    titleEN,
    shortDescriptionAR,
    shortDescriptionEN,
    image,
    createdDateUtc,
    seoTitle,
    seoDescription,
    seoMetaTags = [],
  } = blog;

  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_IMAGE}/${image}`;
  const blogDate = blogFormatDate(createdDateUtc, locale);

  return (
    <div className="blog-style1 large-size bgc-white">
      <div className="blog-img">
        <Image
          width={600}
          height={360}
          priority
          className="w-100 cover"
          src={imagePath}
          alt="blog"
        />
      </div>
      <div className="blog-content pl30 pb20">
        <div className="date">
          <span className="month">{blogDate.month}</span>
          <span className="day">{blogDate.day}</span>
        </div>
        {/* {tags?.map((tag) => (
          <a
            style={{ padding: "0 4px", textTransform: "capitalize" }}
            className="tag"
            key={tag}
            href="#"
          >
            {tag}
          </a>
        ))} */}
        <h4 className="title mt-1 mb20">
          <Link href={`/${locale}/blog/${id}`}>
            {locale == "ar" ? titleAR : titleEN}
          </Link>
        </h4>
        <p className="text">
          {locale == "ar" ? shortDescriptionAR : shortDescriptionEN}
        </p>
      </div>
    </div>
  );
};

export default Blog;
