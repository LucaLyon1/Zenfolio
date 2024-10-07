"use server";
import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { calculatePortfolioGrowth } from "./portfolioCalculator";
import { error } from "console";

type Portfolio = {
    capital: number,
    savings: number,
    rate: number
}

export async function getPortfolio() {
    const user = await currentUser();

    if (!user) return null;

    const prismaUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id }
    });

    if (!prismaUser) return null;

    const portfolio = await prisma.portfolio.findUnique({
        where: { userId: prismaUser.id }
    });
    if (portfolio) {
        const resFolio = {
            currentValue: portfolio?.capital,
            monthlySavings: portfolio?.savings,
            growthRate: portfolio?.rate,
            lastUpdated: portfolio?.lastUpdated,
        }
        const { newValue } = calculatePortfolioGrowth(resFolio);
        return { ...portfolio, capital: newValue };
    }
    return {
        capital: 10000,
        savings: 1000,
        rate: 8,
    }
}

export async function createPortfolio(data: Portfolio) {
    const user = await currentUser();
    if (!user) return;

    const prismaUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id }
    });

    if (!prismaUser) return;

    const portfolio = await getPortfolio();

    if (portfolio) return redirect('/settings')

    const newFolio = await prisma.portfolio.create({
        data: {
            capital: data.capital,
            savings: data.savings,
            rate: data.rate,
            userId: prismaUser.id,
        }
    })
}

export async function modifyPortfolio(data: Portfolio) {
    const user = await currentUser();

    if (!user) return;

    const prismaUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id }
    });

    if (!prismaUser) return;

    const newFolio = await prisma.portfolio.update({
        where: { userId: prismaUser.id },
        data: {
            capital: data.capital,
            savings: data.savings,
            rate: data.rate,
            userId: prismaUser.id
        }
    })
}