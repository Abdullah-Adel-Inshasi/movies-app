import Link from "next/link";
import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  getMovieDetails,
  getMovieVideos,
  rateMovie as rateMovieRequest,
} from "@API/requests";
import { IMovieDetails } from "@API/types";
import {
  MovieInformation,
  MoviePictures,
  MovieTitle,
  GenreChips,
  BookmarkButton,
} from "@Components";
import RateStars from "~/src/Components/RateStars";

const MovieDetails: NextPage<
  IMovieDetails & { youtubeKey: string | undefined }
> = ({
  release_date,
  title,
  original_title,
  runtime,
  vote_average,
  budget,
  poster_path,
  youtubeKey,
  genres,
  overview,
  id,
  production_countries,
  production_companies,
}) => {
  const [showRatingPopUp, setShowRatingPopUp] = useState<boolean>(false);
  const rateMovie = async (rate: number) => {
    const x = rateMovieRequest({ movieId: id.toString(), rate });
    x.then(() => alert(`you rated ${title} ${rate}/10`))
      .catch(console.error)
      .finally(() => setShowRatingPopUp(false));
  };
  return (
    <>
      {showRatingPopUp && (
        <div className="fixed h-screen w-screen bg-black opacity-75 flex justify-center items-center z-10 ">
          <RateStars rateMovie={rateMovie} />
        </div>
      )}
      <div className=" bg-background flex flex-col items-center">
        <div className="max-w-xl md:max-w-3xl lg:max-w-5xl  pt-24 h-auto min-h-screen text-white space-y-4">
          <div className="flex flex-col items-start md:items-end md:justify-between md:flex-row  ">
            <MovieTitle {...{ release_date, original_title, runtime, title }} />
            <MovieInformation
              {...{ budget, vote_average, setShowRatingPopUp }}
            />
          </div>
          <MoviePictures
            poster_path={poster_path}
            youtubeKey={youtubeKey!}
            title={title}
          />
          <GenreChips genres={genres} />
          <div className="grid grid-cols-12 w-full lg:space-x-20 scroll-auto ">
            <div className="col-span-12 order-1 lg:col-span-9 lg:order-none space-y-3">
              <p>{overview}</p>
              <hr />
              <p className="text-lg leading-none">
                <span className="font-bold ">Produced by </span>
                <Link href="#">
                  <a className="text-blue-600 hover:text-blue-200 font-semibold ">
                    {production_companies[0].name}{" "}
                  </a>
                </Link>
                <span className="font-bold">
                  in {production_countries[0].name}{" "}
                </span>
              </p>
              <hr />
            </div>
            <div className="col-span-3  ">
              <BookmarkButton title={title} poster_path={poster_path} id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

export const getServerSideProps: GetServerSideProps<
  IMovieDetails & { youtubeKey: string | undefined },
  { slug: string }
> = async ({ query, locale }) => {
  const details = await getMovieDetails(query.id as string);
  const videos = await getMovieVideos(details.id);
  const youtubeKey = videos.results.find(
    (video) => video.site === "YouTube"
  )?.key;
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      ...details,
      youtubeKey,
    },
  };
};
