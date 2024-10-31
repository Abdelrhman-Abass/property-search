import { useTranslations } from "next-intl";

export const networkErrorMessage = () => {
  const t = useTranslations("global");
  const message = t("fethError");
  return message;
};
