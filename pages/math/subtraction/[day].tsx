import {
  SUBTRACTION_URL,
  makeStaticPracticePath,
  NUM_PER_DAY,
} from "@/components/nav";
import { Questions } from "@/components/question";
import { subtractionJson } from "@/core/makeMathJson";
import { MathQuestion } from "@/core/mathQuestion";
import { FC } from "react";
const subtraction: FC<{
  subtractions: MathQuestion[];
}> = ({ subtractions }) => {
  return <Questions questions={subtractions} />;
  return <pre>{JSON.stringify(subtractions, null, 4)}</pre>;
};

export default subtraction;

export async function getStaticProps(context: any) {
  const data = subtractionJson();
  const day = Number(context?.params?.day ?? 1);
  const start = NUM_PER_DAY * Math.max(day - 1, 0);
  return {
    props: { subtractions: data.slice(start, start + NUM_PER_DAY) },
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
