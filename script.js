let lastOperator = '';

function appendToDisplay(value) {
    const display = document.forms["myForm"].display;
    const operators = ['+', '-', '*', '/'];
    let isToggleClicked = false;

    if (value === '-/+' && display.value && !isToggleClicked) {
        const expression = display.value;
        // Find the last number in the expression
        const match = expression.match(/(-?\d*\.?\d+)$/);
    
        if (match) {
            const number = match[1];
            const updatedExpression = expression.replace(number, (number.startsWith('-') ? number.slice(1) : '-' + number));
            display.value = updatedExpression;
    
            // Set isToggleClicked to true
            isToggleClicked = true;
        }

    } else if (value === '%' && display.value) {
        const lastNumber = parseFloat(display.value.slice(display.value.lastIndexOf(operators[0]) + 1));
        if (!isNaN(lastNumber)) {
            const result = lastNumber / 100;
            display.value = display.value.slice(0, display.value.lastIndexOf(operators[0]) + 1) + result;
        }
    } else if (value === '.' && display.value) {
        const lastNumber = display.value.split(/[-+*/]/).pop();
        if (!lastNumber.includes('.')) {
            display.value += value;
        }
    } else if (operators.includes(value)) {
        if (lastOperator && display.value.endsWith(lastOperator)) {
            // If the clicked operator is different from the last operator, replace it
            display.value = display.value.slice(0, -1) + value;
        } else {
            display.value += value;
        }

        lastOperator = value;
    } else {
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
    display.value = eval(display.value);
    lastOperator = '';  // Setel operasi terakhir ke kosong setelah perhitungan
}
