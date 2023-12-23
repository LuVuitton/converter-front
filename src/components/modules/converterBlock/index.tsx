"use client";
import React, { ChangeEvent, useState } from "react";
import s from "./index.module.scss";
import cl from "classnames";
import { CurrenciesOptions } from "@/helpers/separateFavorites";
import ToFavoriteBtn from "./toFavoritesBtn";

const ConverterBlock = ({
  currency,
  onChangeCurrency,
  onChangeValue,
  value,
  currenciesOptions,
  favoritesChanged,
}: ConverterBlockProps) => {
  const [selectedViaList, setSelectedViaList] = useState(false);
  const { favorites, rest } = currenciesOptions;

  const mappedCur = favorites.map((c) => {
    const isActiveClass = currency === c ? s.curLIstActive : "";
    return (
      <li
        key={c}
        onClick={() => {
          setSelectedViaList(true);
          onChangeCurrency(c);
        }}
        className={cl(s.curLIstItem, isActiveClass)}
      >
        {c}
      </li>
    );
  });

  const mappedRest = [
    <option key="default" value="choose">
      {"Выберите валюту"}
    </option>,
    ...rest.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    )),
  ];

  const favoritesChangedHandler = () => {
    favoritesChanged();
    setSelectedViaList(false);
  };

  const currencyChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedViaList(false);
    onChangeCurrency(event.target.value);
  };

  return (
    <div className={s.cur}>
      <select
        onChange={currencyChangeHandler}
        value={selectedViaList ? "" : currency}
      >
        {mappedRest}
      </select>
      <ToFavoriteBtn
        currency={currency}
        favorites={favorites}
        callback={favoritesChangedHandler}
      />

      <ul className={s.curLIst}>{mappedCur}</ul>

      <input
        type="number"
        onChange={(e) => onChangeValue(+e.target.value)}
        value={value}
        className={s.curInput}
      />
    </div>
  );
};

export default ConverterBlock;

type ConverterBlockProps = {
  currenciesOptions: CurrenciesOptions;
  value: number;
  currency: string;
  onChangeCurrency: (cur: string) => void;
  onChangeValue: (e: number) => void;
  favoritesChanged: () => void;
};
