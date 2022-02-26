// Operation Functions

function add(num1,num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    // return num1 + num2;
    // return parseFloat((Math.round((num1 + num2) * 100) / 100).toFixed(2));
    return parseFloat((((num1 + num2) * 100) / 100).toFixed(2));
};

function subtract(num1,num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return parseFloat((((num1 - num2) * 100) / 100).toFixed(2));
};

function multiply(num1,num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return parseFloat((((num1 * num2) * 100) / 100).toFixed(2));
};

function divide(num1,num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return parseFloat((((num1 / num2) * 100) / 100).toFixed(2));
};

function operate(op,num1,num2){
    if (op === '+'){
        return add(num1,num2);
    } else if (op === '-'){
        return subtract(num1,num2);
    } else if (op === '*'){
        return multiply(num1,num2);
    } else if (op === '/'){
        if (num1 === "0" || num2 === "0"){
            displayVal = "ERROR PLZ RESET"
        } else return divide(num1,num2);
    }
};

// Current Equation Object

let equationInfo = {
    number1: null,
    operator: null,
    number2: null,
    total: null,
}

// Some Query Selectors

const allButtons = document.querySelectorAll('button');
const opBtns = document.querySelectorAll('.operator');

// Display Changes

const display = document.querySelector('h2');

let displayVal = "0";

display.textContent = displayVal;

function changeDisplay(num){
    // if (display.textContent === "0" && display.textContent.length === 1){
    if (displayVal === "0" && displayVal.length === 1 || /[A-z]/.test(displayVal)){
        displayVal = num;
    } else {
        displayVal += num;
    }
    return display.textContent = displayVal;
}

// Number Buttons

const numbers = document.querySelectorAll('.number');
const decBtn = document.querySelector('.dec')

numbers.forEach(numberBtn => {
    numberBtn.addEventListener('click', () => {
        opBtns.forEach(opBtn => {
            opBtn.removeAttribute("disabled");
            opBtn.classList.remove('active');
        });
        if (!(equationInfo.total === null)){
            displayVal = "";
            equationInfo.total = null;
        }
        if (displayVal.includes('.')){
            decBtn.setAttribute("disabled","disabled");
        } else {
            decBtn.removeAttribute("disabled");
        }
        let exactNum = numberBtn.textContent;
        changeDisplay(exactNum);
        if (exactNum === '.'){
            decBtn.setAttribute("disabled","disabled");
        }
    });
});

// Reset Button

const resetBtn = document.querySelector('.reset');


resetBtn.addEventListener('click', () => {
    displayVal = "0";
    equationInfo.total = null;
    equationInfo.number1 = null;
    equationInfo.number2 = null;
    equationInfo.operator = null;
    display.textContent = displayVal;
    allButtons.forEach(btn => {
        btn.removeAttribute("disabled");
        btn.classList.remove('active');
    });
})


// Delete Button

const delBtn = document.querySelector('.del');

delBtn.addEventListener('click', () => {
    let newDisplayVal = displayVal
    if (displayVal === '0'){
        return;
    } else {
        newDisplayVal = displayVal.slice(0, -1);
    }
    if (!(newDisplayVal.includes('.'))){
        decBtn.removeAttribute("disabled");
        displayVal = newDisplayVal;
    } else if (newDisplayVal.length === 0){
        displayVal = '0';
    } else {
        displayVal = newDisplayVal;
    };
    display.textContent = displayVal;
});

// Operator Buttons

opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        opBtn.classList.add('active');
        opBtns.forEach(btn => {
            btn.setAttribute("disabled","disabled");
        });
        decBtn.removeAttribute("disabled");
        if (!(equationInfo.total === null)){
            equationInfo.number1 = equationInfo.total;
            equationInfo.operator = opBtn.textContent;
            equationInfo.total = null;
            displayVal = '0';
        } else if (equationInfo.number1 === null){
            equationInfo.number1 = displayVal;
            equationInfo.operator = opBtn.textContent;
            displayVal = '0';
        } else {
            equationInfo.number2 = displayVal;
            let operationTotal = operate(equationInfo.operator,equationInfo.number1,equationInfo.number2);
            equationInfo.total = `${operationTotal}`;
            equationInfo.operator = opBtn.textContent;
            displayVal = equationInfo.total;
            equationInfo.number1 = equationInfo.total;
            equationInfo.number2 = null;
            equationInfo.total = null;
        }
        display.textContent = displayVal;
        displayVal = '0'
    });
});

// Equal Button

const equalBtn = document.querySelector('.equal');

equalBtn.addEventListener('click', () => {
    if (equationInfo.number1 === null || equationInfo.operator === null){
        return
    } else {
        equationInfo.number2 = displayVal;
        let operationTotal = operate(equationInfo.operator,equationInfo.number1,equationInfo.number2);
        equationInfo.total = `${operationTotal}`;
        if (equationInfo.total === 'undefined'){
            displayVal = 'ERROR';
            equationInfo.total = null;
            allButtons.forEach(btn => {
                btn.removeAttribute("disabled");
                btn.classList.remove('active');
            });
        } else displayVal = equationInfo.total;
        equationInfo.number1 = null;
        equationInfo.number2 = null;
        equationInfo.operator = null;
        display.textContent = displayVal;
    }
})