import { FC } from "react";
import { IPopularMoviesResponse } from "@API/types";
import MoviePoster from "./MoviePoster";
import Title from "./Title";

const MediaSection: FC<{
  title: string;
  movies: IPopularMoviesResponse["results"];
}> = ({ title, movies }) => {
  return (
    <div className="py-8">
      <Title title={title} />
      <div className="grid grid-cols-12 gap-3 m-5">
        {movies.map((movie) => (
          <MoviePoster movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MediaSection;
