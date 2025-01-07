import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Client from "./Client";
import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
import Header from "@/layout/Header";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/layout/default-footer";
import { Toaster } from "react-hot-toast";
import MenuWidget from "@/layout/default-footer/MenuWidget";
import Script from "next/script"; // Import the Script component

// Optimized font imports
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"], // Reduced to necessary weights
  variable: "--title-font-family",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Reduced to necessary weights
  variable: "--title-font-family",
});

// SEO configuration (can be moved to an external config file)
const SEOConfig = {
  en: {
    title: "Property Search - بروبرتي سيرش | Search Smarter, Find Faster",
    description:
      "Browse and monitor real estate prices in Egypt. Search areas, prices, and facilities to find the perfect place for you.",
    keywords: [
      "real estate Egypt",
      "property for sale Egypt",
      "buy property Egypt",
      "Egyptian real estate",
      "apartments for sale Egypt",
      "houses for sale Egypt",
      "luxury real estate Egypt",
      "residential properties Egypt",
      "best real estate in Egypt",
      "real estate broker Egypt",
      "Compound",
      "Units",
      "Fifth Settlement",
      "Search",
      "Details",
      "Real Estate",
      "Villas",
    ],
  },
  ar: {
    title: "بروبرتي سيرش - Property Search | بحث ذكي، وعثور أسرع",
    description:
      "أفضل موقع وسيط عقاري في مصر. تصفح جميع المناطق والمجمعات السكنية والعقارات داخل مصر حسب السعر والموقع والمرافق للعثور على المكان المثالي.",
    keywords: [
      "كمبوند",
      "وحدات",
      "القاهرة",
      "مصر",
      "التجمع الخامس",
      "ابحث",
      "التفاصيل",
      "عقارات",
      "فلل",
      "عقارات مصر",
      "شراء عقار في مصر",
      "عقارات للبيع في مصر",
      "وسيط عقاري مصر",
      "شقق للبيع في مصر",
      "فلل للبيع في مصر",
      "عقارات فاخرة في مصر",
      "أفضل عقارات في مصر",
      "شراء شقة في مصر",
      "اسعار العقارات في مصر",
    ],
  },
};

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  const { title, description, keywords } = SEOConfig[locale];

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href={
            locale === "ar"
              ? "https://property-search.com/ar"
              : "https://property-search.com/en"
          }
        />
        <link rel="alternate" hreflang="en" href="https://property-search.com/en" />
        <link rel="alternate" hreflang="ar" href="https://property-search.com/ar" />
        <meta name="title" content={title} />
        {/* <meta name="description" content={description} /> */}
        <meta name="keywords" content={keywords.join(", ")} />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:image:alt" content="/logo.webp" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://property-search.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="property-search" />
        <meta property="og:locale" content={locale === "ar" ? "ar_AR" : "en_US"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:card" content={description} />
        {/* Facebook Page Meta Tag */}
        <meta property="article:publisher" content="https://www.facebook.com" />
        {/* Instagram and YouTube Meta Tags */}
        <meta name="instagram:site" content="https://www.instagram.com" />
        <meta name="youtube:channel" content="https://www.youtube.com" />

        {/* Google Tag Manager Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5P5PRK53');
          `}
        </Script>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://property-search.com",
              name: "Property Search",
              description: description,
              potentialAction: {
                "@type": "SearchAction",
                target: "https://property-search.com/ar/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`body ${locale === "ar" ? notoKufiArabic.variable : poppins.variable}`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5P5PRK53"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <NextIntlClientProvider messages={messages}>
          <Client>
            <Header />
            <MobileMenu />
            <Toaster position="top-left" reverseOrder={false} />

            <div className="min-vh-100">{children}</div>
            <section
              style={{ background: "#0f2950" }}
              className="footer-style1 pt60 pb-0"
            >
              <Footer>
                <MenuWidget />
              </Footer>
            </section>
          </Client>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}