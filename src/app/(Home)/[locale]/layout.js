import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Client from "./Client";
import { Poppins, Noto_Kufi_Arabic } from "next/font/google";
import Header from "@/layout/Header";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/layout/default-footer";
import { Toaster } from "react-hot-toast";
import MenuWidget from "@/layout/default-footer/MenuWidget";

const enKeywords = [
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
  "rent property Egypt",
  "compound properties Egypt",
  "real estate prices Egypt",
  "new developments Egypt",
  "investment properties Egypt",
  "find property in Egypt",
  "villas for sale Egypt",
  "commercial properties Egypt",
  "real estate agent Egypt",
  "buy house Egypt",
  "top areas Egypt real estate",
  "real estate listings Egypt",
  "find home Egypt",
  "best compounds Egypt",
  "luxury villas Egypt",
  "buy apartment Egypt",
];

const arKeywords = [
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
  "الإيجارات في مصر",
  "مجمعات سكنية في مصر",
  "استثمار عقاري مصر",
  "عقارات تجارية في مصر",
  "مشاريع عقارية جديدة مصر",
  "بحث عن عقار في مصر",
  "شراء فيلا في مصر",
  "أفضل المناطق العقارية في مصر",
  "قائمة عقارات مصر",
  "البحث عن منزل في مصر",
  "أفضل مجمعات سكنية في مصر",
  "فلل فاخرة في مصر",
];

// Cairo font
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default async function RootLayout({ children, params: { locale } }) {
  
  const messages = await getMessages();

  const title =
    locale == "ar"
      ? "بروبرتي سيرش - Property Search | بحث ذكي، وعثور أسرع"
      : "Property Search - بروبرتي سيرش | Search Smarter, Find Faster";
  const description =
    locale == "ar"
      ? "أفضل وسيط عقاري يمكنك من خلاله تصفح ومراقبة اسعار العقارات في مصر. تصفح المناطق والمجمعات السكنية والعقارات حسب السعر والموقع وغرف النوم  والمرافق للعثور على المكان المثالي لك ولعائلتك."
      : "The best real estate broker through which you can browse and monitor real estate prices in Egypt. Browse areas, residential complexes, properties by price, location, bedrooms, and facilities to find the perfect place for you and your family.";

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/favicon.ico" />

        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={locale == "ar" ? arKeywords : enKeywords}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <!-- twitter --> */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script>
          {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5P5PRK53');`}
        </script>
      </head>
      <body
        className={`body ${locale == "ar" ? notoKufiArabic.variable : poppins.variable
          }`}
        cz-shortcut-listen="false"
      >
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

            <div style={{ minHeight: "100vh" }}>{children}</div>
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
