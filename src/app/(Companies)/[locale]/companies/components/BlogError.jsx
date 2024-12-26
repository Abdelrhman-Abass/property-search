"use client";
import ErrorMessage from "@/components/Error/ErrorMessage";
import { useTranslations } from "next-intl";
import React from "react";

const BlogError = ({ blog, blogId }) => {
  const t = useTranslations("blogs");
  return (
    <div className="container">
      <ErrorMessage
        networkError={blog === null}
        error={t("blogDetailsError") + ` ${blogId}`}
      />
    </div>
  );
};

export default BlogError;
