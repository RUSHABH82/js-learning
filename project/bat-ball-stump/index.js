const choice = {
    bat: "bat",
    ball: "ball",
    stump: "stump"
}

function generateComputerChoice() {
    switch (Math.round(Math.random() * 3)) {
        case 0:
            return choice.bat
        case 1:
            return choice.ball
        case 2:
            return choice.stump
    }
}

function selectMyChoice(myChoice) {
    declareResult(myChoice)
}

function declareResult(myChoice) {
    const computersChoice = generateComputerChoice();
    const myChoiceMsg = `Your choice is :${myChoice}`;
    const computerChoiceMsg = `Computer's choice is :${computersChoice}`;
    let result;
    if (myChoice === computersChoice) {
        result = "It's tie!";
    } else if (myChoice === choice.bat && computersChoice === choice.ball
        || myChoice === choice.ball && computersChoice === choice.stump
        || myChoice === choice.stump && computersChoice === choice.bat) {
        result = "You won";
    } else {
        result = "Computer won";
    }
    alert(`${myChoiceMsg}\n${computerChoiceMsg}\n${result}`)
}

