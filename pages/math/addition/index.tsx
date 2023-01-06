import {
  NavLink,
  ADDITION_URL,
  makeStaticPracticePath,
} from "@/components/nav";
import { additionJson } from "@/core/makeMathJson";
const Addition = ({ totalAdditions }: { totalAdditions: number }) => (
  <ul className="list-group list-group-horizontal wrap">
    {makeStaticPracticePath(ADDITION_URL, totalAdditions).map((props) => (
      <li key={props.key} className="list-group-item col-2">
        <NavLink {...props} />
      </li>
    ))}
  </ul>
);

export default Addition;

export async function getStaticProps(context: any) {
  const data = additionJson();
  return {
    props: { totalAdditions: data.length },
  };
}
