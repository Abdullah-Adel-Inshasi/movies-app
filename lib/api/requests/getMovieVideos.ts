import axiosInstance from "~/lib/utils/axoisInstance";
import IMovieVideos from "../types/IMovieVideos";

const getMovieVideos = async (movieId: number) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/videos`);
  return data as IMovieVideos;
};

export default getMovieVideos;
