import { GetServerSideProps } from "next";
import React from "react";
import getMovieCredits from "~/lib/api/requests/movieCredits";
import IMovieCredits, { CrewMember } from "~/lib/api/types/IMovieCredits";
import { useRouter } from "next/router";
import Link from "next/link";
import PeopleGrid from "~/src/Components/PeopleGrid";

const MovieCredits = ({ cast, crew }: Pick<IMovieCredits, "cast" | "crew">) => {
  console.log(cast[20]);
  const { query } = useRouter();
  const movieName = `${query.slug}`.replaceAll("_", " ");
  return (
    <div className=" pt-24 bg-background min-h-screen min-w-fit flex flex-col items-center ">
      <div className="max-w-5xl">
        <Link href={`/movies/${query.slug}?id=${query.id}`}>
          <a className="mb-2  hover:text-blue-700 inline-block text-blue-400">
            Go back to movie page
          </a>
        </Link>
        <PeopleGrid people={cast} movieName={movieName} />
      </div>
    </div>
  );
};

export default MovieCredits;
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { cast, crew } = await getMovieCredits(query.id as string);
  const departments: Record<string, CrewMember[]> = {};
  crew.forEach((member) => {
    if (departments[member.department]) {
      departments[member.department].push(member);
    } else {
      departments[member.department] = [member];
    }
  });

  return { props: { cast, crew } };
};
