import * as React from "react";

const Math = (props: any) => {
  console.log(props);
  return <div>Math</div>;
};
export default Math;
export async function getStaticProps(context: any) {
  return {
    // Passed to the page component as props
    props: { post: { a: 2 } },
  };
}
