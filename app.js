//Define UI vars
const form = document.querySelector('.task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load Event Listeners
loadEventListeners();

function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
  
};

//Get Task Function
function getTasks(){
  //pull any previous tasks from local storage
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  };
  tasks.forEach(function(task){
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class = "fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
  });
}

//Add Task Function
function addTask(e){
  // makes sure there is a value here
  if(taskInput.value === ''){
    alert('Add a Task!')
  }
  
  //create li Element 
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  //create remove icon link
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);

  //appending li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clearing input
  taskInput.value = '';
  
  e.preventDefault();
};

//Save Task to Local Storage Function
function storeTaskInLocalStorage(task){
  //pull any previous tasks from local storage
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  };

  //push any new tasks to tasks array
  tasks.push(task);

  //save any new tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

//Remove Task Function
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
     //remove from local storage
     removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

//Remove Task from Local Storage Function
function removeFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  };

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

//Clear Tasks Function
function clearTasks(e){
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  };

  clearTasksFromLocalStorage();
};

//Clear Tasks from Local Storage Function
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks Function
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  });
}