"use client"
import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const CopyRight = () => {
  return (
    <div className="container white-bdrt1 py-4">
      <div className="row">
        <div className="text-center">
          <p className="copyright-text text-gray ff-heading mb-0">
            ©{" "}
            <a
              // style={{ color: "inherit" }}
              className="text-reset"
            >
              Property Search
            </a>{" "}
            {getCurrentYear()} - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default CopyRight;
