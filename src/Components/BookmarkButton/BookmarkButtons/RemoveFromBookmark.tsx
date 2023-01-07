import React, { FC } from "react";
// import { FilledBookmark, FilledRemoveBookmarkIcon } from "~/src/icons";

const RemoveFromBookmark: FC<{ shouldToggleBookmarkIcon: boolean }> = ({
  shouldToggleBookmarkIcon,
}) => {
  return (
    <>
      {/* {shouldToggleBookmarkIcon ? (
        <span>Bookmarked</span>
      ) : (
        <FilledBookmark />
      )} */}
      <p>
        {shouldToggleBookmarkIcon
          ? "Remove from favorites"
          : "Added to favorites"}
      </p>
    </>
  );
};

export default RemoveFromBookmark;
