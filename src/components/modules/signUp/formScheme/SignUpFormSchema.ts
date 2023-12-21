import { useTranslations } from "next-intl";
import * as yup from "yup";

export const SignUpFormSchema = () => {
  const t = useTranslations("auth.errors");

  const usernameValidation = yup
    .string()
    .required(t("required"))
    .min(3, t("usernameMin"))
    .max(20, t("usernameMax"));

  const passwordValidation = yup
    .string()
    .required(t("required"))
    .min(6, t("passwordMin"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[\r\n])/,
      t("passwordValidation")
    );

  const passwordConfirmValidation = yup
    .string()
    .required(t("required"))
    .oneOf([yup.ref("password")], t("passwordConfirm"));

  return yup.object({
    username: usernameValidation,
    password: passwordValidation,
    passwordConfirm: passwordConfirmValidation,
  });
};
