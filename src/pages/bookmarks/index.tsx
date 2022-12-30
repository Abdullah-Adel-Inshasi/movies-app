import React, { useEffect, useState } from "react";
import {
  FavoriteMovieType,
  getFavoriteMovies,
  removeFromFavorites,
} from "~/lib/utils/localStorage";
import Image from "next/image";
import { getImageLink } from "~/lib/utils/helpers";
import FilledBookmarkIcon from "~/src/icons/BookmarkIcons/BookmarkIcon/FilledBookmark";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
const Bookmarks = () => {
  const [movies, setMovies] = useState<FavoriteMovieType[]>([]);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    const { error, movies } = getFavoriteMovies();
    if (error) {
      setError(error);
    } else {
      setMovies(movies);
    }
  }, [toggle]);

  if (error || !movies.length) {
    return <>error</>;
  }

  return (
    <div className="pt-24 text-white max-w-7xl mx-auto">
      <div className="w-full h-full grid grid-cols-12 gap-3">
        {movies.map((movie) => (
          <div key={movie.id} className="col-span-3">
            <div className="aspect-[2/3] relative group rounded-md overflow-clip ">
              <Image
                src={getImageLink(movie.poster_path ?? "")}
                alt={movie.title}
                layout="fill"
              />
              <button className="-top-1 z-10 absolute opacity-50 group-hover:opacity-100 text-2xl">
                <FilledBookmarkIcon />
              </button>
              <div className="inset-0 absolute bg-gray-600 bg-opacity-50 hidden group-hover:flex  justify-center flex-col space-y-4 items-center text-white">
                <button className="rounded-lg px-4 py-2 text-center leading-4 border-2 border-white">
                  Go to movie page
                </button>
                <button
                  className="rounded-lg px-4 py-2 text-center leading-4 border-2 border-white"
                  onClick={() => {
                    removeFromFavorites(movie.id);
                    setToggle((prev) => !prev);
                  }}
                >
                  Remove from bookmark
                </button>
              </div>
            </div>
            <p>{movies[0].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
