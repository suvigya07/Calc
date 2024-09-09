let displayValue = '';
let history = [];

function updateDisplay() {
    document.getElementById('calc-display').value = displayValue || '0';
}

function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (displayValue.length === 0 && operator !== '-') return; 
    if (['+', '−', '×', '÷', '%'].includes(displayValue.slice(-1))) return; 
    displayValue += operator;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        let expression = displayValue.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-'); 
        let result = eval(expression); 

        history.push(`${displayValue} = ${result}`);
        addHistoryItem(displayValue, result);

        displayValue = result.toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
        setTimeout(() => {
            clearDisplay(); 
        }, 1500);
    }
}

function addHistoryItem(expression, result) {
    let historyList = document.getElementById('history-list');
    let listItem = document.createElement('li');
    listItem.textContent = `${expression} = ${result}`;
    historyList.prepend(listItem); 
}

function handleButtonClick(event) {
    const buttonText = event.target.textContent;
    if (buttonText === 'AC') {
        clearDisplay();
    } else if (buttonText === '⌫') {
        backspace();
    } else if (buttonText === '=') {
        calculate();
    } else if (['+', '−', '×', '÷', '%'].includes(buttonText)) {
        appendOperator(buttonText);
    } else {
        appendNumber(buttonText);
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', handleButtonClick));

function handleKeyboardInput(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key === '*' ? '×' : key === '/' ? '÷' : key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

document.addEventListener('keydown', handleKeyboardInput);

updateDisplay();
