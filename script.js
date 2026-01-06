const currentUser = localStorage.getItem("currentUser");
let currentFilter = 'all';

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("welcome").textContent = `Bonjour, ${currentUser} 👋`;

let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];

function saveTasks() {
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
}

function setFilter(filter) {
    currentFilter = filter;
    // Mise à jour visuelle des boutons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(filter === 'all' ? 'toutes' : filter === 'active' ? 'cours' : 'termin')) {
            btn.classList.add('active');
        }
    });
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `animate__animated animate__fadeInUp ${task.completed ? "completed" : ""}`;
        
        const realIndex = tasks.indexOf(task);

        li.innerHTML = `
            <div class="task-info" onclick="toggleTask(${realIndex})">
                <span class="task-text">${task.name}</span>
                <div class="task-dates">
                    <small>Créé le: ${task.createdAt}</small>
                    ${task.dueDate ? `<small class="due-date">📅 Échéance: ${task.dueDate}</small>` : ''}
                </div>
            </div>
            <div class="actions">
                <button class="btn-edit" onclick="editTask(${realIndex})">✏️</button>
                <button class="btn-delete" onclick="deleteTask(${realIndex})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const dateInput = document.getElementById("taskDueDate");
    
    if (input.value.trim() === "") return;

    const newTask = {
        name: input.value,
        completed: false,
        createdAt: new Date().toLocaleDateString('fr-FR'),
        dueDate: dateInput.value || null
    };

    tasks.push(newTask);
    input.value = "";
    dateInput.value = "";

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    const li = document.getElementById("taskList").children[index];
    li.classList.replace('animate__fadeInUp', 'animate__fadeOutRight');
    
    setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }, 500);
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