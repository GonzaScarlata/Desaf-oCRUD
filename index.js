const formReminder = document.getElementById('formReminder');
const taskNameInput = document.getElementById('taskName');
const taskTypeInput = document.getElementById('taskType');
const taskDateInput = document.getElementById('taskDate');
const tasksList = document.getElementById('taskList');
const taskTable = document.getElementById('taskTable');
console.log("taskTable", taskTable)

formReminder.onsubmit = (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    event.preventDefault();
    const taskName = taskNameInput.value;
    const taskType = taskTypeInput.value;
    const taskDate = taskDateInput.value;


    tasks.push({
        taskName: taskName,
        taskType: taskType,
        taskDate: taskDate,
    })
    const tasksJson = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJson);
    formReminder.reset();
    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const rows = [];

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];

     const tr = `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${task.taskName}</td>
            <td>${task.taskType}</td>
            <td>@${task.taskDate}</td>
        </tr>
        `   ; 
        rows.push(tr);
    }
    taskTable.innerHTML = rows.join('');
    console.log("displayTasks ->  rows.join('')",  rows.join(''))
}

