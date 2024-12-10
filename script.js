let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

function appendValue(value) {
    const inputField = document.getElementById('input-field');
    const currentValue = inputField.value;
    const lastChar = currentValue.charAt(currentValue.length - 1);

    // Prevent multiple decimal points in a single number
    if (value === '.' && (currentValue === '' || lastChar === '.' || currentValue.includes('.'))) {
        return;
    }

    // Prevent multiple operators in a row
    if (isOperator(value) && isOperator(lastChar)) {
        return;
    }

    inputField.value += value;
}

function clearInput() {
    document.getElementById('input-field').value = '';
    document.getElementById('result-field').value = '';
}

function calculate() {
    const inputField = document.getElementById('input-field');
    const resultField = document.getElementById('result-field');
    const expression = inputField.value;

    try {
        // Validate the expression before evaluating
        if (isValidExpression(expression)) {
            const result = eval(expression);
            inputField.value = result;
            resultField.value = result;
            addToHistory(expression, result);
        } else {
            throw new Error('Invalid expression');
        }
    } catch (error) {
        inputField.value = 'Error';
        resultField.value = 'Error';
    }
}

function isValidExpression(expression) {
    // Check if the expression is valid
    const validPattern = /^[0-9+\-*/.() ]+$/;
    return validPattern.test(expression);
}

function addToHistory(expression, result) {
    const historyItem = { expression, result };
    history.push(historyItem);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.expression} = ${item.result} <button onclick="deleteHistoryItem(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    renderHistory();
}

function clearHistory() {
    history = [];
    localStorage.removeItem('calcHistory');
    renderHistory();
}

document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('input-field');

    document.addEventListener('keydown', handleKeyPress);
    renderHistory();
});

function handleKeyPress(event) {
    const key = event.key;
    const inputField = document.getElementById('input-field');

    if (isNumber(key) || isOperator(key)) {
        appendValue(key);
    } else if (key === '.') {
        appendValue(key);
    } else if (key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        calculate();
    } else if (key === 'Backspace') {
        inputField.value = inputField.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearInput();
    }
}

function isNumber(key) {
    return !isNaN(key) && key !== ' ';
}

function isOperator(key) {
    return ['+', '-', '*', '/'].includes(key);
}