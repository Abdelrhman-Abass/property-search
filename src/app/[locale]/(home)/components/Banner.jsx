import { useLocale } from "next-intl";
import React from "react";

const Banner = ({ data }) => {
  if (!data) return null;
  const locale = useLocale();
  return (
    <section className="pt40 pb40">
      <div className="container">
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BANNERS_IMAGE}/${data.path})`,
          }}
          className="home-banner"
          data-aos="fade-up"
          data-aos-delay="100"
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
