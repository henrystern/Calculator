import { primaryToSecondary, buttonFuncs, keyFuncs } from "./mappings.js";

export class Calculator {
  constructor(indicators, letters, numbers) {
    this.displayIndicators = indicators;
    this.displayLetters = letters;
    this.displayNumbers = numbers;

    this.secondaryButtons = primaryToSecondary;
    this.buttonFuncs = buttonFuncs;
    this.keyFuncs = keyFuncs;

    this.calculatorMode = "primary";
    this.indicators = {
      "2nd": false,
      INV: false,
      HYP: false,
      COMPUTE: false,
      ENTER: false,
      SET: false,
      "⇅": false,
      DEL: false,
      INS: false,
      BGN: false,
      RAD: false,
      "◁": false,
      "⁎": false,
    };

    this.clear();
  }

  handleButton(button) {
    if (!this.buttonFuncs.hasOwnProperty(button)) return;
    if (this.indicators["2nd"] && button != "2ND") {
      if (this.buttonFuncs[button].hasOwnProperty("secondary")) {
        this[this.buttonFuncs[button]["secondary"]](
          this.secondaryButtons[button]
        );
      }
      this.toggleSecondary();
    } else {
      this[this.buttonFuncs[button][this.calculatorMode]](button);
    }
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
    if (this.currentOperand !== "") {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      this.currentOperand =
        this.currentOperand === "" ? " " : this.currentOperand;
    }
  }

  toggleSecondary() {
    this.indicators["2nd"] = !this.indicators["2nd"];
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  changeSign() {
    if (this.currentOperand === "") {
      let previous = parseFloat(this.previousOperand);
      this.previousOperand = -1 * previous;
    }
    if (this.currentOperand) {
      let current = parseFloat(this.currentOperand);
      this.currentOperand = -1 * current;
    }
  }

  instantOperation(operation) {
    this.operation = operation;
    if (this.currentOperand === "") {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
    }
    if (this.currentOperand) this.compute();
  }

  infixOperation(operation) {
    this.operation = operation;
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") this.compute();
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
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
      case "yᵡ":
        computation = prev ** current;
        break;
      case "nPr":
        if (!Number.isInteger(prev) || !Number.isInteger(current)) {
          computation = "Error 2";
          break;
        }
        let k = BigInt(prev - current);
        let n = BigInt(prev);
        // let perms = this.permutate(n, k);
        computation = typeof perms === "BigInt" ? perms : "Error 2";
        break;
      case "nCr":
        // let combs = this.factorial(prev) / (this.factorial(current) * this.factorial(prev - current))
        computation = typeof combs === "number" ? combs : "Error 2";
        break;
      case "%":
        computation = current / 100;
        break;
      case "√𝑥":
        computation = current ** (1 / 2);
        break;
      case "𝑥²":
        computation = current ** 2;
        break;
      case "1/𝑥":
        computation = current ** -1;
        break;
      case "LN":
        computation = Math.log(current);
        break;
      case "eᵡ":
        computation = Math.E ** current;
        break;
      default:
        return;
    }
    this.currentOperand = "";
    this.operation = undefined;
    this.previousOperand = computation;
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
    console.log(this.previousOperand, this.operation, this.currentOperand);
    this.displayNumbers.innerText =
      this.currentOperand !== ""
        ? this.getDisplayNumber(this.currentOperand)
        : this.getDisplayNumber(this.previousOperand);

    this.displayIndicators.forEach((indicator) => {
      const display_active = indicator.classList.contains("active");
      const calc_active = this.indicators[indicator.innerText];
      if (display_active != calc_active) indicator.classList.toggle("active");
    });
  }
}
