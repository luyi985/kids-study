import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { initSuperDb } from "@/core/superDb";
export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
   const superDb = initSuperDb();
  // }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
