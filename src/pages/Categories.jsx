import Navbar from "../components/Navbar";
import { useContext } from "react";
import { GoalContext } from "../context/GoalContext";
import { LanguageContext } from "../context/LanguageContext";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@mui/material";

import {LinearProgress,} from "@mui/material";

export default function Categories() {
    const { goals } =
        useContext(GoalContext);

    const { t } = useContext(LanguageContext);

    const categories = {};

    goals.forEach((goal) => {
        if (!categories[goal.category]) {
            categories[goal.category] = {
                active: 0,
                completed: 0,
            };
        }

        if (goal.status === "completed") {
            categories[
                goal.category
            ].completed++;
        } else {
            categories[goal.category].active++;
        }
    });

    return (
        <>
            <Navbar/>
            <Container sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    {t.categories}
                </Typography>

                <Grid
                    container
                    spacing={3}
                >
                    {Object.entries(categories).map(
    ([name, stats]) => {

        const total =
            stats.active +
            stats.completed;

        const percentage =
            total === 0
                ? 0
                : (stats.completed / total) * 100;

        return (
            <Grid
                item
                xs={12}
                md={4}
                key={name}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            {name}
                        </Typography>

                        <Typography>
                            {t.active}: {stats.active}
                        </Typography>

                        <Typography>
                            {t.completed}: {stats.completed}
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{ mt: 2 }}
                        />

                        <Typography sx={{ mt: 1 }}>
                            {Math.round(
                                percentage
                            )}%
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
)}
                </Grid>
            </Container>
        </>
    );
}