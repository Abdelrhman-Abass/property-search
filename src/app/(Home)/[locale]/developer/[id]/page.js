"use server";
import React from "react";
import Image from "next/image";
import Breadcrumb from "../components/Breadcrumb";
import About from "../components/About";
import DeveloperCompounds from "./@Compounds/page";
import { notFound } from "next/navigation";
import { ApiGetter } from "@/services/ApiGetter";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import AsksSection from "@/components/common/AskAccordion";

async function getDeveloperDetails(id) {
  return await ApiGetter({
    url: `/api/DeveloperDetails/${id}`,
  });
}

export async function generateMetadata({ params }) {
  const developerDetails = await getDeveloperDetails(params.id);
  const title = developerDetails?.data?.seoTitle || "Developer";
  const description =
    developerDetails?.data?.seoTitle ||
    "can develop compounds in areas at Property Search";
  const keywords =
    developerDetails?.data?.seoMetaTags ||
    "can develop compounds in areas at Property Search";
  const image = developerDetails?.data?.logo
    ? process.env.NEXT_PUBLIC_DEVELOPER_IMAGE +
      `/${developerDetails?.data?.logo}`
    : "";

    let canonicalUrl = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/developer/${params.id}`;


  
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
        url: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/developer/${params.id}`,
        images: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`    },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        keywords,
        image: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
      },
    };
  // if (image) {
  //   seoResult.twitter = { ...seoResult.twitter, image };
  //   seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  // }

  return seoResult;
}

const Developer = async ({ params }) => {
  const developerDetails = await getDeveloperDetails(params?.id);
  if (!developerDetails?.data) {
    return notFound();
  }

  return (
    <section className="agent-single pt60 pt0-md pb-0">
      <div className="cta-agent bgc-dark mx-auto maxw1600 pt60 pb60 bdrs12 position-relative mx20-lg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7">
              <Breadcrumb data={developerDetails?.data} />
              <div className="img-box-12 position-relative d-none d-xl-block">
                <Image
                  width={120}
                  height={120}
                  className="img-1 spin-right"
                  src="/images/about/element-12.webp"
                  alt="agents About animation 12"
                  loading="lazy"

                />
                <Image
                  width={41}
                  height={11}
                  className="img-2 bounce-x"
                  src="/images/about/element-13.webp"
                  alt="agents About animation 13"
                  loading="lazy"

                />
                <Image
                  width={57}
                  height={49}
                  className="img-3 bounce-y"
                  src="/images/about/element-11.webp"
                  alt="agents About animation 11"
                  loading="lazy"

                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <About id={params?.id} developer={developerDetails?.data || []} />
      <DeveloperCompounds
        title={
          params.locale == "ar"
            ? developerDetails?.data?.developerNameAR
            : developerDetails?.data?.developerNameEN
        }
        id={params?.id}
      />
      <WhatsAppButton data={params.locale == "ar"
            ? developerDetails?.data?.developerNameAR
            : developerDetails?.data?.developerNameEN} url={`developer/${params.id}`}/>

            <div className="container">
       <AsksSection questions={developerDetails?.data?.questions}/>     

            </div>
    </section>
  );
};

export default Developer;
