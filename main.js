const form = document.getElementById("formElement");
const title = document.getElementById("taskTitle");
const description = document.getElementById("taskDescription");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");


const uncompleted_task= document.getElementById('uncompleted-task')
const completed_task= document.getElementById('completed-task')

const incompleteTasks = document.querySelector("#incomplete");
const completedTasks = document.querySelector("#complete");


function showForm() {
	
	var x = document.getElementById("formElement");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
	
}
let incompletearr = [];

// incompletearr.push({
// 	title:'swedfrgth',
// 	description:"jjhvcvbnm",
// 	date:new Date(),
// 	completed:false
// })

let completedarr=[]

listTodos()
countTasks()
window.addEventListener("load", () => {
	

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let input = title.value && description.value && date.value;
		if (!input) {
			alert("Please fill in all the fields");
		} else {
			
			incompletearr.push({
				
				title: title.value,
				description: description.value,
				date: date.value,
				completed: false,
			});

			
			form.reset();
			listTodos(incompletearr);
		}
	});
});

function paintHtmlToDom (data,id){
	const html=data.map((item, index) => {
		let htmlcode = `
		    <div class="mytask">
			<input id="checkmark" type="checkbox" ${data.completed ? "checked" : ""}  
			onchange="completeTask(this, ${index})"      style="align-self: flex-start"></input>
			<div class="title">${item.title}</div>
			<div class="description">${item.description}</div>
			<div class="dueDate">${item.date}</div>
			<div class="actions">
			<button onclick="editTask(${index})"  id="editBtn">EDIT</button>
			<button onclick="deleteTask(${index})" id="deleteBtn">DELETE</button>
			</div></div>
			
		`;
		
		return htmlcode;
	}).join("");
	const pDiv=document.getElementById(id);
	if (pDiv) {
		pDiv.innerHTML=html;
		
	}
	countTasks();
	

	
};




function listTodos() {
	
	
paintHtmlToDom(incompletearr,"incomplete");
paintHtmlToDom(completedarr,"complete");
console.log('dfg'+completedarr);

};
function completeTask(target,id){
	const item = getTaskById(id);
	item.completed=target.checked;
	
	completedarr.push(item)
	incompletearr.splice(id,1)

	listTodos();
	


}

function deleteTask(id) {
	
	incompletearr.splice(id, 1);
	

	listTodos();

}
function editTask(id) {
	const item = getTaskById(id);
	title.value = item.title;
	description.value = item.description;
	date.value = item.date;

	addBtn.style.display = "none";
	updateBtn.style.display = "block";

	const clickHandler = (e) => {
		updateTask(id, {
			title: title.value,
			description: description.value,
			date: date.value,
		});
		updateBtn.removeEventListener("click", clickHandler);
	};
	updateBtn.addEventListener("click", clickHandler);
}
function updateTask(id, newItem) {
	console.log(id, newItem);
	incompletearr.splice(id, 1, newItem);
	listTodos();
	
	form.reset();
	updateBtn.style.display = "none";
	addBtn.style.display = "block";
	
	
}


 
function countTasks() {

  if(incompletearr.length===0){
	uncompleted_task.textContent='No Uncompleted task available'
  }else{
	uncompleted_task.textContent = incompletearr.length;
  }

  if(completedarr.length===0){
	completed_task.textContent='No completed Tasks Available'
  }
  else{
	completed_task.textContent = completedarr.length;
  }

}

function getTaskById(id) {
	return incompletearr.find((element, index) => index === id);
}
