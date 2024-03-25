import FileBrowser from "@/components/shared/FileBrowser";

export default function FilesPage() {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
}
