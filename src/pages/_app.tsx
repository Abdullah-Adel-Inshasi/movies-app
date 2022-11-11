import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import LayoutProvider from "../providers/Layout";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout !== undefined) {
    return <Component {...pageProps} />;
  }

  return (
    <LayoutProvider>
      <Component {...pageProps} />
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
