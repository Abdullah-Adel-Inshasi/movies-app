import { memo } from "react";
import Title from "./Title";
import Image from "next/image";
import PlayIcons from "~/src/Icons/PlayIcon";
import Link from "next/link";
import IPopularMoviesResponse from "~/lib/api/types/IPopularMoviesResponse";
const MediaSection = ({
  title,
  movies,
}: {
  title: string;
  movies: IPopularMoviesResponse["results"];
}) => {
  console.log({ movies });
  return (
    <div className="py-8">
      <Title title={title} />
      <div className="grid grid-cols-12 gap-3 m-5">
        {movies.map((movie) => (
          <div
            key={movie.backdrop_path}
            className="aspect-[2/3] col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 relative group mb-4 object-cover "
          >
            <Link
              href={`/movies/${movie.title
                .replaceAll(" ", "_")
                .toLowerCase()}/?id=${movie.id}`}
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
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                  <PlayIcons />
                </div>
                <p className="absolute top-full text-white w-auto">
                  {movie.title}
                </p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MediaSection);
