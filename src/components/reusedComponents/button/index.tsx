"use client";
import cl from "classnames";
import s from "./index.module.scss";
import { Preloader } from "@/components/reusedComponents";

const Button: React.FC<Props> = ({
  callback,
  btnText,
  color = "green",
  isLoading,
  type = "button",
  disabled,
  className,
}) => {
  let btnColor: string = "";
  switch (color) {
    case "red":
      btnColor = s.redBtn;
      break;
    case "green":
      btnColor = s.greenBtn;
      break;
    default:
      break;
  }

  const disabledClass = disabled ? s.disabled : "";
  const colorClass = btnColor ? btnColor : "";

  return (
    <div className={className}>
      <button
        className={cl(s.btn, colorClass, disabledClass)}
        type={type}
        onClick={callback}
        disabled={disabled} //
      >
        <span className={s.btnText}>
          {isLoading ? <Preloader show type="local" /> : btnText}
        </span>
      </button>
    </div>
  );
};

export default Button;

type Props = {
  btnText: string;
  callback?: () => void;
  color?: "red" | "green";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};
