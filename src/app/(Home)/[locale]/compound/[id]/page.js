"use server";
import React from "react";
import HeroHeaderGallery from "@/layout/HeroHeaderGallery";
import About from "@/layout/About";
import Map from "@/layout/Map";
import FloorPlans from "@/layout/FloorPlans";
import Properties from "./@List/page";
import { notFound } from "next/navigation";
import ContactUs from "@/layout/contact/ContactUs";
import { ApiGetter } from "@/services/ApiGetter";

export async function generateMetadata({ params }) {
  try {
    const { data: compound } = await ApiGetter({
      url: `/api/CompoundDetails/${params.id}`,
    });

    if (!compound) return {};

    const { seoTitle, seoDescription, seoMetaTags, mediaPaths } = compound;

    // Handle keywords (if `seoMetaTags` is a string or array)
    let keywords = "";
    if (seoMetaTags) {
      try {
        keywords = Array.isArray(seoMetaTags)
          ? seoMetaTags.join(", ")
          : JSON.parse(seoMetaTags).join(", ");
      } catch {
        keywords = seoMetaTags;
      }
    }

    // Construct the image URL (ensure it exists)
    const image =
      mediaPaths?.length > 0
        ? `${process.env.NEXT_PUBLIC_COMPOUNDS_IMAGE}/${mediaPaths[0]}`
        : "";
        
        
    let canonicalUrl = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/compound/${params.id}`;        
    return {
      title: seoTitle,
      description: seoDescription,
      keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/compound/${params.id}`,
        images: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`     },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
      },
    };
  } catch (error) {
    console.error("Metadata Error:", error);
    return {};
  }
}

const Compound = async ({ params, searchParams }) => {
  const { id } = params;

  // Fetch data concurrently for better performance
  const [compoundRes, propertyRes] = await Promise.all([
    ApiGetter({ url: `/api/CompoundDetails/${id}` }),
    ApiGetter({ url: `/api/PropertySearch/search?CompoundId=${id}` }),
  ]);

  if (!compoundRes?.data) return notFound();

  const compoundData = compoundRes.data;
  const title = params.locale === "ar"
    ? compoundData?.compoundNameAR
    : compoundData?.compoundNameEn;

  return (
    <section className="pt140 pt30-md pb90 bgc-f7">
      <div className="container">
        <HeroHeaderGallery data={compoundData} />
        <div className="row wrap">
          <div className="col-lg-8">
            <About isCompound={true} data={compoundData} />
            <Map title={title} lat={compoundData?.latitude} lng={compoundData?.longitude} />
            <FloorPlans
              isCompound={true}
              masterPlanImage={`${process.env.NEXT_PUBLIC_COMPOUNDS_MASTER_IMAGE}/${compoundData?.masterPlanImage}`}
            />
          </div>
          <div className="col-lg-4">
            <ContactUs id={id} type={2} />
          </div>
        </div>
        <Properties propertyData={propertyRes} title={title} compundId={id} searchParams={searchParams} />
      </div>
    </section>
  );
};

export default Compound;
