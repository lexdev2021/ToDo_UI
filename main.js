const inputTask = document.getElementById('input');
const sendTask = document.getElementById('button');
const outputBlock = document.querySelector('.output-block');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

updateData();

sendTask.addEventListener('click', function() {
  if(inputTask.value) {
    tasks.push(new Task(inputTask.value));
    updateData();
    inputTask.value = '';
  }
})

function Task(description) {
  this.description = description;
  this.completed = false;
}

function updateData() {
  updateLocalStorage();
  fillHtmlList();
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function fillHtmlList() {
  outputBlock.innerHTML = '';
  if(tasks.length) {
    filterTasks();
    tasks.forEach((el, i) => {
      outputBlock.innerHTML += createTemplate(el, i);
    }) 
  }
}

function createTemplate(task, index) {
  return `
    <div class="output-item ${task.completed ? 'checked' : ''}">
      <div class="description">${task.description}</div>
      <div class="buttons">
        <input class="btn-complete" onclick="taskComplete(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>
        <button class="btn-delete"  onclick="taskDelete(${index})">Delete</button>
      </div>
    </div>
  `
}

function taskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateData();
}

function taskDelete(index) {
  tasks.splice(index, 1);
  updateData();
}

function filterTasks() {
  const activeTasks = tasks.length && tasks.filter(el => el.completed === false);
  const completeTasks = tasks.length && tasks.filter(el => el.completed === true);
  tasks = [...activeTasks, ...completeTasks];
}




