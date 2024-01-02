var finalResult = '0';

updateValue()

function updateValue() {
    document.getElementById("result").innerHTML = `${finalResult}`;
}

function clickNumber(expression) {

    if (finalResult === '0') {
        finalResult = expression;
    } else {
        finalResult = finalResult + expression;
    }
    updateValue();
}

function doBackSpace() {
    if (finalResult.length - 1 !== 0) {
        finalResult = finalResult.substring(0, finalResult.length - 1)
    } else {
        finalResult = '0';
    }
    updateValue()
}

function clearScreen() {
    finalResult = '0'
    updateValue()
}

function getResult() {
    finalResult = eval(finalResult);
    updateValue()
}



