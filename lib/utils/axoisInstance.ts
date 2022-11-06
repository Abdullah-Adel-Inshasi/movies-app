import axios, { AxiosInstance } from "axios";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: { api_key: process.env.PUBLIC_NEXT_APP_TMDB_API_KEY },
});
export default axiosInstance