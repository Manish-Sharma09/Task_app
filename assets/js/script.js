    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const addButton = document.getElementById("add-button");

    // Load tasks from localStorage when the page loads
    window.addEventListener("load", loadTasks);

    addButton.addEventListener("click", addTask);

    function addTask() {
        if (inputBox.value === '') {
            alert("Write the task first!");
        } else {
            let li = document.createElement("li");
            li.textContent = inputBox.value;

            // Add a click event listener to toggle the "checked" class
            li.addEventListener("click", toggleTask);

            // Add a delete button (×) to each task
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            span.className = "delete-button";
            span.addEventListener("click", deleteTask);

            li.appendChild(span);
            listContainer.appendChild(li);

            // Save tasks to localStorage
            saveTasks();
        }
        inputBox.value = '';
    }

    // Function to toggle the "checked" class on tasks
    function toggleTask(event) {
        const task = event.target;
        task.classList.toggle("checked");
        
        // Save tasks to localStorage after a task is checked/unchecked
        saveTasks();
    }

    // Function to delete a task
    function deleteTask(event) {
        const task = event.target.parentElement;

        // Check if the task has the "checked" class before deleting
        if (task.classList.contains("checked")) {
            listContainer.removeChild(task);
            
            // Save tasks to localStorage after a task is deleted
            saveTasks();
        }
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(listContainer.children).map(task => {
            return {
                text: task.textContent,
                checked: task.classList.contains("checked")
            };
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(taskData => {
                let li = document.createElement("li");
                li.textContent = taskData.text;

                if (taskData.checked) {
                    li.classList.add("checked");
                }
                
                li.addEventListener("click", toggleTask);
                
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                span.className = "delete-button";
                span.addEventListener("click", deleteTask);

                li.appendChild(span);
                listContainer.appendChild(li);
            });
        }
    }
