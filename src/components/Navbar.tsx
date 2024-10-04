import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {

    return (
        <div>
            <SignedIn>
                <SignOutButton />
            </SignedIn>
            <SignedOut>
                <Link href='/sign-up'>Sign in</Link>
            </SignedOut>
        </div>
    );
}

export default Navbar;