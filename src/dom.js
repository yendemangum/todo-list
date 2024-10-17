/* 
todo as form 
form contents to divs 
append to container div
*/

import { createTodo, createProject } from "./todo.js"

const body = document.querySelector("body")
const form = document.querySelector(".form")

const container = document.querySelector(".container")
const content = document.querySelector(".content")

const newProjectButton = document.createElement("button")
newProjectButton.textContent = "New Project"

container.prepend(newProjectButton)

const defaultProject = document.createElement("div")
defaultProject.setAttribute("class", "project")


let currentProject = defaultProject
function runDisplay() {
    content.textContent = ""
    if (currentProject.firstChild) {
    for (let i = 0; i < currentProject.childNodes.length; i++) {
        if (currentProject.childNodes[i].textContent !== "") {
        const newField = document.createElement("div")
        newField.setAttribute("class", "field")
        newField.textContent = currentProject.childNodes[i].textContent
        content.append(newField)}
    }
    }
}

runDisplay()
newProjectButton.addEventListener("click", addProject)

function addProject() {
    content.append(currentProject)
    const projectName = prompt("Enter a name for your project", "Project Name")
    const newProject = document.createElement("div")
    newProject.setAttribute("class", "project")
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


form.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(form);
    const todo = createTodo(formData.get("title"), formData.get("description"), formData.get("date"), formData.get("priority"));

    const field1 = document.createElement("div")
    field1.setAttribute("class", "field")
    field1.textContent = todo.title
    const field2 = document.createElement("div")
    field2.setAttribute("class", "field")
    field2.textContent = todo.description
    const field3 = document.createElement("div")
    field3.setAttribute("class", "field")
    field3.textContent = todo.dueDate
    const field4 = document.createElement("div")
    field4.setAttribute("class", "field")
    field4.textContent = todo.priority + " priority"

    form.style.display = "none";
    body.style.backgroundColor = "antiquewhite"

    currentProject.append(field1, field2, field3, field4)
    console.log(currentProject)
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