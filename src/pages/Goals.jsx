import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { GoalContext } from "../context/GoalContext";
import GoalCard from "../components/GoalCard";
import { LanguageContext } from "../context/LanguageContext";

import {
    Container,
    Typography,
    TextField,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem
} from "@mui/material";

export default function Goals() {
    const { goals, setGoals } =
        useContext(GoalContext);

    const {t} =
        useContext(LanguageContext);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("all");

    const [sortBy, setSortBy] =
        useState("newest")

    const [deleteId, setDeleteId] =
        useState(null);

    const addProgress = (id) => {
        const updatedGoals = goals.map(
            (goal) => {
                if (goal.id !== id)
                    return goal;

                const newProgress = Math.min(
                    goal.progress + 1,
                    goal.target
                );

                return {
                    ...goal,

                    progress:
                        newProgress,

                    status:
                        newProgress >=
                        goal.target
                            ? "completed"
                            : goal.status,

                    logs: [
                        ...goal.logs,
                        {
                            date:
                                new Date().toLocaleDateString(),
                            amount: 1,
                        },
                    ],
                };
            }
        );

        setGoals(updatedGoals);
    };

    const toggleStatus = (id) => {
        const updatedGoals = goals.map(
            (goal) => {
                if (goal.id !== id)
                    return goal;

                if (
                    goal.status === "completed"
                )
                    return goal;

                return {
                    ...goal,
                    status:
                        goal.status ===
                        "paused"
                            ? "active"
                            : "paused",
                };
            }
        );

        setGoals(updatedGoals);
    };

    const completeGoal = (id) => {
        const updatedGoals =
            goals.map((goal) =>
                goal.id === id
                    ? {
                        ...goal,
                        status: "completed",
                    }
                    : goal
            );

        setGoals(updatedGoals);
    };

    const deleteGoal = () => {
        const updatedGoals =
            goals.filter(
                (goal) =>
                    goal.id !== deleteId
            );

        setGoals(updatedGoals);

        setDeleteId(null);
    };

    const filteredGoals =
        goals
            .filter((goal) =>
                goal.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            )
            .filter((goal) => {
                if (filter === "all")
                    return true;

                return (
                    goal.status === filter
                );
            })

            .sort((a, b) => {
                if (sortBy === "progress") {
                    return (
                        b.progress /
                            b.target -
                        a.progress /
                            a.target
                    );
                }

                if (sortBy === "category") {
                    return a.category.localeCompare(
                        b.category
                    );
                }

                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
            });

    return (
        <>
            <Navbar/>
            <Container sx={{ mt: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    {t.allGoals}
                </Typography>

                <TextField
                    fullWidth
                    label={t.searchGoals}
                    sx={{ mb: 3 }}
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <TextField
                    select
                    fullWidth
                    label={t.sortBy}
                    value={sortBy}
                    onChange={(e)=>
                        setSortBy(
                            e.target.value
                        )
                    }
                    sx={{mb: 3}}
                >
                    <MenuItem value="newest">
                        {t.newest}
                    </MenuItem>

                    <MenuItem value="progress">
                        {t.progress}
                    </MenuItem>

                    <MenuItem value="category">
                        {t.category}
                    </MenuItem>
                </TextField>

                <Tabs
                    value={filter}
                    onChange={(
                        e,
                        value
                    ) => setFilter(value)}
                    sx={{ mb: 3 }}
                >
                    <Tab
                        label={t.all}
                        value="all"
                    />

                    <Tab
                        label={t.active}
                        value="active"
                    />

                    <Tab
                        label={t.completed}
                        value="completed"
                    />

                    <Tab
                        label={t.paused}
                        value="paused"
                    />
                </Tabs>

                {filteredGoals.length ===
                0 ? (
                    <Typography>
                        {t.noGoalsFound}
                    </Typography>
                ) : (
                    filteredGoals.map(
                        (goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onAddProgress={
                                    addProgress
                                }
                                onDelete={(id) =>
                                    setDeleteId(id)
                                }
                                onToggleStatus={
                                    toggleStatus
                                }
                                onComplete={
                                    completeGoal
                                }
                            />
                        )
                    )
                )}

                <Dialog
                    open={
                        deleteId !== null
                    }
                    onClose={() =>
                        setDeleteId(null)
                    }
                >
                    <DialogTitle>
                        {t.deleteGoal}
                    </DialogTitle>

                    <DialogContent>
                        {t.confirmDelete}
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() =>
                                setDeleteId(
                                    null
                                )
                            }
                        >
                            {t.cancel}
                        </Button>

                        <Button
                            color="error"
                            onClick={
                                deleteGoal
                            }
                        >
                            {t.delete}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}