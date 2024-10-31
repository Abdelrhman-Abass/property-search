import ApartmentTypes from "@/components/home/ApartmentTypes";
import { useLocale } from "next-intl";
import React from "react";

const Phases = () => {
  const locale = useLocale();
  return (
    <section className="pb40-md pb40 pt-0">
      <div className="container">
        <div className="row  justify-content-between align-items-center">
          <div className="col-auto">
            <div className="main-title" data-aos="fade-up" data-aos-delay="100">
              <h2 className="title">مراحل اخرى</h2>
              <p className="paragraph">7 نتائج متاحة</p>
            </div>
          </div>
          <div className="col-auto mb30">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <button
                  className={`${
                    locale == "ar" ? "rotate180" : ""
                  } apartment-type2-prev__active swiper_button `}
                >
                  <i className="far fa-arrow-left-long" />
                </button>
              </div>
              <div className="col-auto">
                <div className="pagination swiper--pagination apartment-type2_pagination__active" />
              </div>
              <div className="col-auto">
                <button
                  className={`${
                    locale == "ar" ? "rotate180" : ""
                  } apartment-type2-next__active swiper_button `}
                >
                  <i className="far fa-arrow-right-long" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
            <div className="property-city-slider">
              <ApartmentTypes />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Phases;
