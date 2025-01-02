"use server";
import BlogsWrapper from "../../../(Companies)/[locale]/companies/components/BlogsWrapper";
import BlogBreadcumb from "@/app/(Companies)/[locale]/companies/components/BlogBreadcumb";
import { ApiGetter } from "@/services/ApiGetter";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Header from "@/layout/Header";


export const fetchData = async (page = 1, pageSize) => {
  const companies = await ApiGetter({
    url: `/api/LandingPage?page=${page}&pageSize=${pageSize}`,
  });
  return companies;
};

export async function generateMetadata({ params }) {
  const { locale } = await params; // Await params to resolve dynamically

  return {
    title: locale == "ar" ? "الشركات المطورة" : "ٌDevelopers Companies",
  };
}

const page = async ({ searchParams }) => {
  const page = await searchParams?.page || 1;
  const pageSize = 10;
  const companiesData = await fetchData(page, pageSize);


  return (
  <>
  <Header />
    <div className="bgc-f7 pt0-md pt70 pb-0">
      <BlogBreadcumb />
      <section className="our-blog pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="">
              {/* col-lg-8 */}
              <BlogsWrapper pageSize={pageSize} blogsData={companiesData} />
            </div>
            {/* <div className="col-lg-4">
              <BlogSidebar />
            </div> */}
          </div>
        </div>
      </section>
      <WhatsAppButton data={"property search"} url={`companies`}/>
      
    </div>
  
  </>
  );
};

export default page;
