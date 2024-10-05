"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortfolio } from "@/lib/portfolio";

const portfolioSchema = z.object({
    capital: z.number({ message: "Please enter a value" }).gte(0, { message: "Capital should be greater than or equal to zero" }),
    savings: z.number({ required_error: "Please enter a value" }),
    rate: z.number({ required_error: "Please enter a value" }).gte(0, { message: "Rate should be greater than or equal to zero" })
});

type portfolioType = z.infer<typeof portfolioSchema>;

function createZenfolio() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<portfolioType>({ resolver: zodResolver(portfolioSchema) });

    const onSubmit: SubmitHandler<portfolioType> = (data) => {
        createPortfolio(data);
    }


    return (
        <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-3/4 md:w-2/3 lg:w-1/2 py-6 min-h-1/3 flex items-center justify-around rounded-md shadow-md flex-col gap-4">
                <label
                    className="text-lg font-semibold"
                    htmlFor="capital">
                    How much money do you have ?
                </label>
                <input
                    placeholder="1000$"
                    className="border-2 border-blue-400 rounded-md px-4 py-1"
                    type="number"
                    {...register("capital", { valueAsNumber: true })} />
                {errors.capital && <span className="text-red-500 italic">{errors.capital.message}</span>}
                <label
                    className="text-lg font-semibold"
                    htmlFor="savings">
                    How much do you save each month ?
                </label>
                <input
                    placeholder="1000$"
                    className="border-2 border-blue-400 rounded-md px-4 py-1"
                    type="number"
                    {...register("savings", { valueAsNumber: true })} />
                {errors.savings && <span className="text-red-500 italic">{errors.savings.message}</span>}
                <label
                    className="text-lg font-semibold"
                    htmlFor="rate">
                    At what rate is your money growing (annual)
                </label>
                <input
                    placeholder="8%"
                    className="border-2 border-blue-400 rounded-md px-4 py-1"
                    type="number"
                    {...register("rate", { valueAsNumber: true })} />
                {errors.rate && <span className="text-red-500 italic">{errors.rate.message}</span>}
                <button
                    className="bg-blue-400 px-4 py-2 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all"
                    type="submit">
                    See your money grow !
                </button>
            </form>
        </div >
    );
}

export default createZenfolio;