"use server";
import React from "react";
import Recommended from "../components/Recommended";
import { ApiGetter } from "@/services/ApiGetter";

const HomeRecommended = async ({compund}) => {

  let data = compund ? await ApiGetter({ url: "/api/TopProperties/recommended", take: 10 }) :await ApiGetter({ url: "/api/TopCompounds/recommended", take: 10 });

  // console.log(data)
  return <Recommended data={data} compunds={compund}/>;
};

export default HomeRecommended;
