"use client"
import Link from "next/link";
import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <div className="container white-bdrt1 py-4">
      <div className="row">
        <div className="text-center text-lg-start">
          <p className="copyright-text text-gray ff-heading mb-0">
            ©{" "}
            <Link
            href={"/"}
              style={{ color: "inherit" }}
            >
              Property Search
            </Link>{" "}
            {getCurrentYear()} - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
