export const calculateXP = (
    goals
) => {
    return goals.reduce(
        (total, goal) =>
            total +
            goal.logs.length * 20,
        0
    );
};