"use client"
import { blogFormatDate } from "@/services";
import { useLocale } from "next-intl";

import Image from "next/image";
import React, { useState } from "react";
import SwitchLang from "@/components/common/SwitchLang";
import Link from "next/link";

export default function CompaniesHead({ blog }) {
  const locale = useLocale();
  // const blogDate = blogFormatDate(blog?.createdDateUtc, locale);
  const imagePath = `${process.env.NEXT_PUBLIC_COMPANIES_IMAGE}/${blog?.image}`;
  const imagePathLOGO = `${process.env.NEXT_PUBLIC_COMPANIES_IMAGE}/${blog?.logo}`;

  // console.log(imagePath)
  return (
    <>
      <div
        className="landing-section d-flex flex-column"

        style={{
          backgroundImage: `url(${imagePath})`,
          // backgroundImage: `url("https://developer-eg.com/palm-east-new-cairo/images/bg.jpg")`,

          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "#fff",
        }}
      >
        {/* Navbar */}
        <div className="overlay"></div>

        <nav className="navbar companies-index p-3">
          <div className="container">
            <div className="logos">
              <Link className="header-logo logo1" href={`/`} aria-label="Logo Image">
                <Image
                  width={100}
                  height={60}
                  src={imagePathLOGO}
                  alt={`Header Logo ${locale === "ar" ? blog?.titleAR : blog?.titleEN}`}
                  loading="lazy"
                />
              </Link>
            </div>
            <SwitchLang company={true}/>
          </div>
        </nav>

        {/* Centered Content */}
        <div className="container  companies-index  text-center my-auto text-white">
          <h1 className="display-3 text-white fw-bold">{locale === "ar" ? blog?.titleAR : blog?.titleEN}</h1>
          <h2 className="lead text-white">{locale === "ar" ? blog?.subTitleAR : blog?.subTitleEN}</h2>

        </div>
      </div>
    </>
  );
}

