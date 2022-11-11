import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { InfoIcon, PlayIcon } from "@Icons";
import { getImageLink } from "~/lib/utils/helpers";

const HeroImage: FC<{
  image: string | null;
  title: string;
  description: string;
  genres: string[];
}> = ({ image, title, description, genres }) => {
  const { t } = useTranslation("common");

  return (
    <div
      className="h-[30vh] sm:h-[60vh] bg-center md:h-[80vh] bg-gradient-to-t to-rose-500 w-full bg-cover  hover:duration-150 transition-opacity relative overflow-hidden bg-fixed"
      style={{
        backgroundImage: `url(${getImageLink(image!)})`,
      }}
    >
      <div className="z-auto absolute  bottom-10 ">
        <h3 className="bg-customGray  text-2xl font-thin text-white inline-block shrink-0 mb-3 indent-10 ">
          {title}
        </h3>
        <h3 className=" max-w-md bg-neutral-500 text-white bg-opacity-90 mb-9 pl-4">
          {description}
        </h3>
        <div className="flex gap-4 relative left-10 ">
          <button className=" transition hover:duration-150 bg-white hover:bg-opacity-75  px-6 py-4 flex flex-row gap-1 rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,.5)] ">
            <PlayIcon />
            <p>{t("play")}</p>
          </button>
          <Link href={`/movies/${title.replaceAll(" ", "_").toLowerCase()}`}>
            <a className="drop-shadow-[0_35px_35px_rgba(0,0,0,.5)] transition hover:duration-150 bg-neutral-400 opacity-90 hover:bg-opacity-60  px-6 py-4 flex flex-row gap-1 rounded-md ">
              <InfoIcon />
              <p>{t("moreInfo")}</p>
            </a>
          </Link>
        </div>
      </div>
      <div className="absolute right-0 bottom-14 text-white bg-slate-600 text-right px-4 py-2 bg-opacity-70 border-l-4 border-yellow-white ">
        {genres.join(" ,")}
      </div>
    </div>
  );
};

export default HeroImage;
