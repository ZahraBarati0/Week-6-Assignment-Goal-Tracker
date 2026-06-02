import AppRouter from "./router/AppRouter";
import { useContext } from "react";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import {
  ThemeContext,
} from "./context/ThemeContext";

function App() {
  const { darkMode } =
    useContext(
      ThemeContext
    );

  const theme =
    createTheme({
      palette: {
        mode:
          darkMode
            ? "dark"
            : "light",
      },
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppRouter />
    </ThemeProvider>
  );
}

export default App;