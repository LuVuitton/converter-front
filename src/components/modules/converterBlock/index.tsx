"use client";
import React, { ChangeEvent, useState } from "react";
import s from "./index.module.scss";
import { CurrenciesOptions } from "@/helpers/separateFavorites";
import ToFavoriteBtn from "./toFavoritesBtn";
import { InputNumber } from "@/components/reusedComponents";
import Favorites from "./favorites";
import ConverterSelect from "./select";

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
      <div className={s.curDesc}>{"choose currency here"} </div>

      <ConverterSelect
        currency={currency}
        currencyChangeHandler={currencyChangeHandler}
        selectedViaList={selectedViaList}
        rest={rest}
      />
      <div className={s.curDesc}> {"or from favorites"}</div>
      <Favorites
        currency={currency}
        favorites={favorites}
        onChangeCurrency={onChangeCurrency}
        setSelectedViaList={setSelectedViaList}
      />

      <InputNumber onChangeValue={(e) => onChangeValue(e)} value={value} />
      <ToFavoriteBtn
        currency={currency}
        favorites={favorites}
        callback={favoritesChangedHandler}
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

{
  /* <input
        type="number"
        onChange={(e) => onChangeValue(+e.target.value)}
        value={value}
        className={s.curInput}
      /> */
  // const mappedFavorites = favorites.map((c) => {
  //   const isActiveClass = currency === c ? s.curFavoritesActive : "";
  //   return (
  //     <li
  //       key={c}
  //       onClick={() => {
  //         setSelectedViaList(true);
  //         onChangeCurrency(c);
  //       }}
  //       className={cl(s.curFavoritesItem, isActiveClass)}
  //     >
  //       {c}
  //     </li>
  //   );
  // });
  /* <ul className={s.curFavorites}>{mappedFavorites}</ul> */
  // const mappedRest = [
  //   <option key="default" value="choose">
  //     {"choose currency"}
  //   </option>,
  //   ...rest.map((option) => (
  //     <option key={option} value={option}>
  //       {option}
  //     </option>
  //   )),
  // ];
  /* <select
        onChange={currencyChangeHandler}
        value={selectedViaList ? "" : currency}
        className={s.curSelect}
      >
        {mappedRest}
      </select> */
}
