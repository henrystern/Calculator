import { Calculator } from "./calculator.js";

const buttons = document.querySelectorAll("button");

const indicators = document.querySelector(".indicators");
const letters = document.querySelector(".letters");
const numbers = document.querySelector(".numbers");
const calculator = new Calculator(indicators, letters, numbers);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.handleButton(button.innerText);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "/") {
    event.preventDefault(); // quick search on firefox
  }
  calculator.handleKey(key);
});
