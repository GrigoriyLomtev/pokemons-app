import { createTheme } from "@mui/material";

// Main theme
export const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: () => ({
          backgroundColor: "#1986EC",
        }),
      },
    },
  },
  palette: {
    background: {
      default: "#131313",
    },
    text: {
      primary: "#FFFFFF",
    },
    secondary: {
      main: "#A0A0A0",
    },
  },
});
