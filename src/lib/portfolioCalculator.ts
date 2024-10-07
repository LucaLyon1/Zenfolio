interface Portfolio {
    currentValue: number;
    monthlySavings: number;
    growthRate: number;
    lastUpdated: Date;
}

export function calculatePortfolioGrowth(portfolio: Portfolio, currentTime: Date = new Date()) {
    const {
        currentValue,
        monthlySavings,
        growthRate,
        lastUpdated
    } = portfolio;

    // Convert annual growth rate to secondly rate
    // Formula: (1 + annual_rate)^(1/(365 * 24 * 60 * 60)) - 1
    const secondlyGrowthRate = Math.pow(1 + growthRate / 100, 1 / (365 * 24 * 60 * 60)) - 1;

    // Convert monthly savings to secondly savings
    // Monthly * 12 months / (365 days * 24 hours * 60 minutes * 60 seconds)
    const secondlySavings = monthlySavings * 12 / (365 * 24 * 60 * 60);

    // Calculate seconds elapsed since last update
    const secondsElapsed = (currentTime.getTime() - lastUpdated.getTime()) / 1000;

    // Calculate growth of existing value
    // Formula: initial_value * (1 + secondly_rate)^seconds_elapsed
    const grownValue = currentValue * Math.pow(1 + secondlyGrowthRate, secondsElapsed);

    // Calculate accumulated savings
    // For continuous compounding with continuous contributions:
    // If r is the growth rate and t is time, the formula is:
    // savings_per_second * ((1 + r)^t - 1) / r
    let accumulatedSavings = 0;
    if (secondlyGrowthRate > 0) {
        accumulatedSavings = secondlySavings *
            (Math.pow(1 + secondlyGrowthRate, secondsElapsed) - 1) / secondlyGrowthRate;
    } else {
        // If growth rate is 0, simply multiply savings by time
        accumulatedSavings = secondlySavings * secondsElapsed;
    }

    // Total new value is grown initial value plus accumulated savings
    const newValue = grownValue + accumulatedSavings;

    return {
        newValue,
        growthAmount: newValue - currentValue,
        timeElapsed: secondsElapsed,
        annualizedReturnRate: calculateAnnualizedReturn(currentValue, newValue, secondsElapsed)
    };
}

function calculateAnnualizedReturn(startValue: number, endValue: number, secondsElapsed: number) {
    const yearsElapsed = secondsElapsed / (365 * 24 * 60 * 60);
    if (yearsElapsed === 0 || startValue === 0) return 0;

    // Formula: ((end_value / start_value)^(1/years)) - 1
    return (Math.pow(endValue / startValue, 1 / yearsElapsed) - 1) * 100;
}