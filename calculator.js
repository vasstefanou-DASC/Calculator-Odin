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
clearButton.textContent = "Clear (Press C)";
document.body.appendChild(clearButton);

function add (a,b){
    return (a + b).toFixed(2) ;
}
function subtract (a,b) {
    return (a - b).toFixed(2) ;
}
function multiply (a,b) {
    return a*b.toFixed(2);
}
function divide (a,b) {
    return b===0?"Learn Math!":(a/b).toFixed(2);
}

function operate (a,b,operator) {
    if (operator==="+") return add(a,b);
    if (operator==="-") return subtract(a,b);
    if (operator==="*") return multiply(a,b);
    if (operator==="/") return divide(a,b);
}

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
    calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    console.log(calcMem);
    return calcMem;
}

function insertOperator (operatorButton) {
    if (calcMem.operator==="" && calcMem.firstOp!=="") {
        calcMem.operator = operatorButton;
    } else if (calcMem.secondOp==="" && calcMem.firstOp!=="") {
        calcMem.operator = operatorButton;
    } else if (!(calcMem.firstOp===""||calcMem.operator===""||calcMem.secondOp==="")) {
        calcMem.firstOp = String(operate(Number(calcMem.firstOp),Number(calcMem.secondOp),calcMem.operator));
        calcMem.operator = operatorButton;
        calcMem.secondOp = "";
    }
    calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    console.log(calcMem);
    return calcMem;
}

calcButtonsArea.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        insertDigit(button.textContent);
    });
});

calcButtonsArea.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        insertOperator(button.textContent);
    });
});

function result () {
    if (!(calcMem.firstOp===""||calcMem.operator===""||calcMem.secondOp==="")) {
        calcMem.result = operate(Number(calcMem.firstOp),Number(calcMem.secondOp),calcMem.operator);
        calcMem.firstOp = "", calcMem.secondOp = "" , calcMem.operator = "";
        calcScreen.textContent = calcMem.result;
    } else {
        calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    }
    console.log(calcMem);
    return calcMem;
}

calcButtonsArea.querySelector(".result").addEventListener("click", () => {
    result();
});

function clear() {
    calcMem.firstOp = "", calcMem.secondOp = "" , calcMem.operator = "", calcMem.result = "";
    calcScreen.textContent = "";
    return calcMem;
}
clearButton.addEventListener('click',clear);
    
function insertDecimal() {
    if (!calcMem.firstOp.includes(".") && calcMem.secondOp==="" && calcMem.firstOp!=="") {
        calcMem.firstOp += ".";
    } else if (calcMem.operator!=="" && calcMem.secondOp!=="" && !calcMem.secondOp.includes(".")) {
        calcMem.secondOp += ".";
    }
    calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    return calcMem;
}

calcButtonsArea.querySelector(".decimal").addEventListener("click",insertDecimal);

const deleteButton = document.createElement("button");
deleteButton.setAttribute("id","delete");
deleteButton.textContent = "BackSpace";
document.body.appendChild(deleteButton);

function deleteInput() {
    if (calcMem.operator==="") {
        calcMem.firstOp = calcMem.firstOp.slice(0,-1);
    } else if (calcMem.secondOp===""){
        calcMem.operator = calcMem.operator.slice(0,-1);
    } else {
        calcMem.secondOp = calcMem.secondOp.slice(0,-1);
    }
    calcScreen.textContent = calcMem.firstOp+" "+calcMem.operator+" "+calcMem.secondOp;
    console.log(calcMem);
    return calcMem;
}

deleteButton.addEventListener("click",deleteInput);

// Keyboard Support 

addEventListener("keydown",(event) => {
    if (event.key==="Backspace"){
        deleteInput();
    }
    if (event.key==="c") {
        clear();
    }
    for (let i=0;i<10;i++) {
        if (event.key === `${i}`) {
            insertDigit(`${i}`);
        }
    }
    if (event.key === "=") {
        result();
    }
    if (event.key === ".") {
        insertDecimal();
    }
    const operators = "+-*/";
    for (let operator of operators) {
        if (event.key === operator) {
            insertOperator(operator);
        } 
    }
});

