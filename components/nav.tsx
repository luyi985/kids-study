import * as React from "react";
import Link from "next/link";

type LinkType = {
  level: number;
  parent: string;
  label: string;
  url: string;
};

const NavLinks = [
  {
    label: "Mathematics",
    path: ["math"],
  },
  {
    label: "Addition practice",
    path: ["math", "practices"],
  },
];

const makeLinks = (): LinkType[] =>
  NavLinks.map((link) => ({
    label: link.label,
    url: `/${link.path.join("/")}`,
    parent: link.path.length === 1 ? "" : link.path[link.path.length - 2],
    level: link.path.length,
  }));

const NavLink = ({ label, url }: { label: string; url: string }) => (
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
