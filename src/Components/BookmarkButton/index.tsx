import React, { FC, useCallback, useEffect, useState } from "react";
import {
  addToFavorites,
  isInFavorites,
  removeFromFavorites,
} from "~/lib/utils/localStorage";
import AddToBookmark from "./BookmarkButtons/AddToBookmark";
import RemoveFromBookmark from "./BookmarkButtons/RemoveFromBookmark";

const BookmarkButton: FC<
  Pick<IMovieDetails, "id" | "poster_path" | "title">
> = ({ title, poster_path, id }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [shouldToggleBookmarkIcon, setShouldToggleBookmarkIcon] =
    useState<boolean>(false);
  const handleAddToFavorites = useCallback(() => {
    if (!isBookmarked) {
      addToFavorites({ title, poster_path, id });
      setIsBookmarked(true);
    } else {
      removeFromFavorites(id);
      setIsBookmarked(false);
    }
  }, [isBookmarked]);

  useEffect(() => {
    const isInBookmark = isInFavorites(id);
    setIsBookmarked(isInBookmark);
  }, [id]);
  return (
    <button
      className="flex flex-row space-x-4 px-4 py-2 border-[1px] rounded-full whitespace-nowrap sticky top-24 "
      onMouseEnter={() => setShouldToggleBookmarkIcon(true)}
      onMouseLeave={() => setShouldToggleBookmarkIcon(false)}
      onClick={handleAddToFavorites}
    >
      {isBookmarked ? (
        <RemoveFromBookmark
          shouldToggleBookmarkIcon={shouldToggleBookmarkIcon}
        />
      ) : (
        <AddToBookmark shouldToggleBookmarkIcon={shouldToggleBookmarkIcon} />
      )}
    </button>
  );
};

export default BookmarkButton;
