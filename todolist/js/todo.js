var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		var div = this.parentElement;
		div.style.display = "none";
	};
}

// Add a "checked" symbol when clicking on a list item
function clickyclack() {
	var list = document.getElementById("myUL");
	list.addEventListener(
		"click",
		function (ev) {
			if (ev.target.tagName === "LI") {
				ev.target.classList.toggle("checked");
			}
			saveList();
		},
		false
	);
}

// Create a new list item when clicking on the "Add" button
function pinor(inputValue, cocked = false) {
	var li = document.createElement("li");
	if (cocked) {
		li.classList.toggle("checked");
	}
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === "") {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(span);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.style.display = "none";
		};
	}
}
function newElement() {
	pinor(document.getElementById("myInput").value);
	saveList();
}
const xhr = new XMLHttpRequest();
xhr.open("GET", "/todolist/cecek/todolist.php");
xhr.send();
xhr.onload = function () {
	if (xhr.status === 200) {
		//parse JSON datax`x
		// console.log(this.responseText);
		data = JSON.parse(xhr.responseText);
		for (const key in data) {
			if (data[key] == 0) {
				pinor(key, false);
			} else {
				pinor(key, true);
			}
		}
	} else if (xhr.status === 404) {
		console.log("No records found");
	}
};
function saveList() {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/todolist/cecek/todolist.php");
	var list1 = document.querySelectorAll("li");
	var dzejson = {};
	list1.forEach((element) => {
		// console.log(element.innerText.slice(0, -2));
		// console.log(element.getAttribute("class"));
		if (element.style.display !== "none") {
			dzejson[element.innerText.slice(0, -2)] =
				element.getAttribute("class") === "checked" ? 1 : 0;
		}
	});
	console.log(dzejson);
	xhr.send(JSON.stringify(dzejson));
}
