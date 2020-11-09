const formReminder = document.getElementById('formReminder');
const taskNameInput = document.getElementById('taskName');
const taskTypeInput = document.getElementById('taskType');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDateInput = document.getElementById('taskDate');
const taskTimeInput = document.getElementById('taskTime');
const tasksList = document.getElementById('taskList');
const taskTable = document.getElementById('taskTable');

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formReminder.onsubmit = (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    event.preventDefault();
    const taskName = taskNameInput.value;
    const taskType = taskTypeInput.value;
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;
    const taskDescription = taskDescriptionInput.value;

    tasks.push({
        taskName: taskName,
        taskType: taskType,
        taskDate: taskDate,
        taskTime: taskTime,
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
                            <td>${task.taskTime}</td>
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
                                                <h5 class="modal-title" id="exampleModalLabel">Tarea (${task.taskName})</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Descripción: ${task.taskDescription}</p>
                                                <p>Día a realizar: ${task.taskDate}</p>
                                                <p>Horario: ${task.taskTime}</p>
                                                <p>Tipo de tarea: ${task.taskType}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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

