import { evaluate } from "mathjs";

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".box");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText === "C") {
      screen.innerText = "" + "0";
    } else if (button.innerText === "⌫") {
      if (screen.innerText.length === 0) {
        screen.innerText = "0";
      } else {
        screen.innerText = screen.innerText.slice(0, -1);
      }
    } else if (button.innerText === "=") {
      let expression = screen.innerText;

      // Replace "a%b" with "(a/100)*b"
      expression = expression.replace(/(\d+)%(\d+)/g, "($1/100)*$2");

      // Replace standalone percentages like "50%" -> "50/100"
      expression = expression.replace(/(\d+)%/g, "($1/100)");

      try {
        screen.innerText = evaluate(expression);
      } catch (err) {
        screen.innerText = "Error";
      }
    } else {
      if (screen.innerText === "0") {
        screen.innerText = button.innerText;
      } else {
        screen.innerText += button.innerText;
      }
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ("0123456789.+-*/%".includes(key)) {
    if (screen.innerText === "0") {
      screen.innerText = key;
    } else {
      screen.innerText += key;
    }
  } 
  else if (key === "Backspace") {
    screen.innerText = screen.innerText.slice(0, -1) || "0";
  } 
  else if (key.toLowerCase() === "c") {
    screen.innerText = "0";
  } 
  else if (key === "Enter" || key === "=") {
    try {
      let expression = screen.innerText;

      expression = expression.replace(/(\d+)%/g, "($1/100)");

      screen.innerText = evaluate(expression);
    } catch {
      screen.innerText = "Error";
    }
  }
});
