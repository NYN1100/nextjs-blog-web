import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/helpers/create-emotion-cache";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/helpers/theme";
import { CssBaseline } from "@mui/material";
import NProgress from "nprogress";
import { useEffect } from "react";
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone: any = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [props]);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
