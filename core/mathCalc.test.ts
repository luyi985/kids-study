import MathCalc from "./mathCalc";

describe("MathCalc", () => {
  const mathCalc = new MathCalc();
  test("1+1", () => {
    expect(mathCalc.assign("1+1").calc()).toBe("2");
    expect(mathCalc.steps).toEqual(["2"]);
  });
  test("1+1-2", () => {
    expect(mathCalc.assign("1+1-2").calc()).toBe("0");
    expect(mathCalc.steps).toEqual(["2-2", "0"]);
  });
  test("1+1-2+2", () => {
    expect(mathCalc.assign("1+1-2+2").calc()).toBe("2");
    expect(mathCalc.steps).toEqual(["2-2+2", "0+2", "2"]);
  });
  test("2*2", () => {
    expect(mathCalc.assign("2*2").calc()).toBe("4");
    expect(mathCalc.steps).toEqual(["4"]);
  });
  test("1+2*2", () => {
    expect(mathCalc.assign("1+2*2").calc()).toBe("5");
    expect(mathCalc.steps).toEqual(["1+4", "5"]);
  });
  test("1/2+2*2", () => {
    expect(mathCalc.assign("1/2+2*2").calc()).toBe("4.5");
    expect(mathCalc.steps).toEqual(["0.5+2*2", "0.5+4", "4.5"]);
  });

  test("1/2+2*2", () => {
    expect(mathCalc.assign("1/2+2*2").calc()).toBe("4.5");
    expect(mathCalc.steps).toEqual(["0.5+2*2", "0.5+4", "4.5"]);
    expect(mathCalc.calc()).toBe("4.5");
    expect(mathCalc.steps).toEqual(["0.5+2*2", "0.5+4", "4.5"]);
  });

  test("1/2+2*2-2*2", () => {
    expect(mathCalc.assign("1/2+2*2-2*2").calc()).toBe("0.5");
    expect(mathCalc.steps).toEqual([
      "0.5+2*2-2*2",
      "0.5+4-2*2",
      "0.5+4-4",
      "4.5-4",
      "0.5",
    ]);
  });

  test("6.6/2-1-1-1-0.5", () => {
    expect(mathCalc.assign("6.6/2-1-1-1-0.3").calc()).toBe("0");
    expect(mathCalc.steps).toEqual([
      "3.3-1-1-1-0.3",
      "2.3-1-1-0.3",
      "1.3-1-0.3",
      "0.3-0.3",
      "0",
    ]);
  });

  test("-1-1-1-1-0.5", () => {
    expect(mathCalc.assign("-1-1-1-1-0.5").calc()).toBe("-4.5");
    expect(mathCalc.steps).toEqual([
      "-2-1-1-0.5",
      "-3-1-0.5",
      "-4-0.5",
      "-4.5",
    ]);
  });
});
