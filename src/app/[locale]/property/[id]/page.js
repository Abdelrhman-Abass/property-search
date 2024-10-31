"use server";
import React from "react";
import HeroHeaderGallery from "@/layout/HeroHeaderGallery";
import Overview from "./components/Overview";
import About from "@/layout/About";
import Map from "@/layout/Map";
import FloorPlans from "@/layout/FloorPlans";
import { ApiGetter } from "@/services/ApiGetter";
import { notFound } from "next/navigation";
import Recommended from "./components/RecommendedList";
import ContactUs from "@/layout/contact/ContactUs";

async function getPropertyDetails(id) {
  return await ApiGetter({ url: `/api/Property/${id}` });
}

export async function generateMetadata({ params }) {
  const property = await getPropertyDetails(params.id);
  const title = property?.data?.seoTitle;
  const description = property?.data?.seoDescription;
  const image =
    property?.data?.mediaPaths?.length > 0
      ? process.env.NEXT_PUBLIC_PROPERTIES_IMAGE +
        `/${property?.data?.mediaPaths[0]}`
      : "";

  let seoResult = {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  }
  if (property?.data?.seoMetaTags) {
    let tags = property?.data.seoMetaTags;
    tags = Array.isArray(tags) && tags.length > 0 ? tags : [tags];
    seoResult.other = tags.map((tag) => ({
      title: tag,
      content: tag,
    }));
  }
  return seoResult;
}

const Property = async ({ params }) => {
  const data = await getPropertyDetails(params.id);

  if (!data || !data?.data) {
    return notFound();
  }
  const propertyData = data.data;

  return (
    <>
      <section className="pt140 pt60-md pb90 bgc-f7">
        <div className="container">
          <HeroHeaderGallery data={propertyData} isCompound={false} />
          <div className="row wrap">
            <div className="col-lg-8">
              <Overview data={propertyData} />
              <About isCompound={false} data={propertyData} />
              <Map
                title={propertyData.titleAR}
                lat={propertyData?.longitude}
                lng={propertyData?.latitude}
              />
              <FloorPlans
                masterPlanImage={`${process.env.NEXT_PUBLIC_PROPERTIES_MASTER_IMAGE}/${propertyData?.masterPlanImage}`}
                floorPlanImage={`${process.env.NEXT_PUBLIC_PROPERTIES_MASTER_IMAGE}/${propertyData?.floorPlanImage}`}
                isCompound={false}
              />
            </div>
            <div className="col-lg-4">
              <ContactUs id={params.id} type={1} />
            </div>
          </div>
          <Recommended
            areaId={propertyData.areaId}
            price={propertyData.price}
          />
        </div>
      </section>
    </>
  );
};

export default Property;
