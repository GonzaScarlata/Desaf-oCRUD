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
    console.log("formReminder", formReminder);
    formReminder.reset();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('Tasks')) || [];
    const tr = `
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
    `
}
