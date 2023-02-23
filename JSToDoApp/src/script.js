
let today =  new Date()
let date = today.toDateString().split(' ')
let time = today.toLocaleTimeString()
let dateElement = document.getElementById('date_text');
let timeElement = document.getElementById('time_text');

dateElement.innerHTML = `${date[0]} ${date[2]}`
timeElement.textContent = time

const apiURL = 'https://uptight-teal-walrus.cyclic.app/task'


/*const  fetchPromise = fetch(apiURL)
fetchPromise.then((response) => {
  const jsonResponse = response.json()
  jsonResponse.then((data) => {
    console.log(data[0])
  })
})*/


const createTask = (task) => {
  let taskJSON = JSON.stringify(task)
  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: taskJSON
  }
  fetch(apiURL, requestOptions)
  .then(res => res)
  //.then(res => res.json()) //the .json method parses the JSON response into a JS Object literal. causes an error as reesponse from api returned is text/html
  .then(data => getTask()) //when the Promise is resolved, create the task dynamically
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



const callUpdateAPI  = (isChecked,dataID) => {
    console.log("insidee callUpdateAPI isChecked", isChecked)
    console.log("insidee callUpdateAPI dataID", dataID)

    let newTask = {
      isCompleted: isChecked
    }

    let taskJSON = JSON.stringify(newTask)

    const requestOptions = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: taskJSON
    }
    fetch(`${apiURL}/${dataID}`, requestOptions)
    .then(res => res)
    .then(data => console.log(data))
    .catch(error => console.log(error))
  
}

const checkboxClick = (e) => {
  let isChecked = e.target.checked
  console.log("this.checked",  e.target.checked)
  console.log("this.dataid",  e.target.dataID)

 // callUpdateAPI(isChecked,e.target.dataID)
}

//get a task
const getTask = () => {
  console.log("get task loaded")
  fetch(apiURL)
  .then(res => res.json())
  .then(res => {
      console.log("getTask data", res)
      let task_container = document.getElementById('task_container')
      res.map((item)=>{
        let task_li = document.createElement("li")
        //task_li.id = 'task_div'
        task_li.id = `${item._id}`
        task_li.classList.add("todo", "stack-small")
        task_li.innerHTML = `<div class="todo_labels"><p>${item.name}</p><p>${item.date}</p></div> <div class="btn_group">
        <input type="checkbox" name=${item.name} ${item.isCompleted==true?'checked':''} isCompleted=${item.isCompleted} dataId=${item._id}  date=${item.date} class="cbox" onchange="(function(e){const itemid = getAttribute('dataId'); console.log(e); callUpdateAPI(e.target.checked,itemid); })(event)" />
        <img src="../assets/Vector.jpg" alt="" id="img_del" onclick='handleDeleteClick("${item._id}")' />
      </div>`

    
     
      task_container.append(task_li)

      
      /*let checkbox = document.getElementById("taskCheckBox")
      checkbox.checked = `${item.isCompleted}`*/
     
      
      /*input.addEventListener('change', (e) =>{
    
        let isChecked = e.target.checked
        console.log("this.checked",  e.target.checked)
        callUpdateAPI(isChecked,dataID)
      })*/


     /*let img = document.getElementById("img_del")
      img.addEventListener('click',()=>{
        handleDeleteClick(item._id)
      })*/
      })
      //editTask()
     /* let checkbox = document.getElementById("taskCheckBox")
      let dataID = checkbox.getAttribute('dataID')
      
      checkbox.addEventListener('change', (e) =>{
    
        let isChecked = e.target.checked
        console.log("this.checked",  e.target.checked)
        callUpdateAPI(isChecked,dataID)
      })*/
  })
  
}

getTask()

const handleDeleteClick = (id) => {
  console.log("id is", id)
  const apiURL = 'https://uptight-teal-walrus.cyclic.app/task'
  const requestOptions = {
      method: 'DELETE'
  }
  let task_container = document.getElementById('task_container')
  let task_div = document.getElementById(`${id}`)
  
  fetch(`${apiURL}/${id}`, requestOptions)
    .then(data => task_container.removeChild(task_div))
    .catch(err => console.error(err))   
}



