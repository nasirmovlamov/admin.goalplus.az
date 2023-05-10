import { store, useAppSelector } from "@/store/store";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
