const STORAGE_KEY = "goalTracker";

export const loadGoals = () => {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};

export const saveGoals = (goals) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(goals)
    );
};