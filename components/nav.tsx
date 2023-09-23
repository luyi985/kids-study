import * as React from "react";
import Link from "next/link";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Container, Row } from "react-bootstrap";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";
import { UserSelector } from "./userSelector";

type LinkType = {
  label: string;
  url: string;
  className?: string;
  navChildren?: LinkType[];
};

export const ADDITION_URL = "/math/addition/";
export const SUBTRACTION_URL = "/math/subtraction/";
export const MIX_URL = "/math/mix/";
export const NUM_PER_DAY = 25;
const NavLinks: LinkType[] = [
  {
    label: "Mathematics",
    url: "/math",
    className: `nav-item ${styles.nav_item}`,
    navChildren: [
      {
        label: "Addition practice",
        url: "/math/addition",
        className: `${styles.nav_item} l2`,
      },
      {
        label: "Subtraction practice",
        url: "/math/subtraction",
        className: `${styles.nav_item} l2`,
      },
      {
        label: "Mix practice",
        url: "/math/mix",
        className: `${styles.nav_item} l2`,
      },
    ],
  },
];

export const makeStaticPracticePath = (
  baseUrl: string,
  totalCount: number,
  numPerDay: number = NUM_PER_DAY
): Array<{ key: string; label: string; url: string; day: number }> =>
  new Array(Math.ceil(totalCount / numPerDay)).fill(null).map((_, idx) => ({
    day: idx + 1,
    key: `${idx + 1}`,
    label: `Day ${idx + 1}`,
    url: `${baseUrl}${idx + 1}`,
  }));

export const NavLink = ({
  label,
  url,
  handleClose,
  className,
}: {
  label: string;
  url: string;
  handleClose?: () => any;
  className?: string;
}) => {
  const router = useRouter();
  const handleLinkClick = React.useCallback(() => {
    if (handleClose) {
      handleClose();
    }
    router.push(url);
  }, [handleClose, router, url]);
  return (
    <Link href={url} className={className ?? ""} onClick={handleLinkClick}>
      {label}
    </Link>
  );
};

const makeNavLinks = (
  links: LinkType[],
  route: string,
  handleClose: () => any
) => {
  if (!links.length) return null;
  return links.map((l) => {
    const classNameWithActive = route.startsWith(l.url)
      ? `${l.className} active`
      : l.className;
    if (!Array.isArray(l.navChildren) || !l.navChildren.length) {
      return (
        <NavLink
          {...l}
          key={l.url}
          handleClose={handleClose}
          className={classNameWithActive}
        />
      );
    }
    const { navChildren, ...subRootProps } = l;
    return (
      <div key={`${subRootProps.url}_sub_root`}>
        <NavLink
          {...subRootProps}
          key={subRootProps.url}
          handleClose={handleClose}
          className={classNameWithActive}
        />
        {makeNavLinks(navChildren, route, handleClose)}
      </div>
    );
  });
};

export const Nav: React.FC<{}> = ({}) => {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container fluid style={{ justifyContent: "flex-start", gap: "10px" }}>
        <Button variant="primary" onClick={handleShow}>
          <i className="bi bi-list"></i>
        </Button>
        <UserSelector />
      </Container>
      <Offcanvas show={show} onHide={handleClose} style={{ maxWidth: "80%" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Content</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.nav}>
          {makeNavLinks(NavLinks, router.route, handleClose)}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
