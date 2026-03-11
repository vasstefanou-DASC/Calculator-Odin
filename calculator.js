const projectName = document.createElement("h1");
projectName.textContent = "Calculator";
document.body.appendChild(projectName);

const calculator = document.createElement("div");
calculator.classList.add("calc");
document.body.appendChild(calculator);

const calcScreen = document.createElement("div");
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