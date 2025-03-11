"use server";
import BlogHead from "../components/BlogHead";
import BlogContent from "../components/BlogContent";
import BlogError from "../components/BlogError";
import { ApiGetter } from "@/services/ApiGetter";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const fetchData = async (id) => {
  const blog = await ApiGetter({ url: `/api/Blog/${id}` });
  
  return blog;
};

export async function generateMetadata({ params }) {
  const blog = await fetchData(params.id);
  const title = blog?.data?.seoTitle;
  const description = blog?.data?.seoDescription;
  // const description = blog?.data?.seoMetaTags;
  // const keywords = blog?.data?.seoMetaTags;
  const image = blog?.data?.image
    ? process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE + `/${blog?.data?.image}`
    : "";

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
  let canonicalUrl = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/blog/${params.id}`;


  
    let seoResult = {
      title,
      description,
      keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        keywords,
        url: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}ar/blog/${params.id}`,
        images: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`     
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        keywords,
        card: "summary", // Twitter card type
        image: `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}slider.jpg`,
      },
    };
  

  // if (image) {
  //   seoResult.twitter = { ...seoResult.twitter, image };
  //   seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  // }
  return seoResult;
}

const page = async ({ params }) => {
  const blog = await fetchData(params.id);
  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE}`;
  if (!blog || !blog.data) {
    return notFound();
  }

  return (
    <>
      {/* Blog Section Area */}
      <section className="our-blog ">
        {blog?.success ? (
          <>
            <BlogHead blog={blog?.data} imagePath={imagePath} />
            <BlogContent
              contents={blog?.data?.contents}
              imagePath={imagePath}
              questions={blog?.data?.questions}
            />
              <WhatsAppButton data={blog?.data?.titleAR} url={`blog/${params.id}`}/>

          </>
        ) : (
          <BlogError blog={blog} blogId={params.id} />
        )}
      </section>
      {/* End Blog Details */}
      {/* <section className="pb90 pb20-md pt-0">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="main-title text-start text-md-center">
                <h2 className="title">Related Posts</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section> */}
    </>
  );
};

export default page;
