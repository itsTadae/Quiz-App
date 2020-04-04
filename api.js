const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const body = document.getElementById('bodyElement');
let score = 0;
let questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtnsElement = document.getElementById('answer-buttons');


let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    clearStatusClass(body)
    setNextQuestion()
})
// Start quiz
function startGame() {
    
    resetState()
    
    renderCounter()
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    this.score = 0
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    clearStatusClass(body)
    setNextQuestion()
    
}
//Cycle questions
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    //document.getElementById("score").innerHTML = "Score: " + score;
    
}
// Display questions
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
// Reset question state
function resetState() {
    nextBtn.classList.add('hide')
    while (answerBtnsElement.firstChild) {
        answerBtnsElement.removeChild(answerBtnsElement.firstChild)
    }
}
// Selecting answer
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
        showScores(); 
    }
}
// correct / wrong decision 
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        score++;     
        
        
    } else {
        element.classList.add('wrong')
        
            

    }
}
// Clear status
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
// Quiz score
function showScores() {
    
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='scores'> Your score: " + score + "</h2>";
    questionContainerElement.innerHTML = gameOverHTML;
    startBtn.innerText = 'Restart';
    startBtn.classList.remove('hide');

    
}



// TIMER
const startingSeconds = 30;
let time = 30;
const countdownEl = document.getElementById('countdown');

setInterval(renderCounter, 1000);

function renderCounter() {
    if (time = time) {
        countdownEl.innerHTML = time;
        time--;
    } else {
        time = 0
        clearInterval(countdown);
        showScores();
    }
}



