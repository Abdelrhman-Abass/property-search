import createMiddleware from "next-intl/middleware";
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["ar" , "en"],

  // Used when no locale matches
  defaultLocale: "ar",
  localeDetection: false,
});

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  // Redirect /en to /ar
  if (pathname.startsWith('/en')) {
    // Replace /en with /ar in the pathname
    const newPathname = pathname.replace(/^\/en/, '/en');
    // Construct the new URL with the updated pathname
    const newUrl = new URL(newPathname, req.url);
    return NextResponse.redirect(newUrl);
  }

  // Apply the next-intl middleware
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  // matcher: ["/", "/(ar)/:path*", "/(en)/:path*"], // Include /en in the matcher
  matcher: ["/", "/(ar|en)/:path*"],

};