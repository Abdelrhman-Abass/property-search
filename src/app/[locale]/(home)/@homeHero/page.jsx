import React from "react";
import HomeHero from "../components/HomeHero";
import { ApiGetter } from "@/services/ApiGetter";

const HomeHeroPage = async () => {
  const slidersData = await ApiGetter({ url: `/api/Sliders` });

  console.log(slidersData)
  return <HomeHero data={slidersData?.data[0]} />;
};

export default HomeHeroPage;
