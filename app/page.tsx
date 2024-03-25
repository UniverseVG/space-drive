"use client";
import { api } from "../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "@/components/shared/UploadButton";
import FileCard from "@/components/shared/FileCard";
import { Loader2 } from "lucide-react";
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
  const isLoading = files === undefined;
  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading your images...</div>
        </div>
      )}

      {!isLoading && files.length === 0 && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Image
            alt="an image of a picture and directory icon"
            width="300"
            height="300"
            src="/empty.svg"
          />
          <div className="text-2xl">You have no files, upload one now</div>
          <UploadButton />
        </div>
      )}

      {!isLoading && files.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Your Files</h1>

            <UploadButton />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return (
                <FileCard
                  key={file._id}
                  file={{ ...file, imageUrl: file.imageUrl ?? "" }}
                />
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
