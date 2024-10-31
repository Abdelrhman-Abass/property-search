"use server";
import CallToActions from "@/layout/contact/CallToActions";
import AboutBreadcumb from "./components/AboutBreadcumb";
import Content from "./components/Content";
import { ApiGetter } from "@/services/ApiGetter";

export const fetchData = async () => {
  const about = await ApiGetter({ url: "/api/Page/1" });
  return about;
};

export async function generateMetadata({ params }) {
  const aboutData = await fetchData();
  let title =
    params.locale == "ar" ? aboutData?.data?.titleAR : aboutData?.data?.titleEN;
  let description =
    params.locale == "ar"
      ? aboutData?.data?.shortDescriptionAR
      : aboutData?.data?.shortDescriptionEN;
  const image = aboutData?.data?.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `${process.env.NEXT_PUBLIC_PAGES_IMAGE}/${image}` }],
    },
    twitter: {
      card: "summary_large_image",
      image: `${process.env.NEXT_PUBLIC_PAGES_IMAGE}/${image}`,
      title: title,
      description,
    },
  };
}

const About = async () => {
  const aboutData = await fetchData();
  return (
    <>
      <AboutBreadcumb data={aboutData?.data} />
      <Content data={aboutData} />
      <CallToActions phone={120} />
    </>
  );
};

export default About;
