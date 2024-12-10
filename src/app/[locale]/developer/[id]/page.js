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
  const image = developerDetails?.data?.logo
    ? process.env.NEXT_PUBLIC_DEVELOPER_IMAGE +
      `/${developerDetails?.data?.logo}`
    : "";
  let seoResult = {
    title,
    description,
    twitter: {
      title,
      description,
    },
    openGraph: {
      title,
      description,
    },
  };
  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  }
  if (developerDetails?.data?.seoMetaTags) {
    let tags = developerDetails?.data.seoMetaTags;
    tags = Array.isArray(tags) && tags.length > 0 ? tags : [tags];
    seoResult.other = tags.map((tag) => ({
      title: tag,
      content: tag,
    }));
  }
  return seoResult;
}

const Developer = async ({ params }) => {
  const developerDetails = await getDeveloperDetails(params?.id);
  if (!developerDetails?.data) {
    return notFound();
  }

  return (
    <section className="agent-single pt60 pt10-sm pb-0">
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
            : developerDetails?.data?.developerNameEN}/>

            <div className="container">
       <AsksSection questions={developerDetails?.data?.questions}/>     

            </div>
    </section>
  );
};

export default Developer;
