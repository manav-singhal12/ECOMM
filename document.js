// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (<>
    <Html>
      <Head>
        <script src="https://cdn.lordicon.com/lordicon.js" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html></>
  );
}
