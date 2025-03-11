"use server";

import Banner from "./components/Banner";
import HomeTopAreas from "./@TopAreas/page";
import HomeTopCompounds from "./@TopCompounds/page";
import HomeRecommended from "./@Recommended/page";
import { ApiGetter } from "@/services/ApiGetter";
import HomeHeroPage from "./@homeHero/page";
import WhatsAppButton from "@/components/common/WhatsAppButton";


// export async function generateMetadata({ params: { locale } }) {
//   const description =
//     locale === "ar"
//       ? "أفضل موقع وسيط عقاري في مصر. تصفح جميع المناطق والمجمعات السكنية والعقارات داخل مصر حسب السعر والموقع والمرافق للعثور على المكان المثالي."
//       : "Browse and monitor real estate prices in Egypt. Search areas, prices, and facilities to find the perfect place for you.";

//   const title =
//     locale === "ar"
//       ? "بروبرتي سيرش (Property Search) - بحث ذكي وسريع عن العقارات في مصر"
//       : "Property Search Egypt - بروبرتي سيرش مصر | Search Smarter, Find Faster";

//   const image = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/logo.webp`;

//   return {
//     title: title,
//     description: description,
//     openGraph: {
//       title: title,
//       description: description,
//       images: [
//         {
//           url: image,
//           width: 1200,
//           height: 630,
//           alt: "Property Search Logo",
//         },
//       ],
//       url: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/logo.webp`,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: title,
//       description: description,
//       images: [image],
//     },
//   };
// }
export async function generateMetadata({ params: { locale } }) {
  const description =
    locale === "ar"
      ? "أفضل موقع وسيط عقاري في مصر. تصفح جميع المناطق والمجمعات السكنية والعقارات داخل مصر حسب السعر والموقع والمرافق للعثور على المكان المثالي."
      : "Browse and monitor real estate prices in Egypt. Search areas, prices, and facilities to find the perfect place for you.";

  const title =
    locale === "ar"
      ? "بروبرتي سيرش مصر (Property Search Egypt) - بحث ذكي وسريع عن العقارات في مصر"
      : "Property Search Egypt - بروبرتي سيرش مصر | Search Smarter, Find Faster";

  const image = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/logo.webp`;
  // const image = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/slider.jpg`;


  let canonicalUrl = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`;


  let seoResult = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`,
      images: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
    },
  };

  // if (image) {
  //   seoResult.twitter = { ...seoResult.twitter, image };
  //   seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };

  //   // Add Twitter image
  //   // seoResult.twitter = { ...seoResult.twitter, image };
  // }

  return seoResult;
}
const Home = async () => {
  const banners = await ApiGetter({ url: `/api/PageSections` });

  return (
    <>

      <HomeHeroPage />
      <Banner data={banners?.data?.find((item) => item?.order === 1)} notAos />
      <HomeTopAreas />
      <Banner data={banners?.data?.find((item) => item?.order === 2)} />
      <HomeTopCompounds />
      <Banner data={banners?.data?.find((item) => item?.order === 3)} />
      <HomeRecommended compund={false}/>
      <HomeRecommended compund={true}/>
      <WhatsAppButton data={"property search"} sticky={false}/>

    </>
  );
};

export default Home;
