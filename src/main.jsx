import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GoalProvider from "./context/GoalContext";
import LanguageProvider from "./context/LanguageContext";
import ThemeProvider from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <GoalProvider>
          <App />
        </GoalProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);