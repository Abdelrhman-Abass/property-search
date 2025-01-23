import { createNavigation } from "next-intl/navigation";
import {defineRouting} from 'next-intl/routing';

export const locales = ["ar", "en"];
export const localePrefix = "never";
export const defaultLocale = "ar";
export const defaultLanguageCode = "en-US";

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'ar'
});


export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation({
    routing
  });