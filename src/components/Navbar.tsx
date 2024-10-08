import { checkUser } from "@/lib/CheckUser";
import { Roboto_Serif } from "next/font/google";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";


const roboto_serif = Roboto_Serif({
    weight: ['100', '600', '900'],
    subsets: ["latin"]
})

async function Navbar() {
    const user = checkUser();

    return (
        <div className="flex justify-between items-center p-4 bg-[#09090B] border-b border-b-gray-700">
            <Link href="/" className={`${roboto_serif.className} text-xl font-semibold`}>ZenFolio</Link>
            <div className="flex items-center space-x-4">
                <Link href="/learn-more" className="hover:text-gray-400 transition-all">Learn More</Link>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-up' className="hover:text-gray-400 transition-all">Sign in</Link>
                </SignedOut>
            </div>
        </div>
    );
}

export default Navbar;