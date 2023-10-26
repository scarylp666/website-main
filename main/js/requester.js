// Function to fetch sensor data and update the HTML
function fetchSensorData() {
	// Use the Fetch API to make an HTTP GET request to the '/getdata' endpoint
	fetch("/getdata")
		// When the response is received, parse it as JSON
		.then((response) => response.json())
		// After parsing the JSON, handle the data
		.then((data) => {
			// Update the 'temperature' element's text content with the temperature value from the data
			document.getElementById("temperature1").textContent =
				data.temperature.toFixed(1);
			// Update the 'humidity' element's text content with the humidity value from the data
			document.getElementById("humidity1").textContent =
				data.humidity.toFixed(1);

			// Get the current date and time
			const currentDate = new Date();
			// Format it as a string
			const formattedDate = currentDate.toLocaleString();
			// Update the 'last-updated' element with the formatted date
			document.getElementById("last-updated").textContent =
				"Last Updated: " + formattedDate;
		})
		// If there is an error during the fetch or parsing, log an error message
		.catch((error) => console.error("Error fetching data:", error));
}

// Call the fetchSensorData function immediately to fetch data when the page loads
fetchSensorData();

// Set up an interval to repeatedly call fetchSensorData every 5 seconds (5000 milliseconds)
setInterval(fetchSensorData, 5000);
