import { ShoppingContextProvider } from "@/context/ShoppingContext";
import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";
import { AppProps } from "next/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <ShoppingContextProvider>
        <Component {...pageProps} />
      </ShoppingContextProvider>
    </Container>
  );
}