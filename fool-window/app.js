const closeBtn = document.getElementById('close')
const appear = document.getElementById('appear')
const container = document.getElementById('container')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const closeWindow = document.querySelectorAll('.bar-top--close')
const windowContainer = document.querySelector('.window')

closeBtn.addEventListener('click', (e) =>{
    if(!container.classList.contains('disappear')){
        container.classList.add('disappear')
        container.classList.remove('appear')
    }
})

yesBtn.addEventListener('click', (e) =>{
    if(windowContainer.classList.contains('disappear')){
        windowContainer.classList.add('appear')
        windowContainer.classList.remove('disappear')
    }
})

appear.addEventListener('click', (e) =>{
    if(container.classList.contains('disappear')){
        container.classList.add('appear')
        container.classList.remove('disappear')
    }
})

closeWindow[1].addEventListener('click', (e) =>{
    if(!windowContainer.classList.contains('disappear')){
        windowContainer.classList.remove('appear')
        windowContainer.classList.add('disappear')
    }
})

const increment = () =>{
    let cont = 0
    noBtn.addEventListener('click', () =>{
        cont += 1
        if(cont == 1){
            noBtn.classList.add('translate-button-1')
        } else if(cont == 2){
            noBtn.classList.remove('translate-button-1')
            noBtn.classList.add('translate-button-2')
        } else if(cont == 3){
            noBtn.classList.remove('translate-button-2')
            noBtn.classList.add('translate-button-3')
        } else if(cont == 4){
            noBtn.classList.remove('translate-button-3')
            noBtn.classList.add('translate-button-4')
        } else if(cont == 5){
            noBtn.classList.remove('translate-button-4')
            noBtn.classList.add('translate-button-5')
        } else {
            cont = 0
            noBtn.classList.remove('translate-button-5')
        }
    })
}

increment()