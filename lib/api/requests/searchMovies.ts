import { GENRES } from "~/lib/constants";
import axiosInstance from "~/lib/utils/axoisInstance";

const searchMovieByName = async (query: string) => {
  const { data } = await axiosInstance.get("/search/movie", {
    params: { query },
  });
  data.results.forEach(
    (movie: IMovie) => (movie.genres = movie.genre_ids.map((id) => GENRES[id]))
  );
  return data as IPopularMoviesResponse;
};
export default searchMovieByName;
