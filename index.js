const todoWrite = document.querySelector(".todo-write");
const todoAddBtn = document.querySelector(".todo-add");
const todolist = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-selector");

todoAddBtn.addEventListener("click", addToList);
todolist.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterItems);
document.addEventListener("DOMContentLoaded", getLocalItems);

function addToList(e) {
  //   console.log(e);
  const item = todoWrite.value;
  const divItem = document.createElement("div");
  divItem.classList.add("todo-items");
  const newItem = `
  <li class="text-item">${item}</li>
  <span class="todo-icon todo-check"><i class="fa-solid fa-square-check"></i></span>
  <span class="todo-icon todo-delete"><i class="fa-solid fa-trash-can"></i></span>
</div>`;
  divItem.innerHTML = newItem;
  todolist.appendChild(divItem);
  savedLocalItems(item);
  todoWrite.value = "";
}

function checkRemove(e) {
    // console.log(e.target.parentElement.parentElement);
  const parentItem = e.target.parentElement.parentElement;
    // console.log(parentItem);
  const classes = [...e.target.classList];
  //   console.log(classes);
  if (classes[1] === "fa-trash-can") {
    filterLocalItem(parentItem);
    parentItem.remove();
  } else if (classes[1] === "fa-square-check") {
    parentItem.classList.toggle("completed");
  }
}

function filterItems(e) {
  console.log(e.target.value);
  //   console.log(todolist.children);
  const arrayItem = [...todolist.children];
  arrayItem.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

function savedLocalItems(item) {
  let savedItem = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  savedItem.push(item);
  localStorage.setItem("items", JSON.stringify(savedItem));
}

function getLocalItems() {
  let savedItem = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  savedItem.forEach((item) => {
    const divItem = document.createElement("div");
    divItem.classList.add("todo-items");
    const newItem = `
  <li class="text-item">${item}</li>
  <span class="todo-icon todo-check"><i class="fa-solid fa-square-check"></i></span>
  <span class="todo-icon todo-delete"><i class="fa-solid fa-trash-can"></i></span>
</div>`;
    divItem.innerHTML = newItem;
    todolist.appendChild(divItem);
  });
}

function filterLocalItem(parentItem){
  let itemRemoved=parentItem.children[0].textContent;
  console.log(itemRemoved);
  let savedItem = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
//   console.log(savedItem);
  const filter = savedItem.filter((t)=> t!==itemRemoved);
  localStorage.setItem("items",JSON.stringify(filter));
//   console.log(filter);
}
