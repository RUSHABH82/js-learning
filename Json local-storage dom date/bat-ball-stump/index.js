let scoreString = localStorage.getItem('score');
const score = scoreString ? JSON.parse(scoreString) : {win: 0, lost: 0, tie: 0,}

score.displayScore = function () {
    return `Match won:${this.win}\nMatch lost:${this.lost}\nMatch tie:${this.tie}`
}
updateScore();

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
        score.tie++;
        result = "It's tie!";
    } else if (myChoice === choice.bat && computersChoice === choice.ball
        || myChoice === choice.ball && computersChoice === choice.stump
        || myChoice === choice.stump && computersChoice === choice.bat) {
        score.win++;
        result = "You won";
    } else {
        score.lost++;
        result = "Computer won";
    }
    localStorage.setItem("score", JSON.stringify(score));
    alert(`${myChoiceMsg}\n${computerChoiceMsg}\n${result}\n\nFinalScore:\n${score.displayScore()}`)
    updateScore();
}

function resetScore() {
    Object.keys(score).forEach(key => {
        if (typeof score[key] === "number") score[key] = 0
    })
    updateScore();
    localStorage.removeItem('score');
}

function updateScore() {
    document.getElementById("display-score").innerHTML =
        `Won:${score.win}, Lost:${score.lost}, Tie:${score.tie}`
}