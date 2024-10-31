"use client";
import Link from "next/link";
import Image from "next/image";
import SwitchLang from "../SwitchLang";
import { useLocale, useTranslations } from "next-intl";

const MobileMenu = () => {
  const local = useLocale();
  const t = useTranslations("nav");

  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <p
                className="menubar mb-0 pointer"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </p>
              <Link className="mobile_logo" href="/">
                <Image width={130} height={50} src="/logo.png" alt="logo" />
              </Link>
              <SwitchLang />
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span className="far fa-times"></span>
            </div>
            <div className="sidebar-logo">
              <Image width={130} height={50} src="/logo.png" alt="logo" />
            </div>
          </div>
          {/* End header */}
          <div className="hsidebar-content ">
            <div className="hiddenbar_navbar_content">
              <ul className="sidebar-links">
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <Link href={`/${local}`}>{t("home")}</Link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <Link href={`/${local}/search`}>{t("search")}</Link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <Link href={`/${local}/blog`}>{t("blog")}</Link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <Link href={`/${local}/about`}>{t("about")}</Link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <Link href={`/${local}/contact`}>{t("contact")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
