"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useRegistrationMutation } from "@/app/api/clientRequests/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useRouter } from "@/navigation";
import {
  AuthHead,
  Button,
  Section,
  ToAnotherAuth,
} from "@/components/reusedComponents";
import { Input } from "@/components/formComponents";
import { SignUpFormSchema } from "./formScheme/SignUpFormSchema";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(SignUpFormSchema()),
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations("auth");
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const [toSignUp, registrationData] = useRegistrationMutation();

  useEffect(() => {
    isLogged && router.push("/");
  }, [isLogged, router]);

  const onSubmit: SubmitHandler<SignUpInputs> = (formData) => {
    const { passwordConfirm, ...registrationDto } = formData;
    toSignUp(registrationDto);
  };

  if (registrationData.data) {
    const { token, ...userData } = registrationData.data;
    dispatch(setUserData(userData));
    dispatch(setIsLogged({ isLogged: true, token: token }));
  }

  if (registrationData.error && "data" in registrationData.error) {
    // toast.error(registrationData.error.data.message);
  }

  return (
    <Section className={s.wrapper}>
      <div className={s.container}>
        <AuthHead title={t("signUp")} description={t("signUpDesc")} />
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type={"text"}
            register={register}
            registerName={"username"}
            placeholder={t("userName")}
            error={errors.username}
            errorMessage={errors?.username?.message}
          />
          <Input
            type={"password"}
            register={register}
            registerName={"password"}
            placeholder={t("password")}
            error={errors.password}
            errorMessage={errors?.password?.message}
          />
          <Input
            type={"password"}
            register={register}
            registerName={"passwordConfirm"}
            placeholder={t("passwordConfirm")}
            error={errors.passwordConfirm}
            errorMessage={errors?.passwordConfirm?.message}
          />
          <Button
            btnText={t("signUp")}
            type="submit"
            isLoading={isLoading}
            disabled={!isValid}
            className={s.formBtn}
          />
        </form>
        <ToAnotherAuth
          linkTo={"/sign-in"}
          linkText={t("alreadyHaveAccount")}
          description={t("alreadyHaveAccountDesc")}
        />
      </div>
    </Section>
  );
}

type SignUpInputs = {
  username: string;
  password: string;
  passwordConfirm: string;
};
