"use client";
import React, { useRef } from "react";
import PropertiesPag from "../@List/PropertiesPag";
import MainCard from "../../../../../../layout/main/MainCard";
import MainList from "@/layout/main/MainList";

const PropertiesList = ({ title, data, pageSize, totalRecords }) => {
  const scrollToSectionRef = useRef();
  console.log(data)
  return (
    <div ref={scrollToSectionRef}>
      <MainList
        data={data || []}
        networkError={data === null}
        searchParams={""}
        type="property"
      />
      <div className="pt30">
        <PropertiesPag
          scrollToSectionRef={scrollToSectionRef}
          pageSize={pageSize}
          totalRecords={totalRecords}
        />
      </div>
    </div>
  );
};

export default PropertiesList;
