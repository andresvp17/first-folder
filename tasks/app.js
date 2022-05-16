const bgcolor = document.getElementById('color')
const bodyFont = document.getElementById('font')
const littleImage = document.getElementById('img')
const selectImage = document.getElementById('img-select')
const form = document.getElementById('form')

form.addEventListener('submit', (e) =>{
    e.preventDefault()
})

const setValue = () =>{
    localStorage.setItem('bgcolor', bgcolor.value)
    localStorage.setItem('font', bodyFont.value)
    localStorage.setItem('image', littleImage.value)
    putValues()
}

const putValues = () =>{
    const currentColor = localStorage.getItem('bgcolor')
    const currentFont = localStorage.getItem('font')
    const currentImage = localStorage.getItem('image')

    bgcolor.value = currentColor
    bodyFont.value = currentFont
    littleImage.value = currentImage

    document.body.style.backgroundColor = `#${bgcolor.value}`
    bgcolor.style.backgroundColor = `#${bgcolor.value}`
    document.body.style.fontFamily = bodyFont.value
    selectImage.src = littleImage.value
}

bgcolor.addEventListener('change', () => setValue())
bodyFont.addEventListener('change', () => setValue())
littleImage.addEventListener('change', () => setValue())

if(!localStorage.getItem('bgcolor')) {
    setValue();
} else {
    putValues();
}