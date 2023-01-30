const numberBtn = document.querySelectorAll('[data-number]');
const periodBtn = document.querySelector('[data-period]');
const equalBtn = document.querySelector('[data-equal]');
const operatorBtn = document.querySelectorAll('[data-operation]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');

const prevText = document.querySelector('[data-previous]');
const currText = document.querySelector('[data-current]');

function clear() {
    this.currentVal = '';
    this.previousVal = '';
    this.operation = undefined;
}

clear();

// Delete Num
function deleteNum() {
    this.currentVal = this.currentVal.slice(0, -1);
}

// Getting Value
function getVal(number) {
    this.currentVal += number;
}

// Setting Operation
function setOperation(operation) {
    if (!this.operation) {
        this.operation = operation;
        this.previousVal = `${this.currentVal}`;
        this.currentVal = '';
    }
}

function compute() {
    let current = parseFloat(currentVal);
    let previous = parseFloat(previousVal);
    let ops = operation;
    let result;

    if (ops) {
        switch (ops) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "÷":
                result = previous / current;
                break;
            case "*":
                result = previous * current;
                break;
            default:
                result = NaN;
                break;
        }
    }

    prevText.textContent = result;
    currText.textContent = '';
    clear();
}

function displayNum() {
    currText.innerText = this.currentVal;
    if (this.previousVal === '') {
        prevText.innerText = '';
    } else {
        prevText.innerText = `${this.previousVal} ${this.operation}`;
    }
}

function addPeriod(period) {
    if (!this.currentVal.includes(period))
        this.currentVal += period;
}

numberBtn.forEach(button =>
    button.addEventListener('click', () => {
        getVal(button.textContent)
        displayNum();
    }));

operatorBtn.forEach(operation => operation.addEventListener('click', () => {
    setOperation(operation.textContent);
    displayNum();
}))

periodBtn.addEventListener('click', () => {
    addPeriod(periodBtn.textContent);
    displayNum();
})

equalBtn.addEventListener('click', compute);

clearBtn.addEventListener('click', () => {
    clear();
    displayNum();
})

deleteBtn.addEventListener('click', () => {
    deleteNum();
    displayNum();
})