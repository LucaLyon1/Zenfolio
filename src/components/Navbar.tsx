import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {

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