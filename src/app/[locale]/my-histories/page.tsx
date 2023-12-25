"use client";

import { useGetMeQuery } from "@/app/api/clientRequests/user/user.api";
import { Histories } from "@/components/modules";
import { NoContent, Preloader } from "@/components/reusedComponents";
import { useTranslations } from "use-intl";

const MyHistory = () => {
  const { data, isLoading, isError } = useGetMeQuery();
  const t = useTranslations("history");

  if (isLoading) {
    return <Preloader type="blocking" />;
  }
  if (data) {
    return <Histories />;
  } else {
    return <NoContent text={t("signInFirst")} />;
  }
};

export default MyHistory;
