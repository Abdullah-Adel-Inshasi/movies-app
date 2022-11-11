import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularMovies } from "@API/requests";
import { IPopularMoviesResponse } from "@API/types";
import { HeroImage, MediaSection } from "@Components";
const Home = ({ movies }: { movies: IPopularMoviesResponse["results"] }) => {
  return (
    <div className=" bg-background">
      <div className="min-screen-min">
        <HeroImage
          image={movies[2].backdrop_path}
          title={movies[2].title}
          description={movies[2].overview}
          genres={movies[2].genres}
        />
        <MediaSection title={"Popular Movies"} movies={movies} />
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
      movies: movies.slice(0, 6),
    },
  };
};
