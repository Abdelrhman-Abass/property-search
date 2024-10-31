import { useLocale } from "next-intl";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const Banner = ({ data }) => {
  const locale = useLocale();
  
  if (!data) return null;
  const imagePath = `${process.env.NEXT_PUBLIC_BANNERS_IMAGE}/${data.path}`;

  console.log(imagePath)
  return (
    <section className="pt40 pb40">          
      <div className="container">
        <div
          // style={{
          //   backgroundImage: `url(${imagePath})`,
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          //   height: '215px', 
          // }}
          className="home-banner"
          data-aos="fade-up"
          data-aos-delay="100"
          width
        >
          <Image
              width={200}
              height={215}
              className="w-100 h-100 cover"
              src={imagePath}
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
