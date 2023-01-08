import * as React from "react";
import { Nav } from "@/components/nav";
import BootstrapContainer from "react-bootstrap/Container";
import BootstrapRow from "react-bootstrap/Row";
import BootstrapCol from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

export const Container = BootstrapContainer;
export const Row = BootstrapRow;
export const Col = BootstrapCol;
export const Layout = (props: {
  children: React.ReactNode[] | React.ReactNode;
}) => (
  <main>
    <Navbar bg="dark" className="p-2 mb-2">
      <Nav />
    </Navbar>
    <Container>
      <Row>{props.children}</Row>
      <Row>
        <div>this footer</div>
      </Row>
    </Container>
  </main>
);
