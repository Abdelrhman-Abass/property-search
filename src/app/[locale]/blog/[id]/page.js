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
  console.log(blog)
  const title = blog?.data?.seoTitle;
  const description = blog?.data?.seoDescription;
  const image = blog?.data?.image
    ? process.env.NEXT_PUBLIC_ARTICLES_CONTENTS_IMAGE + `/${blog?.data?.image}`
    : "";
  let seoResult = {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
  if (image) {
    seoResult.twitter = { ...seoResult.twitter, image };
    seoResult.openGraph = { ...seoResult.openGraph, images: [{ url: image }] };
  }
  if (blog?.data?.seoMetaTags) {
    let tags = blog?.data.seoMetaTags;
    tags = Array.isArray(tags) && tags.length > 0 ? tags : [tags];
    seoResult.other = tags.map((tag) => ({
      title: tag,
      content: tag,
    }));
  }

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
      <section className="our-blog pt150 ">
        {blog?.success ? (
          <>
            <BlogHead blog={blog?.data} imagePath={imagePath} />
            <BlogContent
              contents={blog?.data?.contents}
              imagePath={imagePath}
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
