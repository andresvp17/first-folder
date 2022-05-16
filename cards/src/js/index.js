const gameContainer = document.getElementById('game-container')
const modalWindow = document.getElementById('modal-window')
const teams = document.getElementById('teams')
const input = document.getElementById('input')
const textWindow = document.getElementById('text-window')
const colorElements = document.querySelectorAll('.choose-color--item')
const colorMainElement = document.getElementById('color-main')
const redButton = document.getElementById('wrong')
const greenButton = document.getElementById('correct')
const rootStyles = document.documentElement
let canplay = false
let pointsOne
let pointsTwo
let turn = 0

const putColor = (color) => sessionStorage.setItem('styleColor', color)

if(!sessionStorage){
    putColor(colorMainElement.style.backgroundColor)
} else{
    rootStyles.style.setProperty('--primary-color', sessionStorage.getItem('styleColor'))
    colorMainElement.style.backgroundColor = sessionStorage.getItem('styleColor')
} 

const teamSection = () =>{
    modalWindow.addEventListener('click', (e) =>{
        if(e.target.textContent == 'Choose'){
            if(teams.children[0].children[0].textContent === 'Team 1'){
                teams.children[0].children[0].textContent = input.value
            } else if(teams.children[1].children[0].textContent === 'Team 2'){
                teams.children[1].children[0].textContent = input.value
                changeModal()
            }
        }
    })
}

const changeModal = () =>{
    if(teams.children[0].children[0].textContent !== 'Team 1' && teams.children[1].children[0].textContent !== 'Team 2'){
        modalWindow.classList.add('disappear')
        canplay = true
        createCard()
    }
}

const createCard = (max = 16) =>{
    const fragment = document.createDocumentFragment()
    if(max <= 16 && canplay){
        let number = 1
        for(let i = max; i > 0; i--){
            const card = document.createElement('div')
            card.classList.add('card')
            fragment.appendChild(card)

            const cardFront = document.createElement('div')
            cardFront.classList.add('card__front')
            card.appendChild(cardFront)

            const cardBack = document.createElement('div')
            cardBack.classList.add('card__back')
            cardBack.dataset.flipped = false 
            card.appendChild(cardBack)

            const backNumber = document.createElement('p')
            backNumber.textContent = number++
            backNumber.classList.add('card-text')
            cardBack.appendChild(backNumber)

            const text = document.createElement('p')
            cardFront.appendChild(text)
        }
        gameContainer.appendChild(fragment)
    } else {
        console.log('%c The number is bigger than sixteen', 'background: #d55c5a; color: #514945');
    }
}

gameContainer.addEventListener('click', (e) =>{
    console.log(e.target);
    if(e.target.classList.contains('card__back')){
        e.target.parentElement.classList.add('card__flip')
        textWindow.classList.remove('text__window--disappear')
        textWindow.classList.add('show')
        if(e.target.previousElementSibling.children[0].textContent == ''){
            const askForText = prompt('Insert Your Text')
            e.target.previousElementSibling.children[0].textContent = askForText
            textWindow.children[0].textContent = e.target.previousElementSibling.children[0].textContent
            if(askForText === null || askForText === ''){
                e.target.previousElementSibling.children[0].textContent = 'You didnt insert text here'
                textWindow.children[0].textContent = e.target.previousElementSibling.children[0].textContent
            }
        } else {
            textWindow.children[0].textContent = e.target.previousElementSibling.children[0].textContent
        }
    } else {
        textWindow.classList.remove('show')
        textWindow.classList.add('text__window--disappear')
        e.target.parentElement.classList.remove('card__flip')
    }
})

textWindow.addEventListener('click', (e) =>{
    addPoints(e.target)
})

const addPoints = (elements) =>{
    console.log(elements);
    if(turn === 0 && textWindow.children[0].textContent != 'You didnt insert text here'){
        if(elements === redButton){
            if(teams.children[0].children[1].textContent != 0){
                pointsOne = Number.parseInt(teams.children[0].children[1].textContent)
                teams.children[0].children[1].textContent = `${pointsOne - 25}`
            }
        textWindow.classList.remove('show')
        textWindow.classList.add('text__window--disappear')
        } 
        if(elements === greenButton){
            if(teams.children[0].children[1].textContent == 0){
                teams.children[0].children[1].textContent = 25
            }else {
                pointsOne = Number.parseInt(teams.children[0].children[1].textContent)
                teams.children[0].children[1].textContent = `${pointsOne + 25}`
            }
        textWindow.classList.remove('show')
        textWindow.classList.add('text__window--disappear')
        } 
        turn++
    } else if(turn === 1 && textWindow.children[0].textContent != 'You didnt insert text here'){
        if(elements === redButton){
            if(teams.children[1].children[1].textContent != 0){
                pointsTwo = Number.parseInt(teams.children[1].children[1].textContent)
                teams.children[1].children[1].textContent = `${pointsTwo - 25}`
            }
        textWindow.classList.remove('show')
        textWindow.classList.add('text__window--disappear')
        }

        if(elements === greenButton){
            if(teams.children[1].children[1].textContent == 0){
                teams.children[1].children[1].textContent = 25
            }else {
                pointsTwo = Number.parseInt(teams.children[1].children[1].textContent)
                teams.children[1].children[1].textContent = `${pointsTwo + 25}`
            }
        textWindow.classList.remove('show')
        textWindow.classList.add('text__window--disappear')
        } 
        turn--
    }
}

colorMainElement.addEventListener('click', (e) =>{
    if(colorMainElement.dataset.reaction == 'no-displayed'){
        for(let i = 0; i < colorElements.length; i++){
            colorElements[i].classList.add(`animation-color-${i + 1}`)
            colorMainElement.dataset.reaction = 'Displayed'
        }
    } else if(e.target.classList.contains('choose-color') &&           colorMainElement.dataset.reaction == 'Displayed'
    ){
        for(let i = 0; i < colorElements.length; i++){
            colorElements[i].classList.remove(`animation-color-${i + 1}`)
            colorMainElement.dataset.reaction = 'no-displayed'
        }
    }
    if(e.target.classList.contains('choose-color--item')){
            rootStyles.style.setProperty('--primary-color', e.target.dataset.color)
            colorMainElement.style.backgroundColor = e.target.dataset.color
            putColor(e.target.dataset.color)
    }
})

teamSection()