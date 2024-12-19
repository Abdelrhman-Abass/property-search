import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const TopAreasList = ({ data = [] }) => {
  const t = useTranslations("home");
  const local = useLocale();

  return (
    <>
      <Swiper
        dir="rtl"
        spaceBetween={30}
        modules={[Navigation]}
        navigation={{
          nextEl: ".property-by-city-next__active",
          prevEl: ".property-by-city-prev__active",
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {data?.map(
          (
            { compoundCount, id, image, nameAR, nameEN, propertyCount },
            idx
          ) => (
            <SwiperSlide key={`${idx}-${id}`} className="pointer topAreas">
              <Link href={`/${local}/area/${id}`}>
                <div className="item">
                  <div className="feature-style1">
                    <div className="feature-img">
                      <Image
                        width={280}
                        height={200}
                        className="w-100 cover"
                        src={`${process.env.NEXT_PUBLIC_AREAS_IMAGE}/${image}`}
                        alt="cities"
                      />
                    </div>
                    <div className="feature-content">
                      <div className="top-area">
                        <h6 className="title mb-1">
                          {local == "ar" ? nameAR : nameEN}
                        </h6>
                        <p className="text mb-0">
                          {compoundCount} {t("compound")}
                        </p>
                        <p className="text">
                          {propertyCount} {t("properties")}
                        </p>
                      </div>
                      <div className="bottom-area">
                        <div className="ud-btn2 d-flex item-center gap-2">
                          <span>{t("seeDetails")}</span>
                          <i className="fal fa-arrow-right-long" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
      {/* End Next */}
      <button
        className={`${
          local == "ar" ? "right-0" : "left-0"
        } property-by-city-next__active swiper_button _next areas`}
      >
        <i className="far fa-chevron-left" />
      </button>
      {/* End prev */}
      <button
        className={`${
          local == "ar" ? "left-0" : "right-0"
        } property-by-city-prev__active swiper_button _prev areas`}
      >
        <i className="far fa-chevron-right" />
      </button>
    </>
  );
};

export default TopAreasList;
