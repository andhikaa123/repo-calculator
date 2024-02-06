let lastOperator = '';

function appendToDisplay(value) {
    const display = document.forms["myForm"].display;
    const operators = ['+', '-', '*', '/'];

    if (value === '-/+' && display.value) {
        const lastChar = display.value.slice(-1);

        if (lastChar === '(' || operators.includes(lastChar)) {
            // If the last character is '(' or an operator, append '-'
            display.value += '-';
        } else {
            // Otherwise, toggle the sign of the last number
            const lastOperatorIndex = display.value.match(/[-+*/]/g)?.pop() || 0;
            const lastNumber = display.value.slice(lastOperatorIndex);
            const updatedValue = (lastNumber.startsWith('-') ? lastNumber.slice(1) : '-' + lastNumber);
            display.value = display.value.slice(0, lastOperatorIndex) + updatedValue;
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
