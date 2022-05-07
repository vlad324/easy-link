import '../styles/globals.css'
import { ChakraProvider, ComponentStyleConfig, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from "../contexts/GlobalContext";
import Layout from "../components/Layout";
import Fonts from "../components/Fonts";

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base',
    width: '12rem'
  },
  sizes: {
    md: {
      fontSize: 'md',
      px: 6,
      py: 4,
    },
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'green.400',
      color: 'green.400',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}

const Select: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        _focus: {
          borderColor: 'green.300',
          boxShadow: '0 0 0 1px green.300'
        }
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}

const Textarea: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'base',
    borderColor: 'green.400',
  },
  variants: {
    outline: {
      field: {
        _focus: {
          borderColor: 'green.300',
          boxShadow: '0 0 0 1px green.300'
        }
      }
    }
  },
  defaultProps: {
    variant: 'outline',
  },
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'green.400'
      }
    }
  },
  components: {
    Button, Select, Textarea
  },
  fonts: {
    heading: 'Satoshi-Bold, sans-serif',
    body: 'Satoshi-Bold, sans-serif',
  },
})

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
