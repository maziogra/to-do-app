let tasks = [];
let d_tasks = document.querySelector("#tasks");
let newTask = document.querySelector("#task_input > input");
let saveButton = document.querySelector("#task_input > button");
let cancelButton = document.querySelector("#task_input > button.hidden");
let temp;

let createTask = () => {
  saveButton.textContent = "SAVE";
  cancelButton.classList.add("hidden");
  if (newTask.value === "") {
    alert("Task is empty");
  } else {
    tasks.push(newTask.value);
    newTask.value = "";
    refresh();
    localStorage.setItem("data", JSON.stringify(tasks));
  }
};

let refresh = (x) => {
  d_tasks.innerHTML = "";
  tasks.map((x, y) => {
    console.log(x);
    return (d_tasks.innerHTML += `
			<div id = "${y}" class = "task">
				<div class = "task_content">${x}</div>
				<div class = "options">
					<a onclick = "deleteTask(this)">DELETE</a>
					<a onclick = "modifyTask(this)">MODIFY</a>
				</div>
			</div>`);
  });
};

let deleteTask = (x) => {
  tasks.splice(x.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(tasks));
  x.parentElement.parentElement.remove();
};

let modifyTask = (x) => {
  newTask.value = tasks[x.parentElement.parentElement.id];
  saveButton.textContent = "MODIFY";
  cancelButton.classList.remove("hidden");
  d_tasks.innerHTML = "<h1>CLICK CANCEL TO CONTINUE</h1>";
  temp = tasks[x.parentElement.parentElement.id];
  tasks.splice(x.parentElement.parentElement.id, 1);
};

let cancel = () => {
  saveButton.textContent = "SAVE";
  newTask.value = "";
  cancelButton.classList.add("hidden");
  tasks.push(temp);
  refresh();
};

tasks = JSON.parse(localStorage.getItem("data")) || [];
refresh();
