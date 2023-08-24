import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ISelectedPokemon } from "../types";

interface PokemonCardProps {
  selectedPokemon: ISelectedPokemon;
}

function PokemonCard({ selectedPokemon }: PokemonCardProps) {
  const { attack, height, id, img, name, starred } = selectedPokemon;

  return (
    <Card
      sx={{
        backgroundColor: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "44px 44px 0",
      }}
    >
      <Typography variant="h2" color="secondary">
        {name}
      </Typography>
      <CardMedia
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: 250,
          margin: "44px auto 0",
        }}
        image={img}
        title="pokemon"
      />
      <CardContent sx={{ marginTop: "auto" }}>
        <Typography color="secondary">{`Снялся в ${starred} сериях`}</Typography>
        <Typography color="secondary">{`id: ${id}`}</Typography>
        <Typography color="secondary">{`height: ${height}`}</Typography>
        <Typography color="secondary">{`attack: ${attack}`}</Typography>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
