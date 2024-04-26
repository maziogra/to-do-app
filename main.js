let tasks = [];
let temp;

$(document).ready(() => {
  $("#task_input > button").click(() => {
    createTask();
  });

  $(".clear > .cancel").click(() => {
    clearTasks();
  });

  $("#task_input > button.cancel").click(() => {
    cancel();
  });

  $(document).on("click", "a.delete", (ev) => {
    deleteTask(ev.currentTarget);
  });

  $(document).on("click", "a.modify", (ev) => {
    modifyTask(ev.currentTarget);
  });

  $("#task_input > input").on("keyup", (ev) => {
    const key = ev.key;
    if (key === "Enter") {
      createTask();
    }
  });

  let createTask = () => {
    $("#task_input > button").text("SAVE");
    $("task_input > button.cancel").hide();
    if ($("#task_input > input").val() === "") {
      alert("Task is empty");
    } else {
      tasks.push($("#task_input > input").val());
      $("#task_input > input").val("");
      refresh();
      localStorage.setItem("data", JSON.stringify(tasks));
    }
  };

  let refresh = () => {
    $("#tasks").html("");
    tasks.map((x, y) => {
      return $("#tasks").append(`
			<div id = "${y}" class = "task">
				<div class = "task_content">${x}</div>
				<div class = "options">
					<a class = "delete">DELETE</a>
					<a class = "modify">MODIFY</a>
				</div>
			</div>`);
    });
  };

  let deleteTask = (x) => {
    tasks.splice(x.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(tasks));
    refresh();
  };

  let modifyTask = (x) => {
    $("#task_input > input").val(tasks[x.parentElement.parentElement.id]);
    $("#task_input > button").text("MODIFY");
    $("task_input > button.cancel").show();
    $("#tasks").html("<h1>CLICK CANCEL TO CONTINUE</h1>");
    temp = tasks[x.parentElement.parentElement.id];
    tasks.splice(x.parentElement.parentElement.id, 1);
  };

  let cancel = () => {
    $("#task_input > button").text("SAVE");
    $("#task_input > input").val("");
    $("#task_input > button.cancel").hide();
    tasks.push(temp);
    refresh();
  };

  let clearTasks = () => {
    let check = prompt("Type YES to confirm");
    if (check === "YES") {
      tasks = [];
      localStorage.setItem("data", JSON.stringify(tasks));
      refresh();
    }
  };

  tasks = JSON.parse(localStorage.getItem("data")) || [];
  refresh();
});
