from flask import Flask, render_template
app = Flask(__name__)

# Example data, replace with actual query results
temperature = 25.5
humidity = 40

@app.route("/Z:/website-main/")
def home():
    return render_template('index.html', temperature=TempreatureIzba, humidity=HumidityIzba)

if __name__ == '__main__':
    app.run(debug=True)
