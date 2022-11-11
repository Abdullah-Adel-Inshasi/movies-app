import axiosInstance from "~/lib/utils/axoisInstance";
import IMovieDetails from "../types/IMovieDetails";
import { AxiosResponse } from "axios";
const getMovieDetails = async (id: string) => {
  const { data }: AxiosResponse<IMovieDetails> = await axiosInstance.get(
    `movie/${id}`
  );
  return data as IMovieDetails;
};
export default getMovieDetails;
