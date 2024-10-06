import { checkUser } from "@/lib/CheckUser";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

async function Navbar() {
    const user = checkUser();

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <Link href="/" className="text-xl font-bold">ZenFolio</Link>
            <div className="flex items-center space-x-4">
                <Link href="/learn-more" className="text-blue-500 hover:text-blue-700">Learn More</Link>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-up' className="text-blue-500 hover:text-blue-700">Sign in</Link>
                </SignedOut>
            </div>
        </div>
    );
}

export default Navbar;