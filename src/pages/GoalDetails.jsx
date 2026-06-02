import Navbar from "../components/Navbar";

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { GoalContext } from "../context/GoalContext";

import {LanguageContext,} from "../context/LanguageContext";

import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

export default function GoalDetails() {
  const { id } = useParams();

  const { goals, setGoals } =
    useContext(GoalContext);

  const goal = goals.find(
    (g) => g.id === Number(id)
  );

  const { t } =
        useContext(LanguageContext);

  if (!goal) {
    return <h2>{t.noGoalsFound}</h2>;
  }

  const [title, setTitle] =
    useState(goal.title);

  const [notes, setNotes] =
    useState(goal.notes || "");

  const saveChanges = () => {
    const updatedGoals =
      goals.map((g) =>
        g.id === goal.id
          ? {
              ...g,
              title,
              notes,
            }
          : g
      );

    setGoals(updatedGoals);

    alert("Goal updated!");
  };

  const addProgress = () => {
    const updatedGoals =
        goals.map((g) => {
            if (g.id !== goal.id) {
                return g;
            }

            const newProgress = Math.min(
                g.progress + 1,
                g.target
            );

            return {
                ...g,
                progress: newProgress,

                status:
                    newProgress >= g.target
                        ? "completed"
                        : g.status,

                logs: [
                    ...g.logs,
                    {
                        date:
                            new Date().toLocaleDateString(),
                        amount: 1,
                    },
                ],
            };
        });

    setGoals(updatedGoals);
};

const markComplete = () => {
    const updatedGoals =
        goals.map((g) =>
            g.id === goal.id
                ? {
                    ...g,
                    status:
                        "completed",
                  }
                : g
        );

    setGoals(updatedGoals);
};

const togglePause = () => {
    const updatedGoals =
        goals.map((g) =>
            g.id === goal.id
                ? {
                    ...g,

                    status:
                        g.status ===
                        "paused"
                            ? "active"
                            : "paused",
                  }
                : g
        );

    setGoals(updatedGoals);
};

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
        >
          {t.goalDetails}
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography>
              {t.category}:
              {" "}
              {goal.category}
            </Typography>

            <Typography>
              {t.type}:
              {" "}
              {goal.type}
            </Typography>

            <Typography>
              {t.progress}:
              {" "}
              {goal.progress}/
              {goal.target}
            </Typography>

            <Typography>
              {t.status}:
              {" "}
              {goal.status}
            </Typography>

            <Typography>
              {t.created}:
              {" "}
              {new Date(
                goal.createdAt
              ).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>

        <TextField
          fullWidth
          label={t.title}
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label={t.notes}
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          sx={{ mb: 2 }}
        />

        <div style={{ marginTop: 20 }}>
    <Button
        variant="contained"
        onClick={saveChanges}
    >
        {t.saveChanges}
    </Button>

    <Button
        variant="contained"
        sx={{ ml: 2 }}
        onClick={addProgress}
    >
        {t.addProgress}
    </Button>

    <Button
        color="success"
        sx={{ ml: 2 }}
        onClick={markComplete}
    >
        {t.complete}
    </Button>

    <Button
        color="warning"
        sx={{ ml: 2 }}
        onClick={togglePause}
    >
        {t.pause}/{t.resume}
    </Button>
</div>

        <Typography
          variant="h5"
          sx={{ mt: 4 }}
        >
          {t.logs}
        </Typography>

        {!goal.logs || goal.logs.length === 0 ? (
          <Typography>
            {t.noLogs}
          </Typography>
        ) : (
          goal.logs.map(
            (log, index) => (
              <Card
                key={index}
                sx={{ mt: 2 }}
              >
                <CardContent>
                  <Typography>
                    {t.date}:
                    {" "}
                    {log.date}
                  </Typography>

                  <Typography>
                    {t.amount}:
                    {" "}
                    {log.amount}
                  </Typography>
                </CardContent>
              </Card>
            )
          )
        )}
      </Container>
    </>
  );
}