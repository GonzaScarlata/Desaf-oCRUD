const formReminder = document.getElementById('formReminder');
const taskNameInput = document.getElementById('taskName');
const taskTypeInput = document.getElementById('taskType');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDateInput = document.getElementById('taskDate');
const tasksList = document.getElementById('taskList');
const taskTable = document.getElementById('taskTable');
console.log("taskTable", taskTable)

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formReminder.onsubmit = (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    event.preventDefault();
    const taskName = taskNameInput.value;
    const taskType = taskTypeInput.value;
    const taskDate = taskDateInput.value;
    const taskDescription = taskDescriptionInput.value;

    tasks.push({
        taskName: taskName,
        taskType: taskType,
        taskDate: taskDate,
        taskDescription: taskDescription,
        id: generateId(),
        createdAt: Date.now(),
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
            <td>${task.taskDescription}</td>
            <td>${task.taskDate}</td>
            <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal${task.id}">
                Mostrar
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="modal${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        `   ;
        rows.push(tr);
    }
    taskTable.innerHTML = rows.join('');
}

