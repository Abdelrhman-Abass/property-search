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

      <Image
        src="/slider.webp"
        alt="Home Background Image"
        width={1920}

        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        quality={80}
        priority
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
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
