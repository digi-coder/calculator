console.log('It Works!!');
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
// const decimalEl = document.querySelector('.decimal');

let dis1Value = '';
let dis2Value = '';
let dis3Value = '';
let result = null;
let clearLast = '';
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
})
