//ACCESO AL INDEXEDDB
const IDB = indexedDB
const form = document.getElementById('form')
const task = document.getElementById('task')

if(IDB && form){
    let db
    const request = IDB.open('MyDataBase', 1)

    //Mètodos Asìcronos de la API

    //Solo se ejecuta cuando se abre la base de datos por primera vez
    request.onsuccess = () => {
        db = request.result
        readData()
    }

    //En caso de no estar creada la base de datos este es el mètodo que la crea
    request.onupgradeneeded = (e) => {
        db = e.target.result
        const objectStore = db.createObjectStore('tasks', {
            keyPath: 'taskTitle'
        })
    }

    request.onerror = (error) =>{
        console.log(error);
    }

    const addData = (data) => {
        const transaction = db.transaction(['tasks'], 'readwrite')
        const objectStore = transaction.objectStore('tasks')
        const request = objectStore.add(data)
        readData()
    }

    const getData = (key) => {
        const transaction = db.transaction(['tasks'], 'readwrite')
        const objectStore = transaction.objectStore('tasks')
        const request = objectStore.get(key)

        request.onsuccess = (e) => {
            console.log(request);
            form.task.value = request.result.taskTitle
            form.priority.value = request.result.taskPriority
        }
    }

    const readData = () => {
        const transaction = db.transaction(['tasks'], 'readonly')
        const objectStore = transaction.objectStore('tasks')
        const request = objectStore.openCursor()
        const fragment = document.createDocumentFragment()

        request.onsuccess = (e) => {
            const cursor = e.target.result
            if (cursor) {

                const taskTitle = document.createElement('P')
                taskTitle.textContent = cursor.value.taskTitle
                fragment.appendChild(taskTitle)

                const taskPriority = document.createElement('P')
                taskPriority.textContent = cursor.value.taskPriority
                fragment.appendChild(taskPriority)

                const taskUpdate = document.createElement('BUTTON')
                taskUpdate.dataset.type = 'update'
                taskUpdate.dataset.key = cursor.key
                taskUpdate.textContent = 'Update'
                fragment.appendChild(taskUpdate)

                const taskDelete = document.createElement('BUTTON')
                taskDelete.textContent = 'Delete'
                fragment.appendChild(taskDelete)

                cursor.continue()
            } else {
                task.textContent = ''
                task.appendChild(fragment)
            }
        }
    }

    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        e.preventDefault()
        const data = {
            taskTitle: e.target.task.value,
            taskPriority: e.target.priority.value
        }
        getData('Queen')
        addData(data)
    })
}