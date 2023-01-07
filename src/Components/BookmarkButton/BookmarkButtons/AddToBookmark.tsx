import React, { FC } from "react";
import { FilledBookmark, HollowBookmark } from "@Icons";

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
