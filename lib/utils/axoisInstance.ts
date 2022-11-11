import axios, { AxiosInstance } from "axios";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: { api_key: process.env.NEXT_PUBLIC_APP_TMDB_API_KEY },
});
export default axiosInstance;
