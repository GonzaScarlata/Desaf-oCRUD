const formReminder = document.getElementById('formReminder');
const taskNameInput = document.getElementById('taskName');
const taskTypeInput = document.getElementById('taskType');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDateInput = document.getElementById('taskDate');
const taskTimeInput = document.getElementById('taskTime');
const tasksList = document.getElementById('taskList');
const taskTable = document.getElementById('taskTable');
const taskTypeModalInput = document.getElementById('taskTypeModal');
const taskDescriptionModalInput = document.getElementById('taskDescriptionModal');
const taskDateModalInput = document.getElementById('taskDateModal');
const taskTimeModalInput = document.getElementById('taskTimeModal');
const formEdit = document.getElementById('formEdit');
let editTaskId = '';
const search = document.getElementById('search');
const searchForm = document.getElementById('searchForm');

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

const getModal = (task) => {
    const createdAt = new Date(task.createdAt)
    return `    <!-- Button trigger modal -->
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
                                <p>Tipo de tarea: ${task.taskType}</p>
                                <p>Día a realizar: ${task.taskDate}</p>
                                <p>Horario: ${task.taskTime}</p>
                                <p>Tarea registrada el día: ${createdAt.toLocaleString()}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
}

const loadForm = (taskId) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find((t) => t.id == taskId);
    taskTypeModalInput.value = task.taskType;
    taskDescriptionModalInput.value = task.taskDescription;
    taskDateModalInput.value = task.taskDate;
    taskTimeModalInput.value = task.taskTime;
    editTaskId = taskId;
}

function displayTasks(tasks) {
    
    const rows = [];

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];

        const tr = `
                        <tr class = "w-100">
                            <th scope="row">${index + 1}</th>
                            <td>${task.taskName}</td>
                            <td>${task.taskType}</td>
                            <td>${task.taskDate}</td>
                            <td>${task.taskTime}</td>
                            <td>
                                ${getModal(task)}
                                <!-- Button trigger modal -->
                                <!-- Button trigger modal edit -->
                                <button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editModal" onclick="loadForm('${task.id}')"><i class="far fa-edit"></i></button>
                                <button onclick="deleteTask('${task.id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    `   ;
        rows.push(tr);
    }
    taskTable.innerHTML = rows.join('');
}

function displayAllTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    displayTasks(tasks);
}

displayAllTasks();

function deleteTask(taskId) {
    // Traer la lista de Tareas de localStorage.
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Eliminar un tarea, usando filter() para filtrar el tarea
    // que coincide con el id recibido por parámetros.
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    // Guardar lista de tareas en localStorage.
    const tasksJson = JSON.stringify(filteredTasks);
    localStorage.setItem('tasks', tasksJson);
    // Actualizar la tabla en el html llamando a la función displayTasks(). 
    displayTasks();
}

formEdit.onsubmit = (e) => {
    e.preventDefault()
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskType = taskTypeModalInput.value;
    const taskDate = taskDateModalInput.value;
    const taskTime = taskTimeModalInput.value;
    const taskDescription = taskDescriptionModalInput.value;
    const updatedTasks = tasks.map((t) => {
    
        if (t.id == editTaskId) {
            const task = {
                ... t,
                taskType: taskType,
                taskDate: taskDate,
                taskTime: taskTime,
                taskDescription: taskDescription,
            }
            return task
        } else {
            return t;
        }
    })
    const tasksJson = JSON.stringify(updatedTasks);
    localStorage.setItem('tasks', tasksJson);
    // Actualizar la tabla en el html llamando a la función displayTasks().
    formEdit.reset();
    displayTasks();
    $('#editModal').modal('hide');
}

searchForm.onsubmit = (e) => {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const term = search.value;
    const filteredTasks = tasks.filter(t => (t.taskName.toLowerCase().includes(term.toLowerCase())
     || t.taskType.toLowerCase().includes(term.toLowerCase())
    ))

    displayTasks(filteredTasks);
}