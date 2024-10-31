"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const BlogContent = ({ contents = [] }) => {
  const locale = useLocale();
  const orderContents = contents.sort((a, b) => a.order - b.order);
  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE}`;

  return (
    <div className="container">
      <div className="roww" data-aos="fade-up" data-aos-delay="500">
        <div className="col-xl-8 offset-xl-2">
          <div className="ui-content mt40 mb60">
            {/* <h4 className="mb10">1. Reduce the clutter</h4> */}
            {orderContents?.map(
              ({ order, type, textContent, mediaContent }) => {
                return type == 0 ? (
                  <div
                    key={order}
                    className="ff-heading"
                    dangerouslySetInnerHTML={{
                      __html:
                        locale === "ar"
                          ? textContent?.contentAR
                          : textContent?.contentEN,
                    }}
                  ></div>
                ) : mediaContent.type == 0 ? (
                  <>
                    <Image
                      width={800}
                      height={470}
                      src={`${imagePath}/${mediaContent.path}`}
                      alt="blog"
                      className="bdrs12 post-img-2 w-100 h-100 cover mt60"
                    />
                  </>
                ) : (
                  <iframe
                    width={800}
                    height={470}
                    src={`https://www.youtube.com/embed/${
                      mediaContent?.path.split("v=")[1]
                    }`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="mt60 bdrs12"
                  ></iframe>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
