const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const timertext = document.querySelector('#timerText');
const scoreText = document.querySelector('#score');
const timerFull = document.querySelector('#timerFull');



let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'what is the html tag for a link?',
        choice1: '<div>',
        choice2: '<a>',
        choice3: '<li>',
        choice4: '<ul>',
        answer: 2,
    },
    {
        question:'what is the html tag for a ordered list?',
        choice1: '<ol>',
        choice2: '<ul>',
        choice3: '<li>',
        choice4: '<div>',
        answer: 1,
    },
    {
        question:'what is the html tag for unordered list?',
        choice1: '<li>',
        choice2: '<ol>',
        choice3: '<a>',
        choice4: '<ul>',
        answer: 4,
    },
    {
        question:'How many h1 tags should you have?',
        choice1: '2',
        choice2: '4',
        choice3: '1',
        choice4: '3',
        answer: 3,
    }
]

const SCORE_POINTS = 100 
const MAX_QUESTIONS = 4 

startQuiz = () => {
    questionCounter = 0 
    score = 0

    availableQuestions = [...questions]
    getNewQuestion()
    updateCountdown()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html') 
    }

    questionCounter++
    timertext.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
 
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const  selectedAnswers = selectedChoice.dataset['number']

        let classToApply = selectedAnswers == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}




//timer variables
const startingMinutes = 1;
let time = startingMinutes *60;

const countdownEl = document.getElementById('timerFull');


setInterval(updateCountdown, 1000);

function updateCountdown() {
    let seconds = time % 60; 
    

    countdownEl.innerHTML =  ` timer:${seconds}`;
    time--;
    time = time < 0 ? 0 : time
console.log(time)
    if(time === 0){
        window.location = 'OutOfTime.html'

       
    }
}

    

startQuiz()