"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import AsksSection from "@/components/common/AskAccordion";

const BlogContent = ({ contents = [] , questions= []}) => {
  const locale = useLocale();
  const orderContents = contents.sort((a, b) => a.order - b.order);
  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE}`;

  return (
    <div className="container mb-100-lg mb-40-md  contentArt custom-mr-0">
      <div className="roww" style={{
        textAlign: locale == "ar" ? "right" : "left",
      }} data-aos="fade-up" data-aos-delay="500">
        <div className="col-xl-11">
          <div className="ui-content mt40 mb60">
            {/* <h4 className="mb10">1. Reduce the clutter</h4> */}
            {orderContents?.map(
              ({ order, type, textContent, mediaContent }) => {
                return type == 0 ? (
                  <div
                    key={order}
                    className=" blog-description-background"
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
                      width={400}
                      height={400}
                      src={`${imagePath}/${mediaContent.path}`}
                      alt="blog Content"
                      className="bdrs12 post-img-2 w-100 con  mt60 "
                      loading="lazy"

                    />
                  </>
                ) : (
                  <iframe
                    width={800}
                    height={470}
                    src={`https://www.youtube.com/embed/${mediaContent?.path.split("v=")[1]
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
      <AsksSection questions={questions} />

    </div>
  );
};

export default BlogContent;
