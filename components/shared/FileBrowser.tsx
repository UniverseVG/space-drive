"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UploadButton from "@/components/shared/UploadButton";
import FileCard from "@/components/shared/FileCard";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import Image from "next/image";
import { SearchBar } from "@/components/shared/SearchBar";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "./FileTable";
import { columns } from "./Columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Doc } from "@/convex/_generated/dataModel";

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
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

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
    orgId
      ? {
          orgId,
          type: type === "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );
  const isLoading = files === undefined;
  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorite: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8 hidden md:flex lg:flex">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SearchBar setQuery={setQuery} query={query} />
        <UploadButton />
      </div>
      <div className="flex justify-between items-center mb-4 md:hidden  lg:hidden">
        <h1 className="text-2xl font-bold">{title}</h1>

        <UploadButton />
      </div>
      <div className="md:hidden  lg:hidden">
        <SearchBar setQuery={setQuery} query={query} />
      </div>

      <div className="flex gap-2 items-center my-4 md:hidden  lg:hidden ">
        <Label htmlFor="type-select">Type Filter</Label>
        <Select
          value={type}
          onValueChange={(newType) => {
            setType(newType as any);
          }}
        >
          <SelectTrigger id="type-select" className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center hidden md:flex lg:flex">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType as any);
              }}
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}
        <TabsContent value="grid">
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
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
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <Placeholder />}
    </div>
  );
}
