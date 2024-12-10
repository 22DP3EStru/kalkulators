let steps = "";
let result = 0;
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

document.addEventListener("DOMContentLoaded", updateHistory);

function appendValue(value) {
    if (value === ".") {
        let parts = steps.split(/[\+\-\*\/]/);
        let currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(".")) {
            return;
        }
    }
    steps += value;
    document.getElementById("steps").textContent = steps;
}

function calculate() {
    try {
        result = eval(steps);
        document.getElementById("result").textContent = result;
        addToHistory(steps + " = " + result);
        steps = "";
    } catch (e) {
        alert("Nepareiza ievade");
        clearInput();
    }
}

function clearInput() {
    steps = "";
    document.getElementById("steps").textContent = "0";
    document.getElementById("result").textContent = "0";
}

function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";
    history.forEach((entry, index) => {
        const div = document.createElement("div");
        div.textContent = entry;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Dzēst";
        deleteBtn.classList.add("btn", "clear");
        deleteBtn.onclick = () => deleteHistory(index);
        div.appendChild(deleteBtn);
        historyDiv.appendChild(div);
    });
}

function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    updateHistory();
}

function clearHistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    updateHistory();
}
