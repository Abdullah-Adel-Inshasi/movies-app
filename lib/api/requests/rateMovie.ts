import axiosInstance from "~/lib/utils/axoisInstance";
import { getGuestSession } from "~/lib/utils/getGuestSession";

const rateMovie = async ({
  movieId,
  rate,
}: {
  movieId: string;
  rate: number;
}) => {
  const guest_session_id = await getGuestSession();
  const { data } = await axiosInstance.post(
    `/movie/${movieId}/rating`,
    {
      value: rate,
    },
    { params: { guest_session_id } }
  );
  return data;
};
export default rateMovie;
