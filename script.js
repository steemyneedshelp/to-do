// Grab elements
const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");

let tasks = [];

const storedTasks = localStorage.getItem("tasks");

if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

//handles persistence onlyy
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//update coordinates changes
function updateApp() {
  saveTasks();
  renderTasks();
}
//render handles ui
function renderTasks() {
  // Clear current list
  list.innerHTML = "";

  // Rebuild from tasks array
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    span.textContent = task.text;
    deleteBtn.textContent = "Delete";

    // Apply completed class if needed
    if (task.completed) {
      li.classList.add("completed");
    }

    // Toggle completed
    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      updateApp();
    });

    // Delete task
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      updateApp();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });

}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  input.value = "";
  updateApp();
});

  renderTasks();