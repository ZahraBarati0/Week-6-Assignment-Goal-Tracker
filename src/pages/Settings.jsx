import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import {LanguageContext,} from "../context/LanguageContext";

import {
    Container,
    Typography,
    Button,
    Stack,
} from "@mui/material";

export default function Settings() {
    const {
        language,
        setLanguage,
    } = useContext(
        LanguageContext
    );

    const {
        darkMode,
        toggleTheme,
    } = useContext(ThemeContext);

    const { t } =
        useContext(LanguageContext);

    return (
        <>
            <Navbar/>
            <Container sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Settings
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    {t.language}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant={
                            language === "en"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() =>
                            setLanguage("en")
                        }
                    >
                        {t.english}
                    </Button>

                    <Button
                        variant={
                            language === "fa"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() =>
                            setLanguage("fa")
                        }
                    >
                       {t.persian}
                    </Button>
                </Stack>

                <Typography
                    variant="h6"
                    sx={{ mt: 4 }}
                >
                    {t.theme}
                </Typography>

                <Button
                    onClick={toggleTheme}
                    variant="contained"
                >
                    {darkMode
                        ? t.lightMode
                        : t.darkMode}
                </Button>
            </Container>
        </>
    );
}