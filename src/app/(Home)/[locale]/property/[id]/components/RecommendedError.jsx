"use client";
import ErrorMessage from "@/components/Error/ErrorMessage";
import React from "react";
import { useTranslations } from "use-intl";

const RecommendedError = ({ data }) => {
  const t = useTranslations("home");
  return (
    <ErrorMessage networkError={data === null} error={t("recommendedError")} />
  );
};

export default RecommendedError;
