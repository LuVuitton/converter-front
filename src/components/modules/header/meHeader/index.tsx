"use client";
import s from "./index.module.scss";
import { useGetMeQuery } from "@/app/api/clientRequests/user/user.api";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Link } from "@/navigation";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import cl from "classnames";
import { historiesApiSlice } from "@/app/api/clientRequests/histories/histories.api";
import { Preloader } from "@/components/reusedComponents";
import { useTranslations } from "next-intl";

const MeHeader = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetMeQuery();
  const t = useTranslations("header");
  const userName = useAppSelector((state) => state.user.data?.username);

  const logOutHandler = () => {
    dispatch(setIsLogged({ isLogged: false }));
    dispatch(historiesApiSlice.util.resetApiState());
  };

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
      dispatch(setIsLogged({ isLogged: true }));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Preloader type="local" />;
  }

  const authLink = userName ? (
    <div onClick={logOutHandler} className={cl(s.navItem, s.navLink)}>
      {t("logOut")}
    </div>
  ) : (
    <Link href={"/sign-in"}>
      <div className={cl(s.navItem, s.navLink)}>{t("signIn")} </div>
    </Link>
  );

  const content = userName ? (
    <div className={cl(s.navItem, s.navName)}>{userName}</div>
  ) : (
    ""
  );

  return (
    <nav className={s.nav}>
      <Link href={"/my-histories"}>
        <div className={cl(s.navItem, s.navLink)}>{t("myHistories")} </div>
      </Link>
      <Link href={"/"}>
        <div className={cl(s.navItem, s.navLink)}>{t("main")} </div>
      </Link>
      {authLink} {content}
    </nav>
  );
};

export default MeHeader;
