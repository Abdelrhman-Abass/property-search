"use server";
import React from "react";
import HeroHeaderGallery from "@/layout/HeroHeaderGallery";
import About from "@/layout/About";
import Map from "@/layout/Map";
import FloorPlans from "@/layout/FloorPlans";
// import Phases from "./components/Phases";
import Properties from "./@List/page";
import { notFound } from "next/navigation";
import ContactUs from "@/layout/contact/ContactUs";
import { ApiGetter } from "@/services/ApiGetter";


export async function generateMetadata({ params }) {
  const compundData = await ApiGetter({
    url: `/api/CompoundDetails/${params.id}`,
  });
  const title = compundData?.data?.seoTitle;
  const description = compundData?.data?.seoDescription;
  let keywords = "";
  if (compundData?.data?.seoMetaTags) {
    // Check if seoMetaTags is a string
    if (typeof compundData?.data?.seoMetaTags === "string") {
      try {
        // Try to parse the string into an array and join it if it's a valid JSON string
        keywords = JSON.parse(compundData?.data?.seoMetaTags).join(", ");
      } catch (error) {
        // If parsing fails, assume it's already a string
        keywords = compundData?.data?.seoMetaTags;
      }
    } else if (Array.isArray(compundData?.data?.seoMetaTags)) {
      // If it's an array, join the items
      keywords = compundData?.data?.seoMetaTags.join(", ");
    }
  }
  const image =
    compundData?.data?.mediaPaths?.length > 0
      ? process.env.NEXT_PUBLIC_COMPOUNDS_IMAGE +
        `/${compundData?.data?.mediaPaths[0]}`
      : "";
  let seoResult = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      keywords,
    },
    twitter: {
      title,
      description,
      keywords,
    },
  };
  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  }
  if (compundData?.data?.seoMetaTags) {
    let tags = compundData?.data.seoMetaTags;
    tags = Array.isArray(tags) && tags.length > 0 ? tags : [tags];
    seoResult.other = tags.map((tag) => ({
      title: tag,
      content: tag,
    }));
  }
  return seoResult;
}

const Compound = async ({ params, searchParams }) => {
  const data = await ApiGetter({ url: `/api/CompoundDetails/${params.id}` });
  const {id} = await params
  const property = await ApiGetter({
    url: `/api/PropertySearch/search?CompoundId=${id}`,
  });
  if (!data || !data?.data) {
    return notFound();
  }
  const compoundData = data?.data || {};
  const title =
    params.locale == "ar"
      ? compoundData?.compoundNameAR
      : compoundData?.compoundNameEn;
  return (
    <>
      <section className="pt140 pt30-md pb90 bgc-f7">
        <div className="container">
          <HeroHeaderGallery data={compoundData} />
          <div className="row wrap">
            <div className="col-lg-8">
              <About isCompound={true} data={compoundData} />
              <Map
                title={title}
                lat={compoundData?.latitude}
                lng={compoundData?.longitude}
              />
              <FloorPlans
                isCompound={true}
                masterPlanImage={`${process.env.NEXT_PUBLIC_COMPOUNDS_MASTER_IMAGE}/${compoundData?.masterPlanImage}`}
              />
            </div>
            <div className="col-lg-4">
              <ContactUs id={params.id} type={2} />
            </div>
          </div>
          <Properties
            propertyData={property}
            title={title}
            compundId = {params.id}
            searchParams={searchParams}
          />
        </div>
      </section>
    </>
  );
};

export default Compound;
