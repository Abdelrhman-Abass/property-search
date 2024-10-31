"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Widgets = ({ topAreas, mostSearched, recommended }) => {
  const locale = useLocale();
  const [links, setLinks] = useState([]);
  const t = useTranslations("home");

  const handelLinks = (data, url = "") => {
    return data.map(({ id, nameAR, nameEN }) => ({
      href: `/${url}/${id}`,
      label: locale == "ar" ? nameAR : nameEN,
    }));
  };

  useEffect(() => {
    const colOne = {
      title: t("topAreas"),
      links: handelLinks(topAreas?.data, "area"),
    };
    const colTwo = {
      title: t("topCompounds"),
      links: handelLinks(mostSearched?.data, "compound"),
    };
    const colThree = {
      title: t("recommended"),
      links: handelLinks(recommended?.data, "compound"),
    };
    setLinks([colOne, colTwo, colThree]);
  }, [topAreas, mostSearched, recommended]);

  return (
    <>
      {links?.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb15">{section.title}</h6>
            <ul className="p-0">
              {section?.links?.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={`/${locale}${href}`}
                    className="ellipsis ellipsis-footer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default Widgets;
