import { ChangeEvent, useState } from "react";
import s from "./index.module.scss";
import cl from "classnames";
import { useTranslations } from "next-intl";

const ConverterSelect = ({
  rest,
  currencyChangeHandler,
  currency,
  selectedViaList,
}: Props) => {
  const t = useTranslations("converter");
  const mappedRest = [
    <option key="default" value="choose">
      {t("chooseSelect")}
    </option>,
    ...rest.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    )),
  ];
  return (
    <select
      onChange={currencyChangeHandler}
      value={selectedViaList ? "" : currency}
      className={cl(s.select)}
    >
      {mappedRest}
    </select>
  );
};

export default ConverterSelect;

type Props = {
  rest: string[];
  currencyChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedViaList: boolean;
  currency: string;
};
