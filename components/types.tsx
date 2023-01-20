import { MathQuestion } from "@/core/mathQuestion";
export { MathCalcType, Op } from "@/core/mathQuestion";
export type DayQuestion = MathQuestion & {
  answer?: string;
};
