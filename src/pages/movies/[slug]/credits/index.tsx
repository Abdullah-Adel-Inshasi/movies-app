import { GetServerSideProps } from "next";
import React from "react";
import getMovieCredits from "~/lib/api/requests/movieCredits";
import IMovieCredits from "~/lib/api/types/IMovieCredits";
import Image from "next/image";
import { getImageLink } from "~/lib/utils/helpers";
import { useRouter } from "next/router";
import Link from "next/link";
type IMovieCreditsProps = string;

const MovieCredits = ({ cast, crew }: Pick<IMovieCredits, "cast" | "crew">) => {
  const { query } = useRouter();
  const movieName = `${query.slug}`.replaceAll("_", " ");
  return (
    <div className=" pt-24 bg-background min-h-screen min-w-fit flex flex-col items-center ">
      <div className="max-w-4xl">
        <h1 className="text-white text-left block text-5xl font-semibold">
          {movieName} crew and cast
        </h1>
        <Link href={`/movies/${query.slug}?id=${query.id}`}>
          <a className="mb-9  hover:text-blue-700 inline-block text-blue-400">
            Go back to movie page
          </a>
        </Link>
        <ul className="grid grid-cols-12 gap-8">
          {cast.map((member) => (
            <li
              key={member.id}
              className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
            >
              <div className="relative min-w-full aspect-[3/4]">
                <Image
                  objectFit="cover"
                  src={getImageLink(member.profile_path)}
                  alt={member.name}
                  layout="fill"
                />
              </div>
              <p className="text-white">{member.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieCredits;
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { cast, crew } = await getMovieCredits(query.id as string);

  return { props: { cast, crew } };
};
