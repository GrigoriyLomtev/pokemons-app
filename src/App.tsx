import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Chip,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import PokemonCard from "./components/PokemonCard";
import { IPokemon, ISelectedPokemon } from "./types";
import { theme } from "./styles/theme";
import TheHeader from "./components/TheHeader";

function App() {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<ISelectedPokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingList(true);
      setTimeout(async () => {
        try {
          const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon/?limit=10"
          );
          setPokemons(response.data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Произошла ошибка при загрузке списка покемонов");
        } finally {
          setIsLoadingList(false);
        }
      }, 500);
    };

    fetchData();
  }, []);

  const handlePokemonClick = async (pokemon: IPokemon) => {
    setIsLoadingPokemon(true);

    setTimeout(async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching pokemon data:", error);
        setError("Произошла ошибка при загрузке описания покемона");
      } finally {
        setIsLoadingPokemon(false);
      }
    }, 700);
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
              {isLoadingList && (
                <CircularProgress
                  sx={{
                    display: "flex",
                    margin: "100px auto",
                  }}
                />
              )}
              {error && (
                <Typography
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {error}
                </Typography>
              )}
              {!error &&
                !isLoadingList &&
                pokemons.map((pokemon) => (
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
              {!error && !isLoadingPokemon && !selectedPokemon && (
                <Typography
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Покемон не выбран!
                </Typography>
              )}
              {!error && isLoadingPokemon && (
                <>
                  <CircularProgress />
                  <Typography
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Загрузка данных о покемоне..
                  </Typography>
                </>
              )}
              {!error && !isLoadingPokemon && selectedPokemon && (
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
