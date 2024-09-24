const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const toggleThemeBtn = document.getElementById('toggleTheme');
const searchInput = document.getElementById('searchInput');
const taskFilter = document.getElementById('taskFilter');

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskAction);
toggleThemeBtn.addEventListener('click', toggleTheme);
searchInput.addEventListener('input', filterTasks);
taskFilter.addEventListener('change', filterTasksBySelection);


let tasks = [];

function addTask() {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;

    if (taskText === '') return;
    if (dueDate === ''){
        alert("add due date");
        return;
    }

    const task = { text: taskText, dueDate: dueDate || "mm/dd/yy", completed: false };
    tasks.push(task);
    renderTasks();
    
    taskInput.value = '';
    dueDateInput.value = '';
}

function renderTasks() {
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task">${task.text} (${task.dueDate})</span>
            <button class="completeBtn">✔</button>
            <button class="deleteBtn">Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.setAttribute('data-id', index);
        taskList.appendChild(li);
    });
}


function handleTaskAction(event) {
    const target = event.target;
    const taskIndex = target.parentElement.getAttribute('data-id'); 

    if (target.classList.contains('deleteBtn')) {
        tasks.splice(taskIndex, 1);
        renderTasks();
    } else if (target.classList.contains('completeBtn')) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
}


function toggleTheme() {
    document.body.classList.toggle('night-mode');
}

function filterTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm) ||
        task.dueDate.includes(searchTerm)
    );

    taskList.innerHTML = ''; 
    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task">${task.text} (${task.dueDate})</span>
            <button class="completeBtn">✔</button>
            <button class="deleteBtn">Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.setAttribute('data-id', tasks.indexOf(task)); 
        taskList.appendChild(li);
    });
}



function filterTasksBySelection() {
    const filterValue = taskFilter.value;

    if (filterValue === 'all') {
        renderTasks();
    } else if (filterValue === 'completed') {
        const completedTasks = tasks.filter(task => task.completed);
        renderFilteredTasks(completedTasks);
    } else if (filterValue === 'incomplete') {
        const incompleteTasks = tasks.filter(task => !task.completed);
        renderFilteredTasks(incompleteTasks);
    }
}


function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = ''; 
    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task">${task.text} (${task.dueDate})</span>
            <button class="completeBtn">✔</button>
            <button class="deleteBtn">Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.setAttribute('data-id', tasks.indexOf(task)); 
        taskList.appendChild(li);
    });
}

