import AdvanceFilterModal from "@/layout/advance-search";
import HeroContent from "./HeroContent";
import { useLocale, useTranslations } from "next-intl";

const Hero = ({ data }) => {
  const t = useTranslations("home");
  const locale = useLocale();
  return (
    <>
      <div className="inner-banner-style1 text-center">
        <h2 className="hero-title animate-up-2">
          {locale === "ar"
            ? data.titleAR || t("urHome")
            : data.titleEN || t("urHome")}
        </h2>
        <p className="hero-text fz15 animate-up-3">
          {locale === "ar"
            ? data.shortDescriptionAR || t("large")
            : data.shortDescriptionEN || t("large")}
        </p>
        <HeroContent />
      </div>
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
    </>
  );
};

export default Hero;
