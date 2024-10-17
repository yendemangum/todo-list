/* 
todo as form 
form contents to divs 
append to container div

create project with new todo
list contents from project.array
*/

import { createTodo, createProject, Project } from "./todo.js"

const body = document.querySelector("body")
const form = document.querySelector(".form")

const container = document.querySelector(".container")
const content = document.querySelector(".content")

const newProjectButton = document.createElement("button")
newProjectButton.textContent = "New Project"

container.prepend(newProjectButton)

const defaultProject = newProj()


let currentProject = defaultProject

function runDisplay() {
    content.textContent = ""
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
                runDisplay()
            })
            fieldBox.append(deleteTodoButton)
            content.append(fieldBox)
        }
    }
    console.log(currentProject.array)
}

runDisplay()
newProjectButton.addEventListener("click", addProject)

function addProject() {

    const projectName = prompt("Enter a name for your project", "Project Name")
    const newProject = newProj()

    const projectButton = document.createElement("button")
    projectButton.setAttribute("class", "project-button")
    projectButton.textContent = projectName
    container.prepend(projectButton)

    projectButton.addEventListener("click", () => {
        currentProject = newProject
        runDisplay()
    })
    runDisplay()
}


function newProj() {

    const project = createProject()
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

    currentProject.addToProject(todo)

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