export default class MathCalc {
  private precision: number = 2;
  protected formula: string = "";
  private hasCalced: boolean = false;
  private ops = [
    new RegExp(/((^-[\d.]+|[\d.]+)(\*|\/)[\d.]+)/, "g"),
    new RegExp(/((^-[\d.]+|[\d.]+)(-|\+)[\d.]+)/, "g"),
  ];
  steps: string[] = [];

  private evalToCalc(calcString: string): string {
    const nums = calcString.match(/(^-[\d.]+|[\d.]+)/g);
    const op = calcString.match(/(\*|\/|-|\+)/g);
    const ns = (nums ?? []).map((n) => parseFloat(n));
    let result;
    switch (op?.[0]) {
      case "*":
        result = ns.reduce((r, n) => r * n, 1);
        break;
      case "/":
        result = ns[0] / ns[1];
        break;
      case "+":
        result = ns.reduce((r, n) => r + n, 0);
        break;
      case "-":
        result = ns[0] - ns[1];
        break;
      default:
        throw new Error(`Unknown op ${op}`);
    }

    if (result === 0) return "0";
    return result.toFixed(this.precision).replace(/(\.|0?)0*$/g, "");
  }

  assign(formula: string) {
    this.formula = "";
    this.steps = [];
    this.hasCalced = false;
    this.formula = formula.replace(/\s/g, "");
    return this;
  }

  calc(step: number = 0): string {
    if (this.hasCalced) {
      return this.formula;
    }
    if (!this.ops[step]) {
      this.hasCalced = true;
      return this.formula;
    }
    let matches: string[] | null = this.formula.match(this.ops[step]);
    while (Boolean(matches) && matches?.length) {
      this.formula = this.formula.replace(
        matches[0],
        this.evalToCalc(matches[0])
      );
      this.steps.push(this.formula);
      matches = this.formula.match(this.ops[step]);
    }
    return this.calc(step + 1);
  }
}
