import FileBrowser from "@/components/shared/FileBrowser";
import React from "react";

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title="Your Favorites" favorites />
    </div>
  );
};

export default FavoritesPage;
