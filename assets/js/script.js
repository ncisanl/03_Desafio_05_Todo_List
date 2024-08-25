const tasksList = document.querySelector("#tasks");
const tasksInput = document.querySelector("#input-add");
const tasksButton = document.querySelector("#button-add");

const tasks = [
  { idTask: 1, descriptionTask: "Hacer mercado", completedTask: false },
  {
    idTask: 2,
    descriptionTask: "Estudiar para la prueba",
    completedTask: false,
  },
  {
    idTask: 3,
    descriptionTask: "Sacar a pasear a Tobby",
    completedTask: false,
  },
];

renderTasks();

tasksButton.addEventListener("click", () => {
  let idTaskTemp;
  if (tasks.length === 0) {
    idTaskTemp = 1;
  } else {
    idTaskTemp = tasks[tasks.length - 1].idTask + 1;
  }
  const newTask = {
    idTask: idTaskTemp,
    descriptionTask: tasksInput.value,
    completedTask: false,
  };
  if (newTask.descriptionTask !== "") {
    tasks.push(newTask);
    tasksInput.value = "";
    renderTasks();
  }
});

function renderTasks() {
  let html = "";
  for (const task of tasks) {
    html += `
<tr>
<td>${task.idTask}</td>
<td>${task.descriptionTask}</td>
<td><div class="form-check">
<input class="form-check-input" type="checkbox" value="" ${task.completedTask ? "checked" : ""} onclick="completedTask(${task.idTask})" />
</div></td>
<td><button onclick="renderDeleteTask(${task.idTask})" class="border-0 btn-cancel-personalized">
<i class="fa-solid fa-xmark fa-lg" style="color: #c53524;"></i>
</button></td>
</tr>
`;
  }
  tasksList.innerHTML = html;
  renderCountTask();
  renderCountCompletedTask();
}

function renderDeleteTask(id) {
  const index = tasks.findIndex((e) => e.idTask === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function renderCountTask() {
  let totalTaskCount = document.querySelector("#totalTasksId");
  totalTaskCount.innerHTML = tasks.length.toString();
}

function renderCountCompletedTask() {
  let totalCompletedTaskCount = document.querySelector("#completedTasksId");
  const filterIncompleteTask = tasks.filter((x) => x.completedTask === true);
  totalCompletedTaskCount.innerHTML = filterIncompleteTask.length.toString();
}

function completedTask(id) {
  for (const task of tasks) {
    if (task.idTask === id) {
      task.completedTask = !task.completedTask;
    }
  }
  renderCountCompletedTask();
}
