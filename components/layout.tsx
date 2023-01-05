import * as React from "react";
import { Nav } from "@/components/nav";

export const Container = (props: {
  children: React.ReactNode[] | React.ReactNode;
}) => <div>{props.children}</div>;

export const Layout = (props: {
  children: React.ReactNode[] | React.ReactNode;
}) => (
  <main>
    <div className="page-row">
      <div className="row">
        <Nav />
      </div>
    </div>
    <div className="page-row">{props.children}</div>
    <footer className="page-row">
      <div>this footer</div>
    </footer>
  </main>
);
