import { checkUser } from "@/lib/CheckUser";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

async function Navbar() {
    const user = checkUser();

    return (
        <div>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Link href='/sign-up'>Sign in</Link>
            </SignedOut>
        </div>
    );
}

export default Navbar;