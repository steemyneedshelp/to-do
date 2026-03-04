// Grab elements
const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");

const themeToggle = document.querySelector(".theme-toggle");

// Data
let tasks = [];
let currentFilter = "all";

// Load
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

// Persistence
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// UI update coordinator
function updateApp() {
  saveTasks();
  renderTasks();
}

// Render UI
function renderTasks() {
  list.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // all
  });

  filteredTasks.forEach(function (task) {
    const index = tasks.indexOf(task);

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    span.textContent = task.text;
    deleteBtn.textContent = "Delete";

    if (task.completed) {
      li.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      updateApp();
    });

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

// Add task
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false,
  });

  input.value = "";
  updateApp();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    // Remove active class from all buttons
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Add active to clicked one
    button.classList.add("active");

    renderTasks();
  });
});

// Initial render
renderTasks();

document.querySelector('[data-filter="all"]').classList.add("active");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});