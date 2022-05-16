const titleQuestion = document.getElementById('title-question')
const optionsNode = document.getElementById('options')
const missingQuestions = document.getElementById('amount-questions')
const progressBar = document.getElementById('progress-bar')
const options = document.querySelectorAll('.option')
const guessedRight = document.getElementById('correct-text')
const guessedWrong = document.getElementById('incorrect-text')
const questionMax = 5
let corrects = 0
let incorrects = 0
let increment = 0
let canplay = true
let actualAnswer
const questions = [
    {
        question: "What was EXO's debut date?",
        choice1: 'November 12nd',
        choice2: 'July 6th',
        choice3: 'April 8th',
        choice4: 'May 12nd',
        answer: 3
    },
    {
        question: "Lisa's birthdate?",
        choice1: 'March 27th',
        choice2: 'August 8th',
        choice3: 'November 1st',
        choice4: 'July 19th',
        answer: 1
    },
    {
        question: "What is nine plus ten?",
        choice1: '19',
        choice2: '21',
        choice3: 'the one from above',
        choice4: 'the first',
        answer: 2
    },
    {
        question: "What was BLACKPINK's debut date?",
        choice1: 'October 8th',
        choice2: 'August 8th',
        choice3: 'November 1st',
        choice4: 'July 19th',
        answer: 2
    },
    {
        question: "Most-awarded artist in Grammy's history?",
        choice1: 'Beyoncé',
        choice2: 'Michael Jackson',
        choice3: 'Taylor Swift',
        choice4: 'Adele',
        answer: 1
    },
]

const putAnswer = () =>{
    if(questions.length === 0) return alert('Congratulations! You have completed the questions')
    let questionIndex = Math.floor(Math.random() * questions.length)
    let currentQuestion = questions[questionIndex]
    actualAnswer = currentQuestion.answer
    
    increment += 1
    titleQuestion.textContent = currentQuestion.question
    missingQuestions.textContent = `${increment} of ${questionMax} Total Questions`
    const widthBar = (increment / questionMax) * 100
    progressBar.style.width = `${widthBar}%`
    options.forEach((option, index) => {
        option.children[0].textContent = `${index + 1}.  ${currentQuestion['choice' + option.dataset.number]}`
    })
    
    questions.splice(questionIndex, 1);
    console.log(questions);

    options.forEach(option =>{
        option.addEventListener('click', (e) =>{
            if(!canplay) return 
            if(e.target.classList.contains('option') && canplay){
                if(e.target.dataset.number == actualAnswer){
                    e.target.classList.add('correct')
                    guessedRight.textContent =`Correct: ${corrects += 1}`
                } else{
                    e.target.classList.add('incorrect')
                    guessedWrong.textContent =`Incorrect: ${incorrects += 1}`
                }
            }
            if(e.target.classList.contains('option__text') && canplay){
                if(e.target.parentElement.dataset.number == actualAnswer){                    
                    e.target.parentElement.classList.add('correct')
                    guessedRight.textContent = `Correct: ${corrects += 1}`
                } else{
                    e.target.parentElement.classList.add('incorrect')
                    guessedWrong.textContent = `Incorrect: ${incorrects += 1}`
                }
            }
            canplay = false
            rewriteQuestion()
            removeClass(e.target, e.target.parentElement)
        })
    })
}

const removeClass = (node, childNode) =>{
    setTimeout(() =>{
        if(node.classList.contains('correct')){
            node.classList.remove('correct')
        } else {
            node.classList.remove('incorrect')
        }

        if(childNode.classList.contains('correct')){
            childNode.classList.remove('correct')
        } else {
            childNode.classList.remove('incorrect')
        }
    },1000)
}

const rewriteQuestion = () =>{
    setTimeout(() => {
        canplay = true
        putAnswer()
    },1000)
}

putAnswer()