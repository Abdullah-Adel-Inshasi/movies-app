import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import LayoutProvider from "../providers/Layout";
import "styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  if (Component.getLayout !== undefined) {
    return <Component {...pageProps} />;
  }
  return (
    <LayoutProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
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
