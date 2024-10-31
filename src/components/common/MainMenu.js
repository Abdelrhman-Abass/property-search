"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainMenu = () => {
  const local = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <ul className="ace-responsive-menu">
      <li className={isActive(`/${local}`) ? "active" : ""}>
        <Link href={`/${local}`}>{t("home")}</Link>
      </li>
      <li className={isActive(`/${local}/search`) ? "active" : ""}>
        <Link href={`/${local}/search`}>{t("search")}</Link>
      </li>
      <li className={isActive(`/${local}/blog`) ? "active" : ""}>
        <Link href={`/${local}/blog`}>{t("blog")}</Link>
      </li>
      <li className={isActive(`/${local}/about`) ? "active" : ""}>
        <Link href={`/${local}/about`}>{t("about")}</Link>
      </li>
      <li className={isActive(`/${local}/contact`) ? "active" : ""}>
        <Link href={`/${local}/contact`}>{t("contact")}</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
