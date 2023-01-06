import {
  NavLink,
  SUBTRACTION_URL,
  makeStaticPracticePath,
} from "@/components/nav";
import { subtractionJson } from "@/core/makeMathJson";
import * as React from "react";

const Subtraction = ({ totalSubtractions }: { totalSubtractions: number }) => (
  <ul className="list-group list-group-horizontal wrap">
    {makeStaticPracticePath(SUBTRACTION_URL, totalSubtractions).map((props) => (
      <li key={props.key} className="list-group-item col-2">
        <NavLink {...props} />
      </li>
    ))}
  </ul>
);

export default Subtraction;
export async function getStaticProps(context: any) {
  const data = subtractionJson();
  return {
    props: { totalSubtractions: data.length },
  };
}
