import React, { FC } from "react";
import FilledBookmark from "~/src/icons/BookmarkIcons/BookmarkIcon/FilledBookmark";
import HollowBookmark from "~/src/icons/BookmarkIcons/BookmarkIcon/HollowBookmark";

const AddToBookmark: FC<{ shouldToggleBookmarkIcon: boolean }> = ({
  shouldToggleBookmarkIcon,
}) => {
  return (
    <>
      {shouldToggleBookmarkIcon ? <FilledBookmark /> : <HollowBookmark />}
      <p>Add to favorites</p>
    </>
  );
};

export default AddToBookmark;
