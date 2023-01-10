import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kids Study</title>
        <meta name="description" content="Make my kids better" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <div>{`This project name is kids-study`}</div>
      </main>
    </>
  );
}
