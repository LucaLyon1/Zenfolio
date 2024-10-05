"use server";
import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server";

export async function getPortfolio() {
    const user = await currentUser();

    if (!user) return null;

    const prismaUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id }
    });

    if (!prismaUser) return null;

    const portfolio = await prisma.portfolio.findUnique({
        where: { userId: prismaUser.id }
    })
    return portfolio;
}

export async function createPortfolio(data: { capital: number, savings: number, rate: number }) {
    const user = await currentUser();
    if (!user) return;

    const prismaUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id }
    });

    if (!prismaUser) return;

    const newFolio = await prisma.portfolio.create({
        data: {
            capital: data.capital,
            savings: data.savings,
            rate: data.rate,
            userId: prismaUser.id
        }
    })
}