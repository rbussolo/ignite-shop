import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";
import { AppProps } from "next/app";

import logoImg from '../../public/assets/logo.svg';

import Image from 'next/image';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} width={130} height={52} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}