const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const body = document.getElementById('bodyElement')
var score = 0;
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerBtnsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    clearStatusClass(body)
    setNextQuestion()
})

function startGame() {
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    this.score = 0
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    clearStatusClass(body)
    setNextQuestion()
    
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    document.getElementById("score").innerHTML = "Score: " + score;
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
            
            
        }
        button.addEventListener('click',selectAnswer)
        answerBtnsElement.appendChild(button)
        
    })
}

function resetState() {
    nextBtn.classList.add('hide')
    while (answerBtnsElement.firstChild) {
        answerBtnsElement.removeChild(answerBtnsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(body, correct)
    Array.from(answerBtnsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide')
    } else {
        
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        score++;
        
        
    } else {
        element.classList.add('wrong')
        
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};


