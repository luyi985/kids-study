import { MathDayList } from "@/components/mathDayList";
import { ADDITION_URL } from "@/components/nav";
import { additionJson } from "@/core/makeMathJson";
import { MathCalcType } from "@/core/mathQuestion";
const Addition = ({ totalAddition }: { totalAddition: number }) => (
  <MathDayList
    baseUrl={ADDITION_URL}
    total={totalAddition}
    type={MathCalcType.addition}
  />
);

export default Addition;

export async function getStaticProps(context: any) {
  const data = additionJson();
  return {
    props: { totalAddition: data.length },
  };
}
