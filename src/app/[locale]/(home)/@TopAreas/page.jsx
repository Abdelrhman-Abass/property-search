"use server";
import React from "react";
import TopAreas from "../components/TopAreas";
import { ApiGetter } from "@/services/ApiGetter";

const HomeTopAreas = async () => {
  let data = await ApiGetter({
    url: "/api/TopAreas/recommended",
    take: 10,
  });
  return <TopAreas data={data} />;
};

export default HomeTopAreas;
