import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import IUser from "../@types/IUser";
import UserCard from "../Components/UserCard";

const Home: NextPage<{ users: IUser[] }> = ({ users }) => {
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen bg-background flex flex-col  text-red-50">
      <div className="mx-auto my-auto flex flex-col items-center">
        <h1 className="text-6xl font-sans light font-normal my-14 text-center">
          {t("whoWatching")}
        </h1>
        <ul className="flex gap-6 mb-16 mx-12 flex-wrap justify-center">
          {users.map((user) => (
            <UserCard
              image={user.picture}
              isPrivate={user.isPrivate}
              name={user.name}
              key={user.id}
            />
          ))}
        </ul>
        <button className="py-4 px-8 border mb-24 border-gray-500 font-medium hover:border-white w-auto text-gray-500 hover:text-white">
          {t("manageProfiles")}
        </button>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  users: IUser[];
}> = async ({ locale }) => {
  const users = [
    {
      id: 1,
      name: "Nidal",
      picture: "/images/profile-images/profile-picture-1.png",
      isPrivate: false,
    },
    {
      id: 2,
      name: "Iman",
      picture: "/images/profile-images/profile-picture-2.png",
      isPrivate: false,
    },
    {
      id: 3,
      name: "Mo-Salah",
      picture: "/images/profile-images/profile-picture-3.png",
      isPrivate: true,
    },
    {
      id: 4,
      name: "Paul",
      picture: "/images/profile-images/profile-picture-4.png",
      isPrivate: true,
    },
    {
      id: 5,
      name: "Children",
      picture: "/images/profile-images/profile-picture-kids.png",
      isPrivate: false,
    },
  ];
  return {
    props: {
      users,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
