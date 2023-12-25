"use client";
import {
  HistoryItem,
  useRemoveHistoryMutation,
} from "@/app/api/clientRequests/histories/histories.api";
import {
  Button,
  NoContent,
  Section,
  Title,
} from "@/components/reusedComponents";
import { formatDateTime } from "@/helpers/formatDate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import s from "./index.module.scss";
import { useTranslations } from "next-intl";

const HistoriesList = ({ histories }: { histories: HistoryItem[] }) => {
  const [histList, setHistList] = useState<HistoryItem[]>(histories);
  const t = useTranslations("history");

  const [removeHistory, { data, isError, isLoading, isSuccess }] =
    useRemoveHistoryMutation();

  const removeHistoryHandler = (historyItemID: number) => {
    removeHistory({ historyItemID });
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(t("succesfulyRemoved"));
      const sortedHistList = histList.filter(
        (h) => h.historyItemID !== data.historyItemID
      );
      setHistList(sortedHistList);
    }
  }, [isSuccess, data]);

  const mappedHistories = histList.map((h) => {
    const creationDate: string = formatDateTime(h.historyCreationDate);

    return (
      <tr key={h.historyItemID} className={s.tableItem}>
        <td className={s.tableItemCur}>
          <div className={s.tableItemCurCurency}>{h.firstСurrencyst}</div>{" "}
          <div className={s.tableItemCurValue}>{h.firstValue.toFixed(3)}</div>
        </td>
        <td className={s.tableItemCur}>
          <div className={s.tableItemCurCurency}>{h.secondСurrencyst}</div>
          <div className={s.tableItemCurValue}>{h.secondValue.toFixed(3)}</div>
        </td>
        <td className={s.tableItemCreationDate}>
          <div> {t("creationDate")}:</div> <div>{creationDate}</div>
        </td>
        <td>
          <button
            onClick={() => removeHistoryHandler(h.historyItemID)}
            className={s.tableItemBtn}
          ></button>
        </td>
      </tr>
    );
  });

  if (mappedHistories.length === 0) {
    return <NoContent text={t("beforeAdd")} />;
  }
  return (
    <>
      <Title className={s.title} type="medium">
        {t("histories")}
      </Title>

      <Section>
        <table className={s.table}>
          <tbody>{mappedHistories}</tbody>
        </table>
      </Section>
    </>
  );
};

export default HistoriesList;
