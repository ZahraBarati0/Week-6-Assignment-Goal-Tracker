import {
    createContext,
    useState,
} from "react";

export const ThemeContext =
    createContext();

export default function ThemeProvider({
    children,
}) {
    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem(
                "darkMode"
            ) === "true"
        );

    const toggleTheme = () => {
        const newMode =
            !darkMode;

        setDarkMode(newMode);

        localStorage.setItem(
            "darkMode",
            newMode
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}