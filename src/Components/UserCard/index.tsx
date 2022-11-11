import React, { FC, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { LockIcon } from "@Icons";
import { useTranslation } from "next-i18next";
import { userContext } from "~/src/providers/UserProvider";

const UserCard: FC<{
  image: string;
  name: string;
  isPrivate: boolean;
}> = ({ image, isPrivate, name }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { setUser, user } = useContext(userContext);

  useEffect(() => {
    if (user?.image) router.push("home");
  }, [user]);
  return (
    <div className="flex flex-col items-center ">
      <a
        onClick={() => {
          setUser({ image });
        }}
        href={"home"}
      >
        <div className="flex flex-col items-center text-customGray group">
          <div className="rounded-md overflow-clip group-hover:outline group-hover:outline-4 group-hover:outline-white max-h-44">
            <Image
              src={image}
              width={180}
              height={180}
              alt={t("profilePictureAltText", { name })}
            />
          </div>
          <span className="my-4 text-xl font-semibold group-hover:text-white">
            {name}
          </span>
        </div>
      </a>
      {isPrivate && <LockIcon />}
    </div>
  );
};

export default UserCard;
