import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getPopularMovies, searchMoviesByName } from "@API/requests";
import { HeroImage, MediaSection, LoadingMediaSection } from "@Components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useDebounce from "~/src/hooks/useDebounce";

const Home = ({ movies }: { movies: IPopularMoviesResponse["results"] }) => {
  const [results, setResults] = useState<IMovie[]>(movies);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string | null>(searchTerm, 1000);

  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchMoviesByName(debouncedSearchTerm)
        .then((data) => {
          if (data.results.length) {
            setResults(data.results);
            router.replace(`?search=${debouncedSearchTerm}`, undefined, {
              shallow: true,
            });
          }
        })
        .catch((err) => {})
        .finally(() => setIsSearching(false));
    } else {
      setResults(movies);
    }
  }, [debouncedSearchTerm, movies]);
  return (
    <>
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
        <LoadingMediaSection searchQuery={debouncedSearchTerm ?? ""} />
      ) : (
        <MediaSection
          title={
            search || debouncedSearchTerm
              ? `Search for "${search ?? debouncedSearchTerm}"`
              : "Popular Movies"
          }
          movies={results}
        />
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  if (query.search) {
    const { results: movies } = await searchMoviesByName(
      query.search.toString()
    );
    return {
      props: {
        ...(await serverSideTranslations(locale!, ["common"])),
        movies: movies,
      },
    };
  }
  const { results: movies } = await getPopularMovies();
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      movies: movies,
    },
  };
};
