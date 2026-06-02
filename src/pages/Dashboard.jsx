import Navbar from "../components/Navbar";
import {useContext,} from "react";
import {LanguageContext,} from "../context/LanguageContext";
import {GoalContext,} from "../context/GoalContext";
import {calculateXP,} from "../utils/xp";
import {calculateStreak,} from "../utils/streak"

import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
} from "@mui/material";

import {Link,} from "react-router-dom";
import {CircularProgress,} from "@mui/material";

export default function Dashboard() {
    const { goals, loading, } =
        useContext(GoalContext);

    const { t } =
        useContext(LanguageContext);

    if (loading) {
        return (
            <>
                <Navbar/>
                <CircularProgress/>
            </>
        );
    }
        if (goals.length === 0) {
        return (
            <>
                <Navbar />

                <Container sx={{ mt: 4 }}>
                    <Typography variant="h5">
                        {t.noGoalsYet}
                    </Typography>

                    <Typography>
                        {t.createGoal}
                    </Typography>

                    <Button
                        component={Link}
                        to="/goals/new"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        {t.createGoal}
                    </Button>
                </Container>
            </>
        );
    }

    const totalGoals =
        goals.length;

    const completedGoals =
        goals.filter(
            (goal) =>
                goal.status ===
                "completed"
        ).length;

    const xp =
        calculateXP(goals);

    const streak =
        calculateStreak(goals);
        
    const overallProgress =
        goals.length === 0
            ? 0
            : Math.round(
                goals.reduce((sum,goal) =>sum + (goal.progress / goal.target) * 100, 0 ) / goals.length
            );

    return (
        <>
            <Navbar/>
            <Container
                sx={{ mt: 4 }}
            >
                <Typography variant="h4">
                    {t.dashboard}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <Button
                        component={Link}
                        to="/goals/new"
                        variant="contained"
                    >
                        {t.newGoal}
                    </Button>

                    <Button
                        component={Link}
                        to="/goals"
                        variant="outlined"
                    >
                        {t.viewGoals}
                    </Button>

                    <Button
                        component={Link}
                        to="/archive"
                    >
                        {t.viewArchive}
                    </Button>
                </Stack>

                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent>
                                <Typography>
                                    {t.totalGoals}
                                </Typography>

                                <Typography variant="h4">
                                    {totalGoals}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent>
                                <Typography>
                                    {t.completedGoals}
                                </Typography>

                                <Typography variant="h4">
                                    {
                                        completedGoals
                                    }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent>
                                <Typography>
                                    {t.xp}
                                </Typography>

                                <Typography variant="h4">
                                    {xp}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent>
                                <Typography>
                                    {t.streak}
                                </Typography>

                                <Typography variant="h4">
                                    {streak}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <Card>
                            <CardContent>
                                <Typography>
                                    {t.progress}
                                </Typography>

                                <Typography variant="h4">
                                    {
                                        overallProgress
                                    }
                                    %
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography
                    variant="h5"
                    sx={{ mt: 4 }}
                >
                    {t.recentlyCompleted}
                </Typography>

                {goals
                    .filter(
                        (goal) =>
                            goal.status === "completed"
                    )
                    .slice(0, 3)
                    .map((goal) => (
                        <Card
                            key={goal.id}
                            sx={{ mt: 2 }}
                        >
                            <CardContent>
                                <Typography>
                                    {goal.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Container>
        </>
    );
}