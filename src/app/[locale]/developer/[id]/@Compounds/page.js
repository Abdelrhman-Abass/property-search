"use server";
import React from "react";
import MainList from "@/layout/main/MainList";
import { ApiGetter } from "@/services/ApiGetter";

const DeveloperCompounds = async ({ id, title }) => {
  let data = await ApiGetter({
    url: `/api/Compound/GetByDeveloperId${id}`,
  });

  return <MainList title={title} data={data?.data || []} dev={true} type="compound" />;
};

export default DeveloperCompounds;
