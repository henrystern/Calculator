class Calculator {
  constructor(currentDisplay) {
    this.currentDisplay = currentDisplay;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "%":
        computation = prev / 100;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.getDisplayNumber(this.currentOperand);
  }

  test(key) {
    console.log("test successful, pressed ", key);
  }
}

const buttons = document.querySelectorAll("button");
const buttonFuncs = {
  CPT: { primary: "test", secondary: "quit" },
  ENTER: { primary: "test", secondary: "" },
  "↑": { primary: "test", secondary: "" },
  "↓": { primary: "test", secondary: "" },
  "ON|OFF": { primary: "test", secondary: "" },
  "2ND": { primary: "test", secondary: "" },
  CF: { primary: "test", secondary: "" },
  NPV: { primary: "test", secondary: "" },
  IRR: { primary: "test", secondary: "" },
  "→": { primary: "delete", secondary: "" },
  N: { primary: "test", secondary: "" },
  "I/Y": { primary: "test", secondary: "" },
  PV: { primary: "test", secondary: "" },
  PMT: { primary: "test", secondary: "" },
  FV: { primary: "test", secondary: "" },
  "%": { primary: "test", secondary: "" },
  "√𝑥": { primary: "test", secondary: "" },
  "𝑥²": { primary: "test", secondary: "" },
  "1/𝑥": { primary: "test", secondary: "" },
  "÷": { primary: "chooseOperation", secondary: "" },
  INV: { primary: "test", secondary: "" },
  "(": { primary: "test", secondary: "" },
  ")": { primary: "test", secondary: "" },
  yᵡ: { primary: "test", secondary: "" },
  "×": { primary: "chooseOperation", secondary: "" },
  LN: { primary: "test", secondary: "" },
  7: { primary: "appendNumber", secondary: "" },
  8: { primary: "appendNumber", secondary: "" },
  9: { primary: "appendNumber", secondary: "" },
  "-": { primary: "chooseOperation", secondary: "" },
  "SET TO": { primary: "test", secondary: "" },
  4: { primary: "appendNumber", secondary: "" },
  5: { primary: "appendNumber", secondary: "" },
  6: { primary: "appendNumber", secondary: "" },
  "+": { primary: "chooseOperation", secondary: "" },
  RCL: { primary: "test", secondary: "" },
  1: { primary: "appendNumber", secondary: "" },
  2: { primary: "appendNumber", secondary: "" },
  3: { primary: "appendNumber", secondary: "" },
  "=": { primary: "compute", secondary: "" },
  "CE|C": { primary: "clear", secondary: "" },
  0: { primary: "appendNumber", secondary: "" },
  ".": { primary: "appendNumber", secondary: "" },
  "+|-": { primary: "chooseOperation", secondary: "" },
};
const currentDisplay = document.querySelector(".display");

const calculator = new Calculator(currentDisplay);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (calculator.secondary) {
      calculator[buttonFuncs[button.innerText].secondary](button.innerText);
    }
    else {
      calculator[buttonFuncs[button.innerText].primary](button.innerText);
    }
    calculator.updateDisplay();
  });
});
