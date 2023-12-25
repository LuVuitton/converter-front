"use client";
import { useGetHistoryQuery } from "@/app/api/clientRequests/histories/histories.api";
import HistoriesList from "./historiesList";
import toast from "react-hot-toast";
import { Preloader } from "@/components/reusedComponents";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

const Histories = () => {
  const router = useRouter();
  const t = useTranslations("history");
  const { data, isError, isLoading } = useGetHistoryQuery();

  if (isError) {
    toast.error(t("historySignInFirst"));
    router.push("/sign-in");
  }
  if (isLoading) {
    return <Preloader type="local" />;
  }
  if (data) {
    return <HistoriesList histories={data.histories} />;
  }
};

export default Histories;
