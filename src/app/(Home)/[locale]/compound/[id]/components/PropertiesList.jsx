"use client";
import React, { useRef } from "react";
import MainList from "@/layout/main/MainList";
import PropertiesPag from "../@List/PropertiesPag";

const PropertiesList = ({ title, data, pageSize, totalRecords }) => {
  const scrollToSectionRef = useRef();
  return (
    <div ref={scrollToSectionRef}>
      <div className="pt30">
        <MainList isCompoundDetails title={title} data={data} type="property" />
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
