import {
  SUBTRACTION_URL,
  makeStaticPracticePath,
  NUM_PER_DAY,
} from "@/components/nav";
import { Questions } from "@/components/question";
import { subtractionJson } from "@/core/makeMathJson";
import { MathCalcType, MathQuestion } from "@/core/mathQuestion";
import Head from "next/head";
import { FC } from "react";
const subtraction: FC<{
  subtractions: MathQuestion[];
  day: number;
}> = ({ subtractions, day }) => {
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
      <Questions
        questions={subtractions}
        day={day}
        type={MathCalcType.subtract}
      />
    </>
  );
};

export default subtraction;

export async function getStaticProps(context: any) {
  const data = subtractionJson();
  const day = Number(context?.params?.day ?? 1);
  const start = NUM_PER_DAY * Math.max(day - 1, 0);
  return {
    props: { subtractions: data.slice(start, start + NUM_PER_DAY), day },
  };
}

export async function getStaticPaths() {
  const data = subtractionJson();
  const allPathData = makeStaticPracticePath(SUBTRACTION_URL, data.length);
  return {
    paths: allPathData.map((d) => ({ params: { day: d.key } })),
    fallback: false,
  };
}
