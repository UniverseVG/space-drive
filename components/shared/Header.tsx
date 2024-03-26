import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-0 w-full z-10 border-b py-4 bg-gray-50 hidden lg:block">
      <div className="items-center mx-auto justify-between flex px-8">
        <Link href="/" className="flex gap-2 items-center text-xl">
          <Image
            src="/logo.png"
            width="50"
            height="50"
            alt="space drive logo"
          />
          SPACE DRIVE
        </Link>

        <div className="flex gap-4 items-center justify-between">
          <SignedIn>
            <Button variant={"outline"}>
              <Link href="/dashboard/files">Your Files</Link>
            </Button>
          </SignedIn>
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
