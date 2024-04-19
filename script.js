document.addEventListener('DOMContentLoaded', () => {
    // Load balance and log from Local Storage on page load
    loadBalance();
    loadLog();
});

function updateBalance() {
    let amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    let balanceElement = document.getElementById('balanceAmount');
    let currentBalance = parseFloat(balanceElement.innerText);
    let newBalance = currentBalance - amount;

    if (newBalance < 0) {
        alert('Insufficient balance.');
        return;
    }

    balanceElement.innerText = newBalance.toFixed(2);
    saveBalance(newBalance);

    logTransaction(amount);
}

function logTransaction(amount) {
    let logDiv = document.getElementById('log');
    let timestamp = new Date().toLocaleString();
    let logEntry = document.createElement('p');
    logEntry.innerText = `${timestamp} - Amount: $${amount.toFixed(2)}`;
    logDiv.appendChild(logEntry);

    saveLog(logEntry.innerText);
}

function saveBalance(balance) {
    localStorage.setItem('balance', balance.toFixed(2));
}

function loadBalance() {
    let savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
        document.getElementById('balanceAmount').innerText = savedBalance;
    }
}

function saveLog(logEntry) {
    let log = localStorage.getItem('log');
    if (log) {
        log += `\n${logEntry}`;
    } else {
        log = logEntry;
    }
    localStorage.setItem('log', log);
}

function loadLog() {
    let log = localStorage.getItem('log');
    if (log) {
        let logEntries = log.split('\n');
        let logDiv = document.getElementById('log');
        logEntries.forEach(entry => {
            let logEntry = document.createElement('p');
            logEntry.innerText = entry;
            logDiv.appendChild(logEntry);
        });
    }
}

function resetData() {
    localStorage.removeItem('balance');
    localStorage.removeItem('log');
    location.reload(); // Reloads the page to reset the data
}
