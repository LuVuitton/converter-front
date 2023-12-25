"use client";
import { Rates } from "@/app/api/serverRequests/getRates";
import { ConverterBlock } from "@/components/modules";
import { CurrenciesOptions, getCurrencies } from "@/helpers/separateFavorites";
import { useEffect, useState } from "react";
import AddToHistory from "./addToHistory";
import s from "./index.module.scss";
import { Preloader, Section } from "@/components/reusedComponents";

const Converter = ({ ratesData }: Converter) => {
  const [rerender, setRerender] = useState(true);
  const [currenciesOptions, setCurrenciesOptions] =
    useState<CurrenciesOptions | null>(null);

  const [firstValue, setFirstValue] = useState(1);
  const [secondValue, setSecondValue] = useState(0);

  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("UAH");

  const onChangeFirstValue = (value: number) => {
    const price = value / ratesData[firstCurrency];
    const res = price * ratesData[secondCurrency];
    setSecondValue(res);
    setFirstValue(value);
  };

  const onChangeSeconfValue = (value: number) => {
    const res = (ratesData[firstCurrency] / ratesData[secondCurrency]) * value;
    setSecondValue(value);
    setFirstValue(res);
  };

  useEffect(() => {
    onChangeSeconfValue(secondValue);
  }, [firstCurrency]);

  useEffect(() => {
    onChangeFirstValue(firstValue);
  }, [secondCurrency]);

  useEffect(() => {
    setCurrenciesOptions(getCurrencies(Object.keys(ratesData)));
  }, [rerender]);

  if (!currenciesOptions) {
    return <Preloader type="blocking"/>;
  }
  
  return (
    <>
      <Section className={s.section}>
        <div className={s.converter}>
          <ConverterBlock
            value={firstValue}
            onChangeCurrency={setFirstCurrency}
            onChangeValue={onChangeFirstValue}
            currency={firstCurrency}
            currenciesOptions={currenciesOptions}
            favoritesChanged={() => setRerender(!rerender)}
          />
          <ConverterBlock
            value={secondValue}
            onChangeCurrency={setSecondCurrency}
            onChangeValue={onChangeSeconfValue}
            currency={secondCurrency}
            currenciesOptions={currenciesOptions}
            favoritesChanged={() => setRerender(!rerender)}
          />
        </div>
      </Section>
      <Section className={s.section}>
        <AddToHistory
          firstСurrencyst={firstCurrency}
          firstValue={firstValue}
          secondСurrencyst={secondCurrency}
          secondValue={secondValue}
        />
      </Section>
    </>
  );
};

export default Converter;

type Converter = {
  ratesData: Rates;
};
