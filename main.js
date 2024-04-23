let tasks = [];
let d_tasks = document.querySelector("#tasks");
let newTask = document.querySelector("#task_input > input");

let createTask = () => {
	if (newTask.value === "") {
		alert("Task is empty");
	} else {
		tasks.push(newTask.value);
		refresh();
		localStorage.setItem("data", JSON.stringify(tasks));
		alert("Task created successfully");
	}
};

let refresh = () => {
	d_tasks.innerHTML = "";
	tasks.map((x, y) => {
		console.log(x);
		return (d_tasks.innerHTML += `
			<div id = "${y}" class = "task"><div class = "task_content">${x}</div><a onclick = "deleteTask(this)">DELETE</a></div>`);
	});
};

let deleteTask = (x) => {
	tasks.splice(x, 1);
	localStorage.setItem("data", JSON.stringify(tasks));
	refresh();
};

tasks = JSON.parse(localStorage.getItem("data")) || [];
refresh();
