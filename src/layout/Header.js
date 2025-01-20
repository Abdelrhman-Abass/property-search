"use client";
import MainMenu from "@/components/common/MainMenu";
import Image from "next/image";
import  {Link}  from "@/routing";
import React from "react";
import SwitchLang from "../components/common/SwitchLang";
import { useLocale } from "next-intl";

const Header = () => {
 
  return (
    <header
      className={`header-nav nav-homepage-style main-menu sticky slideInDown`}
    >
      <nav className="posr">
        <div className="container posr menu_bdrt1">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex align-items-center justify-content-between gap-5">
                <div className="logos">
                  <Link className="header-logo logo1" href={`/`}>
                    <Image
                      width={155}
                      height={60}
                      src="/logo.webp"
                      alt="Property Search Header Logo"
                      // priority
                      // loading="eager"
                    />
                  </Link>
                  <Link className="header-logo logo2" href={`/`}>
                    <Image
                      width={155}
                      height={60}
                      src="/logo.webp"
                      alt="Property Search Header Logo"
                      // priority
                      // loading="eager"
                    />
                  </Link>
                </div>
                <MainMenu />
              </div>
            </div>
            <SwitchLang />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
