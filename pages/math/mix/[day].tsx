import { MIX_URL, makeStaticPracticePath, NUM_PER_DAY } from "@/components/nav";
import { Questions } from "@/components/question";
import { mixJson } from "@/core/makeMathJson";
import { MathCalcType, MathQuestion } from "@/core/mathQuestion";
import Head from "next/head";
import { FC } from "react";

const Mix: FC<{
  mixes: MathQuestion[];
  day: number;
  staticData: string;
}> = ({ mixes, day, staticData }) => {
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
      <Questions questions={mixes} day={day} type={MathCalcType.mix} />
    </>
  );
};

export default Mix;

export async function getStaticProps(context: any) {
  const data = mixJson();
  const day = Number(context?.params?.day ?? 1);
  const start = NUM_PER_DAY * Math.max(day - 1, 0);

  return {
    props: {
      mixes: data.slice(start, start + NUM_PER_DAY),
      day,
    },
  };
}

export async function getStaticPaths() {
  const data = mixJson();
  const allPathData = makeStaticPracticePath(MIX_URL, data.length);
  return {
    paths: allPathData.map((d) => ({ params: { day: d.key } })),
    fallback: false,
  };
}
