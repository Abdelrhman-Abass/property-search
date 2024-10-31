"use client";
import "../../public/scss/main.scss";
import "../../public/style.css";
import { Noto_Kufi_Arabic } from "next/font/google";
import ErrorPage from "@/components/Error/ErrorPage";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// Cairo font
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function NotFound() {
  return (
    <html>
      <body
        className={`body ${notoKufiArabic.variable}`}
        cz-shortcut-listen="false"
      >
        <ErrorPage />
      </body>
    </html>
  );
}
