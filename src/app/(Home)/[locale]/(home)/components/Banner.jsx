import { useLocale } from "next-intl";
import React from "react";
import Image from "next/image";
const Banner = ({ data }) => {
  const locale = useLocale();
  
  if (!data) return null;
  const imagePath = `${process.env.NEXT_PUBLIC_BANNERS_IMAGE}/${data.path}`;

  return (
    <section className="pt40 pb40">          
      <div className="container">
        <div
          
          className="home-banner"
          data-aos="fade-up"
          data-aos-delay="100"
          
        >
          <Image
              width={200}
              height={215}
              className="w-100 h-100 cover"
              src={imagePath}
              alt={"banner"}
              priority
            />   
          <div className="overlay">
            <h5>{locale == "ar" ? data?.titleAR : data?.titleEN}</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
