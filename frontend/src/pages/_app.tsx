import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from "../contexts/GlobalContext";
import Layout from "../components/Layout";
import Fonts from "../components/Fonts";
import { theme } from "../themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts/>
      <GlobalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </ChakraProvider>
  );
}

export default MyApp
