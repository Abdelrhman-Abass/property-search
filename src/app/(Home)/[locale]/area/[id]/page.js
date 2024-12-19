"use server";
import React from "react";
import Image from "next/image";
import Breadcrumb from "../components/Breadcrumb.jsx";
import About from "../components/About.jsx";
import AboutCompounds from "./@Compounds/page.js";
import { notFound } from "next/navigation";
import { ApiGetter } from "@/services/ApiGetter.js";
import WhatsAppButton from "@/components/common/WhatsAppButton.js";

async function getAreaDetails(id) {
  return await ApiGetter({ url: `/api/Area/${id}` });
}

export async function generateMetadata({ params }) {
  const areaDetails = await getAreaDetails(params.id);
  const title = areaDetails?.data?.seoTitle;
  const description = areaDetails?.data?.seoDescription;
  const image = areaDetails?.data?.image
    ? process.env.NEXT_PUBLIC_AREAS_IMAGE + `/${areaDetails?.data?.image}`
    : "";

  let seoResult = {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
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
  return (
    <section className="agent-single pt60 pb-0 ">
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
              <Breadcrumb data={areaDetails?.data} colorWhite={false}/>
              <div className="img-box-12 position-relative d-none d-xl-block">
                <Image
                  width={120}
                  height={120}
                  className="img-1 spin-right"
                  src="/images/about/element-12.png"
                  alt="agents"
                />
                <Image
                  width={41}
                  height={11}
                  className="img-2 bounce-x"
                  src="/images/about/element-13.png"
                  alt="agents"
                />
                <Image
                  width={57}
                  height={49}
                  className="img-3 bounce-y"
                  src="/images/about/element-11.png"
                  alt="agents"
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
      } />
    </section>
  );
};

export default Area;
