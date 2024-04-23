import { Flex, Box, Text } from "@chakra-ui/react";
import { MockAPIProvider } from "./contexts/MockAPIContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
// RealPokiesPage import has been removed
import Index from "./pages/Index";
import Pokies from "./pages/Pokies";
import Navigation from "./components/Navigation";
import GenericGamePage from "./pages/GenericGamePage";
import NewGamePage from "./pages/NewGamePage";
import TopGames from "./pages/TopGames";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Router>
      <MockAPIProvider>
        <Navigation />
        <Flex direction="column" minH="100vh" bg="gray.50">
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Index />} />
              // The route for RealPokiesPage has been removed
              <Route path="/pokies" element={<Pokies />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </MockAPIProvider>
    </Router>
  );
}

export default App;
