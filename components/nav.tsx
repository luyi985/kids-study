import * as React from "react";
import Link from "next/link";

type LinkType = {
  level: number;
  parent: string;
  label: string;
  url: string;
};

export const ADDITION_URL = "/math/addition/";
export const SUBTRACTION_URL = "/math/subtraction/";
export const NUM_PER_DAY = 25;
const NavLinks = [
  {
    label: "Mathematics",
    path: ["math"],
  },
  {
    label: "Addition practice",
    path: ["math", "addition"],
  },
  {
    label: "Subtraction practice",
    path: ["math", "subtraction"],
  },
];

export const makeStaticPracticePath = (
  baseUrl: string,
  totalCount: number,
  numPerDay: number = NUM_PER_DAY
): Array<{ key: string; label: string; url: string }> =>
  new Array(Math.ceil(totalCount / numPerDay)).fill(null).map((_, idx) => ({
    key: `${idx + 1}`,
    label: `Day ${idx + 1}`,
    url: `${baseUrl}${idx + 1}`,
  }));

const makeLinks = (): LinkType[] =>
  NavLinks.map((link) => ({
    label: link.label,
    url: `/${link.path.join("/")}`,
    parent: link.path.length === 1 ? "" : link.path[link.path.length - 2],
    level: link.path.length,
  }));

export const NavLink = ({ label, url }: { label: string; url: string }) => (
  <Link href={url}>{label}</Link>
);

export const Nav = () => {
  return (
    <>
      {makeLinks().map((link) => (
        <NavLink {...link} key={link.url} />
      ))}
    </>
  );
};