"use client";

import { useEffect, useState } from "react";

function MoneyGrower() {
    const [value, setValue] = useState(100);
    const [inputValue, setInputValue] = useState(value.toFixed(6));
    const [growth, setGrowth] = useState(true);
    const [rate, setRate] = useState(0.08)

    const SEC_PER_YEAR = 365.25 * 24 * 3600;
    const r_sec = Math.pow(1 + rate, (1 / SEC_PER_YEAR)) - 1;

    const growMoney = () => {
        if (growth) {
            setValue((p) => {
                return (p * (1 + r_sec))
            });
        }
    }
    const pauseGrowth = () => {
        setGrowth(false);
    }
    const resumeGrowth = () => {
        setValue(parseFloat(inputValue))
        setGrowth(true);
    }

    useEffect(() => {
        if (growth) {
            const interval = setInterval(growMoney, 100);
            return () => clearInterval(interval);
        }
    }, [growth]);

    useEffect(() => {
        setInputValue(value.toFixed(6));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    }

    return (
        <>
            <div className="text-3xl font-semibold">
                <input
                    onFocus={pauseGrowth}
                    onBlur={resumeGrowth}
                    onChange={handleChange}
                    type="number"
                    value={inputValue}
                    className="text-center w-[210px]" />$
            </div>
        </>
    );
}

export default MoneyGrower;