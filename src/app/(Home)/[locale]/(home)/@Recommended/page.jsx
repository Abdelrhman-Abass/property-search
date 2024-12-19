"use server";
import React from "react";
import Recommended from "../components/Recommended";
import { ApiGetter } from "@/services/ApiGetter";

const HomeRecommended = async () => {
  let data = await ApiGetter({ url: "/api/TopCompounds/recommended", take: 10 });

  return <Recommended data={data} />;
};

export default HomeRecommended;
