import { ChangeEvent } from "react";
import s from "./index.module.scss";

const ConverterSelect = ({
  rest,
  currencyChangeHandler,
  currency,
  selectedViaList,
}: Props) => {
  const mappedRest = [
    <option key="default" value="choose">
      {"choose currency"}
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
      className={s.select}
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
