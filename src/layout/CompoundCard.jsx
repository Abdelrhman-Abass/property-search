import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const CompoundCard = ({ colstyle = false, data = {} }) => {
  const g = useTranslations("global");
  const local = useLocale();

  return (
    <div className="item">
      <div
        className={
          colstyle
            ? "listing-style1 listCustom listing-type"
            : "listing-style1 "
        }
      >
        <Link href={`/${local}/property/${1}`}>
          <div className="list-thumb">
            <Image
              width={382}
              height={248}
              className="w-100 h-100 cover"
              src={data?.image}
              alt="listings"
            />
            <div className="list-price">
              {data?.price} {g("egp")}
            </div>
          </div>
        </Link>
        <div className="list-content">
          <Link href={`/${local}/property/${data?.title}`}>
            <h6 className="list-title">{data?.title}</h6>
          </Link>
          <p className="list-text">{data?.location}</p>
          <div className="list-meta d-flex align-items-center">
            <span className="flaticon-bed d-flex" /> {data?.bed} {g("bed")}
            <span className="flaticon-shower d-flex" /> {data?.bath} {g("bath")}
            <span className="flaticon-expand d-flex" /> {data?.sqft} {g("sqft")}
          </div>
          <hr className="mt-2 mb-2" />
          <div className="list-meta2 d-flex justify-content-between align-items-center">
            <span className="for-what">المطور العقاري</span>
            <div className="icons d-flex align-items-center">
              <Link href={`/${local}/developer/1`}>
                <span className="flaticon-fullscreen" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundCard;
