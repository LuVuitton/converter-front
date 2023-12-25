"use client";
import React, { ChangeEvent, useState } from "react";
import s from "./index.module.scss";
import { CurrenciesOptions } from "@/helpers/separateFavorites";
import ToFavoriteBtn from "./toFavoritesBtn";
import { InputNumber } from "@/components/reusedComponents";
import Favorites from "./favorites";
import ConverterSelect from "./select";
import { useTranslations } from "next-intl";

const ConverterBlock = ({
  currency,
  onChangeCurrency,
  onChangeValue,
  value,
  currenciesOptions,
  favoritesChanged,
}: ConverterBlockProps) => {
  const [selectedViaList, setSelectedViaList] = useState< boolean>(false);
  const { favorites, rest } = currenciesOptions;
  const t = useTranslations("converter")

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
      <div className={s.curDesc}>{t("chooseCurrency")} </div>

      <ConverterSelect
        currency={currency}
        currencyChangeHandler={currencyChangeHandler}
        selectedViaList={selectedViaList}
        rest={rest}

      />
      <div className={s.curDesc}> {t("or")}</div>
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

