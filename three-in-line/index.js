const text = document.getElementById('text')
const container = document.getElementById('container')
const buttons = Array.from(document.querySelectorAll('.button'))
const letters = ['X', 'O']
let turn = 0
let canplay = true
let winSpaces = []

container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('button') && e.target.textContent == '' && canplay){
        e.target.textContent = letters[turn]
        changeTurn()
        equals()
    }
})

const changeTurn = () =>{
    if(turn === 0){
        turn = 1
    } else {
        turn = 0
    }
}

const equals = () =>{
  const equalsSign = (first, second, thrid, sign) =>{
    if(first.textContent === sign && second.textContent === sign && thrid.textContent === sign){
      first.style.backgroundColor = 'red'
      second.style.backgroundColor = 'red'
      thrid.style.backgroundColor = 'red'
      return canplay = false
    }
  }
  //Horizontal X
  equalsSign(buttons[0], buttons[1], buttons[2], letters[0])
  equalsSign(buttons[3], buttons[4], buttons[5], letters[0])
  equalsSign(buttons[6], buttons[7], buttons[8], letters[0])
  //Vertical X
  equalsSign(buttons[0], buttons[3], buttons[6], letters[0])
  equalsSign(buttons[1], buttons[4], buttons[7], letters[0])
  equalsSign(buttons[2], buttons[5], buttons[8], letters[0])
  //Diagonal X
  equalsSign(buttons[0], buttons[4], buttons[8], letters[0])
  equalsSign(buttons[2], buttons[4], buttons[6], letters[0])

  //Horizontal O
  equalsSign(buttons[0], buttons[1], buttons[2], letters[1])
  equalsSign(buttons[3], buttons[4], buttons[5], letters[1])
  equalsSign(buttons[6], buttons[7], buttons[8], letters[1])
  //Vertical O
  equalsSign(buttons[0], buttons[3], buttons[6], letters[1])
  equalsSign(buttons[1], buttons[4], buttons[7], letters[1])
  equalsSign(buttons[2], buttons[5], buttons[8], letters[1])
  //Diagonal O
  equalsSign(buttons[0], buttons[4], buttons[8], letters[1])
  equalsSign(buttons[2], buttons[4], buttons[6], letters[1])
}