import { buttonFuncs, keyFuncs } from "./mappings.js";

export class Calculator {
  constructor(display) {
    this.display = display;
    this.display.mode = "input";

    this.buttonFuncs = buttonFuncs
    this.keyFuncs = keyFuncs

    this.mode = "primary";

    this.clear();
  }

  handleButton(button) {
    if (!this.buttonFuncs.hasOwnProperty(button) || !this.buttonFuncs[button].hasOwnProperty(this.mode)) {
      return;
    }
    this[this.buttonFuncs[button][this.mode]](button);
    this.updateDisplay();
  }

  handleKey(key) {
    if (this.keyFuncs.hasOwnProperty(key)) {
      this.handleButton(this.keyFuncs[key]);
    }
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
    this.display.innerText = this.getDisplayNumber(this.currentOperand);
  }
}