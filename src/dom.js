/* 
todo as form 
form contents to divs 
append to container div

create project with new todo
list contents from project.array
*/

import "./style.css"


import { createTodo, createProject } from "./todo.js"

const body = document.querySelector("body")
const form = document.querySelector(".form")

const container = document.querySelector(".container")
const content = document.querySelector(".content")

const newProjectButton = document.createElement("button")
newProjectButton.textContent = "New Project"

container.prepend(newProjectButton)

let projectName = "Default Project"

const defaultProject = newProj("Default Project")

let currentProject = defaultProject

function saveProject() {
    let savedProject = JSON.stringify(currentProject)
    localStorage.setItem(currentProject.name, savedProject)
}

function getProject() {
    currentProject = JSON.parse(localStorage.getItem(currentProject.name))
    currentProject.addAgain = function (todo) {
        currentProject.array.push(todo)
    }
}


function runDisplay() {
    content.textContent = "";
    if (currentProject == defaultProject) {
        getProject();
    }  
    console.log(currentProject)
    console.log(localStorage)
    if (Object.keys(currentProject).length !== 0) {
        for (let i = 0; i < currentProject.array.length; i++) {
            const fieldBox = document.createElement("div")
            fieldBox.setAttribute("class", "field-box")
            if (currentProject.array[i] != "") {
                for (let key in currentProject.array[i]) {
                    const newField = document.createElement("div")
                    newField.setAttribute("class", "field")
                    newField.textContent = currentProject.array[i][key]
                    fieldBox.append(newField)
                }
            }
            const deleteTodoButton = document.createElement("button")
            deleteTodoButton.textContent = "Delete Todo"
            deleteTodoButton.setAttribute('class', "dtb")
            deleteTodoButton.addEventListener("click", () => {
                currentProject.array.splice(i, 1)
                saveProject()
                runDisplay()
            })
            fieldBox.append(deleteTodoButton)
            content.append(fieldBox)
        }
    }
}

runDisplay()

newProjectButton.addEventListener("click", addProject)

function addProject() {
    projectName = prompt("Enter a name for your project", "Project Name")
    const newProject = newProj(projectName)
    const projectButton = document.createElement("button")
    projectButton.setAttribute("class", "project-button")
    projectButton.textContent = projectName
    container.prepend(projectButton)
    saveProject()
    currentProject = newProject
    projectButton.addEventListener("click", () => {
        currentProject = newProject
        runDisplay()
    })
    runDisplay()
}

function newProj(name) {
    const project = createProject(name)
    return project
}

function newTodo() {
    const formData = new FormData(form);
    const todo = createTodo(formData.get("title"), formData.get("description"), formData.get("date"), formData.get("priority"));
    return todo
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const todo = newTodo()
    form.style.display = "none";
    body.style.backgroundColor = "antiquewhite"
    if (currentProject.hasOwnProperty("addToProject")) {
        currentProject.addToProject(todo)
    } else {
        currentProject.addAgain(todo)
    }
    saveProject()
    runDisplay()
})

const defaultProjectButton = document.createElement("button")
defaultProjectButton.textContent = "Default Project"
defaultProjectButton.addEventListener("click", () => {
    currentProject = defaultProject
    runDisplay()
})

const newTodoButton = document.createElement("button")
newTodoButton.textContent = "New Todo Item"
container.prepend(defaultProjectButton, newTodoButton)
newTodoButton.addEventListener("click", () => {
    form.style.display = "grid"
    body.style.backgroundColor = "lightgray"
    runDisplay()
})


export { form, currentProject, defaultProjectButton, container, content }