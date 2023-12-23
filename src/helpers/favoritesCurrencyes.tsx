export const getFavoriteCurrencies = (): string[] => {
  const favorites = localStorage.getItem("favoriteCurrencies");
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavoriteCurrencies = (favorites: string[]) => {
  localStorage.setItem("favoriteCurrencies", JSON.stringify(favorites));
};

export const currencyActions = {
  addFavoriteCurrency: (currency: string) => {
    let favorites: string[] = getFavoriteCurrencies();

    if (!favorites.includes(currency)) {
      if (favorites.length >= 6) {
        favorites = favorites.slice(1);
      }
      favorites.push(currency);
      saveFavoriteCurrencies(favorites);
    }
  },

  removeFavoriteCurrency: (currency: string) => {
    
    let favorites: string[] = getFavoriteCurrencies();

    const index = favorites.indexOf(currency);
    if (index !== -1) {
      favorites.splice(index, 1);
      saveFavoriteCurrencies(favorites);
    }
  },
};
