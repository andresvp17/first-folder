const form = document.getElementById('form')
const input = document.getElementById('input')
const itemsLeft = document.getElementById('items-left')
const clearTask = document.getElementById('clear-task')
const typesTask = document.getElementById('types-task')
const taskContent = document.getElementById('task-content')
const icon = document.getElementById('icon')
const backgroundImages = document.querySelectorAll('.image-element')
const rootStyles = document.documentElement.style
let lengthChildren

const getRandom = (max = 1000) => Math.floor(Math.random() * max)

const addTask = () =>{
    const fragment = document.createDocumentFragment()
    if(isNaN(input.value)){
        const taskItem = document.createElement('div')
        taskItem.dataset.done = 'not'
        taskItem.classList.add('task__content--item')
        taskItem.id = `ID-${getRandom()}`
        taskItem.draggable = true
        
        const circle = document.createElement('div')
        circle.classList.add('circle')
        taskItem.appendChild(circle)

        const textItem = document.createElement('p')
        textItem.textContent = input.value
        taskItem.appendChild(textItem)

        const closeIcon = document.createElement('div')
        taskItem.appendChild(closeIcon)

        taskContent.addEventListener('dragstart', (e) =>{
            e.dataTransfer.setData('text/plain', e.target.id)
        })
        taskContent.addEventListener('dragover', (e) =>{
            e.preventDefault()
        })
        taskContent.addEventListener('drop', (e) =>{
            e.preventDefault()
            const element = document.getElementById(e.dataTransfer.getData('text'))

        taskContent.appendChild(taskContent.removeChild(element))
        })

        circle.addEventListener('click', (e) =>{
            if(!e.target.classList.contains('circle-filled')){
                e.target.classList.add('circle-filled')
                taskItem.classList.add('opacity')
                taskItem.dataset.done = 'yes'
                closeIcon.classList.add('close__icon')
            } else {
                e.target.classList.remove('circle-filled')
                taskItem.classList.remove('opacity')
                taskItem.dataset.done = 'not'
                closeIcon.classList.remove('close__icon')
            }
        })

        closeIcon.addEventListener('click', (e) =>{
            if(e.target.classList.contains('close__icon')){
                taskContent.removeChild(e.target.parentElement)
                itemsLeft.textContent = `${taskContent.children.length} Items Left`
            }
        })
        fragment.appendChild(taskItem)
    }
    taskContent.appendChild(fragment)
    itemsLeft.textContent = `${taskContent.children.length} Items Left`
}

const classifyTask = (nodes) =>{
    typesTask.addEventListener('click', (e) =>{

        for(let i = 0; i < nodes.length; i++){
            if(e.target.textContent === 'Active'){
                if(nodes[i].dataset.done == 'yes'){
                    nodes[i].classList.add('disappear')
                } else if(nodes[i].classList.contains('disappear')){
                    nodes[i].classList.remove('disappear')
                }
            }

            if(e.target.textContent === 'Completed'){
                if(nodes[i].dataset.done == 'not'){
                    nodes[i].classList.add('disappear')
                } else if(nodes[i].classList.contains('disappear')){
                    nodes[i].classList.remove('disappear')
                }
            }

            if(e.target.textContent === 'All'){
                nodes[i].classList.remove('disappear')
                nodes[i].classList.add('show')
            }
    
        }
    })
}

clearTask.addEventListener('click', (e) =>{
    lengthChildren = taskContent.children.length
    while(lengthChildren > 0){
        lengthChildren--
        if(taskContent.children[lengthChildren].dataset.done === 'yes'){
            taskContent.removeChild(taskContent.children[lengthChildren])
            itemsLeft.textContent = `${taskContent.children.length} Items Left`
        }
    }
})

icon.addEventListener('click', (e) =>{
    if(e.target.dataset.icon == 'moon'){
        e.target.src = '/assets/bx-sun.svg'
        rootStyles.setProperty('--bg-color', '#b9d4db')
        rootStyles.setProperty('--gradient-one', '#f2a490')
        rootStyles.setProperty('--gradient-two', '#de5b6d')
        rootStyles.setProperty('--border-color', '#e9765b')
        backgroundImages[1].classList.remove('disappear')
        backgroundImages[1].classList.add('show')
        setTheme()
        e.target.dataset.icon = 'sun'
    } else if(e.target.dataset.icon = 'sun') {
        e.target.src = '/assets/bx-moon.svg'
        rootStyles.setProperty('--bg-color', '#45625d')
        rootStyles.setProperty('--gradient-one', '#6aa5a9')
        rootStyles.setProperty('--gradient-two', '#a3d2d5')
        rootStyles.setProperty('--border-color', '#a9f1df')
        backgroundImages[1].classList.remove('show')
        backgroundImages[1].classList.add('disappear')
        e.target.dataset.icon = 'moon'
        setTheme()
    }
})

const setTheme = () =>{
    localStorage.setItem('bgImage', backgroundImages[0].src)
    localStorage.setItem('border-color', rootStyles.getPropertyValue('--border-color'))
    localStorage.setItem('gradient-one', rootStyles.getPropertyValue('--gradient-one'))
    localStorage.setItem('gradient-two', rootStyles.getPropertyValue('--gradient-two'))
    localStorage.setItem('bg-color', rootStyles.getPropertyValue('--bg-color'))
}

const putTheme = () =>{
    rootStyles.setProperty('--bg-color', localStorage.getItem('bg-color'))
    rootStyles.setProperty('--gradient-one', localStorage.getItem('gradient-one'))
    rootStyles.setProperty('--gradient-two', localStorage.getItem('gradient-two'))
    rootStyles.setProperty('--border-color', localStorage.getItem('border-color'))
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    addTask()
})

classifyTask(taskContent.children)

if(localStorage.length === 0){
    setTheme()
} else {
    putTheme()
}