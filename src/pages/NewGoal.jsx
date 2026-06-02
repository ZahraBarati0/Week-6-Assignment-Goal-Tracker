import Navbar from "../components/Navbar";
import {
    useState,
    useContext,
} from "react";

import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Box,
} from "@mui/material";

import {GoalContext,} from "../context/GoalContext";
import {useNavigate,} from "react-router-dom";
import categories from "../data/categories";
import {LanguageContext,} from "../context/LanguageContext";

export default function NewGoal() {
    const navigate =
        useNavigate();

    const { t } =
        useContext(LanguageContext);

    const {
        goals,
        setGoals,
    } = useContext(GoalContext);

    const [form, setForm] =
        useState({
            title: "",
            category: "",
            type: "daily",
            target: "",
            startDate: "",
            endDate: "",
            notes: "",
        });

    const handleChange = (
        e
    ) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = (
        e
    ) => {
        e.preventDefault();

        if (
            !form.title ||
            !form.category ||
            !form.target
        ) {
            alert(
                "Please fill required fields"
            );
            return;
        }

        const newGoal = {
            id: Date.now(),
            title: form.title,
            category: form.category,
            type: form.type,
            target: Number(form.target),
            progress: 0,
            status: "active",
            startDate: form.startDate,
            endDate: form.endDate,
            notes: form.notes,
            logs: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setGoals([
            ...goals,
            newGoal,
        ]);

        navigate("/goals");
    };

            return (
                <>
                    <Navbar/>
                    <Container
                        maxWidth="sm"
                        sx={{ mt: 4 }}
                    >

                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        {t.goalCreate}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={
                            handleSubmit
                        }
                    >

                    <TextField
                        fullWidth
                        label={t.title}
                        name="title"
                        margin="normal"
                        value={form.title}
                        onChange={
                            handleChange
                        }
                    />

                    <TextField
                        select
                        fullWidth
                        label={t.category}
                        name="category"
                        margin="normal"
                        value={
                            form.category
                        }
                        onChange={
                            handleChange
                        }
                    >
                        {categories.map(
                            (cat) => (
                                <MenuItem
                                    key={cat}
                                    value={cat}
                                >
                                    {cat}
                                </MenuItem>
                            )
                        )}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label={t.goalType}
                        name="type"
                        margin="normal"
                        value={form.type}
                        onChange={
                            handleChange
                        }
                    >
                        <MenuItem value="daily">
                            {t.daily}
                        </MenuItem>

                        <MenuItem value="count">
                            {t.count}
                        </MenuItem>

                        <MenuItem value="time">
                            {t.time}
                        </MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        type="number"
                        label={t.target}
                        name="target"
                        margin="normal"
                        value={form.target}
                        onChange={
                            handleChange
                        }
                    />

                    <TextField
                        fullWidth
                        type="date"
                        name="startDate"
                        margin="normal"
                        value={
                            form.startDate
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <TextField
                        fullWidth
                        type="date"
                        name="endDate"
                        margin="normal"
                        value={
                            form.endDate
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label={t.notes}
                        name="notes"
                        margin="normal"
                        value={form.notes}
                        onChange={
                            handleChange
                        }
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        {t.saveGoal}
                    </Button>
                </Box>
            </Container>
        </>
    );
}