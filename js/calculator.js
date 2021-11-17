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

operatorsEl.forEach(operator => {
    operator.addEventListener('click', (e) => {
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

function mathCalc(){
    if(lastOperator === 'x'){
        result = parseFloat(result) * parseFloat(dis2Value);
    } else if(lastOperator == '+'){
        result = parseFloat(result) + parseFloat(dis2Value);
    } else if(lastOperator == '-'){
        result = parseFloat(result) - parseFloat(dis2Value);
    } else if(lastOperator == '/'){
        result = parseFloat(result) / parseFloat(dis2Value);
    } else if(lastOperator == '%'){
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
