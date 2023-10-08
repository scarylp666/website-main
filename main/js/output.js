function get_weather_data() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		weather_data = JSON.parse(this.responseText);
		document.getElementById("temperature").innerHTML =
			weather_data["Temperature"];
		document.getElementById("humidity").innerHTML = weather_data["Humidity"];
		document.getElementById("timestamp").innerHTML = weather_data["Time"];
		document.getElementById("temperature1").innerHTML =
			weather_data["Temperature1"];
		document.getElementById("humidity1").innerHTML = weather_data["Humidity1"];
		document.getElementById("timestamp1").innerHTML = weather_data["Time1"];
		document.getElementById("Rain").innerHTML = weather_data["Rain"];
		document.getElementById("Speed").innerHTML = weather_data["Speed"];
		document.getElementById("pressure").innerHTML = weather_data["pressure"];
	};
	xhttp.open("GET", "main/weather_data.json");
	xhttp.send();
}
get_weather_data();
setInterval(get_weather_data, 1000);
