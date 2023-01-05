import Question, { Op } from "./mathQuestion";
import MathCalc from "./mathCalc";

const calc = new MathCalc();
const question = new Question(calc, {
  questionCount: 10,
  numOfOps: 10,
  scope: 10,
  allowedOps: [Op.product, Op.plus, Op.subtract],
});

describe("Question", () => {
  test("make", () => {
    const result = question.make();
    console.log(JSON.stringify(result, null, 4));
  });
});
