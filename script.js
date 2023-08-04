var tasks = [];

function showTextArea() {
  var taskArea = document.getElementById('taskArea');
  taskArea.style.display = 'block';
}

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskList = document.getElementById('taskList');

  if (taskInput.value.trim() !== '') {
    var task = {
      text: taskInput.value,
      dateTime: getCurrentDateTime()
    };

    tasks.push(task);

    var taskCard = document.createElement('div');
    taskCard.classList.add('card', 'task-card');

    var taskCardBody = document.createElement('div');
    taskCardBody.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');

    var taskText = document.createTextNode(task.text);
    var taskDateTime = document.createElement('div');
    taskDateTime.classList.add('small-font');
    taskDateTime.innerText = task.dateTime;

    taskCardBody.appendChild(taskText);
    taskCardBody.appendChild(taskDateTime);

    var removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'remove-button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', function() {
      removeTask(task, taskCard);
    });

    var doingButton = document.createElement('button');
    doingButton.classList.add('btn', 'btn-primary', 'move-button');
    doingButton.innerText = 'Doing';
    doingButton.addEventListener('click', function() {
      moveToDoing(task, taskCard);
    });

    taskCardBody.appendChild(removeButton);
    taskCardBody.appendChild(doingButton);
    taskCard.appendChild(taskCardBody);
    taskList.appendChild(taskCard);

    taskInput.value = '';
    taskArea.style.display = 'none';
  }
}

function removeTask(task, taskCard) {
  var taskList = document.getElementById('taskList');
  var doingList = document.getElementById('doingList');
  var completeList = document.getElementById('completeList');

  if (taskList.contains(taskCard)) {
    taskList.removeChild(taskCard);
  } else if (doingList.contains(taskCard)) {
    doingList.removeChild(taskCard);
  } else if (completeList.contains(taskCard)) {
    completeList.removeChild(taskCard);
  }

  var index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
  }
}

function moveToDoing(task, taskCard) {
  var taskList = document.getElementById('taskList');
  var doingList = document.getElementById('doingList');

  var doingCard = document.createElement('div');
  doingCard.classList.add('card', 'task-card');

  var doingCardBody = document.createElement('div');
  doingCardBody.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');

  var taskText = document.createTextNode(task.text);
  var taskDateTime = document.createElement('div');
  taskDateTime.classList.add('small-font');
  taskDateTime.innerText = task.dateTime;

  doingCardBody.appendChild(taskText);
  doingCardBody.appendChild(taskDateTime);

  var removeButton = document.createElement('button');
  removeButton.classList.add('btn', 'btn-danger', 'remove-button');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', function() {
    removeTask(task, doingCard);
  });

  var completeButton = document.createElement('button');
  completeButton.classList.add('btn', 'btn-success', 'move-button');
  completeButton.innerText = 'Complete';
  completeButton.addEventListener('click', function() {
    moveToComplete(task, doingCard);
  });

  doingCardBody.appendChild(removeButton);
  doingCardBody.appendChild(completeButton);
  doingCard.appendChild(doingCardBody);
  doingList.appendChild(doingCard);

  taskList.removeChild(taskCard);
}

function moveToComplete(task, taskCard) {
  var doingList = document.getElementById('doingList');
  var completeList = document.getElementById('completeList');

  var completeCard = document.createElement('div');
  completeCard.classList.add('card', 'task-card');

  var completeCardBody = document.createElement('div');
  completeCardBody.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center');

  var taskText = document.createTextNode(task.text);
  var taskDateTime = document.createElement('div');
  taskDateTime.classList.add('small-font');
  taskDateTime.innerText = task.dateTime;

  completeCardBody.appendChild(taskText);
  completeCardBody.appendChild(taskDateTime);

  var removeButton = document.createElement('button');
  removeButton.classList.add('btn', 'btn-danger', 'remove-button');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', function() {
    removeTask(task, completeCard);
  });

  completeCardBody.appendChild(removeButton);
  completeCard.appendChild(completeCardBody);
  completeList.appendChild(completeCard);

  doingList.removeChild(taskCard);
}

function getCurrentDateTime() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
