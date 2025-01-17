"use server";
import React from "react";
import TopCompounds from "../components/TopCompounds";
import { ApiGetter } from "@/services/ApiGetter";

const HomeTopCompounds = async () => {
  let data = await ApiGetter({
    url: "/api/TopCompounds/most-searched",
    take: 10,
  });

  return data ? <TopCompounds data={data} />: null ;
};

export default HomeTopCompounds;
