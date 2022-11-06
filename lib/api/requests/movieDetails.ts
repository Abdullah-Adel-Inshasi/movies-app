import axiosInstance from "~/lib/utils/axoisInstance";
import IMovieDetails from "../types/IMovieDetails";

const getMovieDetails = async (id: string) => {
  const { data } = await axiosInstance.get(`movie/${id}`);
  return data as IMovieDetails;
};
export default getMovieDetails;
