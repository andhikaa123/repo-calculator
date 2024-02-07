let lastOperator = '';
const operators = ['+', '-', '*', '/'];



function appendToDisplay(value) {
    const display = document.forms["myForm"].display;
    let isToggleClicked = false;

    if (value === '-/+' && display.value && !isToggleClicked) {
        // Toggle the sign of the entire expression
        const expression = display.value;
        const reversedExpression = expression.split('').reverse().join('');
        const match = reversedExpression.match(/(-?\d*\.?\d+)/);
    
        if (match) {
            const number = match[1];
            const reversedNumber = number.split('').reverse().join('');
            const updatedExpression = expression.replace(number, (number.startsWith('-') ? reversedNumber.slice(1) : '-' + reversedNumber));
            display.value = updatedExpression;

            // Set isToggleClicked to true
            isToggleClicked = true;
        }
    } else if (!['-/+'].includes(value)) {
        isToggleClicked = false;
    }

    else if (value === '%' && display.value) {
        const lastNumber = parseFloat(display.value.slice(display.value.lastIndexOf(operators[0]) + 1));
        if (!isNaN(lastNumber)) {
            const result = lastNumber / 100;
            display.value = display.value.slice(0, display.value.lastIndexOf(operators[0]) + 1) + result;
        }
    } 
    else if (value === '.' && display.value) {
        const lastNumber = display.value.split(/[-+*/]/).pop();
        if (!lastNumber.includes('.')) {
            display.value += value;
        }
    } 
    else if (operators.includes(value)) {
        if (lastOperator && display.value.endsWith(lastOperator)) {
            // If the clicked operator is different from the last operator, replace it
            display.value = display.value.slice(0, -1) + value;
        } else {
            display.value += value;
        }

        lastOperator = value;
    } 
    else {
        // Remove leading zeros from numbers
        if (value === '0' && display.value === '0') {
            return;
        }

        // Handle the case where a number follows an operator
        const lastOperatorIndex = display.value.lastIndexOf(lastOperator);
        if (lastOperator === '+' && lastOperatorIndex !== -1) {
            const lastNumber = display.value.slice(lastOperatorIndex + 1);
            if (lastNumber === '' || lastNumber === '-') {
                display.value += value;
                return;
            }
        }

        display.value += value;
    }
}

function clearDisplay() {
    document.forms["myForm"].display.value = '';
    lastOperator = '';  // Setel operasi terakhir ke kosong saat layar dibersihkan
}

function deleteLastChar() {
    const display = document.forms["myForm"].display;
    const deletedChar = display.value.slice(-1);

    if (deletedChar === lastOperator) {
        lastOperator = '';  // Setel operasi terakhir ke kosong jika karakter yang dihapus adalah operasi
    }

    display.value = display.value.slice(0, -1);
}
function calculateResult() {
    const display = document.forms["myForm"].display;
    let result = eval(display.value);
    
    // Round the result to 10 decimal places to handle floating-point precision issues
    result = parseFloat(result.toFixed(10));

    display.value = result;
    lastOperator = '';  // Setel operasi terakhir ke kosong setelah perhitungan
}
