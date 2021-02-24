import "../styles/globals.css";
import Head from "next/head";
import {Fragment} from 'react';
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Sloud App</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
