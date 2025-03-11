"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/routing";
import { usePathname } from "next/navigation";

const MainMenu = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <ul className="ace-responsive-menu">
      <li className={isActive(`/`) ? "active" : ""}>
        <Link href={`/`}>{t("home")}</Link>
      </li>
      <li className={isActive(`/search`) ? "active" : ""}>
        <Link href={`/search`}>{t("search")}</Link>
      </li>
      <li className={isActive(`/blog`) ? "active" : ""}>
        <Link href={`/blog`}>{t("blog")}</Link>
      </li>
      <li data-bs-dismiss="offcanvas" aria-label="Close">
        <Link href={`/developers`}>{t("startutps")}</Link>
      </li>
      <li className={isActive(`/about`) ? "active" : ""}>
        <Link href={`/about`}>{t("about")}</Link>
      </li>
      <li className={isActive(`/contact`) ? "active" : ""}>
        <Link href={`/contact`}>{t("contact")}</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
