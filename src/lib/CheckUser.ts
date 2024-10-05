import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client";

export const checkUser = async () => {
    const user = await currentUser();

    if (!user) return null;

    const loggedUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id }
    })

    if (loggedUser) return loggedUser;

    const newUser = await prisma.user.create({
        data: {
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
        }
    })
    return newUser;
}