import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const BlogBreadcumb = () => {
  const nav = useTranslations("nav");
  const locale = useLocale();
  return (
    <section className="breadcumb-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-style1">
              <h2 className="title">{nav("blog")}</h2>
              <div className="breadcumb-list d-flex gap-1">
                <Link href={`/${locale}`}>{nav("home")}</Link> <span>/</span>{" "}
                <span href="#">{nav("blog")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogBreadcumb;
