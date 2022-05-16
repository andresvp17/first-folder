/*
const array = [35, 45, 5, 8, 58, 40, 852, 4, 5965]
const newArray = [...array]
const getIndex = () =>{
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
            let next = j + 1
            if(newArray[next] !== undefined){
                if(newArray[next] <= newArray[j]){
                    let aux1 = newArray[next]
                    let aux2 = newArray[j]
                    newArray[next] = aux2
                    newArray[j] = aux1
                }
            }
        }
    }
}
getIndex()
*/