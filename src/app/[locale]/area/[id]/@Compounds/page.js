"use server";
import React from "react";
import MainList from "@/layout/main/MainList";
import { ApiGetter } from "@/services/ApiGetter";

const AboutCompounds = async ({ id, title }) => {
  let data = await ApiGetter({ url: `/api/Compound/GetByAreaId${id}` });

  return <MainList title={title} data={data?.data || []} type="compound" />;
};

export default AboutCompounds;
