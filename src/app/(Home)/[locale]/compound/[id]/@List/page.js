"use server";
import React from "react";
import PropertiesList from "../components/PropertiesList";
import { ApiGetter } from "@/services/ApiGetter";
import WhatsAppButton from "@/components/common/WhatsAppButton";

const Properties = async ({ propertyData, title, searchParams ,compundId}) => {
  const { OrderBy, page } = searchParams;
  const queryString = new URLSearchParams({
    OrderBy: OrderBy || "Latest",
    PageNumber: page || 1,
  }).toString();
  const pageSize = 9;
  
  const properties = propertyData?.data;

  return (
    <>
    <PropertiesList
      title={title}
      data={properties?.items}
      pageSize={pageSize}
      totalRecords={properties?.totalRecords}
    />
    <WhatsAppButton data={title} url={`compound/${compundId}`}/>
    </>
  );
};

export default Properties;
