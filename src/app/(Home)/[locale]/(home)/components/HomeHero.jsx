"use client";
import React from "react";
import Hero from "@/components/home/hero";
import Link from "next/link";

const HomeHero = ({ data }) => {

  return (
    <section
      
      className="home-banner-style1 p0"
    >
      <div className="home-style1">
        <div className="container">
          <div className="row">
            <div className="col-xl-11 mx-auto">
              <Hero data={data} />
            </div>
          </div>
        </div>
        <Link href="#top-area">
          <div className="mouse_scroll animate-up-4"></div>
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
