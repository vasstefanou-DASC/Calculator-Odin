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

function operate (a,b,operator) {
    if (operator==="+") return add(a,b);
    if (operator==="-") return subtract(a,b);
    if (operator==="*") return multiply(a,b);
    if (operator==="/") return divide(a,b);
}

clearButton.addEventListener('click', () => {
    calcScreen.textContent = "";
});

calcButtonsArea.querySelectorAll("button").forEach(button => {
    if ("1234567890".includes(button.textContent)) {
        button.classList.add("digit");
    } else if ("/*-+".includes(button.textContent)) {
        button.classList.add("operator");
    } else if (".".includes(button.textContent)) {
        button.classList.add("decimal");
    } else {
        button.classList.add("result");
    }    
});

const calcMem = {
    firstOp: "",
    operator: "",
    secondOp: "",
    result: "",
};

function insertDigit (numberButton) {
    if (calcMem.operator==="") {
        calcMem.firstOp += numberButton;
        
    } else {
        calcMem.secondOp += numberButton;
    }
    console.log(calcMem);
    return calcMem;
}

function insertOperator (operatorButton) {
    if (calcMem.operator==="") {
        calcMem.operator = operatorButton;
    } else if (calcMem.secondOp==="") {
        calcMem.operator = operatorButton;
    } else {
        calcMem.firstOp = operate(Number(calcMem.firstOp),Number(calcMem.secondOp),calcMem.operator);
        calcMem.operator = operatorButton;
        calcMem.secondOp = "";
    }
    console.log(calcMem);
    return calcMem;
}

calcButtonsArea.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        insertDigit(button.textContent);
        calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    });
});

calcButtonsArea.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        insertOperator(button.textContent);
        calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    });
});

function result () {
    if (!(calcMem.firstOp===""||calcMem.operator===""||calcMem.secondOp==="")) {
        calcMem.result = operate(Number(calcMem.firstOp),Number(calcMem.secondOp),calcMem.operator);
        calcMem.firstOp = "", calcMem.secondOp = "" , calcMem.operator = "";
    }
    return calcMem;
}

calcButtonsArea.querySelector(".result").addEventListener("click", () => {
    result();
    calcScreen.textContent = calcMem.result;
});