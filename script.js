let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

function appendValue(value) {
    document.getElementById('input-field').value += value;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('input-field');
    const previousElement = document.getElementById('Previous');

    inputField.addEventListener('input', () => {
        previousElement.textContent = inputField.value;
    });
});
function clearInput() {
    document.getElementById('input-field').value = '';
}

function calculate() {
    const inputField = document.getElementById('input-field');
    const expression = inputField.value;

    try {
        const result = eval(expression);
        inputField.value = result;
        addToHistory(expression, result);
    } catch (error) {
        inputField.value = 'Error';
    }
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

// Render history on page load
renderHistory();