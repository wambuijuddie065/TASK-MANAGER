const form = document.getElementById("formElement");
const title = document.getElementById("taskTitle");
const description = document.getElementById("taskDescription");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");

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
incompletearr = [];
window.addEventListener("load", () => {
	// const resetForm = () => {
	//   title.value = ""
	//   description.value = ""
	//     date.value = ""
	// }

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let input = title.value && description.value && date.value;
		if (!input) {
			alert("Please fill in all the fields");
		} else {
			// id = Math.ceil(Math.random() * 1000000);
			incompletearr.push({
				// id: id,
				title: title.value,
				description: description.value,
				date: date.value,
				completed: false,
			});

			// resetForm();
			form.reset();
			listTodos(incompletearr);
		}
	});
});

const paintHtmlToDom = (data,id)=>{
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
	

	
};




let listTodos = () => {
	const completedTasks=incompletearr.filter((todo)=>todo.completed);
	const uncompletedTasks=incompletearr.filter((todo)=>!todo.completed);
	
paintHtmlToDom(uncompletedTasks,"incomplete");
paintHtmlToDom(completedTasks,"complete");

};
function completeTask(target,id){
	const item = getTaskById(id);
	item.completed=target.checked;
	incompletearr.splice(id,1,item)

	listTodos();
	


}

function deleteTask(id) {
	const item = getTaskById(id);
	incompletearr.splice(item, 1);
	// console.log(incompletearr);
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
	// resetForm();
	form.reset();
	updateBtn.style.display = "none";
	addBtn.style.display = "block";
	
	
}


 
// function countTasks() {
//   incompleteTasks.textContent = incompletearr.length;
//   const completedTasksArray = incompletearr.filter((task) => task.isCompleted === true);
//   completedTasks.textContent = completedTasksArray.length;
// }

function getTaskById(id) {
	return incompletearr.find((element, index) => index === id);
}
