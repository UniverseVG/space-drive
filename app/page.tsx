"use client";
import { Button } from "@/components/ui/button";
import { api } from "../convex/_generated/api";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  const { isLoaded, organization } = useOrganization();
  const user = useUser();
  let orgId: string | undefined;

  if (isLoaded && user.isLoaded) {
    orgId = organization?.id ?? user?.user?.id;
  }
  const files = useQuery(
    api.files.getFiles,
    isLoaded && orgId ? { orgId } : "skip"
  );
  const createFiles = useMutation(api.files.createFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
      <Button
        onClick={() => {
          console.log(organization);
          if (!orgId) return;
          createFiles({ name: "Hello world 2", orgId });
        }}
      >
        Click Me
      </Button>
    </main>
  );
}
