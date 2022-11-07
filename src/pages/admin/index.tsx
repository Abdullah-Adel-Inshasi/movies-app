import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { useContext } from "react";
import { userContext } from "~/src/providers/UserProvider";
const Admin: NextPageWithLayout = () => {
  const { user, setUser } = useContext(userContext);

  const [image, setImage] = useState<string | undefined>(undefined);
  const onImageChosen: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result?.toString()));
    if (e.target.files?.item(0)) {
      const imageFile = e.target.files.item(0)!;
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <>
      <div className="w-screen flex justify-center mt-6">
        <form className="flex flex-col">
          <label htmlFor="posterInput" className="flex flex-col cursor-pointer">
            <p>Add an image</p>
            <div>
              <Image
                src={image || ""}
                alt=""
                width={100}
                objectFit="cover"
                height={100}
              />
            </div>
          </label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={onImageChosen}
            className="hidden"
            id="posterInput"
          />
          <div className="flex">
            <label htmlFor="movieName">Name</label>
            <input
              type="text"
              placeholder="name"
              id="movieName"
              className="border-[1px] rounded-lg pl-2"
            />
          </div>
          <div className="flex">
            <label htmlFor="plot">Movie Plot</label>
            <textarea id="plot" className="border-[1px] rounded-lg pl-2" />
          </div>
        </form>
      </div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        update user
      </button>
    </>
  );
};
Admin.getLayout = (page) => {
  return <>{page}</>;
};
export default Admin;
