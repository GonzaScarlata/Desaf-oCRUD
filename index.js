const formReminder = document.getElementById('formReminder');
const taskNameInput = document.getElementById('taskName');
const taskTypeInput = document.getElementById('taskType');
const taskDateInput = document.getElementById('taskDate');
const tasksList = document.getElementById('taskList');
const tasks = [];

formReminder.onsubmit = (event) => {
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