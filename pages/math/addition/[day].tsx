import {
  ADDITION_URL,
  makeStaticPracticePath,
  NUM_PER_DAY,
} from "@/components/nav";
import { additionJson } from "@/core/makeMathJson";
import { MathQuestion } from "@/core/mathQuestion";
import { FC } from "react";

const Addition: FC<{
  additions: MathQuestion[];
}> = ({ additions }) => {
  return <pre>{JSON.stringify(additions, null, 4)}</pre>;
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
