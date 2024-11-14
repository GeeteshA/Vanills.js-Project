// DOM Elements
const display = document.querySelector('.screen input'); // Display input field
const buttons = document.querySelectorAll('.pad button'); // All buttons
const historyContainer = document.querySelector('.history'); // Container for history display
const historyIcon = document.getElementById('historyIcon'); // History Icon button
const historyModal = document.getElementById('historyModal'); // History modal
const clearHistoryButton = document.getElementById('clearHistory'); // Button to clear history

// State: current expression and history
let currentInput = '';
let history = []; // Array to store history of expressions and results

// Pure function to update the display
const updateDisplay = (input) => {
  display.value = input;  // Update the display value
};

// Pure function to update history on the UI
const updateHistory = () => {
  historyContainer.innerHTML = ''; // Clear the history container before updating

  // Loop through history array and display each item
  history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.textContent = `${item.expression} = ${item.result}`;
    historyContainer.appendChild(historyItem);
  });
};

// Pure function to handle button clicks
const handleButtonClick = (value, currentInput) => {
  switch (value) {
    case 'C':
      return '';  // Clear the input
    case '←':
      return currentInput.slice(0, -1); // Remove the last character (Backspace)
    case '=':
      try {
        const result = evaluateExpression(currentInput);
        addToHistory(currentInput, result); // Add the current expression and result to history
        return result;  // Return the result of the evaluation
      } catch (e) {
        return 'Error';  // Handle invalid expression
      }
    default:
      return currentInput + value;  // Append the value to current input
  }
};

// Pure function to evaluate the expression
const evaluateExpression = (expression) => {
  // Replace 'X' with '*' and '#' with '%'
  const expressionToEvaluate = expression.replace('X', '*').replace('#', '%');
  return eval(expressionToEvaluate);  // Evaluate the mathematical expression
};

// Function to add expression and result to history
const addToHistory = (expression, result) => {
  // Push an object with the expression and result into the history array
  history.push({ expression, result });

  // Limit the history to the last 5 entries
  if (history.length > 5) {
    history.shift(); // Remove the oldest entry if history exceeds 5 items
  }

  updateHistory(); // Update the history display
};

// Function to clear the history
const clearHistory = () => {
  history = [];  // Clear the history array
  updateHistory(); // Clear the history UI
};

// Toggle history modal visibility
const toggleHistoryModal = () => {
  historyModal.style.display = historyModal.style.display === 'block' ? 'none' : 'block';
};

// Main function to initialize the calculator
const initializeCalculator = () => {
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const value = event.target.textContent;
      currentInput = handleButtonClick(value, currentInput); // Handle the button click and update the current input
      updateDisplay(currentInput);  // Update the display after each button click
    });
  });

  // Toggle history modal when history icon is clicked
  historyIcon.addEventListener('click', toggleHistoryModal);

  // Clear history when the clear history button is clicked
  clearHistoryButton.addEventListener('click', clearHistory);
};

// Initialize the calculator when the script runs
initializeCalculator();
