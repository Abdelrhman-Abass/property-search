"use client";
import { formatPrice } from "@/services";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/routing";

const MainCard = ({ colstyle = false, data, type }) => {
  const h = useTranslations("home");
  const g = useTranslations("global");
  const locale = useLocale();

  if (type == "compound") {
    let image;
    if (data?.defaultMediaPath) {
      image = `${process.env.NEXT_PUBLIC_COMPOUNDS_IMAGE}/${data.defaultMediaPath}`;
    } else if (data?.image) {
      image = `${process.env.NEXT_PUBLIC_COMPOUNDS_IMAGE}/${data.image}`;
    }
    return (
      <div className="item">
        <div
          className={
            colstyle
              ? "listing-style1 listCustom listing-type"
              : "listing-style1 "
          }
        >
          <Link href={`/compound/${data.id}`}>
            <div className="list-thumb">
              <Image
                width={380}
                height={250}
                className="w-100 cover"
                src={image ? image : "/slider.webp"}
                alt={locale == "ar" ? data?.nameAR : data?.nameEN}
              />
              <div className="list-price">
                {formatPrice(data?.minPrice)} {g("egp")}
              </div>
            </div>
          </Link>
          <div className="list-content">
            <Link href={`/compound/${data.id}`}>
              <h6 className="list-title ellipsis">
                {locale == "ar" ? data.nameAR : data.nameEN}
              </h6>
            </Link>
            <p className="list-text truncate-text">
              {locale == "ar" ? data?.areaNameAR : data?.areaNameEN}
            </p>
            <div className="list-meta d-flex align-items-center " style={{minHeight:"2em"}}>
              <span className="flaticon-expand d-flex" />
              {data?.propertyCount} {h("properties")}
            </div>
            <hr className="mt-2 mb-2" />
            
            {data?.developerID ? (
            <div className="list-meta2 d-flex justify-content-between align-items-center">
              <Link href={`/developer/${data?.developerID}`}>
                <span className="for-what">
                  {locale == "ar" ? data?.developerNameAR : data?.developerNameEN}
                </span>
              </Link>
              <div className="icons d-flex align-items-center">
                <Link href={`/developer/${data?.developerID}`}>
                  <span className="flaticon-fullscreen" />
                </Link>
              </div>
            </div>

          ) : (
            <div className="list-meta2 d-flex justify-content-between align-items-center">
              <Link href={`/developer/${data?.developerId}`}>
                <span className="for-what">
                  {locale == "ar" ? data?.developerNameAR : data?.developerNameEN}
                </span>
              </Link>
              <div className="icons d-flex align-items-center">
                <Link href={`/developer/${data?.developerId}`}>
                  <span className="flaticon-fullscreen" />
                </Link>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="item">
        <div
          className={
            colstyle
              ? "listing-style1 listCustom listing-type"
              : "listing-style1 "
          }
        >
          <Link href={`/property/${data.id}`}>
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className="w-100 cover"
                src={data?.mediaPath ? `${process.env.NEXT_PUBLIC_PROPERTIES_IMAGE}/${data?.mediaPath}` : "/slider.webp"}
                alt={locale == "ar" ? data.titleAR : data.titleEn}
              />
              <div className="list-price">
                {formatPrice(data?.price)} {g("egp")}
              </div>
            </div>
          </Link>
          <div className="list-content">
            <Link href={`/property/${data.id}`}>
              <h6 className="list-title ellipsis">
                {locale == "ar" ? data.titleAR : data.titleEn}
              </h6>
            </Link>
            <p className="list-text truncate-text">
              {locale == "ar"
                ? data?.compoundNameAR + " - " + data?.areaNameAR
                : data?.compoundNameEN + " - " + data?.areaNameEN}
            </p>
            <div className="list-meta d-flex align-items-center" style={{minHeight:"2em"}}>
              {data.bedrooms > 0 && (
                  <>
                    <span className="flaticon-bed d-flex" /> {data.bedrooms}{" "}
                    {g("bed")}
                  </>
                )}
                
                
                {data.bathrooms  > 0  && (
                  <>
                    <span className="flaticon-shower d-flex" /> {data.bathrooms}{" "}
                    {g("bath")}
                  </>
                )}
                {data.builtUpArea  > 0 && (
                  <>
                    <span className="flaticon-expand d-flex" /> {data.builtUpArea}{" "}
                    {g("sqft")}
                  </>
                )}
                
            </div>

            <hr className="mt-2 mb-2" />
            {data?.developerID ? (
            <div className="list-meta2 d-flex justify-content-between align-items-center">
              <Link href={`/developer/${data?.developerID}`}>
                <span className="for-what">
                  {locale == "ar" ? data?.developerNameAR : data?.developerNameEN}
                </span>
              </Link>
              <div className="icons d-flex align-items-center">
                <Link href={`/developer/${data?.developerID}`}>
                  <span className="flaticon-fullscreen" />
                </Link>
              </div>
            </div>

          ) : (
            <div className="list-meta2 d-flex justify-content-between align-items-center">
              <Link href={`/developer/${data?.developerId}`}>
                <span className="for-what">
                  {locale == "ar" ? data?.developerNameAR : data?.developerNameEN}
                </span>
              </Link>
              <div className="icons d-flex align-items-center">
                <Link href={`/developer/${data?.developerId}`}>
                  <span className="flaticon-fullscreen" />
                </Link>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
};

export default MainCard;
