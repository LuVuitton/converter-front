import { useTranslations } from "next-intl";
import * as yup from "yup";

export const SignInFormSchema = () => {
  const t = useTranslations("auth.errors");

  const usernameValidation = yup.string().required(t("required"));
  const passwordValidation = yup.string().required(t("required"));

  return yup.object({
    username: usernameValidation,
    password: passwordValidation,
  });
};
