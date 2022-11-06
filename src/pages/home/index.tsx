import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularMovies } from "~/lib/api/requests/movies";
import IPopularMoviesResponse from "~/lib/api/types/IPopularMoviesResponse";
import { HeroImage } from "~/src/Components";
import MediaSection from "~/src/Components/MediaSection";
const Home = ({ movies }: { movies: IPopularMoviesResponse["results"] }) => {
  console.log(movies[5].genres);
  return (
    <div className="min-screen-min bg-background">
      <HeroImage
        image={movies[16].backdrop_path}
        title={movies[16].title}
        description={movies[16].overview}
        genres={movies[16].genres}
      />
      <MediaSection title={"Popular Movies"} movies={movies} />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { results: movies } = await getPopularMovies();
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      movies,
    },
  };
};
