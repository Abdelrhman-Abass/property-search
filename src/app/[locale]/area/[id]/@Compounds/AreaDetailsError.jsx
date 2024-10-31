"use client";

import ErrorMessage from "@/components/Error/ErrorMessage";
import { useTranslations } from "next-intl";

const AreaDetailsError = ({ areaDetails }) => {
  const t = useTranslations("global");
  return (
    <div className="bg-success d-flex align-items-center justify-content-center h-50">
      <ErrorMessage
        networkError={areaDetails === null}
        error={t("areaDetailsNotFound")}
      />
    </div>
  );
};

export default AreaDetailsError;
