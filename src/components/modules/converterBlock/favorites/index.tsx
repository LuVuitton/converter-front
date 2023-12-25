import cl from "classnames";
import s from "./index.module.scss";
import { NoContent } from "@/components/reusedComponents";
import { useTranslations } from "next-intl";

export const Favorites = ({
  favorites,
  currency,
  setSelectedViaList,
  onChangeCurrency,
}: Props) => {
  const t = useTranslations("converter");
  if (favorites.length === 0) {
    return <NoContent text={t("favEmpty")} />;
  }

  const mappedFavorites = favorites.map((c) => {
    const isActiveClass = currency === c ? s.favoritesActive : "";
    return (
      <li
        key={c}
        onClick={() => {
          setSelectedViaList(true);
          onChangeCurrency(c);
        }}
        className={cl(s.favoritesItem, isActiveClass)}
      >
        {c}
      </li>
    );
  });

  return <ul className={s.favorites}>{mappedFavorites}</ul>;
};

export default Favorites;

type Props = {
  favorites: string[];
  currency: string;
  setSelectedViaList: (value: React.SetStateAction<boolean>) => void;
  onChangeCurrency: (c: string) => void;
};
