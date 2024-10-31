"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const TopCompoundsList = ({ data }) => {
  const t = useTranslations("home");
  const local = useLocale();

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
        {data.map(
          ({ defaultMediaPath, id, nameEN, nameAR, propertyCount }, idx) => (
            <SwiperSlide key={`${idx}-${id}`}>
              <div className="item">
                <Link href={`/${local}/compound/${id}`}>
                  <div className="apartment-style1">
                    <div className="apartment-img">
                      <Image
                        width={220}
                        height={200}
                        className="cover"
                        alt="apartment city"
                        src={`${process.env.NEXT_PUBLIC_COMPOUNDS_IMAGE}/${defaultMediaPath}`}
                      />
                    </div>
                    <div className="apartment-content">
                      <h6 className="title mb-0">
                        {local == "ar" ? nameAR : nameEN}
                      </h6>
                      <p className="text mb-0">
                        {propertyCount} {t("properties")}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default TopCompoundsList;
