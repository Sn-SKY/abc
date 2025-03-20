document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentValue = '';
    let previousValue = '';
    let operation = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (shouldResetDisplay) {
            currentValue = '';
            shouldResetDisplay = false;
        }
        if (value === '.' && currentValue.includes('.')) return;
        if (value === '.' && currentValue === '') {
            currentValue = '0';
        }
        currentValue += value;
    }

    function handleOperator(value) {
        switch (value) {
            case 'clear':
                clear();
                break;
            case 'backspace':
                backspace();
                break;
            case '=':
                calculate();
                break;
            default:
                setOperation(value);
        }
    }

    function clear() {
        currentValue = '';
        previousValue = '';
        operation = null;
    }

    function backspace() {
        currentValue = currentValue.slice(0, -1);
    }

    function setOperation(op) {
        if (currentValue === '') return;
        if (previousValue !== '') {
            calculate();
        }
        operation = op;
        previousValue = currentValue;
        currentValue = '';
    }

    function calculate() {
        if (previousValue === '' || currentValue === '') return;

        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('不能除以0！');
                    clear();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = (prev * current) / 100;
                break;
            default:
                return;
        }

        currentValue = result.toString();
        operation = null;
        previousValue = '';
        shouldResetDisplay = true;
    }

    function updateDisplay() {
        display.value = currentValue || '0';
    }
}); 