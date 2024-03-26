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
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SideNav } from "./SideNav";

const MobileHeader = () => {
  return (
    <div className="fixed top-0 w-full z-10 border-b py-4 bg-gray-50 lg:hidden">
      <div className="items-center container mx-auto justify-between flex px-4 md:px-4 lg:px-8">
        <Link href="/" className="flex gap-2 items-center ">
          <Image
            src="/logo.png"
            width="30"
            height="30"
            alt="space drive logo"
          />
          <p className=" text-sm"> SPACE DRIVE</p>
        </Link>

        <div className="flex gap-4 items-center justify-between">
          <SignedIn>
            <Button variant={"outline"} className="p-2">
              <Link href="/dashboard/files" className="text-sm">
                Your Files
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <Sheet modal={false}>
            <SheetTrigger>
              <SignedIn>
                <Image
                  src="/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </SignedIn>
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64 z-index-20">
              <div className="flex gap-2 items-center ">
                <Image
                  src="/logo.png"
                  width="30"
                  height="30"
                  alt="space drive logo"
                />
                <p className=" text-sm"> SPACE DRIVE</p>
              </div>
              <div className="mt-4">
                <SignedIn>
                  <SideNav />
                </SignedIn>
              </div>
              <div className="flex gap-4 items-center justify-between fixed bottom-0 mb-4">
                <OrganizationSwitcher />
                <UserButton afterSignOutUrl="/" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
