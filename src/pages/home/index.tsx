import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularMovies, searchMoviesByName } from "@API/requests";
import {
  MoviePoster,
  HeroImage,
  LoadingMediaSection,
  Title,
} from "@Components";
import useDebounce from "~/src/hooks/useDebounce";

const Home = ({ movies }: { movies: IPopularMoviesResponse }) => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { search } = router.query;
  const [searchTerm, setSearchTerm] = useState<string>(
    search?.toString() ?? ""
  );
  const debouncedSearchTerm = useDebounce<string | null>(searchTerm, 1000);
  const {
    data: searchData,
    isLoading,
    isError,
  } = useQuery<IPopularMoviesResponse>({
    queryKey: ["movies", debouncedSearchTerm],
    queryFn: ({ queryKey }) => {
      const searchQuery = queryKey[1] as string;
      if (searchQuery) {
        return searchMoviesByName(queryKey[1] as string);
      } else {
        return getPopularMovies();
      }
    },
    initialData: movies,
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`?search=${debouncedSearchTerm}`, undefined, {
        shallow: true,
      });
    } else {
      router.push("", undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = searchTerm;
    }
  }, []);

  if (isError || !searchData) {
    return <>Error happened</>;
  }

  return (
    <>
      <HeroImage
        image={movies.results[0].backdrop_path}
        title={movies.results[0].title}
        description={movies.results[0].overview}
        genres={movies.results[0].genres}
      />
      <form className="flex justify-center mt-5 " data-netlify="true">
        <div className="mx-auto w-1/3">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search movies"
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchInputRef}
            />
          </div>
        </div>
        {/* <input
          placeholder="Search movies"
          className="border border-blue-400 focus:outline-red-500"
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={searchInputRef}
        /> */}
      </form>
      {isLoading ? (
        <LoadingMediaSection searchQuery={debouncedSearchTerm ?? ""} />
      ) : (
        <div>
          {(() => {
            if (!searchData.results.length) {
              return (
                <p className="text-2xl font-bold text-white">
                  No results for {debouncedSearchTerm}
                </p>
              );
            }
            return (
              <>
                <Title>
                  {debouncedSearchTerm
                    ? `Search for "${debouncedSearchTerm}"`
                    : "Popular Movies"}
                </Title>

                <div className="grid grid-cols-12 gap-3 p-5">
                  {searchData.results.map((movie) => (
                    <MoviePoster movie={movie} key={movie.id} />
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  movies: IPopularMoviesResponse;
}> = async ({ locale, query }) => {
  const queryClient = new QueryClient();

  if (query.search) {
    await queryClient.prefetchQuery<IPopularMoviesResponse>(
      ["movies", query.search],
      () => searchMoviesByName(query.search!.toString())
    );
  } else {
    await queryClient.prefetchQuery<IPopularMoviesResponse>(
      ["movies", ""],
      () => getPopularMovies()
    );
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      movies: dehydrate(queryClient).queries[0].state
        .data as IPopularMoviesResponse,
    },
  };
};
