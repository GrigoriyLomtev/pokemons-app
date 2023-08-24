import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Chip,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
} from "@mui/material";
import PokemonCard from "./components/PokemonCard";
import { IPokemon, ISelectedPokemon } from "./types";
import { theme } from "./styles/theme";
import TheHeader from "./components/TheHeader";

function App() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<ISelectedPokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?limit=10"
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonClick = async (pokemon: IPokemon) => {
    try {
      console.log(pokemon);
      const response = await axios.get(pokemon.url);
      const pokemonData = {
        name: response.data.name,
        img: response.data.sprites.front_shiny,
        starred: response.data.moves.length,
        id: response.data.id,
        height: response.data.height,
        attack: response.data.stats[0].base_stat,
      };
      setSelectedPokemon(pokemonData);
      console.log(response);
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <TheHeader />
        <Container sx={{ minWidth: "1280px", marginTop: "54px" }}>
          <Box
            sx={{
              padding: "0 126px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "50%", display: "block" }}>
              {pokemons.map((pokemon) => (
                <Box
                  sx={{
                    display: "inline-block",
                    margin: "4px",
                  }}
                  key={pokemon.name}
                >
                  <Chip
                    sx={{
                      padding: "28px 10px",
                      fontSize: "20px",
                      borderRadius: "30px",
                    }}
                    label={pokemon.name}
                    onClick={() => handlePokemonClick(pokemon)}
                  />
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                height: "500px",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!selectedPokemon && (
                <Typography
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Покемон не выбран!
                </Typography>
              )}
              {selectedPokemon && (
                <PokemonCard selectedPokemon={selectedPokemon} />
              )}
            </Box>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
