"use client";
import MainMenu from "@/components/common/MainMenu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SwitchLang from "../components/common/SwitchLang";
import { useLocale } from "next-intl";

const Header = () => {
  const locale = useLocale();
  // const [navbar, setNavbar] = useState(false);

  // const changeBackground = () => {
  //   if (window.scrollY >= 10) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", changeBackground);
  //   return () => {
  //     window.removeEventListener("scroll", changeBackground);
  //   };
  // }, []);

  //  navbar ? "sticky slideInDown animated" : ""

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
                  <Link className="header-logo logo1" href={`/${locale}`}>
                    <Image
                      width={155}
                      height={60}
                      src="/logo.png"
                      alt="Header Logo"
                    />
                  </Link>
                  <Link className="header-logo logo2" href={`/${locale}`}>
                    <Image
                      width={155}
                      height={60}
                      src="/logo.png"
                      alt="Header Logo"
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
