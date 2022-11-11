import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PlayIcon } from "@Icons";
import { IMovie } from "@API/types/IPopularMoviesResponse";
const MoviePoster = ({ movie }: { movie: IMovie }) => {
  return (
    <div className="aspect-[2/3] col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 relative group mb-4 object-cover ">
      <Link
        href={`/movies/${movie.title.replaceAll(" ", "_").toLowerCase()}/?id=${
          movie.id
        }`}
      >
        <a>
          <Image
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute inset-0 bg-black opacity-30 hidden group-hover:block" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-1 ">
            <PlayIcon color="white" />
          </div>
          <p className="absolute top-full text-white w-auto">{movie.title}</p>
        </a>
      </Link>
    </div>
  );
};

export default MoviePoster;
