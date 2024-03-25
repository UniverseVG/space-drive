"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "@/components/shared/UploadButton";
import FileCard from "@/components/shared/FileCard";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { SearchBar } from "@/components/shared/SearchBar";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

function Placeholder() {
  return (
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
  );
}

export default function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const { isLoaded, organization } = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined;
  if (isLoaded && user.isLoaded) {
    orgId = organization?.id ?? user?.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    isLoaded && orgId
      ? { orgId, query, favorites: favoritesOnly, deletedOnly }
      : "skip"
  );
  const isLoading = files === undefined;
  return (
    <div>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading your images...</div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar setQuery={setQuery} query={query} />
            <UploadButton />
          </div>
          {files.length === 0 && <Placeholder />}

          <div className="grid grid-cols-3 gap-4">
            {files?.map((file) => {
              return (
                <FileCard
                  favorites={favorites ?? []}
                  key={file._id}
                  file={{ ...file, imageUrl: file.imageUrl ?? "" }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
