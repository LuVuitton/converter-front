"use client";
import {
  HistoryItem,
  useRemoveHistoryMutation,
} from "@/app/api/clientRequests/histories/histories.api";
import { formatDateTime } from "@/helpers/formatDate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Histories = ({ histories }: { histories: HistoryItem[] }) => {
  const [histList, setHistList] = useState<HistoryItem[]>(histories);

  const [removeHistory, { data, isError, isLoading, isSuccess }] =
    useRemoveHistoryMutation();

  const removeHistoryHandler = (historyItemID: number) => {
    removeHistory({ historyItemID });
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success("succesfuly removed");
      const sortedHistList = histList.filter(
        (h) => h.historyItemID !== data.historyItemID
      );
      setHistList(sortedHistList);
    }
  }, [isSuccess, data]);

  const mappedHistories = histList.map((h) => {
    const creationDate: string = formatDateTime(h.historyCreationDate);

    return (
      <div key={h.historyItemID}>
        <li>
          <span>{h.firstСurrencyst} </span>
          <span>{h.firstValue} </span>
          <span>{h.secondСurrencyst} </span>
          <span>{h.secondValue} </span>
          <span>creation date: {creationDate}</span>
        </li>
        <button onClick={() => removeHistoryHandler(h.historyItemID)}>
          REMOVE THIS
        </button>
      </div>
    );
  });
  return (
    <>
      <div>Histories</div>
      <ul>{mappedHistories}</ul>
    </>
  );
};

export default Histories;
