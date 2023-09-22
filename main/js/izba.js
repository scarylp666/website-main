function get_izba() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		Izba_data = JSON.parse(this.responseText);
		document.getElementById("temperature").innerHTML =
			Izba_data["TemperatureIzba"];
		document.getElementById("humidity").innerHTML = izba_data["HumidityIzba"];
	};
	xhttp.open("GET", "http://192.168.1.123");
	xhttp.send();
}
get_izba();
setInterval(get_izba, 1000);
