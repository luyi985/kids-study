import Question from './mathQuestion'
import MathCalc from './mathCalc'


const calc = new MathCalc()
const question = new Question(calc, {questionCount: 10, numOfOps: 10, topRange: 10, allowedOps:["+","-", "*"]})

describe("Question", () => {
  test("make", () => {
    const result =question.make();
    console.log(JSON.stringify(result, null, 4))
  })
})