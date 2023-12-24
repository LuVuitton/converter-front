import { Button, Modal } from "@/components/reusedComponents";
import { currencyActions } from "@/helpers/favoritesCurrencyes";
import { useState } from "react";

const ToFavoriteBtn = ({ favorites, currency, callback }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const btnText = isFavorite ? `remove ${currency} from favorites` : `add ${currency} to favorites`;
  const btnCallback = isFavorite ? removeFavorite : addFavorite;

  return (
    <>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Do you want to replace the first currency in the list?</p>
        <Button btnText="Yes" callback={() => handleModalResponse(true)} />
        <Button btnText="No" callback={() => handleModalResponse(false)} />
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
