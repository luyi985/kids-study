import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";

import { SuperProvider } from "@/components/common/superContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SuperProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SuperProvider>
  );
}
