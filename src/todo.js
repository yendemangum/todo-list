/*
function to generate todo
function to generate project
*/


function createTodo (title, description, dueDate, priority) {
    return { title, description, dueDate, priority }
}


function createProject () {
    const array = new Array()
    const addToProject = (todo) => array.push(todo)
    return { array, addToProject }
}


export { createTodo, createProject }