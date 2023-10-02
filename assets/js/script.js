const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
 
function addTask() {
    if (inputBox.value === '') {
        alert("Write the task first!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
    }
    inputBox.value = '';
}
