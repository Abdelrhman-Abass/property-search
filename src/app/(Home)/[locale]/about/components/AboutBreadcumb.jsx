import { useLocale, useTranslations } from "next-intl";
import {Link} from "@/routing";
import React from "react";

const AboutBreadcumb = ({ data }) => {
  const nav = useTranslations("nav");
  const locale = useLocale();
  const image = `${process.env.NEXT_PUBLIC_PAGES_IMAGE}/${data?.image}`;

  return (
    <section
      className="breadcumb-section2 p-0"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-style1">
              <h2 className="title">
                {data
                  ? locale == "ar"
                    ? data?.titleAR
                    : data?.titleEN
                  : nav("about")}
              </h2>
              <div className="breadcumb-list d-flex gap-1">
                <Link href={`/`}>{nav("home")}</Link> <span>/</span>{" "}
                <span href="#">
                  {data
                    ? locale == "ar"
                      ? data?.titleAR
                      : data?.titleEN
                    : nav("about")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBreadcumb;
