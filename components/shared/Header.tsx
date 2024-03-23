import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container flex justify-between items-center">
        <div>SpaceDrive</div>
        <div className="flex gap-2 items-center">
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
