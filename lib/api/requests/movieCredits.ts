import axiosInstance from "~/lib/utils/axoisInstance";
import IMovieCredits from "../types/IMovieCredits";

const getMovieCredits = async (movieId: string) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
  return data as IMovieCredits;
};
export default getMovieCredits;
