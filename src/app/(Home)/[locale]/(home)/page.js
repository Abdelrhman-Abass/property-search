"use server";
import Banner from "./components/Banner";
import HomeTopAreas from "./@TopAreas/page";
import HomeTopCompounds from "./@TopCompounds/page";
import HomeRecommended from "./@Recommended/page";
import { ApiGetter } from "@/services/ApiGetter";
import HomeHeroPage from "./@homeHero/page";
import WhatsAppButton from "@/components/common/WhatsAppButton";


export async function generateMetadata({params: { locale } }) {
  const description = locale == "ar" ? "أفضل موقع وسيط عقاري في مصر. تصفح جميع المناطق والمجمعات السكنية والعقارات داخل مصر حسب السعر والموقع والمرافق للعثور على المكان المثالي." :  "Browse and monitor real estate prices in Egypt. Search areas, prices, and facilities to find the perfect place for you."

  let seoResult = {
    description,
    openGraph: {
      description,
    },
    twitter: {
      description,
    },
  };

  return seoResult;
}

const Home = async () => {
  // const banners = await ApiGetter({ url: `/api/PageSections` });

  return (
    <>

      <HomeHeroPage />
      {/* <Banner data={banners?.data?.find((item) => item?.order === 1)} notAos /> */}
      <HomeTopAreas />
      {/* <Banner data={banners?.data?.find((item) => item?.order === 2)} /> */}
      <HomeTopCompounds />
      {/* <Banner data={banners?.data?.find((item) => item?.order === 3)} /> */}
      <HomeRecommended />
      <WhatsAppButton data={"property search"} sticky={false}/>

    </>
  );
};

export default Home;
