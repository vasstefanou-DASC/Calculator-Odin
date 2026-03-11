const projectName = document.createElement("h1");
projectName.textContent = "Calculator";
document.body.appendChild(projectName);

const calculator = document.createElement("div");
calculator.classList.add("calc");
document.body.appendChild(calculator);

const calcScreen = document.createElement("div");
calcScreen.textContent = "18";
calcScreen.setAttribute("id","screen");
calculator.appendChild(calcScreen);

const calcButtonsArea = document.createElement("div");
calcButtonsArea.setAttribute("id","buttons");
calculator.appendChild(calcButtonsArea);

const buttonSymbols = "789/456*123-0.=+";
for (let i=0;i<16;i++) {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = buttonSymbols[i];
    calcButtonsArea.appendChild(btn);
}

const clearButton = document.createElement("button");
clearButton.setAttribute("id","clear");
clearButton.textContent = "Clear Calculator";
document.body.appendChild(clearButton);

function add (a,b){
    return a + b ;
}
function subtract (a,b) {
    return a - b ;
}
function multiply (a,b) {
    return a*b;
}
function divide (a,b) {
    return a/b;
}

let firstOp , secondOp , operator ;

function operate (a,b,operator) {
    if (operator==="+") add(a,b);
    if (operator==="-") subtract(a,b);
    if (operator==="*") multiply(a,b);
    if (operator==="/") divide(a,b);
}
console.log(multiply(81,18));