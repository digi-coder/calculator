const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const display3El = document.querySelector('.display-3');
const clearLastEl = document.querySelector('.clear-last');
const clearAllEl = document.querySelector('.clear-all');
const backspaceEl = document.querySelector('.backspace');
const memoryEl = document.querySelectorAll('.mem-buttons');
const numbersEl = document.querySelectorAll('.number');
const operatorsEl = document.querySelectorAll('.operator');
const equalEl = document.querySelector('.equal');

let dis1Value = '';
let dis2Value = '';
let dis3Value = '';
let result = null;
let lastOperator = '';
let hasDecimal = false;

//Add event listener for numbers
numbersEl.forEach(number => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !hasDecimal){
            hasDecimal = true;
        } else if(e.target.innerText === '.' && hasDecimal){
            return;
        }
        dis2Value += e.target.innerText;
        display2El.innerText = dis2Value;
    })
});

//Add event listener for operators
operatorsEl.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if (!dis2Value) return;
        hasDecimal = false;
        const operatorName = e.target.innerText;
        if(dis1Value && dis2Value && lastOperator){
            mathCalc();
        } else {
            result = parseFloat(dis2Value);
        }
        clearVar(operatorName);
        lastOperator = operatorName;
    })
});

function clearVar(operator = ''){
    dis1Value += dis2Value + ' ' + operator + ' ';
    display1El.innerText = dis1Value;
    display2El.innerText = '';
    dis2Value = '';
    display3El.innerText = result;
}

//Add functionality to the operators
function mathCalc(){
    if(lastOperator === 'x'){
        result = parseFloat(result) * parseFloat(dis2Value);
    } else if(lastOperator === '+'){
        result = parseFloat(result) + parseFloat(dis2Value);
    } else if(lastOperator === '-'){
        result = parseFloat(result) - parseFloat(dis2Value);
    } else if(lastOperator === '/'){
        result = parseFloat(result) / parseFloat(dis2Value);
    } else if(lastOperator === '%'){
        result = parseFloat(result) % parseFloat(dis2Value);
    }
}

//Add functionality to the '=' sign
equalEl.addEventListener('click', (e) => {
    if(!dis1Value || !dis2Value) return;
    hasDecimal = false;
    mathCalc();
    clearVar();
    display2El.innerText = result;
    display3El.innerText = '';
    dis2Value = result;
    dis1Value = '';
});

//Add functionality to the Clear All (C) button
clearAllEl.addEventListener('click', (e) => {
    display1El.innerText = '0';
    display2El.innerText = '0';
    display3El.innerText = '0';
    dis1Value = '';
    dis2Value = '';
    result = '';
});

//Add functionality to the Clear Last Entity (CE) button
clearLastEl.addEventListener('click', (e) => {
    if (display3El.innerText) { 
        display2El.innerText = '0';
        dis2Value = '';
    } else {
        display1El.innerText = '0';
        display2El.innerText = '0';
        display3El.innerText = '0';
        dis1Value = '';
        dis2Value = '';
        result = ''; 
        };
});

//Add functionality to the backspace button
backspaceEl.addEventListener('click', (e) => {
    if (display3El.innerText) { 
        display2El.innerText = dis2Value.substring(0, dis2Value.length -1);
        dis2Value = display2El.innerText;
    } else { return }; 
});

//Add keyboard functionality for numbers and operators
window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ){
        pressNumButtons(e.key);
    } else if(
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%'
    ){
        pressOperButtons(e.key);
    } else if(e.key === '*'){
        pressOperButtons('x');
    } else if(e.key === 'Enter' || e.key === '='){
        pressEqualButton();
    } else if(e.key === 'Backspace' || e.key === 'Delete'){
        pressBackspaceButton();
    }

});

//Function that handles number button presses 
function pressNumButtons(key){
    numbersEl.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
};

//Function that handles operator button presses
function pressOperButtons(key){
    operatorsEl.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
};

//Function that handles equal sign button press
function pressEqualButton(){
    equalEl.click();
}

//Function that handles backspace button press
function pressBackspaceButton(){
    backspaceEl.click();
}