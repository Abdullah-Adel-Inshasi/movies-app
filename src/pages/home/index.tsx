import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularMovies } from "@API/requests";
import { IPopularMoviesResponse } from "@API/types";
import { HeroImage, MediaSection } from "@Components";
import { useEffect, useState } from "react";
import useDebounce from "~/src/hooks/useDebounce";
import searchMovieByName from "~/lib/api/requests/searchMovies";
import { IMovie } from "~/lib/api/types/IPopularMoviesResponse";
import LoadingMediaSection from "~/src/Components/MediaSection/Loading";
const Home = ({ movies }: { movies: IPopularMoviesResponse["results"] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<IMovie[]>(movies);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchMovieByName(debouncedSearchTerm)
        .then((data) => {
          if (data.results.length) {
            setResults(data.results);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsSearching(false));
    } else {
      setResults(movies);
    }
  }, [debouncedSearchTerm, movies]);
  return (
    <div className=" bg-background">
      <div className="min-screen-min">
        <HeroImage
          image={results[0].backdrop_path}
          title={results[0].title}
          description={results[0].overview}
          genres={results[0].genres}
        />
        <input
          placeholder="Search movies"
          className="border border-blue-400 focus:outline-red-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isSearching ? (
          <LoadingMediaSection searchQuery={debouncedSearchTerm} />
        ) : (
          <MediaSection
            title={searchTerm ? `Search for "${searchTerm}"` : "Popular Movies"}
            movies={results}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { results: movies } = await getPopularMovies();
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      movies: movies,
    },
  };
};
