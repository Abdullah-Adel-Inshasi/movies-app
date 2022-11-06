import { NextApiRequest, NextApiResponse } from "next";
import IMovie from "~/src/@types/IMovie";
import genres from "../../../../lib/db/genres.json";
import movies from "../../../../lib/db/movies.json";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<any, IMovie[]>>
) {
  const featured: Record<any, IMovie[]> = {};
  genres.forEach((genre) => {
    let genreMovies: IMovie[] = movies.filter((movie) =>
      movie.genres.includes(genre)
    );
    const shuffledGenre = genreMovies.sort(() => 0.5 - Math.random());

    featured[genre] = shuffledGenre.slice(0, 6);
  });
  res.json(featured);
}
