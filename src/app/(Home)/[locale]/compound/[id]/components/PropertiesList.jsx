"use client";
import React, { useRef } from "react";
import PropertiesPag from "../@List/PropertiesPag";

const PropertiesList = ({ title, data, pageSize, totalRecords }) => {
  const scrollToSectionRef = useRef();
  return (
    <div ref={scrollToSectionRef}>
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
