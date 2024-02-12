from datetime import datetime
from flask import Flask, jsonify
from influxdb_client import InfluxDBClient
from flask_cors import CORS
from dateutil import parser
from apscheduler.schedulers.background import BackgroundScheduler
import pytz

app = Flask(__name__)
CORS(app)

# InfluxDB Connection Details
INFLUXDB_URL = 'http://10.8.0.112:8086'
INFLUXDB_TOKEN = 'PSzkq4Kj-erHQ_CCB-DVIKWS-egHbAzZYrQrqyBPKAluIH-4ot8QqE2PVm8As4alczc6JdttrkRzzXAXFuYRJQ=='
INFLUXDB_ORG = '47d5415d787e96ce'
INFLUXDB_BUCKET = 'weather_data'

client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)

data = {}  # Initialize an empty dictionary to store the latest data

def fetch_latest_data():
    global data
    query = '''
    from(bucket: "weather_data")
     |> range(start: -30d)
     |> filter(fn: (r) => r["_measurement"] == "Rack" or r["_measurement"] == "Izba Data" or r["_measurement"] == "3D printer")
     |> last()
    '''
    results = client.query_api().query(org=INFLUXDB_ORG, query=query)
    data.clear()  # Clear the previous data
    for table in results:
        for record in table.records:
            measurement = record.get_measurement()
            field = record.get_field()
            value = record.get_value()
            timestamp = record.get_time()

            # Parse the timestamp to a datetime object
            dt = parser.parse(str(timestamp))

            # Convert the datetime object to a specific timezone, e.g., UTC+1
            timezone = pytz.timezone("Europe/Paris")  # Adjust this to your desired timezone
            dt = dt.astimezone(timezone)

            # Format the timestamp to include only date and time without milliseconds and timezone
            formatted_timestamp = dt.strftime('%H:%M:%S %Y-%m-%d')

            # Construct a key for the data dictionary
            key = f'{measurement}_{field}'
            data[key] = {
                'value': value,
                'timestamp': formatted_timestamp
            }

# Schedule the `fetch_latest_data` function to be called every 30 seconds
scheduler = BackgroundScheduler()
scheduler.add_job(fetch_latest_data, 'interval', seconds=30)
scheduler.start()

@app.route('/')
def latest_data():
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "Data not found"}), 404

if __name__ == '__main__':
    try:
        fetch_latest_data()  # Initial fetch of the data
        app.run(debug=False, host='0.0.0.0', port=5001)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()  # Shut down the scheduler when exiting the app
