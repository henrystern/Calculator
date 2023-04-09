import { primaryToSecondary, buttonFuncs, keyFuncs } from "./mappings.js";

export class Calculator {
  constructor(indicators, letters, numbers) {
    this.displayIndicators = indicators;
    this.displayLetters = letters;
    this.displayNumbers = numbers;
    this.displayNumbers.mode = "input";

    this.secondaryButtons = primaryToSecondary;
    this.buttonFuncs = buttonFuncs;
    this.keyFuncs = keyFuncs;

    this.calculatorMode = "primary";
    this.indicators = {
            "2nd": false,
            "INV": false,
            "HYP": false,
            "COMPUTE": false,
            "ENTER": false,
            "SET": false,
            "⇅": false,
            "DEL": false,
            "INS": false,
            "BGN": false,
            "RAD": false,
            "◁": false,
            "⁎": false,
    }

    this.clear();
  }

  handleButton(button) {
    if (!this.buttonFuncs.hasOwnProperty(button)) {
      return;
    }
    if (this.indicators["2nd"] && button != "2ND") {
      if (this.buttonFuncs[button].hasOwnProperty("secondary")) {
        this[this.buttonFuncs[button]["secondary"]](this.secondaryButtons[button]);
      }
      else {
        this[this.buttonFuncs[button]["primary"]](button);
      }
      this.toggleSecondary()
    }
    else {
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
    this.displayNumbers.mode = "answer"
  }

  delete() {
    if (this.displayNumbers.mode === "input") {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }

  toggleSecondary() {
    this.indicators["2nd"] = !this.indicators["2nd"];
  }

  appendNumber(number) {
    if (this.displayNumbers.mode === "answer") {
      this.currentOperand = ""
      this.displayNumbers.mode = "input"
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  instantOperation(operation) {
    if (this.currentOperand !== "") {
      return
    }
  }

  infixOperation(operation) {
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
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
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
      case "yᵡ":
        computation = prev ** current;
        break;
      case "nPr":
        if (!Number.isInteger(prev) || !Number.isInteger(current)) {
          computation = "Error 2"
          break
        }
        let k = BigInt(prev - current);
        let n = BigInt(prev);
        let perms = this.permutate(n, k);
        computation = typeof perms === 'BigInt' ? perms : "Error 2";
        break;
      case "nCr":
        let combs = this.factorial(prev) / (this.factorial(current) * this.factorial(prev - current))
        computation = typeof combs === 'number' ? combs : "Error 2";
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.displayNumbers.mode = "answer";
    this.operation = undefined;
    this.previousOperand = "";
  }

  permutate(n, k) {
      if (n < 0 || k < 0) {
          return undefined;
      }
      let result = k + BigInt(1);
      for (let i = result + BigInt(1); i <= n; i++) {
          console.log(result, i)
          result *= i;
      }
      return result;
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
    this.displayNumbers.innerText = this.getDisplayNumber(this.currentOperand);
    this.displayIndicators.forEach(indicator => {
      const display_active = indicator.classList.contains("active")
      const calc_active = this.indicators[indicator.innerText]
      if (display_active != calc_active) {
        indicator.classList.toggle("active")
      }
    });
  }
}
