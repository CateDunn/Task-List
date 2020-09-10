//Define UI vars
const form = document.querySelector('.task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load Event Listeners
loadEventListeners();

function loadEventListeners(){
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask)
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

  //clearing input
  taskInput.value = '';
  
  e.preventDefault();
}

//Remove Task Function
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    }
  }
};