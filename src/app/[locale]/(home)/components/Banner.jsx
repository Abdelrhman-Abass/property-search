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
      <Link href="/">
          <div className="list-thumb">
            <Image
              width={382}
              height={248}
              className="w-100 h-100 cover"
              src={imagePath}
            />
            <div className="list-price">
            </div>
          </div>
        </Link>
      <div className="container">
        <div
          style={{
            backgroundImage: `url(${imagePath})`,
          }}
          className="home-banner"
          data-aos="fade-up"
          data-aos-delay="100"
          width
        >
          <div className="overlay">
            <h5>{locale == "ar" ? data?.titleAR : data?.titleEN}</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
