class ToDo {
	constructor(id, type, info) {
		this.id = id;
		this.type = type;
		this.info = info;
		this.success = false;
	}

	getElement() {
		let element = document.createElement("div");
		let icon = document.createElement("span");
		let span = document.createElement("span");
		let divCheck = document.createElement("div");
		let check = document.createElement("input");
		element.id = `toDo-${this.id}`;
		span.innerText = this.info;
		icon.innerText = this.type;
		divCheck.classList.add("divCheck");
		check.type = "checkbox";
		check.id = `${this.id}`;
		if (this.success) check.checked = true;
		check.addEventListener("click", completeToDo);
		divCheck.appendChild(check);
		element.appendChild(icon);
		element.appendChild(span);
		element.appendChild(divCheck);
		return element;
	}

	changeState() {
		this.success = !this.success;
	}
}

const myInput = document.getElementById("inputTodo");
const selectIcon = document.getElementById("selectIcon");
const btnAgregar = document.getElementById("btnAgregar");
const divList = document.getElementById("divList");

const listToDo = [];

function buildToDo() {
	let info = myInput.value;
	let icon = selectIcon.value;
	let id = listToDo.length;
	if (info) listToDo.push(new ToDo(id, icon, info));
	if (!info) alert("No se ha ingresado nada!!!");
	myInput.value = "";
	showToDos();
}

function completeToDo(e) {
	let id = e.target.id;
	listToDo[id].changeState();
	showToDos();
}

function showToDos() {
	divList.innerHTML = "";
	let cant = listToDo.length;
	for(let i = 0; i < cant; i++)
		divList.appendChild(listToDo[i].getElement());
}

function inicializar() {
	btnAgregar.addEventListener("click", buildToDo);
	showToDos();
}

inicializar();