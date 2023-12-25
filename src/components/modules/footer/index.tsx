"use client";
import { usePathname, useRouter } from "@/navigation";
import s from "./index.module.scss";
import { useTranslations } from "next-intl";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("footer");

  const switchLang = (lang: string) => {
    router.replace(`${pathname}`, { locale: lang });
  };

  const locale = [
    { lang: "English", value: "en" },
    { lang: "Українська", value: "ua" },
  ];
  const loacaleList = locale.map((e) => (
    <li
      key={e.lang}
      className={s.footerListItem}
      onClick={() => switchLang(e.value)}
    >
      {e.lang}
    </li>
  ));
  return (
    <footer className={s.footer}>
      <div className={s.footerTitle}> {t("choose")}</div>
      <ul className={s.footerList}>{loacaleList}</ul>
    </footer>
  );
};

export default Footer;
