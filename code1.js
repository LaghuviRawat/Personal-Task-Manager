let fact = document.getElementById("fact");
let btn = document.getElementById("generate-btn");

let options = {
method: "GET",
headers: { "x-api-key": apiKey },
};

let url = "https://api.api-ninjas.com/v1/facts";

let generateQuote = () => {
fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
            fact.innerText = data[0].fact;
      });
};

btn.addEventListener("click", generateQuote);
window.addEventListener("load", generateQuote);

// js form validation
function validateForm() {
let isValid = true;

// Clear previous errors
document.getElementById('nameError').textContent = '';
document.getElementById('emailError').textContent = '';
document.getElementById('phoneError').textContent = '';
document.getElementById('dobError').textContent = '';

// Validate name
const name = document.getElementById('name').value;
if (name === '') {
      document.getElementById('nameError').textContent = 'Name is required';
      isValid = false;
}

// Validate email
const email = document.getElementById('email').value;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email address';
      isValid = false;
}

// Validate phone number
const phone = document.getElementById('phone').value;
const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
if (!phonePattern.test(phone)) {
      document.getElementById('phoneError').textContent = 'Invalid phone number format';
      isValid = false;
}

// Validate date of birth
const dob = document.getElementById('dob').value;
if (dob === '') {
      document.getElementById('dobError').textContent = 'Date of birth is required';
      isValid = false;
}

return isValid;
}

// <!-- button for mode -->
let modeBtn = document.querySelector("#mode")
let currMode = "light";
let body = document.querySelector("body")

modeBtn.addEventListener("click", () => {
if (currMode === "light") {
      currMode = "dark";
      body.classList.add("dark");
      body.classList.remove("light");
} else {
      currMode = "light";
      body.classList.add("light");
      body.classList.remove("dark");
}
})

// Task entry
document.addEventListener('DOMContentLoaded', function () {
loadTasks();

document.getElementById('task-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const taskInput = document.getElementById('task');
      const taskText = taskInput.value.trim();

      if (taskText === '') {
            alert('Please add a task');
            return;
      }

      const task = {
            id: Date.now(),
            text: taskText
      };

      saveTask(task);
      displayTask(task, 'todo');
      taskInput.value = '';
});

function saveTask(task) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
            displayTask(task, 'todo');
      });
      toggleDescVisibility();
}

function displayTask(task, status) {
      const descBox = document.createElement('div');
      descBox.className = 'desc';
      descBox.setAttribute('data-status', status);

      const taskList = document.createElement('ul');
      const li = document.createElement('ul');
      li.textContent = task.text;

      taskList.appendChild(li);
      descBox.appendChild(taskList);

      const controlDiv = document.createElement('div');
      controlDiv.className = 'control';
      controlDiv.innerHTML = `
            <div class="left"><</div>
            <div class="edit">&#x270E;</div>
            <div class="bin">&#x1F5D1</div>
            <div class="right">></div>
      `;
      descBox.appendChild(controlDiv);

      document.querySelector(`.${status}`).appendChild(descBox);

      controlDiv.querySelector('.left').addEventListener('click', function () {
            moveTask(descBox, 'left');
      });

      controlDiv.querySelector('.right').addEventListener('click', function () {
            moveTask(descBox, 'right');
      });

      controlDiv.querySelector('.bin').addEventListener('click', function () {
            deleteTask(task.id);
            descBox.remove();
      });
}

function moveTask(descBox, direction) {
      const currentStatus = descBox.getAttribute('data-status');
      let newStatus;

      if (direction === 'left') {
            if (currentStatus === 'inprogress') {
            newStatus = 'todo';
            } else if (currentStatus === 'completed') {
            newStatus = 'inprogress';
            }
      } else if (direction === 'right') {
            if (currentStatus === 'todo') {
            newStatus = 'inprogress';
            } else if (currentStatus === 'inprogress') {
            newStatus = 'completed';
            }
      }

      if (newStatus) {
            document.querySelector(`.${newStatus}`).appendChild(descBox);
            descBox.setAttribute('data-status', newStatus);
      }
}

function deleteTask(taskId) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks = tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(tasks));
}
});

function toggleDescVisibility() {
      const descElements = document.querySelectorAll('.todo .desc, .inprogress .desc');
      descElements.forEach(desc => {
            const ul = desc.querySelector('ul');
            if (ul && ul.children.length > 0) {
                  desc.style.display = 'block';
            } else {
                  desc.style.display = 'none';
            }
      });
      }
