"use client";
import Image from "next/image";
import {Link} from "@/routing";
import React, { useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import { useLocale } from "next-intl";

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const locale = useLocale();
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos">
                    <Link className="header-logo logo1" href={`/`}>
                      <Image
                        width={138}
                        height={44}
                        src="/images/header-logo2.svg"
                        alt="Property search Header Logo"
                        priority
                        loading="eager"
                      />
                    </Link>
                    <Link className="header-logo logo2" href={`/`}>
                      <Image
                        width={138}
                        height={44}
                        src="/images/header-logo2.svg"
                        alt="property search Header Logo"
                        priority
                        loading="eager"
                      />
                    </Link>
                  </div>
                  <MainMenu />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default DefaultHeader;
