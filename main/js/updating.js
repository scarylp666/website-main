function show() {
	/* Access image by id and change
    the display property to block*/
	document.getElementById("image").style.display = "block";

	document.getElementById("btnID").style.display = "none";
}

function fetchDataAndUpdate() {
	fetch("http://127.0.0.1:5001/") // Make sure to include the correct endpoint '/latest'
		.then((response) => response.json())
		.then((data) => {
			// Update the elements with the data received from the server
			// Assuming the JSON keys are formed as 'location_sensor'

			// Izba Data
			if (data["Izba Data_humidity"]) {
				document.getElementById("HumidityIzba").innerText =
					data["Izba Data_humidity"].value;
				document.getElementById("timestamp1").innerText =
					data["Izba Data_humidity"].timestamp;
			}
			if (data["Izba Data_temperature"]) {
				document.getElementById("TempreatureIzba").innerText =
					data["Izba Data_temperature"].value;
				// Assuming the timestamp is the same for temperature and humidity
			}

			// Rack Data
			// ... (you would continue in the same pattern for Rack, 3D Printer, etc.)

			// 3D Printer
			if (data["3D printer_humidity"]) {
				document.getElementById("Humidity31").innerText =
					data["3D printer_humidity"].value;
				document.getElementById("timestamp31").innerText =
					data["3D printer_humidity"].timestamp;
			}
			if (data["3D printer_temperature"]) {
				document.getElementById("Tempreature31").innerText =
					data["3D printer_temperature"].value;
				// Assuming the timestamp is the same for temperature and humidity
			}

			// ... Repeat for each section/division you have on your webpage
		})
		.catch((error) => console.error("Error fetching data:", error));
}

// Call the function when the script loads
fetchDataAndUpdate();

// Optionally, set it to refresh every 3 seconds
setInterval(fetchDataAndUpdate, 3000);
