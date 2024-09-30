const taskForm = document.querySelector(".task-form"); // Selecciona el primer elemento con la clase "task-form"
const taskList = document.querySelector(".task-list"); // Selecciona la lista de tareas

loadTask();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del formulario

  const taskInput = document.querySelector(".task-input"); // Selecciona el campo de entrada
  const task = taskInput.value; // Obtiene el valor del campo de entrada

  console.log(task); // Muestra la tarea en la consola

  if (task) {
    taskList.append(createTaskElement(task)); // Añade la nueva tarea a la lista
    storeTaskInLocalStorage(task);
    taskInput.value = ""; // Limpia el campo de entrada
  } else {
    alert("Please enter a task."); // Mensaje si el input está vacío
  }
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-item"; // Añade la clase para mantener los estilos
  li.textContent = task; // Establece el contenido del nuevo <li>

  const optionContainer = document.createElement("div");
  optionContainer.className = "option-task"; // Añade clase al contenedor de opciones

  // Crea los botones y los añade al contenedor
  optionContainer.append(
    createButton("Edit", "edit-btn"),
    createButton("Delete", "delete-btn")
  );

  li.appendChild(optionContainer); // Añade el contenedor de opciones al <li>

  // Añadir un event listener para el contenedor de opciones
  optionContainer.addEventListener("click", (event) => {
    const target = event.target; // Obtiene el elemento que activó el evento
    if (target.classList.contains("delete-btn")) {
      if (confirm("Are you sure to delete this element?")) {
        taskList.removeChild(li); // Elimina el <li> de la lista
      }
    } else if (target.classList.contains("edit-btn")) {
      const newTask = prompt("Edit your task:", task); // Muestra un prompt para editar la tarea
      if (newTask) {
        li.firstChild.textContent = newTask; // Actualiza el contenido del <li>
        updateLocalStorage();
      }
    }
  });

  return li; // Retorna el nuevo <li>
}

function createButton(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text; // Establece el texto del botón
  btn.className = className; // Añade la clase al botón
  return btn; // Retorna el botón creado
}

function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("task") || "[]");

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(
    (li) => li.firstChild.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const themeToggleButton = document.querySelector(".toggle-button");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const theme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";

  localStorage.setItem("theme", theme);
});

if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}
