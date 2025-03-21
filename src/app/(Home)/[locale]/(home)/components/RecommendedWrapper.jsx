"use client";
import { useLocale } from "next-intl";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Pagination from "@/layout/Pagination";
import {useState} from "react"
// import Card from "./Card";
import MainCard from "@/layout/main/MainCard";

const RecommendedWrapper = ({ data, type = "compound" }) => {
  const local = useLocale();
  const isClient = typeof window !== "undefined";
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  return (
    <>
      {isClient && (
        <>
          <Swiper
            dir="rtl"
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              nextEl: ".featured-next__active",
              prevEl: ".featured-prev__active",
            }}
            // pagination={{
            //   el: ".featured-pagination__active",
            //   clickable: true,
            // }}
            slidesPerView={1}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {data.map((compound ,idx) => (
              <SwiperSlide key={idx} className="mb-5">
                <MainCard data={compound} colstyle={false} type={type} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`${
              local == "ar" ? "right-0" : "left-0"
            } featured-next__active swiper_button _next areas`}
            aria-label="Recommended Warapper"
          >
          <FaAngleRight className="fs25" />          

          </button>
          <button
            className={`${
              local == "ar" ? "left-0" : "right-0"
            } featured-prev__active swiper_button _prev areas`}
            aria-label="Recommended Warapper Change"

          >
            <FaAngleLeft className="fs25" />          

          </button>
          <div className="row">
          <div className="mbp_pagination text-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default RecommendedWrapper;
