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
      <form>
        <input
          placeholder="Search movies"
          className="border border-blue-400 focus:outline-red-500"
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={searchInputRef}
        />
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

                <div className="grid grid-cols-12 gap-3 m-5">
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
