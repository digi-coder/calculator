function calculator(){
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

    const comments = [
        "Yeah, right",
        "Staaaaaaaaappppp",
        "C'mon",
        "Life's good, you should get one",
        "I don’t have the energy to pretend to like you today",
        "U bored?",
        "My imaginary friend says that you need a therapist",
        "Zombies eat brains. You’re safe",
        "Yo dude",
        "I’ll try being nicer, if you try being smarter",
        "Hmmm, sure",
        "Staapp"
    ];

    //Add event listener for numbers
    numbersEl.forEach(number => {
        number.addEventListener('click', (e) => {
            //Don't take more than 11 digits in Display 2
            if (dis2Value.length < '11') {
                //Check if decimal was already used
                if (e.target.innerText === '.' && !hasDecimal) {
                    hasDecimal = true;
                } else if (e.target.innerText === '.' && hasDecimal) {
                    return;
                }
                //If operation done clear screen
                if (display3El.innerText) {
                    dis2Value += e.target.innerText;
                    display2El.innerText = dis2Value;
                } else {
                    clearEverything();
                }
            } else { return; }
        })
    });

    //Add event listener for operators
    operatorsEl.forEach(operator => {
        operator.addEventListener('click', (e) => {
            if (!dis2Value) return;
            hasDecimal = false;
            const operatorName = e.target.innerText;
            if (dis1Value && dis2Value && lastOperator) {
                mathCalc();
            } else {
                result = parseFloat(dis2Value);
            }
            clearVar(operatorName);
            lastOperator = operatorName;
        })
    });

    function clearVar(operator = '') {
        dis1Value += dis2Value + ' ' + operator + ' ';
        display1El.innerText = dis1Value;
        display2El.innerText = '';
        dis2Value = '';
        display3El.innerText = result;
    }

    //Add functionality to the operators
    function mathCalc() {
        if (lastOperator === 'x') {
            result = multiply();
        } else if (lastOperator === '+') {
            result = add();
        } else if (lastOperator === '-') {
            result = subtract();
        } else if (lastOperator === '/') {
            if (parseFloat(dis2Value) !== 0) {
                result = divide();
            } else {
                const comment = Math.floor(Math.random() * comments.length);
                alert(comments[comment]);
            }
        } else if (lastOperator === '%') {
            result = parseFloat(result) % parseFloat(dis2Value);
        }
    }

    function multiply() {
        calculation = parseFloat(result) * parseFloat(dis2Value);
        //Check if result has a decimal and if true... 
        result = (calculation - Math.floor(calculation)) !== 0;
        if (result) {
            //...limit it to 4 decimal places
            return calculation.toFixed(4);
            //Otherwise just return the result
        } else {
            return calculation;
        }
    }

    function add() {
        calculation = parseFloat(result) + parseFloat(dis2Value);
        result = (calculation - Math.floor(calculation)) !== 0;
        if (result) {
            return calculation.toFixed(4);
        } else {
            return calculation;
        }
    }

    function subtract() {
        calculation = parseFloat(result) - parseFloat(dis2Value);
        result = (calculation - Math.floor(calculation)) !== 0;
        if (result) {
            return calculation.toFixed(4);
        } else {
            return calculation;
        }
    }

    function divide() {
        calculation = parseFloat(result) / parseFloat(dis2Value);
        result = (calculation - Math.floor(calculation)) !== 0;
        if (result) {
            return calculation.toFixed(4);
        } else {
            return calculation;
        }
    }

    //Add functionality to the '=' sign
    equalEl.addEventListener('click', (e) => {
        if (!dis1Value || !dis2Value) return;
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
            display2El.innerText = dis2Value.substring(0, dis2Value.length - 1);
            dis2Value = display2El.innerText;
        } else { return };
    });

    //Add keyboard functionality for numbers and operators
    window.addEventListener('keydown', (e) => {
        if (
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
        ) {
            pressNumButtons(e.key);
        } else if (
            e.key === '+' ||
            e.key === '-' ||
            e.key === '/' ||
            e.key === '%'
        ) {
            pressOperButtons(e.key);
        } else if (e.key === '*') {
            pressOperButtons('x');
        } else if (e.key === 'Enter' || e.key === '=') {
            pressEqualButton();
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            pressBackspaceButton();
        }

    });

    //Function that handles number button presses 
    function pressNumButtons(key) {
        numbersEl.forEach(button => {
            if (button.innerText === key) {
                button.click();
            }
        })
    };

    //Function that handles operator button presses
    function pressOperButtons(key) {
        operatorsEl.forEach(button => {
            if (button.innerText === key) {
                button.click();
            }
        })
    };

    //Function that handles equal sign button press
    function pressEqualButton() {
        equalEl.click();
    }

    //Function that handles backspace button press
    function pressBackspaceButton() {
        backspaceEl.click();
    }

    function clearEverything() {
        display1El.innerText = '0';
        display2El.innerText = '0';
        display3El.innerText = '0';
        dis1Value = '';
        dis2Value = '';
        result = '';
    }
}

calculator();