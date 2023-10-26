#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <HTTPClient.h> // Include the HTTPClient library

// Replace with your network credentials
const char *ssid = "Tomas2";
const char *password = "747a313132";

// Replace with the URL of your external HTML page
const char *htmlUrl = "http://192.168.1.159/index.html";

// Create an instance of the DHT sensor
#define DHTPIN 2 // Replace with the GPIO pin where DHT11 is connected
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

AsyncWebServer server(80);

void setup()
{
    Serial.begin(115200);
    dht.begin();

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    // Route to get sensor data
    server.on("/getdata", HTTP_GET, [](AsyncWebServerRequest *request)
              {
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    String response = "{\"humidity\": " + String(humidity) + ", \"temperature\": " + String(temperature) + "}";
    request->send(200, "application/json", response); });

    // Serve the HTML content from the external server
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              {
    HTTPClient http;

    // Send an HTTP GET request to the external server to fetch the HTML content
    if (http.begin(htmlUrl)) {
      int httpCode = http.GET();
      if (httpCode == HTTP_CODE_OK) {
        String htmlContent = http.getString();
        request->send(200, "text/html", htmlContent);
      } else {
        request->send(500, "text/plain", "Error fetching HTML content");
      }
      http.end();
    } else {
      request->send(500, "text/plain", "Error initializing HTTP client");
    } });

    // Start the server
    server.begin();
}

void loop()
{
    // Nothing to do here
}
