import MathCalc from "./mathCalc";

export enum MathCalcType {
  "addition" = "addition",
  "subtract" = "subtract",
  "multiply" = "multiply",
  "divide" = "divide",
}

export enum Op {
  "addition" = "+",
  "subtract" = "-",
  "multiply" = "*",
  "divide" = "/",
}

const calc = new MathCalc();

export type MathQuestion = {
  question: string;
  result: string;
  steps: string[];
};

export default class Question {
  private ops: Op[] = [Op.addition, Op.subtract, Op.multiply, Op.divide];
  private scope: number = 100;
  private scopeToResult: boolean = true;
  private excludeNegative: boolean = true;
  private questionCount: number = 10;
  private calc: MathCalc;
  private numOfOps: number = 1;
  constructor(
    calc: MathCalc,
    options: {
      scope: number;
      scopeToResult?: boolean;
      excludeNegative?: boolean;
      questionCount?: number;
      allowedOps?: Op[];
      numOfOps?: number;
    }
  ) {
    this.calc = calc;
    if (options?.scope) {
      this.scope = options.scope;
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
    this.scopeToResult = options.scopeToResult ?? this.scopeToResult;
    this.excludeNegative = options.excludeNegative ?? this.excludeNegative;
  }

  private pickNumber(picked: number[] = []): number[] {
    if (Object.keys(picked).length >= this.questionCount)
      return Object.values(picked);
    const pick = Math.floor(Math.random() * this.scope);
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
    if (!this.scopeToResult && !this.excludeNegative) {
      return this.makeQuestions();
    }
    let resultQuestions: MathQuestion[] = [];
    while (resultQuestions.length < this.questionCount) {
      resultQuestions = [
        ...resultQuestions,
        ...this.makeQuestions().filter(
          (q) =>
            !isNaN(parseFloat(q.result)) &&
            (!this.scopeToResult || parseFloat(q.result) <= this.scope) &&
            (!this.excludeNegative || parseFloat(q.result) >= 0)
        ),
      ];
    }
    return resultQuestions.slice(0, this.questionCount);
  }
}
