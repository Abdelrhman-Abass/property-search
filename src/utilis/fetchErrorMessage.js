import { useTranslations } from "next-intl";

export const NetworkErrorMessage = () => {
  const t = useTranslations("global");
  const message = t("fethError");
  return message;
};
