const form = document.getElementById('form')
const task = document.getElementById('task')
const IDB = indexedDB

if(IDB && form){
    let db

    const request = IDB.open('DataBase', 1)

    request.onsuccess = () =>{
        db = request.result
        readData()
    }

    request.onupgradeneeded = (e) =>{
        db = e.target.result
        const objectStore = db.createObjectStore('Tasks', {
            keyPath: 'toBuy'
        })
    }

    const addData = (data) =>{
        const transaction = db.transaction(['Tasks'], 'readwrite')
        const objectStore = transaction.objectStore('Tasks')
        const request = objectStore.add(data)
        readData()
    }

    const getData = (key) =>{
        const transaction = db.transaction(['Tasks'], 'readwrite')
        const objectStore = transaction.objectStore('Tasks')
        const request = objectStore.get(key)

        request.onsuccess = (e) =>{
            form.buy.value = request.result.toBuy
            form.price.value = request.result.price
            form.priority.value = request.result.priority
            form.button.dataset.action = 'update'
            form.button.textContent = 'Update Task'
        }
    }

    const updateData = (data) => {
        const transaction = db.transaction(['Tasks'], 'readwrite')
        const objectStore = transaction.objectStore('Tasks')
        const request = objectStore.put(data)
        request.onsuccess = () => {
            form.button.dataset.action = 'add'
            form.button.textContent = 'Add Task'
            readData()
        }
    }

    const deleteData = (key) =>{
        const transaction = db.transaction(['Tasks'], 'readwrite')
        const objectStore = transaction.objectStore('Tasks')
        const request = objectStore.delete(key)
        request.onsuccess = () =>{
            readData()
        }
    }

    const readData = () =>{
        const transaction = db.transaction(['Tasks'], 'readonly')
        const objectStore = transaction.objectStore('Tasks')
        const request = objectStore.openCursor()
        const fragment = document.createDocumentFragment()

        request.onsuccess = (e) =>{
            const cursor = e.target.result
            if(cursor){
                const taskToBuy = document.createElement('p')
                taskToBuy.textContent = cursor.value.toBuy
                fragment.appendChild(taskToBuy)

                const taskPrice = document.createElement('p')
                taskPrice.textContent = cursor.value.price
                fragment.appendChild(taskPrice)

                const taskPriority = document.createElement('p')
                taskPriority.textContent = cursor.value.priority
                fragment.appendChild(taskPriority)

                const buttonUpdate = document.createElement('button')
                buttonUpdate.textContent = 'Update'
                buttonUpdate.dataset.type = 'update'
                buttonUpdate.dataset.key = cursor.key
                buttonUpdate.classList.add('btn--task')
                fragment.appendChild(buttonUpdate)
                
                const buttonDelete = document.createElement('button')
                buttonDelete.textContent = 'Delete'
                buttonDelete.dataset.type = 'delete'
                buttonDelete.dataset.key = cursor.key
                buttonDelete.classList.add('btn--task')
                fragment.appendChild(buttonDelete)

                cursor.continue()
            } else {
                task.textContent = ''
                task.appendChild(fragment)
            }
        }
    }

    form.addEventListener('submit', (e) =>{
        e.preventDefault()

        const data = {
            toBuy: form.buy.value,
            price: form.price.value,
            priority: form.priority.value
        }

        if (e.target.button.dataset.action == 'add') {
            addData(data)
        } else if (e.target.button.dataset.action == 'update') {
            updateData(data)
        }

        form.reset()
    })

    task.addEventListener('click', (e) => {
        if (e.target.dataset.type == 'update') {
            getData(e.target.dataset.key)
        } else if (e.target.dataset.type == 'delete') {
            deleteData(e.target.dataset.key)
        }
    })
}