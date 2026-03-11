// Get the content of the element with id "screen" including any HTML tags inside it
// const screen = document.querySelector("#screen").innerHTML;
// Get the content of the element with id "screen" including any HTML tags inside it
// const screen1 = document.querySelector("#screen");
// console.log("InnerHTML = ", screen);
// console.log("Screen = ", screen1);

// Get all elements with class "box" (returns an HTMLCollection)
// Loop through each button and print only the visible text (ignores any HTML tags inside)
// const buttons = document.getElementsByClassName("box");
// for (let i = 0; i < buttons.length; i++) {
//   console.log(buttons[i].innerText); // innerText shows only the visible text, not HTML
// }

/*
Difference:
- innerHTML: retrieves the HTML content of an element, including any HTML tags inside.
- innerText: retrieves only the visible text inside an element, ignoring HTML tags and hidden content.
*/

// const inputs = document.getElementsByName("color");
// for (let index = 0; index < inputs.length; index++) {
//   console.log(inputs[index].value);
// }

// const radios = document.getElementsByName("color"); // in a form radio buttons have the same name but different values
// for (let i = 0; i < radios.length; i++) {
//   console.log(radios[i].value, radios[i].checked);
// }

// const radios1 = document.getElementsByName("checks");
// for (let i = 0; i < radios1.length; i++) {
//   console.log(radios1[i].value, radios1[i].checked);
// }

// const checks = document.getElementsByName("checks");
// for (let i = 0; i < checks.length; i++) {
//   console.log(checks[i].value, radios1[i].checked);
// }

// waseem1 = document.writeln("<center><h1>Hello World!!!</h1></center>")

// message = document.querySelector(".waseem");
// message.innerText = "Trees are loved by me";
// console.log(message.innerText);

// message.innerHTML = "<div>Hi 👋🏻</div>";
// console.log(message.innerHTML);
// console.log(message.innerText);
// message = textContent = "<center><h1>HELLO WORLD</h1></center>";
// console.log(message);  // text content is the fastest abd safest to be used

// const h1 = document.createElement("h1");
// h1.textContent = "Waseem Ahmed"
// h1.style.textAlign = "center";
// h1.style.fontFamily = "Times New Roman"
// document.body.appendChild(h1)



// const button = document.querySelector(".clickButton");
// button.addEventListener(("click"), () => {
//     alert("Hello Lamiah 👋🏻");
// });


const buttons = document.querySelectorAll(".clickButton");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        alert("Hello Lamiah 👋🏻");
    });
});