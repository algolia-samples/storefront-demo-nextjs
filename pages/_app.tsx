import type { AppProps } from 'next/app';

import { Main } from '../layouts';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
