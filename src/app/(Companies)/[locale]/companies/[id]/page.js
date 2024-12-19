"use server";
import BlogError from "../components/BlogError";
import { ApiGetter } from "@/services/ApiGetter";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import CompaniesHead from "../components/CompaniesHead";
import ContentPhotoList from "../components/ContentPhotoList";

export const fetchData = async (id) => {
  const blog = await ApiGetter({ url: `/api/LandingPage/${id}` });
  console.log(blog)
  return blog;
};

export async function generateMetadata({ params }) {
  const blog = await fetchData(params.id);
  const title = blog?.data?.seoTitle;
  const description = blog?.data?.seoDescription;
  // const description = blog?.data?.seoMetaTags;
  const keywords = blog?.data?.seoMetaTags;
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
      {/* Blog Section Area */}
      <section className="our-blog pt0 pb0 " >
        {blog?.success ? (
          <>
            <CompaniesHead blog={blog?.data} imagePath={imagePath} />
            <ContentPhotoList company={blog?.data?.landingPageDetails} imagePath={imagePath} />

            {/* <BlogContent
              contents={blog?.data?.contents}
              imagePath={imagePath}
              questions={blog?.data?.questions}
            /> */}

              <WhatsAppButton data={blog?.data?.titleAR}/>
              
              

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
