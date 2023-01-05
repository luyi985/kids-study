import { additionJson } from "@/core/makeMathJson";

const Practices = (props: any) => {
  console.log(props);
  return <div>Practices</div>;
};

export default Practices;
export async function getStaticProps(context: any) {
  await additionJson();
  return {
    // Passed to the page component as props
    props: { post: { a: 2, b: 3 } },
  };
}
