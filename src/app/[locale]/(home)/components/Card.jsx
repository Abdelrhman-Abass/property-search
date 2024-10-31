import { formatPrice } from "@/services";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const data = ({ colstyle = false, data }) => {
  const h = useTranslations("home");
  const g = useTranslations("global");
  const local = useLocale();
  const image = `${process.env.NEXT_PUBLIC_COMPOUNDS_IMAGE}/${data.defaultMediaPath}`;

  return (
    <div className="item">
      <div
        className={
          colstyle
            ? "listing-style1 listCustom listing-type"
            : "listing-style1 "
        }
      >
        <Link href={`/${local}/compound/${data.id}`}>
          <div className="list-thumb">
            <Image
              width={382}
              height={248}
              className="w-100 h-100 cover"
              src={image}
              alt={data?.nameAR}
            />
            <div className="list-price">
              {formatPrice(data.minPrice)} {g("egp")}
            </div>
          </div>
        </Link>
        <div className="list-content">
          <Link href={`/${local}/compound/${data.id}`}>
            <h6 className="list-title ellipsis">
              {local == "ar" ? data.nameAR : data.nameEN}
            </h6>
          </Link>
          <p className="list-text">
            {local == "ar" ? data.areaNameAR : data.areaNameEN}
          </p>
          {/* <div className="list-meta d-flex align-items-center">
            <span className="flaticon-bed d-flex" /> {data.bed} {g("bed")}
            <span className="flaticon-shower d-flex" /> {data.bath} {g("bath")}
            <span className="flaticon-expand d-flex" /> {data.sqft} {g("sqft")}
          </div> */}
          <div className="list-meta d-flex align-items-center">
            <span className="flaticon-expand d-flex" />
            {data.propertyCount} {h("properties")}
          </div>
          <hr className="mt-2 mb-2" />
          <div className="list-meta2 d-flex justify-content-between align-items-center">
            <span className="for-what">
              {local == "ar" ? data?.developerNameAR : data?.developerNameEN}
            </span>
            <div className="icons d-flex align-items-center">
              <Link href={`/${local}/developer/${data?.developerID}`}>
                <span className="flaticon-fullscreen" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default data;
