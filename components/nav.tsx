import * as React from "react";
import Link from "next/link";

type LinkType = {
  label: string;
  url: string;
  className?: string;
  navChildren?: LinkType[];
};

export const ADDITION_URL = "/math/addition/";
export const SUBTRACTION_URL = "/math/subtraction/";
export const NUM_PER_DAY = 25;
const NavLinks: LinkType[] = [
  {
    label: "Mathematics",
    url: "/math",
    className: "dropdown-item",
    navChildren: [
      {
        label: "Addition practice",
        url: "/math/addition",
        className: "dropdown-item",
      },
      {
        label: "Subtraction practice",
        url: "/math/subtraction",
        className: "dropdown-item",
      },
    ],
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

export const DropDownNavItem: React.FC<{
  parent: LinkType;
  childItems: LinkType[];
}> = ({ parent, childItems }) => {
  return (
    <div className="dropdown">
      <NavLink className="btn btn-primary dropdown-toggle" {...parent} />
      <ul className="dropdown-menu show">
        {childItems.map((link) => (
          <NavLink {...link} key={link.url} className="dropdown-item" />
        ))}
      </ul>
    </div>
  );
};

export const NavLink = ({
  label,
  url,
  className,
}: {
  label: string;
  url: string;
  className?: string;
}) => (
  <Link href={url} className={className ?? ""}>
    {label}
  </Link>
);

const makeNavLinks = (links: LinkType[]) => {
  if (!links.length) return null;
  return links.map((l) => {
    if (!Array.isArray(l.navChildren) || !l.navChildren.length) {
      return <NavLink {...l} key={l.url} />;
    }
    const { navChildren, ...subRootProps } = l;
    return (
      <div key={`${subRootProps.url}_sub_root`}>
        <NavLink {...subRootProps} key={subRootProps.url} />
        {makeNavLinks(navChildren)}
      </div>
    );
  });
};

export const Nav: React.FC<{ root?: string; level?: number }> = ({ root }) => {
  return <>{makeNavLinks(NavLinks)}</>;
};
