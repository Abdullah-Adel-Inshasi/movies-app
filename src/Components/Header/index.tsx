import React, { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MagnifyingGlass, NotificationsBell } from "@Icons";
const Header: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "navTabs" });
  const [shouldShowOptions, setShouldShowOptions] = useState<boolean>(false);
  const [shouldExpandMenu, setShouldExpandMenu] = useState<boolean>(false);
  const [shouldHeaderBeBlack, setShouldHeaderBeBlack] =
    useState<boolean>(false);
  const tabs: Record<string, string> = useMemo(
    () => ({
      home: "home",
      series: "series",
      films: "films",
      latest: "latests",
      myList: "bookmarks",
      browseByLanguage: "languages",
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY < 100) {
        setShouldHeaderBeBlack(false);
      } else {
        setShouldHeaderBeBlack(true);
      }
    });
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (Object.keys(tabs).filter((tab) => router.asPath.includes(tab)).length) {
      setShouldShowOptions(true);
    }
  }, [router, tabs]);
  const getCurrentTab = useMemo(() => {
    const currentTab = Object.keys(tabs).filter((tab) =>
      router.asPath.includes(tab)
    )[0];
    const tabName = currentTab;
    return tabName;
  }, [router.asPath, tabs]);

  return (
    <header
      className={`z-10 fixed transition-all duration-500 ease-in-out top-0 w-full flex px-12 pt-8 pb-4 bg-gradient-to-b from-headerBackground to-transparent justify-between sm:justify-start ${
        shouldHeaderBeBlack ? "bg-headerBackground" : ""
      }`}
    >
      <Link href="/home">
        <a>
          <Image src="/images/logo.png" width={92} height={25} alt="Netflix" />
        </a>
      </Link>
      {shouldShowOptions && (
        <nav className="ml-4 w-full flex sm:justify-between justify-end ">
          <ul className=" text-white flex  gap-3 ">
            {Object.keys(tabs).map((tab) => (
              <Link key={tab} href={tabs[tab]}>
                <a
                  className={`whitespace-nowrap hidden sm:block ${
                    getCurrentTab !== tab
                      ? "transition ease-in  hover:duration-150 hover:text-customGray hover:cursor-pointer"
                      : "cursor-default font-semibold"
                  }`}
                >
                  {t(tab)}
                </a>
              </Link>
            ))}
            <button
              className={`flex flex-row gap-2 sm:hidden items-center z-20 cursor-pointer group`}
              onClick={() => {
                setShouldExpandMenu((prev) => !prev);
              }}
            >
              <span className="m-auto cursor-pointer">Menu</span>
              <div
                className={`group flex flex-col gap-1 w-8  cursor-pointer ${
                  shouldExpandMenu ? "relative gap-0" : ""
                }`}
              >
                <div
                  className={`h-1 origin-center w-8  bg-white self-end transition-all ease-in-out duration-200 ${
                    shouldExpandMenu
                      ? "w-8 rotate-[45deg] absolute"
                      : "group-hover:w-8"
                  }`}
                />
                <div
                  className={`h-1 origin-center  bg-white self-end transition-all ease-in-out duration-200 ${
                    shouldExpandMenu
                      ? "w-8 -rotate-[45deg] absolute"
                      : "w-4 group-hover:w-8"
                  }`}
                />
              </div>
            </button>
          </ul>
          <div className="hidden flex-row items-center  sm:flex space-x-2">
            <MagnifyingGlass />
            <Link href={"/kids"}>
              <a
                className={`text-white transition ease-in  hover:duration-150 hover:text-customGray hover:cursor-pointer`}
              >
                Children
              </a>
            </Link>
            <Link href={"/DVD"}>
              <a
                className={`text-white transition ease-in  hover:duration-150 hover:text-customGray hover:cursor-pointer`}
              >
                DVD
              </a>
            </Link>
            <NotificationsBell />
          </div>
        </nav>
      )}

      <div
        className={` fixed -inset-y-0 -inset-x-0 bg-black bg-opacity-50 z-10 block sm:hidden pt-24 transition-all duration-150 ${
          shouldExpandMenu ? "w-full h-full" : "w-0  hidden"
        }`}
      >
        <h3 className="text-4xl pb-4 invert">Explore Categories</h3>
        <ul className="space-y-2">
          {Object.keys(tabs).map((tab) => (
            <li key={tab}>
              <Link href={tabs[tab]}>
                <a className="text-xl pl-4 invert">-{t(tab)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
