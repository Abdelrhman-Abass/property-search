import createMiddleware from "next-intl/middleware";
import { NextResponse } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["ar", "en"],

  // Used when no locale matches
  defaultLocale: "ar",
  localeDetection: false,

});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
