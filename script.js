import { Calculator } from "./calculator.js";

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const calculator = new Calculator(display);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.handleButton(button.innerText);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  // console.log(key);
  if (key === "/") {
    event.preventDefault(); // quick search on firefox
  }
  calculator.handleKey(key);
});
