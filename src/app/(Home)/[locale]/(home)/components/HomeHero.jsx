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
      {/* set NODE_ENV=production && npm run build && pm2 restart server.js */}
      
        <Image
          src="/slider.webp"
          alt="Home Background Image"
          className="position-absolute w-100 h-100 z-n1 bg-image-cover"
          width={1920}
          height={920}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          quality={100}
          priority
          
        />
      
      

      <h1  className="d-none">Luxury Real Estate in Egypt البحث عن منزل أحلامك</h1>
      <h2 className="d-none">Find Your Dream Villas and Apartments لدينا مجموعة كبيرة من الوحدات التى يمكنك معرفة معلومات عنها. </h2>
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
