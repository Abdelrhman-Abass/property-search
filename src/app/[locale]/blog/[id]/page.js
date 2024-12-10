"use server";
import BlogHead from "../components/BlogHead";
import BlogContent from "../components/BlogContent";
import BlogError from "../components/BlogError";
import { ApiGetter } from "@/services/ApiGetter";
import { notFound } from "next/navigation";

export const fetchData = async (id) => {
  const blog = await ApiGetter({ url: `/api/Blog/${id}` });
  
  return blog;
};

export async function generateMetadata({ params }) {
  const blog = await fetchData(params.id);
  // console.log(blog)
  const title = blog?.data?.seoTitle;
  const description = blog?.data?.seoDescription;
  // const description = blog?.data?.seoMetaTags;
  const custom = blog?.data?.seoMetaTags;
  const image = blog?.data?.image
    ? process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE + `/${blog?.data?.image}`
    : "";
    const seoResult = {
      custom,
      title,
      description,
      openGraph: {
        custom,
        title,
        description,
        images: image ? [{ url: image }] : undefined,
      },
      twitter: {
        custom,
        title,
        description,
        card: "summary", // Twitter card type
        image: image || undefined,
      },
      additionalMetaTags: [], // Always initialize as an array

    };
  
    // Handle additional meta tags
    // if (custom) {
    //   seoResult.additionalMetaTags.push({
    //     name: "keywords",
    //     content: custom, // Add as a comma-separated string
    //   });
    // }

  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  }
  // if (blog?.data?.seoMetaTags) {
  //   const tags = Array.isArray(blog.data.seoMetaTags)
  //     ? blog.data.seoMetaTags
  //     : [blog.data.seoMetaTags];

  //   seoResult.additionalMetaTags.push(
  //     ...tags.map((tag) => ({
  //       name: "custom-tag",
  //       content: tag,
  //     }))
  //   );
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
