import { Box, Typography } from "@mui/material";
import clickHandIcon from "../assets/Icon.svg";

function TheHeader() {
  return (
    <header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "100px auto 0",
          padding: "0 150px",
          fontSize: "12px",
        }}
      >
        <Box
          sx={{
            border: "1px solid white",
            alignSelf: "center",
            padding: "4px",
          }}
        >
          ПОКЕМОНЫ API
        </Box>
        <Box sx={{ display: "flex", width: "150px" }}>
          <img src={clickHandIcon} alt="clickHand" />
          <Typography sx={{ marginLeft: "10px", fontSize: "12px" }}>
            Нажмите на нужного Покемона
          </Typography>
        </Box>
      </Box>
    </header>
  );
}

export default TheHeader;
