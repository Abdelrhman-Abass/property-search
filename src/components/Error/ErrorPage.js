"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function ErrorPage() {
  const path = usePathname();
  const isEn = path?.includes("/en");

  return (
    <section className="our-error">
      <div className="container">
        <div className=" align-items-center justify-content-center">
          <div className="offset-xl-1 wow fadeInLeft">
            <div className="error_page_content mt80 mt50-lg text-center text-xl-start">
              <div className="erro_code">
                <span className="text-thm">40</span>4
              </div>
              <div className="h2 error_title">
                {isEn ? "Excuse me! You seem lost." : "عفوا! يبدو أنك تائه."}
              </div>

              <Link href="/" className="ud-btn btn-dark mt10">
                {isEn ? "Home" : "الرئيسية"}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
