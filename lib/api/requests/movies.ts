import axiosInstance from "~/lib/utils/axoisInstance";
import IPopularMoviesResponse from "../types/IPopularMoviesResponse";
import { GENRES } from "~/lib/constants";
const getPopularMovies = async (page = 1) => {
  const { data } = await axiosInstance.get<IPopularMoviesResponse>(
    "/movie/popular",
    {
      params: { page },
    }
  );
  data.results.forEach(
    (movie) => (movie.genres = movie.genre_ids.map((id) => GENRES[id]))
  );
  return data;
};

export { getPopularMovies };
