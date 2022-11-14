import { IMovie } from "../api/types/IPopularMoviesResponse";

export const addToFavorites = (movie: FavoriteMovieType) => {
  try {
    const storage = localStorage.getItem("favoriteMovies");
    if (storage === null) {
      throw new Error("key is not found");
    }
    const movies = JSON.parse(storage);
    movies.push(movie);
    localStorage.setItem("favoriteMovies", JSON.stringify(movies));
  } catch (error) {
    localStorage.setItem("favoriteMovies", JSON.stringify([movie]));
  }
};

export const isInFavorites = (id: number): boolean => {
  try {
    const storage = localStorage.getItem("favoriteMovies");
    if (storage === null) {
      throw new Error("favoriteMovies is null");
    }
    const movies: FavoriteMovieType[] = JSON.parse(storage);
    const isFound = movies.find((movie) => movie.id === id);
    return !!isFound;
  } catch (error) {
    return false;
  }
};

export const removeFromFavorites = (id: number): void => {
  try {
    const storage = localStorage.getItem("favoriteMovies");
    if (storage === null) {
      throw new Error("favoriteMovies is null");
    }
    const movies: FavoriteMovieType[] = JSON.parse(storage);
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
  } catch (error) {}
};

type FavoriteMovieType = Pick<IMovie, "id" | "poster_path" | "title">;
