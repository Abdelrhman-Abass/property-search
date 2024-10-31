"use client";
import React, { useState } from "react";
import Pagination from "@/layout/Pagination";
import Blog from "./Blog";
import ErrorMessage from "@/components/Error/ErrorMessage";
import { useTranslations } from "next-intl";

const BlogsWrapper = ({ blogsData, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogsData?.data.totalRecords / pageSize);
  const t = useTranslations("blogs");

  return (
    <>
      <div className="blog-wrapper">
        {blogsData?.success && blogsData?.data?.items?.length ? (
          blogsData?.data?.items?.map((blog) => (
            <Blog id={blog.id} blog={blog} />
          ))
        ) : (
          <ErrorMessage
            networkError={blogsData === null}
            error={t("blogsError")}
          />
        )}
      </div>

      <div className="row">
        <div className="mbp_pagination text-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default BlogsWrapper;
