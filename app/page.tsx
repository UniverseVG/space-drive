"use client";
import { api } from "../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "@/components/shared/UploadButton";
import FileCard from "@/components/shared/FileCard";

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
  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <UploadButton />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {files?.map((file) => {
          return <FileCard key={file._id} file={file} />;
        })}
      </div>
    </main>
  );
}
