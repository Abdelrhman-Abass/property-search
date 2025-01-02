"use server";
import BlogsWrapper from "./components/BlogsWrapper";
import BlogBreadcumb from "./components/BlogBreadcumb";
import { ApiGetter } from "@/services/ApiGetter";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const fetchData = async (page = 1, pageSize) => {
  const blogs = await ApiGetter({
    url: `/api/Blog?page=${page}&pageSize=${pageSize}`,
  });
  return blogs;
};

export async function generateMetadata({ params }) {
  return {
    title: params?.locale == "ar" ? "المقالات" : "Blogs",
  };
}

const page = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const pageSize = 10;
  const blogsData = await fetchData(page, pageSize);
  // (blogsData)


  return (
    <div className="bgc-f7 pt0-md pt70 pb-0">
      <BlogBreadcumb />
      <section className="our-blog pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="">
              {/* col-lg-8 */}
              <BlogsWrapper pageSize={pageSize} blogsData={blogsData} />
            </div>
            {/* <div className="col-lg-4">
              <BlogSidebar />
            </div> */}
          </div>
        </div>
      </section>
      <WhatsAppButton data={"property search"} url={`blog`}/>

    </div>
  );
};

export default page;
