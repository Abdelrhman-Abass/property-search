"use client"
import React from "react";
import Hero from "@/components/home/hero";
import Link from "next/link";
import Image from "next/image";

const HomeHero = ({ data }) => {

  return (
    <section
      
      className="home-banner-style1 p0"
    >
      {/* Next.js Image as Background */}
      {/* <Image
        src="/slider.webp"
        alt="Background Image"
        width={1920} // Intrinsic width for large screens
        height={1080} // Intrinsic height for large screens
        quality={80}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -1,
        }}
      /> */}
      <Image
          width={400}
          height={450}
              className="w-100 h-100 cover"
              src="/slider.webp"
              alt={"banner"}
              priority
              loading="eager"
              quality={80}
              style={{
                position: "absolute",
                objectPosition: "center",
                zIndex: -1,
              }}
            />   
      <div className="home-style1">
        <div className="container">
          <div className="row">
            <div className="col-xl-11 mx-auto">
              <Hero data={data} />
            </div>
          </div>
        </div>
        <Link href="#top-area" aria-label="mouse scroll">
          <div className="mouse_scroll animate-up-4"></div>
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
