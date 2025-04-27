var btn = document.querySelector(".btn");
var title = document.querySelector(".title");
var description = document.querySelector(".desc");
var list = document.querySelector(".add_list");
var searchBar = document.querySelector(".search");

var todoList = [];
var currentIndex = 0;
var bate5a = false
function displaydata() {
  var cartona = ``;

  for (var i = 0; i < todoList.length; i++) {
    cartona += `<div class="list">
        <span class="list_item">${todoList[i].title}</span>
        <div class="icons">
          <span onclick="check(${i})" class="right images">✅</span>
          <span onclick="edit(${i})" class="update images">✏️</span>
          <span onclick="deletee(${i})" class="delete images">🗑️</span>
        </div>
      </div>`;
  }
  list.innerHTML = cartona;
}
var newId = 0

function add(){
  var titleValue = title.value.trim()
  var descrValue = description.value.trim()

  var titleRegex = /^[A-Z][a-z]{3,8}$/
  var descrRegex = /^.{20,}$/
  if(title.value == "" || description.value == ""){
    alert("please enter both title and description")
    return
  }
  if(!titleRegex.test(titleValue)){
    alert("First letter of the title should be UpperCase and 3-8 Letters LowerCase")
    return
  }
  if(!descrRegex.test(descrValue)){
    alert("Description should be 20 characters or more")
    return
  }
  if(bate5a){
    todoList[currentIndex].title = title.value
    todoList[currentIndex].descr= description.value

    btn.textContent = "Add"
    bate5a = false
    currentIndex = 0
    title.value = ""
    description.value = ""
  }else{
  var task = {
    title: title.value,
    descr: description.value,
    id: newId++
  };
    todoList.push(task);
    title.value = ""
    description.value = ""
  }

  displaydata()
  setLocalStorage()
}
function deletee(i) {
  todoList.splice(i,1)
  displaydata()
  setLocalStorage()
}

function edit(i){
  currentIndex = i
  bate5a = true

  btn.textContent = "Update"
  title.value = todoList[i].title
  description.value = todoList[i].descr
}

function check(i){
  var check = document.querySelectorAll('.list')
  check[i].classList.toggle("checked")
  console.log("hello")
}

function search(){
  var allTasks = document.querySelectorAll('.list')
  var filter = searchBar.value.toLowerCase().trim()

  for(var i=0; i<todoList.length ; i++){
    var taskTitle = todoList[i].title.toLowerCase().trim()
    if(taskTitle.startsWith(filter)){
      allTasks[i].style.display = 'flex'
    }else{
      allTasks[i].style.display = 'none'
    }
    
  }
}
btn.addEventListener("click", add);
function setLocalStorage(){
  localStorage.setItem("todoList",JSON.stringify(todoList))
}

if(localStorage.getItem("todoList") != null){
  todoList = JSON.parse(localStorage.getItem("todoList"))
  newId = todoList[todoList.length-1].id
  displaydata()
}

searchBar.addEventListener('input', search);



