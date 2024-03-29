import fs from "fs";
import path from "path";
import MathCalc from "./mathCalc";
import Question, { MathQuestion, Op } from "./mathQuestion";

const MIX_SCOPE = 15;
const SUBTRACT_SCOPE = 20;
const NUMBER_UPPER_SCOPE = 15;
const HOW_MANY_QUESTIONS = 4000;
const JSON_LOCATION = path.join(process.cwd(), "/statics/math_questions");

const mathCalc = new MathCalc();
const additionQuestionMaker = new Question(mathCalc, {
  scope: NUMBER_UPPER_SCOPE,
  questionCount: HOW_MANY_QUESTIONS,
  numOfOps: 1,
  allowedOps: [Op.addition],
  scopeToResult: false,
});

const subtractQuestionMaker = new Question(mathCalc, {
  scope: SUBTRACT_SCOPE,
  questionCount: HOW_MANY_QUESTIONS,
  numOfOps: 1,
  allowedOps: [Op.subtract],
  scopeToResult: false,
});

const mixQuestionMaker = new Question(mathCalc, {
  scope: MIX_SCOPE,
  questionCount: HOW_MANY_QUESTIONS,
  numOfOps: 2,
  allowedOps: [Op.subtract, Op.addition],
  scopeToResult: true,
});
export const additionJson = (): MathQuestion[] => {
  try {
    const data = fs.readFileSync(`${JSON_LOCATION}/addition.json`).toString();
    return JSON.parse(data);
  } catch (e) {
    const additionQuestions = additionQuestionMaker.make();
    fs.writeFileSync(
      `${JSON_LOCATION}/addition.json`,
      JSON.stringify(additionQuestions, null, 4),
      { flag: "w" }
    );
    return additionQuestions;
  }
};

export const subtractionJson = (): MathQuestion[] => {
  try {
    const data = fs.readFileSync(`${JSON_LOCATION}/subtract.json`).toString();
    return JSON.parse(data);
  } catch (e) {
    const subtractionQuestions = subtractQuestionMaker.make();
    fs.writeFileSync(
      `${JSON_LOCATION}/subtract.json`,
      JSON.stringify(subtractionQuestions, null, 4),
      { flag: "w" }
    );
    return subtractionQuestions;
  }
};

export const mixJson = (): MathQuestion[] => {
  try {
    const data = fs.readFileSync(`${JSON_LOCATION}/mix.json`).toString();
    return JSON.parse(data);
  } catch (e) {
    const mixQuestions = mixQuestionMaker.make();
    fs.writeFileSync(
      `${JSON_LOCATION}/mix.json`,
      JSON.stringify(mixQuestions, null, 4),
      { flag: "w" }
    );
    return mixQuestions;
  }
};
