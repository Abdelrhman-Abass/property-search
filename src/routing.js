import { createNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
export const localePrefix = "never";
export const defaultLocale = "ar";
export const defaultLanguageCode = "en-US";

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation({
    locales,
    localePrefix,
  });