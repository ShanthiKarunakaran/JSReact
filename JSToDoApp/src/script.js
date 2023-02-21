


let today =  new Date()
let date = today.toDateString().split(' ')
let time = today.toLocaleTimeString()

console.log(today.toDateString())

let dateElement = document.getElementById('date_text');
let timeElement = document.getElementById('time_text');

dateElement.innerHTML = `${date[0]} ${date[2]}`
timeElement.textContent = time

const apiURL = 'https://uptight-teal-walrus.cyclic.app/task'




const  fetchPromise = fetch(apiURL)
//console.log("fetchPromise", fetchPromise)
fetchPromise.then((response) => {
  const jsonResponse = response.json()
  jsonResponse.then((data) => {
    console.log(data[0])
  })
  
})



const createTask = (task) => {
  let taskJSON = JSON.stringify(task)
  //console.log("taskJSON", taskJSON)

  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: taskJSON
  }
  fetch(apiURL, requestOptions)
  .then(res => res)
  //.then(res => res.json()) //the .json method parses the JSON response into a JS Object literal
  .then(data => getTask())
  .catch(err => console.error(err))
}


let task_form = document.getElementById('task_form')
task_form.addEventListener('submit', (event) => {
  event.preventDefault()

  let newTask = {
    name: event.target.task.value,
    date: today.toDateString(),
    isCompleted: false
  }
  createTask(newTask)
  event.target.task.value = ''
 
})





//get a task

const getTask = () => {
 
  fetch(apiURL)
  .then(res => res.json())
  .then(res => {
      //console.log("data", res)

      let task_container = document.getElementById('task_container')

      res.map((item)=>{
        let task_li = document.createElement("li")
        //task_li.id = 'task_div'
        task_li.id = `${item._id}`
        task_li.classList.add("todo", "stack-small")
        task_li.innerHTML = `<div class="todo_labels"><p>${item.name}</p><p>${item.date}</p></div> <div class="btn_group">
        <input type="checkbox" name=${item.name} isCompleted=${item.isCompleted}
        dataId=${item._id} id="taskCheckBox" date=${item.date} class="cbox">
        <img src="../assets/Vector.jpg" alt="" id="img_del" onclick='handleDeleteClick("${item._id}")' />
      </div>`
    
    


      task_container.append(task_li)

    
        //editTask()
     /*let img = document.getElementById("img_del")
      img.addEventListener('click',()=>{
        callDelete(item._id)
      })*/

      })
  })
  
}

getTask()


const handleDeleteClick = (id) => {
  console.log("id is", id)
  const apiURL = 'https://uptight-teal-walrus.cyclic.app/task'
  
  const requestOptions = {
      method: 'DELETE'
  }

  
  console.log("id after parsing is", `${apiURL}/${id}`)
  //fetch(apiURL/id, requestOptions)
  fetch(`${apiURL}/${id}`, requestOptions)
  //fetch("https://uptight-teal-walrus.cyclic.app/task/63f42098bbc1f757e377870e", requestOptions)
          //.then(res => res.json())
          //.then(res => res)
          //.then(data => getTask())
          .then(data => console.log("delete data", data))
          .catch(err => console.error(err))   

  let task_container = document.getElementById('task_container')
  let task_div = document.getElementById(`${id}`)
  task_container.removeChild(task_div)
}

/*const editTask = (id, newData) => {
  let checkbox = document.getElementById("taskCheckBox")
  checkbox.addEventListener('change', function(){
      if(this.checked) {
        this.checked = !this.checked
      }
      console.log("this.checked",  this.checked)
  })
}*/



//when you click add button
  //add a new task with the input text value

//array to store all the tasks
/*const todoListItems = [];

function addTask(taskVal) {
  console.log("am i heree")
  const taskObj = {
    taskVal,
    checked: false,
    taskId: Date.now()
  }
  todoListItems.push(taskObj)
  let list = displayItems(taskObj)
}

//checked box
const taskList = document.querySelector("ul")
taskList.addEventListener('input', (e)=> {
  const taskID = e.target.closest("li").id
 
  updateTask(taskID)
})

function updateTask(taskID) {
  console.log("taskID", taskID)
}


/*function isChecked(checkbox) {
  checkbox.addEventListener('change', function(){
    if (this.checked) {
      this.checked = !this.checked
    }
    console.log("checked",this.checked)
  })
}


function displayItems(taskObj) {
  const taskList = document.querySelector("ul")
  const isChecked = taskObj.checked ? 'done': ''
  const list = document.createElement("li")
  list.setAttribute("id", taskObj.taskId)
  list.innerHTML = `<span>${taskObj.taskVal}</span>
  <input type="checkbox" name="checkbox" value=${taskObj.checked} />
  <button id="delete" class="item-delete">Delete</button>`
  taskList.append(list)
  //return list
 
}
const form = document.querySelector("form");
form.addEventListener('submit', function(e) {
  e.preventDefault()
  //grab the input value
  const input = document.getElementById("taskVal")
  let taskVal = document.getElementById("taskVal").value
 
  //create the todo object
  if(taskVal!= '') {
    addTask(taskVal)
    input.value = ''
    input.focus()
  }
});*/
