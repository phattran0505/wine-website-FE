import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

import { BASE_URL } from "../config/utils";

export const FavoriteContext = createContext();

function FavoriteProvider({ children }) {
  const { data: wines } = useFetch(`${BASE_URL}/wines`);
  const [heart, setHeart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const addToFavorites = (itemId) => {
    setHeart(!heart);
    // Find the item to add
    const itemToAdd = wines.find((item) => item._id === itemId);

    // Check if already in favorites
    const alreadyFavorite = favorites.some((fav) => fav._id === itemId);
    if (!alreadyFavorite) {
      setFavorites([...favorites, itemToAdd]);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, heart, addToFavorites, setFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;
