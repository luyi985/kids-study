import { MathDayList } from "@/components/mathDayList";
import {
  NavLink,
  SUBTRACTION_URL,
  makeStaticPracticePath,
} from "@/components/nav";
import { subtractionJson } from "@/core/makeMathJson";
import { MathCalcType } from "@/core/mathQuestion";
import * as React from "react";

const Subtraction = ({ totalSubtractions }: { totalSubtractions: number }) => (
  <MathDayList
    baseUrl={SUBTRACTION_URL}
    total={totalSubtractions}
    type={MathCalcType.subtract}
  />
);

export default Subtraction;
export async function getStaticProps(context: any) {
  const data = subtractionJson();
  return {
    props: { totalSubtractions: data.length },
  };
}
