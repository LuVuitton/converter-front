"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { SignInFormSchema } from "./formScheme/SignInFormSchema";
import { useLoginMutation } from "@/app/api/clientRequests/auth/auth.api";
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

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<SignInInputs>({
    resolver: yupResolver(SignInFormSchema()),
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations("auth");
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    isLogged && router.push("/");
  }, [isLogged, router]);

  const [toLogin] = useLoginMutation();

  const onSubmit: SubmitHandler<SignInInputs> = (formData) => {
    toLogin(formData)
      .unwrap()
      .then((r) => {
        const { userID, userRegistrationDate, username } = r;
        dispatch(setUserData({ userID, userRegistrationDate, username }));
        dispatch(setIsLogged({ isLogged: true, token: r.token }));
      });
  };

  return (
    <Section className={s.wrapper}>
      <div className={s.container}>
        <AuthHead title={t("signIn")} description={t("signInDesc")} />
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
            type={"text"}
            register={register}
            registerName={"password"}
            placeholder={t("password")}
            error={errors.password}
            errorMessage={errors?.password?.message}
          />
          <Button
            btnText={t("signIn")}
            type="submit"
            isLoading={isLoading}
            disabled={!isValid}
            className={s.formBtn}
          />
        </form>
        <ToAnotherAuth
          linkTo={"/sign-up"}
          linkText={t("dontHaveAccount")}
          description={t("dontHaveAccountDesc")}
        />
      </div>
    </Section>
  );
}

type SignInInputs = {
  username: string;
  password: string;
};
