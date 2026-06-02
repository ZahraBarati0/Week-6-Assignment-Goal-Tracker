import { createContext, useState, useEffect } from "react";
import { saveGoals, loadGoals } from "../utils/storage";

export const GoalContext = createContext();

export default function GoalProvider({ children }) {
    const [goals, setGoals] = useState([]);
    
    const [loading, setLoading] =
        useState(true);
        
    useEffect(() => {
        setGoals(loadGoals());
        setLoading(false);
    }, []);

    useEffect(() => {
        saveGoals(goals);
    }, [goals]);

    return (
        <GoalContext.Provider
        value={{
            goals,
            setGoals,
            loading,
        }}
        >
            {children}
        </GoalContext.Provider>
    );
}