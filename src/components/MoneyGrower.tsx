"use client";

import { getPortfolio } from "@/lib/portfolio";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function MoneyGrower() {
    const [value, setValue] = useState(1000);
    const [savings, setSavings] = useState(1000);
    const [rate, setRate] = useState(0.08);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        const fetchFolio = async () => {
            let portfolio = await getPortfolio();
            if (portfolio) {
                setValue(portfolio.capital)
                setSavings(portfolio.savings)
                setRate(portfolio.rate / 100)
            }
        }
        fetchFolio();
    }, [userId, getPortfolio])

    const SEC_PER_YEAR = 365.25 * 24 * 3600;
    const r_sec = Math.pow(1 + rate, (1 / SEC_PER_YEAR)) - 1;

    const growMoney = () => {
        setValue((p) => {
            return (p * (1 + r_sec))
        });
    }


    useEffect(() => {
        const interval = setInterval(growMoney, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <p className="text-lg italic text-gray-500">You currently have</p>
            <div className="text-3xl font-semibold">
                {value.toFixed(6)}$
            </div>
            <p className="text-lg italic text-gray-500">Growing at</p>
            <div className="text-center text-3xl font-semibold">
                {rate * 100}%
            </div>
            <p className="text-lg italic text-gray-500">Per year</p>
        </>
    );
}

export default MoneyGrower;