import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

import {
    AppBar,
    Toolbar,
    Button,
} from "@mui/material";

import {
    Link,
} from "react-router-dom";

export default function Navbar() {
    const { t } = useContext(LanguageContext);

    return (
        <AppBar
            position="static"
            sx={{ mb: 4 }}
        >
            <Toolbar>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    {t.dashboard}
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/goals"
                >
                {t.goals}
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/archive"
                >
                    {t.archive}
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/categories"
                >
                    {t.categories}
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/settings"
                >
                    {t.settings}
                </Button>
            </Toolbar>
        </AppBar>
    );
}