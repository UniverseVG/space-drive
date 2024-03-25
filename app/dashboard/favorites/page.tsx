import FileBrowser from "@/components/shared/FileBrowser";
import React from "react";

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title="Your Favorites" favoritesOnly />
    </div>
  );
};

export default FavoritesPage;
