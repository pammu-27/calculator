const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const expressionDisplay = document.querySelector('.expression');
const resultDisplay = document.querySelector('.result');
const messageDisplay = document.querySelector('.message');
const buttons = document.querySelectorAll('.button');
const modeToggle = document.querySelector('.mode-toggle');
const historyToggle = document.querySelector('.history-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const history = document.querySelector('.history');
const historyItemsContainer = document.querySelector('.history-items');
const clearHistoryBtn = document.querySelector('.clear-history');
const closeHistoryBtn = document.querySelector('.close-history');
let expression = '';
let historyItems = [];
let isScientific = false;
let longPressTimer;
let messageTimeout;

// Log errors for debugging
function logError(message) {
  console.error(`Calculator Error: ${message}`);
}

// Log button clicks for debugging
function logButtonClick(value) {
  console.log(`Button clicked: ${value}`);
}

// Show message (error or success)
function showMessage(text, type) {
  if (!messageDisplay) {
    logError('messageDisplay element not found');
    return;
  }
  clearTimeout(messageTimeout);
  messageDisplay.textContent = text;
  messageDisplay.className = `message ${type}`;
  messageTimeout = setTimeout(() => {
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
  }, 2000);
}

// Toggle light/dark mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
  console.log('Toggled light/dark mode');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 't') {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
    console.log('Toggled light/dark mode');
  }
});

// Toggle calculator mode
modeToggle.addEventListener('click', () => {
  try {
    isScientific = !isScientific;
    modeToggle.textContent = isScientific ? 'Simple' : 'Scientific';
    document.querySelectorAll('.scientific').forEach(btn => {
      btn.style.display = isScientific ? 'block' : 'none';
    });
    calculator.style.maxWidth = isScientific ? '450px' : '400px';
    console.log(`Switched to ${isScientific ? 'Scientific' : 'Simple'} mode`);
  } catch (err) {
    logError(`Mode toggle failed: ${err.message}`);
    showMessage('Mode switch failed', 'error');
  }
});

// Toggle history
historyToggle.addEventListener('click', () => {
  try {
    history.classList.toggle('show');
    console.log('Toggled history visibility');
  } catch (err) {
    logError(`History toggle failed: ${err.message}`);
    showMessage('History toggle failed', 'error');
  }
});

// Close history
closeHistoryBtn.addEventListener('click', () => {
  try {
    history.classList.remove('show');
    console.log('Closed history');
  } catch (err) {
    logError(`Close history failed: ${err.message}`);
    showMessage('Close history failed', 'error');
  }
});

// Clear history
clearHistoryBtn.addEventListener('click', () => {
  try {
    historyItems = [];
    updateHistory();
    console.log('Cleared history');
    showMessage('History cleared', 'success');
  } catch (err) {
    logError(`Clear history failed: ${err.message}`);
    showMessage('Clear history failed', 'error');
  }
});

// Copy to clipboard
display.addEventListener('click', () => {
  try {
    navigator.clipboard.writeText(resultDisplay.textContent).then(() => {
      showMessage('Result copied to clipboard', 'success');
    }).catch(err => {
      logError(`Copy to clipboard failed: ${err.message}`);
      showMessage('Failed to copy result', 'error');
    });
  } catch (err) {
    logError(`Clipboard access failed: ${err.message}`);
    showMessage('Clipboard access failed', 'error');
  }
});

// Long press on DEL
const delButton = document.querySelector('[data-value="⌫"]');
delButton.addEventListener('mousedown', () => {
  longPressTimer = setTimeout(() => {
    expression = '';
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '0';
    console.log('Long press DEL: Cleared all');
    showMessage('Cleared', 'success');
  }, 1000);
});
delButton.addEventListener('mouseup', () => clearTimeout(longPressTimer));
delButton.addEventListener('mouseleave', () => clearTimeout(longPressTimer));

