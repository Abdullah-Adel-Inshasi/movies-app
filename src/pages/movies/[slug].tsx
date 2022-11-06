import { GetServerSideProps, NextPage } from "next";
import React from "react";
import getMovieDetails from "~/lib/api/requests/movieDetails";
import IMovieDetails from "~/lib/api/types/IMovieDetails";

const MovieDetails: NextPage<IMovieDetails> = ({ belongs_to_collection }) => {
  console.log(belongs_to_collection);
  return <div>nice</div>;
};

export default MovieDetails;

export const getServerSideProps: GetServerSideProps<
  IMovieDetails,
  { slug: string }
> = async ({ query }) => {
  const details = await getMovieDetails(query.id as string);
  return { props: { ...details } };
};
