import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