// Button click handler with neon effect
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    logButtonClick(value);
    // Add neon effect
    const neonClass = document.body.classList.contains('dark') ? 'neon-dark' : 'neon-light';
    button.classList.add(neonClass);
    setTimeout(() => button.classList.remove(neonClass), 500); // Match animation duration
    handleInput(value);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  try {
    const key = e.key;
    if (/[0-9]/.test(key)) {
      logButtonClick(key);
      handleInput(key);
    } else if (key === '+') handleInput('+');
    else if (key === '-') handleInput('-');
    else if (key === '*') handleInput('×');
    else if (key === '/') handleInput('÷');
    else if (key === 'Enter') handleInput('=');
    else if (key === 'Backspace') handleInput('⌫');
    else if (key === 'Escape') handleInput('C');
    else if (key === '.') handleInput('.');
    else if (key === '(') handleInput('(');
    else if (key === ')') handleInput(')');
    else if (isScientific) {
      if (key === 's') handleInput('sin');
      else if (key === 'c') handleInput('cos');
      else if (key === 't') handleInput('tan');
      else if (key === 'l') handleInput('log');
      else if (key === 'r') handleInput('√');
      else if (key === '^') handleInput('^');
      else if (key === 'i') handleInput('1/x');
      else if (key === '%') handleInput('%');
    } else {
      showMessage('Invalid key pressed', 'error');
    }
  } catch (err) {
    logError(`Keyboard input failed: ${err.message}`);
    showMessage('Invalid keyboard input', 'error');
  }
});

const operators = ['+', '-', '×', '÷', '%'];
const scientificFunctions = ['sin', 'cos', 'tan', 'log', '√', '^', '1/x'];

function isOperator(value) {
  return operators.includes(value);
}

function isScientificFunction(value) {
  return scientificFunctions.includes(value);
}

function handleInput(value) {
  console.log(`Handling input: ${value}, current expression: ${expression}`);
  
  // Validate DOM elements
  if (!expressionDisplay || !resultDisplay) {
    logError('Display elements not found');
    return;
  }

  const lastChar = expression.slice(-1);

  // Input validation
  if (isOperator(value) && isOperator(lastChar)) {
    console.log(`Blocked multiple operators: ${value}`);
    showMessage('Cannot add multiple operators', 'error');
    return;
  }
  if (value === '.' && lastChar === '.') {
    console.log('Blocked multiple decimals');
    showMessage('Cannot add multiple decimals', 'error');
    return;
  }
  if (value === '.' && expression === '') {
    expression = '0';
    console.log('Added leading zero for decimal');
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = expression;
  }
  if (isScientificFunction(value) && !/[\d)]$/.test(expression) && expression !== '') {
    console.log(`Blocked invalid scientific function: ${value}`);
    showMessage('Scientific function needs a number', 'error');
    return;
  }

  // Handle inputs
  if (value === 'C') {
    expression = '';
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '0';
    console.log('Cleared expression');
    showMessage('Cleared', 'success');
  } else if (value === '⌫') {
    expression = expression.slice(0, -1);
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = expression || '0';
    console.log('Backspace: Removed last character');
  } else if (value === '=') {
    try {
      if (!expression) {
        showMessage('Enter an expression first', 'error');
        return;
      }
      let evalExpression = expression
        .replace('×', '*')
        .replace('÷', '/')
        .replace('sin', 'Math.sin')
        .replace('cos', 'Math.cos')
        .replace('tan', 'Math.tan')
        .replace('log', 'Math.log10')
        .replace('√', 'Math.sqrt')
        .replace('^', '**2')
        .replace('1/x', '1/')
        .replace('%', '/100');
      let result = eval(evalExpression);
      if (isNaN(result) || !isFinite(result)) {
        showMessage('Invalid calculation result', 'error');
        return;
      }
      result = Math.round(result * 1000000) / 1000000;
      resultDisplay.textContent = result;
      historyItems.push(`${expression} = ${result}`);
      updateHistory();
      //showMessage('Calculation successful', 'success');
      expression = result.toString();
      expressionDisplay.textContent = expression;
      console.log(`Evaluated: ${expression} = ${result}`);
    } catch (err) {
      logError(`Calculation failed: ${err.message}`);
      resultDisplay.textContent = 'Error';
      expressionDisplay.textContent = '';
      expression = '';
      showMessage('Invalid expression', 'error');
    }
  } else {
    // Add input to expression and update display
    expression += value;
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = expression;
    console.log(`Added to expression: ${value}`);
  }
}

function updateHistory() {
  try {
    historyItemsContainer.innerHTML = historyItems.map(item => `<div class="history-item">${item}</div>`).join('');
    console.log('Updated history');
  } catch (err) {
    logError(`Update history failed: ${err.message}`);
    showMessage('History update failed', 'error');
  }
}