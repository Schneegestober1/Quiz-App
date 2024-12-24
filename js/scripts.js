const questions = [
    {
        question: 'Какая планета самая большая в Солнечной системе?',
        answers: [
            {text: 'Земля', correct: false},
            {text: 'Юпитер', correct: true},
            {text: 'Марс', correct: false},
            {text: 'Венера', correct: false},
        ]
    },
    {
        question: 'Какой металл известен как самый легкий?',
        answers: [
            {text: 'Алюминий', correct: false},
            {text: 'Литий', correct: true},
            {text: 'Железо', correct: false},
            {text: 'Медь', correct: false},
        ]
    },
    {
        question: 'Кто написал роман "Война и мир"?',
        answers: [
            {text: 'Фёдор Достоевский', correct: false},
            {text: 'Лев Толстой', correct: true},
            {text: 'Антон Чехов', correct: false},
            {text: 'Александр Пушкин', correct: false},
        ]
    },
    {
        question: 'Сколько ног у паука?',
        answers: [
            {text: '6', correct: false},
            {text: '8', correct: true},
            {text: '10', correct: false},
            {text: '4', correct: false},
        ]
    },
    {
        question: 'Какой океан самый глубокий?',
        answers: [
            {text: 'Атлантический', correct: false},
            {text: 'Тихий', correct: true},
            {text: 'Индийский', correct: false},
            {text: 'Северный Ледовитый', correct: false},
        ]
    },
]

const qustionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'Дальше'
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNumber = currentQuestionIndex + 1
    qustionElement.innerHTML = questionNumber + '. ' + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn  = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if (isCorrect) {
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block'
}

function showScore(){
    resetState()
    qustionElement.innerHTML = `Вы набрали ${score} из ${questions.length}!`
    nextButton.innerHTML = 'Попробовать снова'
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()

