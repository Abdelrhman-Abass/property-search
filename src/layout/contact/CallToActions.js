"use client";
import { useData } from "@/context";
import { useTranslations } from "next-intl";

const CallToActions = () => {
  const t = useTranslations("contact");
  const { appSettings } = useData();

  return (
    <section className="our-cta pt0">
      <div className="cta-banner bgc-f7 mx-auto maxw1600 pt120 pt60-md pb120 pb60-md bdrs12 position-relative mx20-lg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-xl-6 " data-aos="fade-right">
              <div className="cta-style1">
                <h2 className="cta-title"> {t("help")}</h2>
                <p className="cta-text mb-0">{t("talk")} </p>
              </div>
            </div>
            <div className="col-lg-5 col-xl-6 " data-aos="fade-left">
              <div className="cta-btns-style1 d-block d-sm-flex align-items-center justify-content-lg-end">
                <a
                  target="_blank"
                  href={`tel:${appSettings?.phone}`}
                  className="ud-btn btn-dark"
                >
                  <span className="flaticon-call vam pe-2" />
                  {appSettings?.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActions;
