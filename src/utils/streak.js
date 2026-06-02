export const calculateStreak = (
    goals
) => {
    const dates = [];

    goals.forEach((goal) => {
        goal.logs.forEach((log) => {
            dates.push(
                new Date(log.date)
                    .toDateString()
            );
        });
    });

    const uniqueDates = [
        ...new Set(dates),
    ]
        .map((d) => new Date(d))
        .sort((a, b) => b - a);

    if (uniqueDates.length === 0)
        return 0;

    let streak = 1;

    for (
        let i = 0;
        i < uniqueDates.length - 1;
        i++
    ) {
        const diff =
            (uniqueDates[i] -
                uniqueDates[i + 1]) /
            (1000 * 60 * 60 * 24);

        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};