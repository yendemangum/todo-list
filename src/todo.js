/*
function to generate todo
function to generate project
*/

const Todo = function (title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
}

function createTodo (title, description, dueDate, priority) {
    return { title, description, dueDate, priority}
}

const Project = function (name, todo) {
    this.name = name
    this.project = new Array()
    this.project.push(todo)
}

function createProject (name, todo) {
    return { name, todo }
}

export { createTodo, createProject, Project }