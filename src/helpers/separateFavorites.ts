import { getFavoriteCurrencies } from "./favoritesCurrencyes";

export const getCurrencies = (currencies: string[]): CurrenciesOptions => {
  const favorites = getFavoriteCurrencies();
  const rest = currencies.filter((currency) => !favorites.includes(currency));

  return {
    favorites,
    rest,
  };
};

export type CurrenciesOptions = {
  favorites: string[];
  rest: string[];
};
