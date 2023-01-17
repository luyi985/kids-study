import * as React from "react";
import { Nav } from "@/components/nav";
import BootstrapContainer from "react-bootstrap/Container";
import BootstrapRow from "react-bootstrap/Row";
import BootstrapCol from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { UserSelector } from "@/components/userSelector";
import { SuperContext } from "./common/superContext";

export const Container = BootstrapContainer;
export const Row = BootstrapRow;
export const Col = BootstrapCol;
export const Layout = (props: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const { user } = React.useContext(SuperContext);
  return (
    <main>
      <Navbar bg="dark" className="p-2 mb-2">
        <Nav />
      </Navbar>
      <Container>
        {user?.id && <Row>{props.children}</Row>}
        {!user?.id && (
          <Row>
            <p>No user selected</p>
          </Row>
        )}
        <Row>
          <div>this footer</div>
        </Row>
      </Container>
    </main>
  );
};
