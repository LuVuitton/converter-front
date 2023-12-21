import { FieldError, UseFormRegister } from "react-hook-form";
import s from "./index.module.scss";
import { HTMLInputTypeAttribute } from "react";
import { InputError } from "@/components/formComponents/";
import cl from "classnames";

const Input: React.FC<Props> = ({
  register,
  registerName,
  placeholder,
  error,
  errorMessage,
  type,
  isTextarea = false,
  rows,
}) => {
  const InputComponent = isTextarea ? "textarea" : "input";
  const errorClass = error ? s.redBorder : "";

  return (
    <div className={s.input}>
      <InputComponent
        type={type}
        {...register(registerName)}
        placeholder={placeholder}
        className={cl(s.inputField, errorClass)}
        rows={rows}
      />
      <InputError
        error={error}
        errorMessage={errorMessage}
        className={s.inputError}
      />
    </div>
  );
};

export default Input;

type Props = {
  register: UseFormRegister<any>;
  registerName: string;
  placeholder: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  type?: HTMLInputTypeAttribute;
  isTextarea?: boolean;
  rows?: number;
};
