import React, { FC } from "react";
import FilledBookmark from "../../../icons/BookmarkIcons/BookmarkIcon/FilledBookmark";
import HollowBookmark from "../../../icons/BookmarkIcons/BookmarkIcon/HollowBookmark";

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
