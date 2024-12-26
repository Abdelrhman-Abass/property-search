"use server";
import BlogError from "../components/BlogError";
import { ApiGetter } from "@/services/ApiGetter";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import CompaniesHead from "../components/CompaniesHead";
import ContentPhotoList from "../components/ContentPhotoList";

export const fetchData = async (id) => {
  const blog = await ApiGetter({ url: `/api/LandingPage/${id}` });
  return blog;
};

export async function generateMetadata({ params }) {
  const blog = await fetchData(params.id);
  const title = blog?.data?.seoTitle;
  const description = blog?.data?.seoDescription;
  let keywords = "";
  if (blog?.data?.seoMetaTags) {
    // Check if seoMetaTags is a string
    if (typeof blog?.data?.seoMetaTags === "string") {
      try {
        // Try to parse the string into an array and join it if it's a valid JSON string
        keywords = JSON.parse(blog?.data?.seoMetaTags).join(", ");
      } catch (error) {
        // If parsing fails, assume it's already a string
        keywords = blog?.data?.seoMetaTags;
      }
    } else if (Array.isArray(blog?.data?.seoMetaTags)) {
      // If it's an array, join the items
      keywords = blog?.data?.seoMetaTags.join(", ");
    }
  }
  const image = blog?.data?.image
    ? process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE + `/${blog?.data?.image}`
    : "";
  const seoResult = {
    keywords,
    title,
    description,
    openGraph: {
      keywords,
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      keywords,
      title,
      description,
      card: "summary", // Twitter card type
      image: image || undefined,
    },
    additionalMetaTags: [], // Always initialize as an array

  };

  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  }
  return seoResult;
}

const page = async ({ params }) => {
  const blog = await fetchData(params.id);
  const imagePath = `${process.env.NEXT_PUBLIC_COMPANIES_CONTENT_IMAGE}`;
  if (!blog || !blog.data) {
    return notFound();
  }

  return (
    <>
      <section className="our-blog pt0 pb0 " >
        {blog?.success ? (
          <>
            <CompaniesHead blog={blog?.data} imagePath={imagePath} />
            <ContentPhotoList company={blog?.data?.landingPageDetails} imagePath={imagePath} />
            <WhatsAppButton data={blog?.data?.titleAR} />
          </>
        ) : (
          <BlogError blog={blog} blogId={params.id} />
        )}
      </section>
    </>
  );
};

export default page;
