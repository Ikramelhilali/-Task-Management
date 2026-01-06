const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];

function saveTasks() {
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Si aucune tâche
    if (tasks.length === 0) {
        taskList.innerHTML = "<p style='text-align:center; color:gray;'>Aucune tâche pour le moment 👋</p>";
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${index})">${task.name}</span>
            <div class="actions">
                <button class="btn-edit" onclick="editTask(${index})">✏️</button>
                <button class="btn-delete" onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    tasks.push({ name: input.value, completed: false });
    input.value = "";

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function editTask(index) {
    const newName = prompt("Modifier la tâche :", tasks[index].name);
    if (newName !== null && newName.trim() !== "") {
        tasks[index].name = newName.trim();
        saveTasks();
        displayTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

displayTasks();