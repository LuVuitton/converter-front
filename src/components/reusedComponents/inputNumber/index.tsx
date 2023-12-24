import React, { ChangeEvent } from "react";
import s from "./index.module.scss";

const InputNumber = ({ onChangeValue, value }: Props) => {
  const formattedValue = value.toString();
  const mainValue = parseInt(formattedValue).toString(); //berem tolko celoe
  const additionalValue = formattedValue
    .slice(mainValue.length)
    .substring(0, 6);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(+e.target.value);
  };

  return (
    <div className={s.number}>
      <input
        type="number"
        onChange={handleInputChange}
        value={mainValue}
        className={s.numberInput}
      />
      <div className={s.numberAdd}>{additionalValue}</div>
    </div>
  );
};

export default InputNumber;

type Props = {
  onChangeValue: (value: number) => void;
  value: number;
};
