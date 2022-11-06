import React from "react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "./_app";

const NotFound: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  return (
    <div className="relative h-screen flex flex-row">
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-404-yellow" />
      <div className="flex-1 bg-404-teal" />
      <div className="flex-1 bg-404-green" />
      <div className="flex-1 bg-404-pink" />
      <div className="flex-1 bg-404-red" />
      <div className="flex-1 bg-404-blue" />
      <div className="flex-3 whitespace-nowrap w-full absolute text-center self-center ">
        <p className="bg-black text-white  text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl p-5 tracking-normal selection:tracking-widest selection:bg-white selection:text-black selection:space-x-3">
          {t("404")}
        </p>
      </div>
    </div>
  );
};
NotFound.getLayout = (page) => {
  return <>{page}</>;
};
export default NotFound;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
