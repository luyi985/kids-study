import {
  ADDITION_URL,
  makeStaticPracticePath,
  NUM_PER_DAY,
} from "@/components/nav";
import { Questions } from "@/components/question";
import { additionJson } from "@/core/makeMathJson";
import { MathQuestion } from "@/core/mathQuestion";
import Head from "next/head";
import { FC } from "react";

const Addition: FC<{
  additions: MathQuestion[];
}> = ({ additions }) => {
  return (
    <>
      <Head>
        <title>Kids Study</title>
        <meta name="description" content="Make my kids better" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Questions questions={additions} />
    </>
  );
};

export default Addition;

export async function getStaticProps(context: any) {
  const data = additionJson();
  const day = Number(context?.params?.day ?? 1);
  const start = NUM_PER_DAY * Math.max(day - 1, 0);
  return {
    props: { additions: data.slice(start, start + NUM_PER_DAY) },
  };
}

export async function getStaticPaths() {
  const data = additionJson();
  const allPathData = makeStaticPracticePath(ADDITION_URL, data.length);
  return {
    paths: allPathData.map((d) => ({ params: { day: d.key } })),
    fallback: false,
  };
}
