import { SWRDevTools } from "swr-devtools";

export default function App({ Component, pageProps } : any) {
  return (
    <SWRDevTools>
      <Component {...pageProps} />
    </SWRDevTools>
  );
}
