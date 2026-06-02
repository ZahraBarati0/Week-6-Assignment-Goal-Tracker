import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

import {
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Button,
    Stack,
} from "@mui/material";

import { Link } from "react-router-dom";

export default function GoalCard({
    goal,
    onAddProgress,
    onDelete,
    onToggleStatus,
    onComplete,
}) {
    const { t } = useContext(LanguageContext);

    const percentage =
        goal.target > 0
            ? Math.min(
                (goal.progress /
                    goal.target) *
                    100,
                100
            )
        : 0;

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">
                    {goal.title}
                </Typography>

                <Typography>
                    {goal.category}
                </Typography>

                <Typography>
                    {t.status}:
                    {" "}
                    {goal.status}
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{ mt: 2, mb: 2 }}
                />

                <Typography>
                    {goal.progress}/{goal.target}
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2 }}
                >
                    <Button
                        variant="contained"
                        onClick={() =>
                            onAddProgress(goal.id)
                        }
                        disabled={
                            goal.status ===
                                "completed" ||
                            goal.status ===
                                "paused"
                        }
                    >
                        {t.addProgress}
                    </Button>

                    <Button
                        variant="outlined"
                        disabled={
                            goal.status === "completed"
                        }
                        onClick={() =>
                            onToggleStatus(
                                goal.id
                            )
                        }
                    >
                        {goal.status ===
                            "paused"
                                ? t.resume
                                : t.pause}
                    </Button>

                    <Button
                        component={Link}
                        to={`/goals/${goal.id}`}
                        variant="outlined"
                    >
                        {t.details}
                    </Button>

                    <Button
                        component={Link}
                        to={`/goals/${goal.id}`}
                        variant="outlined"
                    >
                        {t.edit}
                    </Button>
                    
                    <Button
                        color="success"
                        disabled={
                            goal.status === "completed"
                        }
                        onClick={() =>
                            onComplete(goal.id)
                        }
                    >
                        {t.complete}
                    </Button>

                    <Button
                        color="error"
                        onClick={() =>
                            onDelete(goal.id)
                        }
                    >
                        {t.delete}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}