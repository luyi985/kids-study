import MathCalc from "./mathCalc";
export enum Op {
  "plus" = "+",
  "subtract" = "-",
  "product" = "*",
  "divide" = "/",
}

const calc = new MathCalc();

type MathQuestion = {
  question: string;
  result: string;
  steps: string[];
};

export default class Question {
  private ops: Op[] = [Op.plus, Op.subtract, Op.product, Op.divide];
  private topRange: number = 100;
  private topRangeToResult: boolean = true;
  private questionCount: number = 10;
  private calc: MathCalc;
  private numOfOps: number = 1;
  constructor(
    calc: MathCalc,
    options: {
      topRange: number;
      topRangeToResult?: boolean;
      questionCount?: number;
      allowedOps?: Op[];
      numOfOps?: number;
    }
  ) {
    this.calc = calc;
    if (options?.topRange) {
      this.topRange = options.topRange;
    }
    if (options?.allowedOps) {
      this.ops = options.allowedOps;
    }
    if (options?.questionCount) {
      this.questionCount = options.questionCount;
    }
    if (options?.numOfOps) {
      this.numOfOps = options.numOfOps;
    }
    this.topRangeToResult = options.topRangeToResult ?? this.topRangeToResult;
  }

  private pickNumber(picked: number[] = []): number[] {
    if (Object.keys(picked).length >= this.questionCount)
      return Object.values(picked);
    const pick = Math.floor(Math.random() * this.topRange);
    return this.pickNumber([...picked, pick]);
  }
  private pickOp() {
    return this.ops[Math.floor(Math.random() * this.ops.length)];
  }
  private makeQuestions(): MathQuestion[] {
    const paramsPlaceHolder = new Array(this.numOfOps + 1).fill(null);
    const paramsCount = paramsPlaceHolder.length;
    const picked = paramsPlaceHolder.map(() => this.pickNumber());
    const madeQuestions = [];
    for (let q = 0; q < picked[0].length; q++) {
      let question = "";
      for (let o = 0; o < paramsCount; o++) {
        question +=
          o < paramsCount - 1
            ? `${picked[o][q]}${this.pickOp()}`
            : picked[o][q];
      }
      const result = this.calc.assign(question).calc();
      madeQuestions.push({ question, result, steps: this.calc.steps });
    }
    return madeQuestions;
  }
  make() {
    if (!this.topRangeToResult) {
      return this.makeQuestions();
    }
    let resultQuestions: MathQuestion[] = [];
    while (resultQuestions.length < this.questionCount) {
      resultQuestions = [
        ...resultQuestions,
        ...this.makeQuestions().filter(
          (q) =>
            !isNaN(parseFloat(q.result)) &&
            parseFloat(q.result) <= this.topRange
        ),
      ];
    }
    return resultQuestions.slice(0, this.questionCount);
  }
}
