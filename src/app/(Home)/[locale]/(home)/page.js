"use server";
import Banner from "./components/Banner";
import HomeTopAreas from "./@TopAreas/page";
import HomeTopCompounds from "./@TopCompounds/page";
import HomeRecommended from "./@Recommended/page";
import { ApiGetter } from "@/services/ApiGetter";
import HomeHeroPage from "./@homeHero/page";
import WhatsAppButton from "@/components/common/WhatsAppButton";


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
      <HomeRecommended />
      <WhatsAppButton data={"property search"}/>

    </>
  );
};

export default Home;
