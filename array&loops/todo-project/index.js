const todoItems = getTodosFromLocalStorage();

displayTodo();

function addTodo() {
    const todoContainer = document.getElementById("todo-container");
    const todoInput = document.getElementById("todo-input")
    const todoDueDate = document.getElementById("todo-dueDate-input");

    const newItem = {id: generateRandomId(), todoItemName: todoInput.value, dueDate: todoDueDate.value};
    todoContainer.appendChild(
        generateDivForTodo(newItem));

    todoItems.push(newItem);
    updateLocalStorage();
    todoInput.value = ""
}

function displayTodo() {
    const todoContainer = document.getElementById("todo-container");
    todoItems.forEach(value => todoContainer.appendChild(generateDivForTodo(value)))
}


function generateDivForTodo({id, todoItemName, dueDate}) {
    const todoDiv = document.createElement('div');
    todoDiv.className = "todo"
    todoDiv.id = id;
    const todoItemNameElement = document.createElement('span');
    const todoItemDueDateElement = document.createElement('span');
    todoItemNameElement.innerText = todoItemName;
    todoItemDueDateElement.innerText = dueDate;
    const todoDeleteActionElement = document.createElement('button');
    todoDeleteActionElement.innerText = "DELETE"
    todoDeleteActionElement.addEventListener('click', (event) => removeTodo(id, event), false);
    todoDiv.appendChild(todoItemNameElement);
    todoDiv.appendChild(todoItemDueDateElement);
    todoDiv.appendChild(todoDeleteActionElement);
    return todoDiv;

}

function generateRandomId() {
    return `todo_${new Date().getTime()}`;
}

function removeTodo(id) {
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id === id) {
            todoItems.splice(i, 1);
            document.getElementById(id).remove();
            updateLocalStorage();
        }
    }
}

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todos") || '[]')
}

function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todoItems));
}

