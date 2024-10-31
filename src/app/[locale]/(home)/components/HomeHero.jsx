"use client";
import React from "react";
import Hero from "@/components/home/hero";
import Image from "next/image";

const HomeHero = ({ data }) => {

  const imagePath = `${process.env.NEXT_PUBLIC_SLIDERS_IMAGE}/${data?.path}`;

  return (
    <section
      
      className="home-banner-style1 p0"
    >
      {/* <Image
              width={100}
              height={100}
              className="w-100 h-100 cover"
              src={imagePath}
            />    */}
      <div className="home-style1">
        <div className="container">
          <div className="row">
            <div className="col-xl-11 mx-auto">
              <Hero data={data} />
            </div>
          </div>
        </div>
        <a href="#top-area">
          <div className="mouse_scroll animate-up-4"></div>
        </a>
      </div>
    </section>
  );
};

export default HomeHero;
