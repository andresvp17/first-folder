const operation = document.getElementById('operation')
const result = document.getElementById('result')
const buttons = document.getElementById('buttons')
const changeColor = document.getElementById('change-color')
const stylesRoot = document.documentElement.style
let operationComplete = false
const lastValue = () => operation.textContent.substring(operation.textContent.length -1)

const writeOperation = (text) =>{
    if(operation.textContent == '0' && text.textContent != '.'){
        operation.textContent = ''
    }

    if(operationComplete && isNaN(text.textContent)){
        operation.textContent = result.textContent
        operationComplete = false
    }

    if(operationComplete && !isNaN(text.textContent)){
        operation.textContent = ''
        result.textContent = '0'
        operationComplete = false
    }

    if(isNaN(lastValue()) && isNaN(text.textContent)){
        operation.textContent = operation.textContent.substring(0, operation.textContent.length -1)
    }else{
        operation.textContent += text.textContent
    }
    
    if(operation.textContent.length > 21){
        operation.textContent = operation.textContent.substring(0,operation.textContent.length -1)
    }
}

const deleteValue = () =>{
    operation.textContent = operation.textContent.replace(operation.textContent.substring(operation.textContent.length -1), '')

    if(operation.textContent === '') operation.textContent = '0'
}

const writeResult = () =>{
    result.textContent = eval(operation.textContent)
    if(result.textContent.length >= 11){
        result.style.fontSize = '20px'
    }
    operationComplete = true
}

const changeSing = () =>{
        let number = 0
        let position = 0

        if(isNaN(lastValue())){
            for(let i = operation.textContent.length; i > 0; i--){
                if(isNaN(operation.textContent[i])){
                    position = i + 1
                    break;
                }
            }
        }
        
        number = operation.textContent.substring(position)
        operation.textContent = operation.textContent.replace(number, `(${number * -1})`)
}

const clearResult = () =>{
    result.textContent = '0'
    operation.textContent = '0'
}

buttons.addEventListener('click', (e) =>{
    if(e.target.classList.contains('btn')){
        switch (e.target.textContent) {
            case '=':
                writeResult()
                break;
        
            case 'C':
                clearResult()
                break;
    
            case '+/-':
                changeSing()
                break;

            case '←':
                deleteValue()
                break;

            default:
                writeOperation(e.target)
                break;
        }
    }
})

changeColor.addEventListener('click', (e) =>{
    e.target.classList.toggle('rotate-animation')
    if(e.target.dataset.color == 'two-type'){
        stylesRoot.setProperty('--hot-red', '#e63946')
        stylesRoot.setProperty('--pearl', '#f1faee')
        stylesRoot.setProperty('--sky-blue', '#a8dadc')
        stylesRoot.setProperty('--dark-blue', '#457b9d')
        document.body.style.backgroundColor = '#333'
        e.target.dataset.color = 'one-type' 
    } else if(e.target.dataset.color == 'one-type'){
        stylesRoot.setProperty('--hot-red', '#839973')
        stylesRoot.setProperty('--pearl', '#e8dbcb')
        stylesRoot.setProperty('--dark-blue', '#5f3a42')
        stylesRoot.setProperty('--sky-blue', '#e2b9b3')
        document.body.style.backgroundColor = '#36374b'  
        e.target.dataset.color = 'two-type'
    }
})


changeColor.addEventListener('animationend', (e) =>{
    e.target.classList.remove('rotate-animation')
})