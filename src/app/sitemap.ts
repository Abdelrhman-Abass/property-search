import type { MetadataRoute } from "next";
import { ApiGetter } from "../services/ApiGetter";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = ["en", "ar"];
    const area = await ApiGetter({ url: `/api/Area` });
    
    const destinationsRoutes = locales.flatMap((locale) => {
        return (area?.data?.map(ele => ({
          url: `https://property-search.com/${locale}/area/${ele?.id}`,
          lastModified: new Date().toISOString(),
        })) || [])
      })


    const routesStrings = ["", "courses"];
    const routes = locales.flatMap((locale) =>
        routesStrings.map((route) => ({
            url: `https://property-search.com/${locale}${route ? `/${route}` : ""}`,
            lastModified: new Date().toISOString(),
        })),
    );

    return [...routes , ...destinationsRoutes];
}
