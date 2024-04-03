
const calculatorContainer = document.querySelector('.calculator-container');
const buttonContainer = calculatorContainer.lastElementChild;
const screenText = document.querySelector('.screen-text');

let currentNumber = 0;
let total = 0;
let lastOperation = null;

buttons = [['AC', 'C', '%', '÷'], ['7', '8', '9', '+'], ['4', '5', '6', '-'], ['1', '2', '3', 'x'], ['0', '.', '=']];

for(const row of buttons) {
    const buttonRow = document.createElement('div');
    buttonRow.classList.add('buttons-row');
    for(const buttonString of row) {
        const button = document.createElement('button');
        button.textContent = buttonString;
        if (buttonString == '=')
            button.style.flexGrow = 2;
        
        button.addEventListener('click', handleButton);

        buttonRow.appendChild(button);

    }

    buttonContainer.appendChild(buttonRow);

} 

function evaluate(sign) {
    switch(sign) {
        case null:
            total = currentNumber;
            break;
        case '+':
            total += currentNumber;
            break;
        case '-':
            total -= currentNumber;
            break;
        case 'x':
            total *= currentNumber;
            break;
        case '÷':
            total /= currentNumber;
            break;

    }

    return total;
}

function handleButton(ev) {
    const buttonString = ev.target.textContent;

    if(buttonString.match(/[0-9]/)) {
        currentNumber = currentNumber * 10 + Number(buttonString);
        screenText.textContent = currentNumber;
    }
    else {
        switch(buttonString) {
            case 'AC':
                currentNumber = 0;
                total = 0;
                screenText.textContent = 0;
                lastOperation = null;
                break;
            case 'C':
                const lastChar = screenText.textContent.charAt(screenText.textContent.length - 1);
                if (! lastChar.match(/[0-9]/))
                    break;
                currentNumber = Math.floor(currentNumber / 10);
                if (currentNumber < 0)
                    currentNumber += 1;
                screenText.textContent = currentNumber;
                break;
            case '%':
                break;
            case '.':
                break;
            case '=':
                if (lastOperation) {
                    total = evaluate(lastOperation);
                    lastOperation = null;
                }
                else {
                    total = currentNumber;
                }
                screenText.textContent = total;
                currentNumber = total;
                break;
            default:
                total = evaluate(lastOperation);
                currentNumber = 0;
                screenText.textContent += ' ' + buttonString;
                lastOperation = buttonString;
        }   
    }
}