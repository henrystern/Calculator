import {
  buttonFuncs,
  keyFuncs,
  indicators,
  settings,
  memory,
} from "./constants.js";

export class Calculator {
  constructor(indicatorsElement, lettersElement, numbersElement) {
    this.displayIndicators = indicatorsElement;
    this.displayLetters = lettersElement;
    this.displayNumbers = numbersElement;

    this.buttonFuncs = buttonFuncs;
    this.keyFuncs = keyFuncs;
    this.indicators = indicators;
    this.settings = settings;
    this.memory = memory;

    this.command = "";
    this.calculatorMode = "primary";
    this.clear();
  }

  handleButton(button) {
    if (!this.buttonFuncs.hasOwnProperty(button)) return;
    button = this.indicators["2nd"]
      ? this.getAlternateButton(button, "2nd", "secondary")
      : button;
    button = this.indicators["INV"]
      ? this.getAlternateButton(button, "INV", "inverse")
      : button;
    button = this.indicators["HYP"]
      ? this.getAlternateButton(button, "HYP", "hyperbolic")
      : button;
    let method = this.getButtonMethod(button);
    if (!this.indicators["On"] && method !== "toggleOn") return;
    console.log(method)
    this.calculatorMode = "primary";
    this[method](button);
    if (button !== "ON|OFF") this.updateDisplay();
  }

  getAlternateButton(primaryButton, indicator, mode) {
    const is_toggle_button = ["2ND", "INV", "HYP"].includes(primaryButton);
    const secondary_needs_reset =
      indicator === "2nd" && primaryButton !== "2ND";
    if (!is_toggle_button || secondary_needs_reset) {
      this.indicators[indicator] = false;
    }
    return this.buttonFuncs[primaryButton].hasOwnProperty(mode)
      ? this.buttonFuncs[primaryButton][mode]
      : primaryButton;
  }

  getButtonMethod(button) {
    return this.buttonFuncs[button].hasOwnProperty(this.calculatorMode)
      ? this.buttonFuncs[button][this.calculatorMode]
      : this.buttonFuncs[button]["primary"];
  }

  toggleAlternate(indicator) {
    indicator = indicator === "2ND" ? indicator.toLowerCase() : indicator;
    this.indicators[indicator] = !this.indicators[indicator];
  }

  handleKey(key) {
    let sendButton;
    if (key.length === 1) {
      this.command += key;
      if (this.buttonFuncs.hasOwnProperty(this.command)) {
        sendButton = this.command;
      }
      if (this.keyFuncs.hasOwnProperty(this.command)) {
        sendButton = this.keyFuncs[this.command];
      }
    } else {
      if (this.keyFuncs.hasOwnProperty(key)) {
        sendButton = this.keyFuncs[key];
      }
    }
    if (sendButton) {
      this.handleButton(sendButton);
      this.command = "";
    }
  }

  setMode(button) {
    switch (button) {
      case "STO":
        this.calculatorMode = "store";
        break;
      case "RCL":
        this.calculatorMode = "recall";
        break;
      case "CPT":
        this.calculatorMode = "compute";
    }
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.command = "";
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand !== "") {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      this.currentOperand =
        this.currentOperand === "" ? " " : this.currentOperand;
    }
  }

  appendNumber(number) {
    let hasDecimal = this.currentOperand % 1 !== 0;
    if (number === "." && hasDecimal) return;
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

  prefixOperation(operation) {
    if (this.operation !== undefined) {
      this.previous_operation = this.operation;
    }
    this.operation = operation;
  }

  infixOperation(operation) {
    this.operation = operation;
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    } else {
      this.previousOperand = parseFloat(this.currentOperand);
      this.currentOperand = "";
    }
  }

  postfixOperation(operation) {
    this.operation = operation;
    if (this.currentOperand === "") {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
    }
    if (this.currentOperand) this.compute();
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
        break;
      case "nCr":
        let combs =
          this.factorial(prev) /
          (this.factorial(current) * this.factorial(prev - current));
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
        computation = current;
        break;
    }
    this.currentOperand = "";
    this.operation = undefined;
    this.previousOperand = computation;
    this.setMemory("ANS", computation)
  }

  setMemory(register, value=null) {
    this.memory[register] = value ? value : this.currentOperand;
  }

  getMemory(register) {
    register = register === "=" ? "ANS" : register
    this.currentOperand = this.memory[register]
  }

  getDisplayNumber() {
    let display_number;
    if (this.currentOperand) {
      if (isNumber(this.currentOperand) || this.currentOperand === ".") {
        display_number = this.formatNumberCommas(this.currentOperand);
      } else {
        display_number = this.currentOperand;
      }
    } else if (this.previousOperand) {
      if (isNumber(this.previousOperand)) {
        display_number = this.formatNumberCommas(
          this.previousOperand.toFixed(this.settings["decimals"])
        );
      } else {
        display_number = this.previousOperand;
      }
    } else {
      display_number = Number(0).toFixed(this.settings["decimals"]);
    }
    return display_number;
  }

  formatNumberCommas(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay = "";
    if (!isNaN(integerDigits)) {
      integerDisplay += integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    } else {
      integerDisplay += "0";
    }
    if (decimalDigits !== undefined) {
      integerDisplay += "." + decimalDigits;
    }

    return integerDisplay;
  }

  updateDisplay() {
    this.displayNumbers.innerText = this.getDisplayNumber();

    this.displayIndicators.forEach((indicator) => {
      const display_active = indicator.classList.contains("active");
      const calc_active = this.indicators[indicator.innerText];
      if (display_active != calc_active) indicator.classList.toggle("active");
    });
  }

  toggleOn() {
    if (this.indicators["On"]) {
      this.indicators["On"] = false;
      this.clearDisplay();
    } else {
      this.indicators["On"] = true;
      this.updateDisplay();
    }
  }

  clearDisplay() {
    this.clear();
    this.displayNumbers.innerText = "";
    this.displayLetters.innerText = "";
    this.displayIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
  }
}

function isNumber(x) {
  return !isNaN(x) && x !== "";
}
