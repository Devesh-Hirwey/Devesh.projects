const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    
    if (taskText === '') {
        alert("You must write something");
        return; // Prevent further execution if input is empty
    }
    
    const li = document.createElement("li");
    li.textContent = taskText;
    
    const span = document.createElement("span");
    span.textContent = "\u00d7";
    span.classList.add("close"); // Add a class for styling
    
    li.appendChild(span);
    listContainer.appendChild(li);
    
    inputBox.value = ""; // Clear the input box
    saveData();
}

function handleListClick(event) {
    const target = event.target;
    
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    } else if (target.classList.contains("close")) {
        target.parentElement.remove();
        saveData();
    }
}

listContainer.addEventListener("click", handleListClick);

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function saveData() {
localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();