<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="todolist/css/style.css" />
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />	
		<link
			rel="icon"
			type="image/x-icon"
			href="main/dns_FILL0_wght400_GRAD0_opsz48.ico" />
		<title>To Do List</title>
	</head>
	<body onload="clickyclack()">
		<div class="dropdown">
			<button class="material-symbols-outlined">widgets</button>
			<div class="dropdown-content">
				<a class="center" href="/index.html">Domov</a>
				<a class="center" href="http://192.168.1.232:9987">Ad Guard</a>
			</div>
		</div>
		<script src="todolist/js/todo.js"></script>
		<div id="myDIV" class="header">
			<h2>To Do List</h2>
			<input type="text" id="myInput" placeholder="..." />
			<span onclick="newElement()" class="addBtn">Add</span>
		</div>
		<ul id="myUL"></ul>
	</body>
</html>
