import { useEffect } from "react";
import { NextPage } from "next";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import LayoutProvider from "../providers/Layout";
import { IUserContextValue, userContext } from "../providers/UserProvider";
import "styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [user, setUser] = useState<IUserContextValue["user"]>(null);
  // const router = useRouter();

  const values = useMemo(() => ({ user, setUser }), [user, setUser]);
  // useEffect(() => {
  //   console.log(values.user);
  // }, [values.user]);
  if (Component.getLayout !== undefined) {
    return (
      <userContext.Provider value={values}>
        <Component {...pageProps} />
      </userContext.Provider>
    );
  }

  return (
    <LayoutProvider>
      <userContext.Provider value={values}>
        <Component {...pageProps} />
      </userContext.Provider>
    </LayoutProvider>
  );
}

export default appWithTranslation(MyApp);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
