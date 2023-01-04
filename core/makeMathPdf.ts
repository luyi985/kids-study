import PDFDocument from "pdfkit";
import fs from "fs";
import Question, { Op } from "./mathQuestion";
import MathCalc from "./mathCalc";

const mathCalc = new MathCalc();
const question = new Question(mathCalc, {
  topRange: 10,
  questionCount: 20,
  numOfOps: 1,
  allowedOps: [Op.plus],
  topRangeToResult: false,
});

const questionList = question.make();
console.log(questionList);
// Create a document
const doc = new PDFDocument();
doc.fontSize(18);
doc.pipe(fs.createWriteStream("output.pdf"));

questionList.forEach((item, idx) => {
  if (idx % 2 == 0) {
    return doc.text(`${item.question}=`, 30, undefined, {
      lineBreak: false,
      align: "left",
      width: 100,
    });
  }
  doc.moveUp(1);
  doc.text(`${item.question}=`, 300, undefined, {
    lineBreak: true,
    lineGap: 40,
  });
});

doc.end();
