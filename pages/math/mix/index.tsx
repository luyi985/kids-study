import { MathDayList } from "@/components/mathDayList";
import { MIX_URL } from "@/components/nav";
import { mixJson } from "@/core/makeMathJson";
import { MathCalcType } from "@/core/mathQuestion";
const Mix = ({ totalMix }: { totalMix: number }) => (
  <MathDayList baseUrl={MIX_URL} total={totalMix} type={MathCalcType.mix} />
);

export default Mix;

export async function getStaticProps(context: any) {
  const data = mixJson();
  return {
    props: { totalMix: data.length },
  };
}
