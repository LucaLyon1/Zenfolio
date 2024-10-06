"use client";

import { getPortfolio } from "@/lib/portfolio";
import { useEffect, useState } from "react";

function MoneyGrower() {

    const [initialCapital, setInitialCapital] = useState(10000);
    const [monthlySavings, setMonthlySavings] = useState(500);
    const [growthRate, setGrowthRate] = useState(7);
    const [currentValue, setCurrentValue] = useState(initialCapital);
    const [timeToMillionaire, setTimeToMillionaire] = useState('');
    const [timeToCar, setTimeToCar] = useState('');
    const [timeToHouse, setTimeToHouse] = useState('');

    // Constants for goals
    const CAR_PRICE = 20000;
    const HOUSE_PRICE = 500000;
    const MILLIONAIRE = 1000000;

    useEffect(() => {
        // Reset current value when inputs change
        const fetchFolio = async () => {
            const portfolio = await getPortfolio();
            setCurrentValue(portfolio?.capital || 5000);
            setGrowthRate(portfolio?.rate || 8);
            setMonthlySavings(portfolio?.savings || 1000);
        };
        fetchFolio();

    }, []);

    useEffect(() => {
        // Calculate time to reach goals
        const dailyGrowthRate = Math.pow(1 + growthRate / 100, 1 / 365) - 1;
        const dailySavings = monthlySavings * 12 / 365;

        const calculateDaysToGoal = (goal: number) => {
            let days = 0;
            let simulation = currentValue;
            while (simulation < goal && days < 36500) { // Max 100 years
                simulation = simulation * (1 + dailyGrowthRate) + dailySavings;
                days++;
            }
            return days;
        };

        const daysToMillionaire = calculateDaysToGoal(MILLIONAIRE);
        const daysToCar = calculateDaysToGoal(CAR_PRICE);
        const daysToHouse = calculateDaysToGoal(HOUSE_PRICE);
        setTimeToMillionaire(formatDays(daysToMillionaire));
        setTimeToCar(formatDays(daysToCar));
        setTimeToHouse(formatDays(daysToHouse));
    }, [initialCapital, growthRate, monthlySavings])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentValue(prev => {
                const secondlyGrowthRate = Math.pow(1 + growthRate / 100, 1 / (365 * 24 * 60 * 60)) - 1;
                const secondlySavings = monthlySavings * 12 / (365 * 24 * 60 * 60);
                return prev * (1 + secondlyGrowthRate) + secondlySavings;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [growthRate, monthlySavings]);

    const formatDays = (days: number) => {
        if (days >= 36500) return "More than 100 years";
        const years = Math.floor(days / 365);
        const remainingDays = days % 365;
        const months = Math.floor(remainingDays / 30);

        let result = '';
        if (years > 0) result += `${years} year${years > 1 ? 's' : ''} `;
        if (months > 0) result += `${months} month${months > 1 ? 's' : ''} `;
        if (remainingDays > 0) result += `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
        return result.trim();
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <p className="text-lg italic text-gray-500">You currently have</p>
            <div className="text-3xl font-semibold">
                ${currentValue.toLocaleString('en-US', { maximumFractionDigits: 5 })}
            </div>
            <p className="text-lg italic text-gray-500">Growing at</p>
            <div className="text-center text-3xl font-semibold">
                {growthRate}%
            </div>
            <p className="text-gray-600 italic">Time to buy a car (${CAR_PRICE.toLocaleString('en-US')}): {timeToCar}</p>
            <p className="text-gray-600 italic">Time to buy a house (${HOUSE_PRICE.toLocaleString('en-US')}): {timeToHouse}</p>
            <p className="text-gray-600 italic">Time to become a millionaire: {timeToMillionaire}</p>
        </div>
    );
}

export default MoneyGrower;