"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { modifyPortfolio } from "@/lib/portfolio";
import { useRouter } from "next/navigation";

const portfolioSchema = z.object({
    capital: z.number({ message: "Please enter a value" }).gte(0, { message: "Capital should be greater than or equal to zero" }),
    savings: z.number({ required_error: "Please enter a value" }),
    rate: z.number({ required_error: "Please enter a value" }).gte(0, { message: "Rate should be greater than or equal to zero" })
});

type portfolioType = z.infer<typeof portfolioSchema>;

function Settings() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<portfolioType>({ resolver: zodResolver(portfolioSchema) })

    const onSubmit: SubmitHandler<portfolioType> = (data) => {
        modifyPortfolio(data);
        router.push('/');
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-inherit py-6 px-6 min-h-1/3 flex justify-around rounded-md shadow-md flex-col gap-4 border border-gray-600">
                <label
                    className="text-lg font-semibold"
                    htmlFor="capital">
                    How much money do you have ?
                </label>
                <input
                    placeholder="1000$"
                    className="border border-gray-600 rounded-md px-4 py-1 bg-[#09090B]"
                    type="number"
                    {...register("capital", { valueAsNumber: true })} />
                {errors.capital && <span className="text-red-500 italic">{errors.capital.message}</span>}
                <label
                    className="text-lg font-semibold"
                    htmlFor="savings">
                    Monthly Savings
                </label>
                <input
                    placeholder="1000$"
                    className="border border-gray-600 rounded-md px-4 py-1 bg-[#09090B]"
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
                    className="border border-gray-600 rounded-md px-4 py-1 bg-[#09090B]"
                    type="number"
                    {...register("rate", { valueAsNumber: true })} />
                {errors.rate && <span className="text-red-500 italic">{errors.rate.message}</span>}
                <button
                    className="px-4 py-2 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transition-all border border-gray-600"
                    type="submit">
                    See your money grow !
                </button>
            </form>
        </div >
    );
}

export default Settings;