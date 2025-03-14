"use server";
import React from "react";
import Image from "next/image";
import Breadcrumb from "../components/Breadcrumb.jsx";
import About from "../components/About.jsx";
import AboutCompounds from "./@Compounds/page.js";
import { notFound } from "next/navigation";
import { ApiGetter } from "@/services/ApiGetter.js";
import WhatsAppButton from "@/components/common/WhatsAppButton.js";
import Head from 'next/head';

import {
  FacebookShareButton, 
} from "react-share";
import ShareButtons from "../../../../../utilis/socialTags.jsx";

async function getAreaDetails(id) {
  return await ApiGetter({ url: `/api/Area/${id}` });
}

export async function generateMetadata({ params }) {
  const areaDetails = await getAreaDetails(params.id);
  // const title = "أكتشف أفضل مشاريع " + areaDetails?.data?.seoTitle;
  // const description = "أكتشف أفضل مشاريع " + areaDetails?.data?.seoDescription;
  const title = "أكتشف أفضل مشاريع " + (areaDetails?.data?.seoTitle || "أكتشف أفضل مشاريع ");
  const description = "أكتشف أفضل مشاريع " + (areaDetails?.data?.seoDescription || "أكتشف أفضل مشاريع ");
   const image = process.env.NEXT_PUBLIC_AREAS_IMAGE + `/${areaDetails?.data?.image}`;

  let keywords = "";
  if (areaDetails?.data?.seoMetaTags) {
    // Check if seoMetaTags is a string
    if (typeof areaDetails?.data?.seoMetaTags === "string") {
      try {
        // Try to parse the string into an array and join it if it's a valid JSON string
        keywords = JSON.parse(areaDetails?.data?.seoMetaTags).join(", ");
      } catch (error) {
        // If parsing fails, assume it's already a string
        keywords = areaDetails?.data?.seoMetaTags;
      }
    } else if (Array.isArray(areaDetails?.data?.seoMetaTags)) {
      // If it's an array, join the items
      keywords = areaDetails?.data?.seoMetaTags.join(", ");
    }
  }
  let canonicalUrl = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/area/${params.id}`;

  let seoResult = {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      keywords,
      url: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/area/${params.id}`,
      images: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
        
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      keywords,
      image: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
    },
  };

  if (image) {
    // Add OpenGraph image details
    // seoResult.openGraph.images.push({
    //   url: image,
    //   secureUrl: image, // Equivalent to og:image:secure_url
    //   width: 1200, // og:image:width
    //   height: 630, // og:image:height
    //   alt: title, // og:image:alt
    // });
    seoResult.twitter = { ...seoResult.twitter, image };
    // seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };

    // Add Twitter image
    // seoResult.twitter = { ...seoResult.twitter, image };
  }

  if (areaDetails?.data?.seoMetaTags) {
    let tags = areaDetails?.data.seoMetaTags;
    tags = Array.isArray(tags) && tags.length > 0 ? tags : [tags];
    seoResult.other = tags.map((tag) => ({
      title: tag,
      content: tag,
    }));
  }

  return seoResult;
}
const Area = async ({ params }) => {
  const areaDetails = await getAreaDetails(params.id);
  if (!areaDetails || !areaDetails?.data) {
    return notFound();
  }
  // console.log(params.id)
  return (
    <>
      <section className="agent-single pt60 pt0-md pb-0 ">
        <AboutCompounds
          title={
            params.locale == "ar"
              ? areaDetails?.data?.nameAr
              : areaDetails?.data?.nameEn
          }
          id={params.id}
        />
        <div className="cta-agent mx-auto maxw1600  bdrs12 position-relative mx20-lg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7">
                <Breadcrumb data={areaDetails?.data} colorWhite={false} />
                <div className="img-box-12 position-relative d-none d-xl-block">
                  <Image
                    width={120}
                    height={120}
                    className="img-1 spin-right"
                    src="/images/about/element-12.webp"
                    alt="agents About animation 12"

                  />
                  <Image
                    width={41}
                    height={11}
                    className="img-2 bounce-x"
                    src="/images/about/element-13.webp"
                    alt="agents About animation 13"

                  />
                  <Image
                    width={57}
                    height={49}
                    className="img-3 bounce-y"
                    src="/images/about/element-11.webp"
                    alt="agents About animation 11"

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <About id={params.id} about={areaDetails?.data || []} />
        <WhatsAppButton data={params.locale == "ar"
          ? areaDetails?.data?.nameAr
          : areaDetails?.data?.nameEn
        } url={`area/${params.id}`}/>
        
  {/*       
        <ShareButtons url={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`} title={"أكتشف أفضل مشاريع " + areaDetails?.data?.seoTitle}  description={"أكتشف أفضل مشاريع " + areaDetails?.data?.seoDescription}/> */}

        {/* <FacebookShareButton url={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/area/${params.id}`}/> */}
      </section>
    </>
  );
};

export default Area;
