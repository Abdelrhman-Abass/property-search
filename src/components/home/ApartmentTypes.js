"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ApartmentTypes = ({ data }) => {
  const t = useTranslations("home");
  const local = useLocale();

  // {defaultMediaPath,id,nameEN,nameAR,propertyCount}
  const fakeImage = `https://m.ahstatic.com/is/image/accorhotels/nca_p_i120217:8by10?wid=248&hei=310&dpr=on,2&qlt=85&resMode=sharp2&op_usm=0.5,0.3,2,0&iccEmbed=true&icc=sRGB`;

  return (
    <>
      <Swiper
        dir="rtl"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".apartment-type2-next__active",
          prevEl: ".apartment-type2-prev__active",
        }}
        pagination={{
          el: ".apartment-type2_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {[].map((apartment, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              <Link href={`/${local}/compound/${apartment.title}`}>
                <div className="apartment-style1">
                  <div className="apartment-img">
                    <Image
                      width={220}
                      height={202}
                      // w-100 h-100
                      className="cover"
                      src={apartment.imageSrc}
                      alt="apartment city"
                    />
                  </div>
                  <div className="apartment-content">
                    <h6 className="title mb-0">{apartment.title}</h6>
                    <p className="text mb-0">
                      {apartment.properties} {t("properties")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ApartmentTypes;
