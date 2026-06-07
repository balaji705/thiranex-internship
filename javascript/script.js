const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

/* Save Tasks */
function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* Render Tasks */
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks =
            tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks =
            tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button class="complete-btn"
                        data-id="${task.id}">
                    ✓
                </button>

                <button class="edit-btn"
                        data-id="${task.id}">
                    Edit
                </button>

                <button class="delete-btn"
                        data-id="${task.id}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

/* CREATE */
todoForm.addEventListener("submit", e => {

    e.preventDefault();

    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

/* EVENT DELEGATION */
taskList.addEventListener("click", e => {

    const id = Number(
        e.target.dataset.id
    );

    /* DELETE */
    if (
        e.target.classList.contains(
            "delete-btn"
        )
    ) {

        tasks = tasks.filter(
            task => task.id !== id
        );

        saveTasks();
        renderTasks();
    }

    /* COMPLETE */
    if (
        e.target.classList.contains(
            "complete-btn"
        )
    ) {

        tasks = tasks.map(task => {

            if (task.id === id) {
                task.completed =
                    !task.completed;
            }

            return task;
        });

        saveTasks();
        renderTasks();
    }

    /* UPDATE */
    if (
        e.target.classList.contains(
            "edit-btn"
        )
    ) {

        const task = tasks.find(
            task => task.id === id
        );

        const updatedText =
            prompt(
                "Edit Task:",
                task.text
            );

        if (
            updatedText &&
            updatedText.trim()
        ) {

            task.text =
                updatedText.trim();

            saveTasks();
            renderTasks();
        }
    }
});

/* FILTERS */

document
.querySelector(".filters")
.addEventListener("click", e => {

    if (
        e.target.dataset.filter
    ) {

        currentFilter =
            e.target.dataset.filter;

        renderTasks();
    }
});

/* INITIAL LOAD */

renderTasks();