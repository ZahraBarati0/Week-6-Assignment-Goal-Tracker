import {useContext} from "react";
import { LanguageContext } from "../context/LanguageContext";
import Navbar from "../components/Navbar";

import {
    GoalContext
} from "../context/GoalContext";

import GoalCard from "../components/GoalCard";

export default function Archive() {
    const { goals } =
        useContext(GoalContext);

    const { t } = useContext(LanguageContext);

    const completed =
        goals.filter(
            (goal) =>
                goal.status ===
                "completed"
            );

    return (
        <>
        <Navbar/>
        
            <h1>{t.archive}</h1>

            {completed.length === 0 ? (
                <p>
                    No completed goals yet.
                </p>
            ) : (
                completed.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                    />
                ))
            )}
        </>
    );
}