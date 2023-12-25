import { Button, Modal } from "@/components/reusedComponents";
import { currencyActions } from "@/helpers/favoritesCurrencyes";
import { useState } from "react";
import ModalChild from "../modalChild";
import { useTranslations } from "next-intl";

const ToFavoriteBtn = ({ favorites, currency, callback }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("converter");

  const addFavorite = () => {
    if (favorites.length >= 6) {
      setIsModalOpen(true);
    } else {
      currencyActions.addFavoriteCurrency(currency);
      callback(currency);
    }
  };
  const removeFavorite = () => {
    currencyActions.removeFavoriteCurrency(currency);
    callback(currency);
  };

  const handleModalResponse = (confirmed: boolean) => {
    setIsModalOpen(false);
    if (confirmed) {
      currencyActions.removeFavoriteCurrency(favorites[0]);
      currencyActions.addFavoriteCurrency(currency);
      callback(currency);
    }
  };

  const isFavorite = favorites.includes(currency);
  const btnText = isFavorite
    ? `${t("remove")} ${currency} ${t("fromFav")}`
    : `${t("add")} ${currency} ${t("toFav")}`;
  const btnCallback = isFavorite ? removeFavorite : addFavorite;

  return (
    <>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalChild handleModalResponse={handleModalResponse} />
      </Modal>
      <Button btnText={btnText} callback={btnCallback} />
    </>
  );
};
export default ToFavoriteBtn;

type Props = {
  favorites: string[];
  currency: string;
  callback: (removedCurrency: string) => void;
};
