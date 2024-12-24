"use client";
import Image from "next/image";
import {Link} from "@/routing";
import ContactMeta from "./ContactMeta";
import Social from "./Social";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";
import { useData } from "@/context";
import { useLocale } from "next-intl";

const Footer = ({ children }) => {
  const { appSettings } = useData();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer-widget mb-4 mb-lg-5">
              <Link className="footer-logo mr20" href={`/`}>
                <Image
                  width={190}
                  height={85}
                  className="mb40"
                  src="/white-logo.png"
                  alt="Footer Logo"
                  loading="lazy"
                />
              </Link>
              <ContactMeta appSettings={appSettings} />
              {/* <Social appSettings={appSettings} /> */}
            </div>
          </div>
          <div className="col-lg-6 mt-4">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="row justify-content-between w-100">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default Footer;
