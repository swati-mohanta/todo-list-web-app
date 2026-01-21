// Global function: safe to use anywhere
function hideBanner() {
  const banner = document.getElementById("landingBanner");
  if (banner) banner.style.display = "none";
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let taskInput, taskCategory, taskList, filterCategory;

// Run task-related code only if on the tasks page
document.addEventListener("DOMContentLoaded", () => {
  taskInput = document.getElementById('task-input');
  taskCategory = document.getElementById('task-category');
  taskList = document.getElementById('task-list');
  filterCategory = document.getElementById('filterCategory');

  if (taskInput && taskCategory && taskList && filterCategory) {
    renderTasks();
  }
});

function renderTasks(filter = 'All') {
  taskList.innerHTML = '';
  const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.category === filter);

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const categoryBadge = document.createElement('span');
    categoryBadge.className = `category-badge category-${task.category}`;
    categoryBadge.textContent = task.category;

    const btnContainer = document.createElement('div');
    btnContainer.className = 'task-buttons';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    if(!task.completed) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Done';
      completeBtn.onclick = () => toggleComplete(index);
      btnContainer.appendChild(completeBtn);
    }

    btnContainer.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(categoryBadge);
    li.appendChild(btnContainer);

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks(filterCategory.value);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(filterCategory.value);
}

window.addTask = function () {
  const text = taskInput.value.trim();
  const category = taskCategory.value;

  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  tasks.push({ text, category, completed: false });
  saveTasks();
  renderTasks(filterCategory.value);

  taskInput.value = '';
  taskCategory.value = 'General';
};

window.filterTasks = function () {
  renderTasks(filterCategory.value);
};

window.searchTasks = function () {
  const query = document.getElementById('searchInput')?.value.toLowerCase();
  if (!query) {
    renderTasks(filterCategory?.value || 'All');
    return;
  }

  const filtered = tasks.filter(task =>
    task.text.toLowerCase().includes(query) &&
    (filterCategory?.value === 'All' || task.category === filterCategory?.value)
  );

  taskList.innerHTML = '';
  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const categoryBadge = document.createElement('span');
    categoryBadge.className = `category-badge category-${task.category}`;
    categoryBadge.textContent = task.category;

    const btnContainer = document.createElement('div');
    btnContainer.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Done';
    completeBtn.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(categoryBadge);
    li.appendChild(btnContainer);

    taskList.appendChild(li);
  });
};