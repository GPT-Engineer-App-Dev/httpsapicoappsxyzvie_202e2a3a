import React, { createContext, useState, useEffect } from "react";

export const MockAPIContext = createContext();

export const MockAPIProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [gameOutcome, setGameOutcome] = useState({});
  const [favoriteGames, setFavoriteGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await fetch("https://a.picoapps.xyz/view-race");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const markGameAsPlayed = (gameName) => {
    if (!playedGames.includes(gameName)) {
      setPlayedGames([...playedGames, gameName]);
    }
  };

  const toggleGameFavorite = (gameName) => {
    setFavoriteGames((prevFavorites) =>
      prevFavorites.includes(gameName)
        ? prevFavorites.filter((name) => name !== gameName)
        : [...prevFavorites, gameName]
    );
  };

  return (
    <MockAPIContext.Provider
      value={{
        games,
        fetchGames,
        playedGames,
        markGameAsPlayed,
        favoriteGames,
        toggleGameFavorite,
      }}
    >
      {children}
    </MockAPIContext.Provider>
  );
};