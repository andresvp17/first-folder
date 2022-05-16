const inputCard  = document.getElementById('input-card')
const characters = '###-###-###-##'
const masked = []

inputCard.addEventListener('keydown', (e) =>{
    e.preventDefault()
    maskedInput(characters, e.key, masked)
    inputCard.value = masked.join('')
})

const maskedInput = (mask, key, array) =>{
    const numbers = ['0','1','2','3','4','5','6','7','8','9']
    if(key === 'Backspace' && array.length > 0){
        array.pop()
        return
    }
    if(numbers.includes(key) && array.length + 1 <= mask.length){
        if(mask[array.length] == '-' || mask[array.length] == '/'){
            array.push(mask[array.length], key)
        }else{
            array.push(key)
        }
    }
}