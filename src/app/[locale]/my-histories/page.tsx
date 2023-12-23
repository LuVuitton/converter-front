"use client";

import { useGetHistoryQuery } from "@/app/api/clientRequests/histories/histories.api";
import { Histories } from "@/components/modules";

const MyHistory = () => {
  const { data, isError, isLoading } = useGetHistoryQuery();

  if (isError) {
    return <div>ERROR</div>;
  }
  if (isLoading) {
    return <div> loading...</div>;
  }
  if (data) {
    return <Histories histories={data.histories} />;
  }
};

export default MyHistory;
